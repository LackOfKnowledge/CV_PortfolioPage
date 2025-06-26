// src/components/HeroSection.jsx
"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import { smoothScrollTo } from "@/utils/smoothScroll";

export default function HeroSection() {
  return (
    <Box
      id="hero"
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 8, md: 12 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Box
          component="img"
          src="/images/avataaars.svg"
          alt="Avatar"
          sx={{
            width: 140,
            height: 140,
            mb: 2,
          }}
        />
        <Typography
          variant="h4"
          component="h1"
          color="text.primary"
          sx={{ mb: 1, fontWeight: "bold" }}
        >
          Witaj! Jestem Krzysiek i zapraszam do kontaktu!
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: "700px", mx: "auto", fontWeight: "normal" }}
        >
          Przeklikaj przez zakładki i zapoznaj się z moim życiorysem, zobacz
          gdzie pracowałem i co potrafię. Zachęcam do skontaktowania się ze mną
          poprzez formularz. Jeśli chcesz wyślę Ci swoje CV, ale w bardziej
          oryginalny sposób niż pdf mailem :). Zapraszam również do zapoznania
          się z blogiem, znajdziesz tam treści nie tylko programistyczne, ale
          też geodezyjne/budowlane.
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<MailOutlineIcon />}
            sx={{ minWidth: "180px" }}
            onClick={() => smoothScrollTo("kontakt", "main-content-area")}
          >
            Kontakt
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<BookOutlinedIcon />}
            sx={{ minWidth: "180px" }}
            onClick={() => (window.location.href = "/blog")}
          >
            Przejdź na bloga
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
