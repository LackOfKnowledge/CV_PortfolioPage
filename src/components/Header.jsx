// src/components/Header.jsx
"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "./ThemeRegistry";

const navItems = [
  { label: "O mnie", targetId: "omnie" },
  { label: "Doświadczenie", targetId: "doswiadczenie" },
  { label: "Umiejętności", targetId: "umiejetnosci" },
  { label: "Portfolio", targetId: "portfolio" },
  { label: "Kontakt", targetId: "kontakt" },
];

// Definicje stylów animacji z użyciem zmiennych CSS
const animatedWaveSxBase = (theme) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #FBC02D, #4CAF50, #2196F3, #9C27B0, #E91E63, ${theme.palette.primary.main})`,
  backgroundSize: "400% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  display: "inline-block",
  animationName: "waveGradient",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  animationDuration: "var(--gradient-anim-duration)", // Użycie zmiennej CSS
  transition: "animation-duration 0.4s ease-out", // Próba płynnego przejścia
  "&:hover": { animationDuration: "var(--gradient-anim-duration-hover)" }, // Przyspieszenie
});
const animatedWaveSxHeader = (theme) => ({
  ...animatedWaveSxBase(theme),
  fontWeight: "bold",
});

export default function Header({ activeView, onNavClick }) {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <AppBar
      position="sticky"
      elevation={1}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            onClick={() => onNavClick("hero")}
            sx={{
              ...animatedWaveSxHeader(theme),
              flexGrow: 1,
              cursor: "pointer",
            }}
          >
            Twoje Portfolio
          </Typography>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => onNavClick(item.targetId)}
                sx={{
                  color: "inherit",
                  mx: 0.5,
                  fontWeight: activeView === item.targetId ? "bold" : "normal",
                  color:
                    activeView === item.targetId
                      ? theme.palette.primary.main
                      : "inherit",
                  "&:hover": {
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.primary.dark,
                    backgroundColor: "action.hover",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {/* Mobile Menu */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
