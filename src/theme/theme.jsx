// src/theme/theme.js
"use client";

import { createTheme } from "@mui/material/styles";
import { chivo } from "./fonts";

// Funkcja pomocnicza
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

// Motyw Ciemny
export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "dark",
    primary: { main: "#A8C7FA" }, // Navy Blue accent (light)
    secondary: { main: "#C9C5CA" }, // Stonowany kolor dodatkowy
    background: { default: "#141218", paper: "#1F1D24" },
    text: { primary: "#E3E3E3", secondary: "#B0B0B0" },
  },
  components: {
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
    primary: { main: "#0B57D0" }, // Navy Blue accent (dark)
    secondary: { main: "#5F5E62" }, // Ciemniejszy szary/neutralny
    background: { default: "#F8F9FA", paper: "#FFFFFF" },
    text: { primary: "#1C1B1F", secondary: "#49454F" },
  },
  components: {
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
