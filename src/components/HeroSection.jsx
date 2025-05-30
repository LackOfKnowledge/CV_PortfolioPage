// src/components/HeroSection.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DownloadIcon from "@mui/icons-material/Download";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const animatedWaveSxHero = (theme) => ({
  background: `linear-gradient(75deg, ${theme.palette.primary.main}, #FBC02D, #4CAF50, #9C27B0, ${theme.palette.primary.main})`,
  backgroundSize: "300% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  animation: "waveGradient 10s linear infinite",
  display: "inline-block",
  fontWeight: "bold",
});

export default function HeroSection({ onNavigate }) {
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
          gutterBottom
          sx={animatedWaveSxHero}
        >
          <img src="/images/avataaars.svg" />
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Witaj! Jestem Krzysiek i zapraszam do kontaktu!
          {/* TODO: Wpisz swoje dane */}
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ mb: 5, maxWidth: "700px", mx: "auto" }}
        >
          Przeklikaj przez zakładki i zapoznaj się z moim życiorysem, zobacz
          gdzie pracowałem i co potrafię. Zachęcam do skontaktowania się ze mną
          poprzez formularz. Jeśli chcesz wyślę Ci swoje CV, ale w bardziej
          oryginalny sposób niż pdf mailem :).
          {/* TODO: Wpisz swoje dane */}
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          {/* <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<DownloadIcon />}
            href="/cv"
            target="_blank"
            sx={{ minWidth: "180px" }}
          >
            Pobierz CV
          </Button> */}
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<MailOutlineIcon />}
            onClick={() => (onNavigate ? onNavigate("kontakt") : null)}
            sx={{ minWidth: "180px" }}
          >
            Kontakt
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
