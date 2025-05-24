"use client";
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      className="site-footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.grey[900]
            : theme.palette.grey[200],
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }} // Kolumna na mobilnych, rząd na większych
          justifyContent="center" // Wyśrodkowanie głównej zawartości
          alignItems="center"
          spacing={{ xs: 1, sm: 4 }} // Zwiększony odstęp na większych ekranach
        >
          {/* Copyright Text */}
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            © {currentYear} Krzysztof Skuratowicz. Wszelkie prawa zastrzeżone.
          </Typography>

          {/* GitHub Icon Link */}
          {/* Usunęliśmy Stack dla ikon, bo jest tylko jedna */}
          <IconButton
            aria-label="GitHub"
            href="https://github.com/LackOfKnowledge" // Twój link GitHub
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/skuratowiczkrzysztofgeo/" // WAŻNE: Podmień na swój URL!
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}
