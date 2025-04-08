// src/components/ContactSection.jsx
"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";

// Styl dla animowanego nagłówka sekcji
const animatedWaveSxSection = (theme) => ({
  background: `linear-gradient(60deg, ${theme.palette.primary.main}, #FBC02D, #4CAF50, #2196F3, ${theme.palette.primary.main})`,
  backgroundSize: "350% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  animation: "waveGradient 12s linear infinite",
  display: "inline-block", // Nadal potrzebne
  fontWeight: "medium", // Ustawiamy font-weight tutaj
});

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: false,
    message: "",
  });

  const handleSubmit = async (event) => {
    /* ... (logika bez zmian) ... */ event.preventDefault();
    setSubmitting(true);
    setSubmitStatus({ success: false, error: false, message: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || `HTTP error! status: ${response.status}`
        );
      setSubmitStatus({
        success: true,
        error: false,
        message: result.message || "Wiadomość wysłana!",
      });
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus({
        success: false,
        error: true,
        message: error.message || "Wystąpił błąd.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      id="kontakt"
      sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.paper" }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={(theme) => ({
            // Używamy funkcji sx
            ...animatedWaveSxSection(theme), // Rozszerzamy style animacji
            mx: "auto", // <<== DODAJEMY TO, aby wycentrować sam element inline-block
          })}
        >
          Kontakt
        </Typography>
        <Divider
          variant="middle"
          sx={{
            mb: { xs: 4, md: 6 },
            mx: "auto",
            width: "80px",
            height: "3px",
            backgroundColor: "primary.main",
            borderRadius: "2px",
          }}
        />
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Masz pytanie lub propozycję współpracy? Wypełnij formularz poniżej!
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Twój adres e-mail"
            variant="outlined"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
          />
          <TextField
            label="Twoja wiadomość"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={5}
            margin="normal"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={submitting}
          />
          {submitStatus.success && (
            <Alert
              severity="success"
              sx={{ mt: 2, mb: 1 }}
            >
              {submitStatus.message}
            </Alert>
          )}
          {submitStatus.error && (
            <Alert
              severity="error"
              sx={{ mt: 2, mb: 1 }}
            >
              {submitStatus.message}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={
              submitting ? (
                <CircularProgress
                  size={20}
                  color="inherit"
                />
              ) : (
                <SendIcon />
              )
            }
            disabled={submitting}
            sx={{ mt: 3, py: 1.5 }}
          >
            {submitting ? "Wysyłanie..." : "Wyślij wiadomość"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
