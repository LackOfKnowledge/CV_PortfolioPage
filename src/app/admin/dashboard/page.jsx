// src/app/admin/dashboard/page.jsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [generatedLink, setGeneratedLink] = useState("");
  const [linkError, setLinkError] = useState("");
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const linkTextFieldRef = useRef(null); // Ref do komponentu TextField

  // console.log("[AdminDashboard] Current session status:", status, "Session data:", session);

  useEffect(() => {
    // console.log("[AdminDashboard] useEffect triggered. Status:", status, "Session:", session);
    if (status === "loading") {
      // console.log("[AdminDashboard] Status is loading, waiting...");
      return;
    }
    if (status === "unauthenticated") {
      // console.log("[AdminDashboard] Status is unauthenticated, redirecting to /admin/login");
      router.push("/admin/login");
      return;
    }
    if (session && session.user?.role !== "admin") {
      // console.log("[AdminDashboard] Authenticated but not admin. Role:", session.user?.role, "Redirecting to /");
      router.push("/");
    } else if (session && session.user?.role === "admin") {
      // console.log("[AdminDashboard] Session valid and user is admin.");
    }
  }, [session, status, router]);

  const handleGenerateLink = async () => {
    setIsGeneratingLink(true);
    setGeneratedLink("");
    setLinkError("");
    setCopySuccess("");
    try {
      const response = await fetch("/api/admin/generate-cv-link", {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Nie udało się wygenerować linku.");
      }
      if (data.link) {
        const fullLink = `${window.location.origin}${data.link}`;
        setGeneratedLink(fullLink);
      } else {
        throw new Error("API nie zwróciło poprawnego linku.");
      }
    } catch (error) {
      console.error("Błąd generowania linku:", error);
      setLinkError(error.message || "Wystąpił błąd serwera.");
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (generatedLink && linkTextFieldRef.current) {
      // linkTextFieldRef.current to komponent TextField, potrzebujemy elementu input
      const inputElement = linkTextFieldRef.current.querySelector("input");
      if (inputElement) {
        inputElement.select(); // Zaznacz tekst
        inputElement.setSelectionRange(0, 99999); // Dla kompatybilności mobilnej

        navigator.clipboard
          .writeText(generatedLink)
          .then(() => {
            setCopySuccess("Link skopiowany do schowka!");
            setTimeout(() => setCopySuccess(""), 2000);
          })
          .catch((err) => {
            console.error("Błąd kopiowania do schowka:", err);
            setLinkError("Nie udało się skopiować linku. Spróbuj ręcznie.");
          });
      }
    }
  };

  const handleTextFieldClick = (event) => {
    // Używamy ref, aby zaznaczyć tekst, a nie event.target
    if (linkTextFieldRef.current) {
      const inputElement = linkTextFieldRef.current.querySelector("input");
      if (inputElement) {
        inputElement.select();
        inputElement.setSelectionRange(0, 99999); // Dla kompatybilności mobilnej
      }
    }
  };

  if (status === "loading") {
    // console.log("[AdminDashboard] Rendering: Status is loading, showing spinner.");
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!session || session.user?.role !== "admin") {
    // console.log("[AdminDashboard] Rendering: No session or not admin, showing redirect message (useEffect will handle redirect).");
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Sprawdzanie uprawnień...</Typography>
        <CircularProgress
          sx={{ ml: 2 }}
          size={20}
        />
      </Box>
    );
  }

  // console.log("[AdminDashboard] Rendering: Session valid and user is admin, showing dashboard content.");
  return (
    <Container
      component="main"
      maxWidth="md"
    >
      <Box sx={{ marginTop: 8, textAlign: "center" }}>
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
        >
          Witaj w Panelu Admina, {session.user?.name}!
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
        >
          Twoja rola: {session.user?.role}
        </Typography>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateLink}
            disabled={isGeneratingLink}
            sx={{ minWidth: "220px" }}
          >
            {isGeneratingLink ? (
              <CircularProgress
                size={24}
                color="inherit"
              />
            ) : (
              "Generuj Link do CV"
            )}
          </Button>

          {generatedLink && (
            <Box sx={{ width: "100%", maxWidth: "600px", mt: 2 }}>
              <Alert
                severity="success"
                sx={{ mb: 1 }}
              >
                Wygenerowany link (ważny 7 dni, jednorazowy):
              </Alert>
              <TextField
                ref={linkTextFieldRef} // Użyj ref zamiast inputRef dla komponentu TextField (MUI v5)
                // inputRef jest bardziej dla natywnego <input> lub gdy TextField ma wariant 'standard'
                // Dla 'outlined' i 'filled', ref na TextField daje dostęp do roota,
                // a potem querySelector('input')
                fullWidth
                variant="outlined"
                value={generatedLink}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="kopiuj link"
                        onClick={handleCopyToClipboard} // Ten onClick jest na IconButton
                        edge="end"
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onClick={handleTextFieldClick} // Użyj dedykowanej funkcji kliknięcia na pole
              />
              {copySuccess && (
                <Typography
                  color="success.main"
                  variant="caption"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  {copySuccess}
                </Typography>
              )}
            </Box>
          )}
          {linkError && (
            <Alert
              severity="error"
              sx={{ mt: 2, width: "100%", maxWidth: "600px" }}
            >
              {linkError}
            </Alert>
          )}
          <Button
            variant="contained"
            color="secondary"
            href="/admin/blog/new"
            sx={{ minWidth: "220px", mt: 2 }}
          >
            Napisz nowy post
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              // console.log("[AdminDashboard] Attempting signOut.");
              signOut({ callbackUrl: "/" });
            }}
            sx={{ mt: 3 }}
          >
            Wyloguj
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
