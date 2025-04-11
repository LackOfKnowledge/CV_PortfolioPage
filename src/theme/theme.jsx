// src/theme/theme.jsx
"use client";

import { createTheme } from "@mui/material/styles";
import { chivo } from "./fonts"; // Upewnij się, że ścieżka do fonts.jsx/js jest poprawna

// Funkcja pomocnicza hexToRgba
function hexToRgba(hex, alpha) {
  hex = hex.replace("#", "");
  if (hex.length === 3)
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  const r = parseInt(hex.substring(0, 2), 16),
    g = parseInt(hex.substring(2, 4), 16),
    b = parseInt(hex.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(0, 0, 0, ${alpha})`;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Wspólne ustawienia
const commonSettings = {
  typography: { fontFamily: chivo.style.fontFamily },
  shape: { borderRadius: 8 },
};

// --- Definicje Stylów Animowanych Nagłówków ---
// Funkcja bazowa zwracająca styl w zależności od trybu
const getAnimatedWaveStyles = (theme, options = {}) => {
  const {
    fontWeight = "medium",
    animationDuration = "var(--gradient-anim-duration)",
    gradientColors = null,
  } = options;

  const baseStyles = {
    display: "inline-block",
    fontWeight: fontWeight,
  };

  // Dla trybu jasnego zwracamy stały kolor (dla czytelności)
  if (theme.palette.mode === "light") {
    return {
      ...baseStyles,
      color: theme.palette.primary.main, // Używamy głównego koloru motywu
    };
  }

  // Dla trybu ciemnego zwracamy animowany gradient
  // Domyślny gradient, jeśli nie podano innego w opcjach
  const defaultGradient = `linear-gradient(60deg, ${theme.palette.primary.main}, #FBC02D, #4CAF50, #2196F3, ${theme.palette.primary.main})`;

  return {
    ...baseStyles,
    background: gradientColors || defaultGradient,
    backgroundSize: "350% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
    animationName: "waveGradient",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationDuration: animationDuration, // Używamy przekazanej lub domyślnej (zmiennej CSS)
    transition: "animation-duration 0.4s ease-out",
    "&:hover": {
      animationDuration: "var(--gradient-anim-duration-hover)", // Zawsze przyspieszaj na hover
    },
  };
};

// Eksportowane funkcje stylów dla headera i sekcji
export const animatedWaveSxHeader = (theme) =>
  getAnimatedWaveStyles(theme, {
    fontWeight: "bold",
    gradientColors: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main || theme.palette.primary.light}, ${theme.palette.primary.main})`,
    animationDuration: "var(--gradient-anim-duration)", // Używamy zmiennej CSS z globals.css
  });

export const animatedWaveSxSection = (theme) =>
  getAnimatedWaveStyles(theme, {
    fontWeight: "medium",
    // Można użyć domyślnego gradientu z getAnimatedWaveStyles lub zdefiniować inny
    // gradientColors: `linear-gradient(...)`
    animationDuration: "var(--gradient-anim-duration)", // Używamy zmiennej CSS z globals.css
  });
// --- Koniec Stylów Animowanych Nagłówków ---

// --- Definicje Motywów ---
// Motyw Ciemny
export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "dark",
    primary: { main: "#A8C7FA" },
    secondary: { main: "#C9C5CA" },
    background: { default: "#141218", paper: "#1F1D24" },
    text: { primary: "#E3E3E3", secondary: "#B0B0B0" },
  },
  components: {
    // Globalne style komponentów
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          transition: "background-color 0.3s ease, box-shadow 0.3s ease-out",
          "&:hover, &:focus-visible": {
            boxShadow: `0 0 15px 4px ${hexToRgba("#A8C7FA", 0.4)}`,
          },
        },
        outlinedPrimary: {
          transition:
            "border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease-out",
          "&:hover, &:focus-visible": {
            boxShadow: `0 0 15px 2px ${hexToRgba("#A8C7FA", 0.3)}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlinedPrimary: {
          transition:
            "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease-out",
          "&:hover, &:focus-visible": {
            boxShadow: `0 0 10px 2px ${hexToRgba("#A8C7FA", 0.3)}`,
          },
        },
      },
    },
  },
});

// Motyw Jasny
export const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "light",
    primary: { main: "#0B57D0" },
    secondary: { main: "#5F5E62" },
    background: { default: "#F0F2F5", paper: "#FFFFFF" }, // Zmienione tło default
    text: { primary: "#1C1B1F", secondary: "#49454F" },
  },
  components: {
    // Globalne style komponentów
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          transition: "background-color 0.3s ease, box-shadow 0.3s ease-out",
          "&:hover, &:focus-visible": {
            boxShadow: `0 0 15px 4px ${hexToRgba("#0B57D0", 0.35)}`,
          },
        },
        outlinedPrimary: {
          transition:
            "border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease-out",
          "&:hover, &:focus-visible": {
            boxShadow: `0 0 15px 2px ${hexToRgba("#0B57D0", 0.25)}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlinedPrimary: {
          transition:
            "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease-out",
          "&:hover, &:focus-visible": {
            boxShadow: `0 0 10px 2px ${hexToRgba("#0B57D0", 0.25)}`,
          },
        },
      },
    },
  },
});
