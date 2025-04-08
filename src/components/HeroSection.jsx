// src/components/HeroSection.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DownloadIcon from "@mui/icons-material/Download";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

// Styl dla animowanego nagłówka głównego (Imię i Nazwisko)
// Można dostosować gradient/prędkość specjalnie dla tej sekcji
const animatedWaveSxHero = (theme) => ({
  background: `linear-gradient(75deg, ${theme.palette.primary.main}, #FBC02D, #4CAF50, #9C27B0, ${theme.palette.primary.main})`,
  backgroundSize: "300% auto", // Może być inny rozmiar/prędkość
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  animation: "waveGradient 10s linear infinite", // Inna prędkość dla odmiany?
  display: "inline-block",
  fontWeight: "bold",
  // mb: 2, // Usunięte, bo Typography ma gutterBottom
});

export default function HeroSection({ onNavigate }) {
  // Dodajemy onNavigate, jeśli przycisk Kontakt ma działać
  const headerHeight = "64px";

  return (
    <Box
      sx={{
        minHeight: `calc(90vh - ${headerHeight})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 8, md: 12 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom // Dodaje margines dolny
          // Zastosowanie stylu animowanej fali do imienia
          sx={animatedWaveSxHero}
        >
          [Twoje Imię i Nazwisko]
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          [Frontend Developer], specjalista od pięknych interfejsów ;)
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ mb: 5, maxWidth: "700px", mx: "auto" }}
        >
          [Witaj! Nazywam się [...] i jestem pasjonatem...]
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<DownloadIcon />}
            href="/api/generate-cv"
            sx={{ minWidth: "180px" }}
          >
            Pobierz CV
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<MailOutlineIcon />}
            // Wywołujemy nawigację do sekcji kontakt po kliknięciu
            onClick={() => (onNavigate ? onNavigate("kontakt") : null)}
            // href="#kontakt" // Usuwamy href, jeśli używamy onClick do nawigacji w SPA
            sx={{ minWidth: "180px" }}
          >
            Kontakt
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
