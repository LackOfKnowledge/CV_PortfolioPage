// src/theme/theme.jsx
"use client";

import { createTheme } from "@mui/material/styles";
import { chivo } from "./fonts";

const commonComponents = {
  MuiButton: {
    styleOverrides: {
      root: { textTransform: "none" },
    },
  },
  MuiCard: {
    defaultProps: {
      elevation: 0,
    },
  },
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FAFAFA" },
    background: { default: "#121212", paper: "#1E1E1E" },
    text: { primary: "#FAFAFA", secondary: "#A0A0A0", disabled: "#757575" },
    divider: "rgba(250, 250, 250, 0.12)",
  },
  typography: {
    fontFamily: chivo.style.fontFamily,
    h1: { fontWeight: 700, color: "#FFFFFF" },
    h2: { fontWeight: 700, color: "#FAFAFA" },
    h3: { fontWeight: 700, color: "#F5F5F5" },
    h4: { fontWeight: 500, color: "#F5F5F5" },
    h5: { fontWeight: 500, color: "#E0E0E0" },
    h6: { fontWeight: 500, color: "#E0E0E0" },
    body1: { color: "#E0E0E0" },
    body2: { color: "#BDBDBD" },
  },
  shape: { borderRadius: 8 },
  components: {
    ...commonComponents,
    // ================== STYL DLA APPBAR W CIEMNYM MOTYWIE ==================
    MuiAppBar: {
      defaultProps: { position: "sticky" },
      styleOverrides: {
        root: {
          backgroundColor: "#121212", // Stały kolor tła, taki jak strona
          backgroundImage: "none",
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "divider",
        },
      },
    },
    MuiButton: {
      ...commonComponents.MuiButton,
      styleOverrides: {
        ...commonComponents.MuiButton.styleOverrides,
        containedPrimary: {
          backgroundColor: "#FAFAFA",
          color: "#121212",
          "&:hover": { backgroundColor: "#E0E0E0" },
        },
        outlinedPrimary: {
          borderColor: "rgba(250, 250, 250, 0.23)",
          "&:hover": {
            borderColor: "#FAFAFA",
            backgroundColor: "rgba(250, 250, 250, 0.08)",
          },
        },
      },
    },
    MuiCard: {
      ...commonComponents.MuiCard,
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid transparent",
          transition: "border-color 0.3s ease",
          "&:hover": { borderColor: "rgba(250, 250, 250, 0.3)" },
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1A2027" },
    background: { default: "#F7F9FC", paper: "#FFFFFF" },
    text: { primary: "#1A2027", secondary: "#525B62", disabled: "#9E9E9E" },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: {
    fontFamily: chivo.style.fontFamily,
    h1: { fontWeight: 700, color: "#1A2027" },
    h2: { fontWeight: 700, color: "#2F3A46" },
    h3: { fontWeight: 700, color: "#3E4C59" },
    h4: { fontWeight: 500, color: "#3E4C59" },
    h5: { fontWeight: 500, color: "#525B62" },
    h6: { fontWeight: 500, color: "#525B62" },
    body1: { color: "#3E4C59" },
    body2: { color: "#6A737D" },
  },
  shape: { borderRadius: 8 },
  components: {
    ...commonComponents,
    // ================== STYL DLA APPBAR W JASYM MOTYWIE ==================
    MuiAppBar: {
      defaultProps: { position: "sticky" },
      styleOverrides: {
        root: {
          backgroundColor: "#F7F9FC", // Stały kolor tła, taki jak strona
          backgroundImage: "none",
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "#1A2027",
        },
      },
    },
    MuiButton: {
      ...commonComponents.MuiButton,
      styleOverrides: {
        ...commonComponents.MuiButton.styleOverrides,
        containedPrimary: {
          backgroundColor: "#1A2027",
          color: "#FFFFFF",
          "&:hover": { backgroundColor: "#3E4C59" },
        },
        outlinedPrimary: {
          borderColor: "rgba(0, 0, 0, 0.23)",
          "&:hover": {
            borderColor: "#1A2027",
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
    MuiCard: {
      ...commonComponents.MuiCard,
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          border: "1px solid #E0E0E0",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            borderColor: "#BDBDBD",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          },
        },
      },
    },
  },
});
