// src/components/AboutSection.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// Definicje stylów animacji nagłówka sekcji
const animatedWaveSxBase = (theme) => ({
  background: `linear-gradient(60deg, ${theme.palette.primary.main}, #FBC02D, #4CAF50, #2196F3, ${theme.palette.primary.main})`,
  backgroundSize: "350% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  display: "inline-block",
  animationName: "waveGradient",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  animationDuration: "var(--gradient-anim-duration)", // Użycie zmiennej CSS
  transition: "animation-duration 0.4s ease-out",
  "&:hover": { animationDuration: "var(--gradient-anim-duration-hover)" }, // Przyspieszenie
});

export default function AboutSection() {
  return (
    <Box
      id="o-mnie"
      sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.default" }}
    >
      <Container maxWidth="md">
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Typography
            variant="h4"
            component="h2"
          >
            O mnie
          </Typography>
        </Box>
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
          Hej! Jestem Krzysiek — z wykształcenia inżynier informatyk, z
          doświadczenia geodeta, a z zamiaru frontend developer. Lubię konkret,
          przejrzysty kod i dobrze przemyślane interfejsy. Dopiero wchodzę w
          branżę IT, ale mam już za sobą parę projektów i spory zapał do nauki.
          <br />
          <br />
          Kiedyś zamiast kodzić, to grałem - teraz raczej jest na odwrót. Gdy
          zacznę grzebać przy kodzie, ciężko jest mnie oderwać :)
        </Typography>
      </Container>
    </Box>
  );
}
