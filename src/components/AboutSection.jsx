// src/components/AboutSection.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

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

export default function AboutSection() {
  return (
    <Box
      id="o-mnie"
      sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.paper" }}
    >
      <Container maxWidth="md">
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
          O mnie
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
          variant="h6"
          component="p"
          color="text.secondary"
          align="center"
          sx={{
            maxWidth: "800px",
            mx: "auto",
            lineHeight: 1.7,
            fontSize: { xs: "1rem", md: "1.1rem" },
          }}
        >
          Witaj! Jestem pasjonatem kodu...
          <br />
          <br />
          Poza kodowaniem lubię [Twoje hobby]...
        </Typography>
      </Container>
    </Box>
  );
}
