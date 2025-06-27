"use client";

import React, { useState, useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const isRedirecting = useRef(false);

  console.log(
    "[LoginPage] Render. Status:",
    status,
    "Session:",
    session,
    "isRedirecting:",
    isRedirecting.current
  );

  useEffect(() => {
    console.log(
      "[LoginPage] useEffect triggered. Status:",
      status,
      "Session:",
      session,
      "isRedirecting:",
      isRedirecting.current
    );
    if (status === "authenticated" && session && !isRedirecting.current) {
      console.log(
        "[LoginPage] Authenticated & not redirecting yet. Initiating redirect to /admin/dashboard"
      );
      isRedirecting.current = true;
      router.push("/admin/dashboard");
    }
  }, [session, status, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    isRedirecting.current = false;
    console.log(
      "[LoginPage] handleSubmit: Attempting signIn with email:",
      email
    );

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      console.log("[LoginPage] handleSubmit: signIn result:", result);

      if (result?.error) {
        const errorMessage =
          result.error === "CredentialsSignin"
            ? "Nieprawidłowy email lub hasło."
            : result.error;
        console.error(
          "[LoginPage] handleSubmit: signIn error:",
          errorMessage,
          "Full result error:",
          result.error
        );
        setError(errorMessage);
        setLoading(false);
      } else if (result?.ok) {
        console.log(
          "[LoginPage] handleSubmit: signIn successful. Session status will update, useEffect will handle redirect."
        );
      } else {
        console.error(
          "[LoginPage] handleSubmit: signIn result not ok and no error:",
          result
        );
        setError("Wystąpił nieoczekiwany błąd logowania.");
        setLoading(false);
      }
    } catch (e) {
      console.error("[LoginPage] handleSubmit: Exception during signIn:", e);
      setError("Wystąpił błąd podczas próby logowania.");
      setLoading(false);
    }
  };

  if (status === "loading" || isRedirecting.current) {
    console.log(
      "[LoginPage] Rendering: Status is 'loading' or isRedirecting.current is true. Showing global spinner."
    );
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <CircularProgress />
        {isRedirecting.current && <Typography>Przekierowywanie...</Typography>}
      </Box>
    );
  }

  if (status === "authenticated") {
    console.log(
      "[LoginPage] Rendering: Status is 'authenticated' (and not yet redirecting). Should be handled by useEffect shortly."
    );
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <CircularProgress />
        <Typography>Finalizowanie sesji...</Typography>
      </Box>
    );
  }

  console.log(
    "[LoginPage] Rendering: Status is 'unauthenticated' and not redirecting. Showing login form."
  );
  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
        >
          Panel Admina - Logowanie
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          {error && (
            <Alert
              severity="error"
              sx={{ mt: 2, width: "100%" }}
            >
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                size={24}
                color="inherit"
              />
            ) : (
              "Zaloguj się"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
