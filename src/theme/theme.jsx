// src/theme/theme.jsx
"use client";

import { createTheme } from "@mui/material/styles";
import { chivo } from "./fonts";

const commonSettings = {
  typography: {
    fontFamily: chivo.style.fontFamily,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: "sticky",
      },
    },
  },
};

export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "dark",
    primary: { main: "#FAFAFA" },
    background: { default: "#121212", paper: "#1E1E1E" },
    text: { primary: "#FAFAFA", secondary: "#A0A0A0" },
    divider: "rgba(250, 250, 250, 0.12)",
  },
  components: {
    ...commonSettings.components,
    MuiButton: {
      ...commonSettings.components.MuiButton,
      styleOverrides: {
        ...commonSettings.components.MuiButton.styleOverrides,
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
      ...commonSettings.components.MuiCard,
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
  ...commonSettings,
  palette: {
    mode: "light",
    primary: { main: "#1E1E1E" },
    background: { default: "#F5F5F5", paper: "#FFFFFF" },
    text: { primary: "#1E1E1E", secondary: "#5F5F5F" },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  components: {
    ...commonSettings.components,
    MuiButton: {
      ...commonSettings.components.MuiButton,
      styleOverrides: {
        ...commonSettings.components.MuiButton.styleOverrides,
        containedPrimary: {
          backgroundColor: "#1E1E1E",
          color: "#FFFFFF",
          "&:hover": { backgroundColor: "#333333" },
        },
        outlinedPrimary: {
          borderColor: "rgba(0, 0, 0, 0.23)",
          "&:hover": {
            borderColor: "#1E1E1E",
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
    MuiCard: {
      ...commonSettings.components.MuiCard,
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          transition: "border-color 0.3s ease",
          "&:hover": { borderColor: "rgba(0, 0, 0, 0.4)" },
        },
      },
    },
  },
});
