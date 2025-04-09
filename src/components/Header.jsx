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

// Styl dla animowanego nagłówka (bez zmian)
const animatedWaveSxHeader = (theme) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main || theme.palette.primary.light}, ${theme.palette.primary.main})`,
  backgroundSize: "250% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  animation: "waveGradient 6s linear infinite",
  display: "inline-block",
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
        {/* Toolbar ma domyślnie ustaloną minimalną wysokość */}
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            component="div"
            onClick={() => onNavClick("hero")}
            sx={{
              ...animatedWaveSxHeader(theme),
              flexGrow: 1,
              cursor: "pointer",
              ml: { xs: 1, md: 0 } /* Mały margines na mobilnych */,
            }}
          >
            <i>KS</i>
          </Typography>

          {/* Kontener dla przycisków nawigacji */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              // alignItems: 'center', // Zmieniamy na stretch
              alignSelf: "stretch", // Rozciągnij ten Box na całą wysokość Toolbar
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => onNavClick(item.targetId)}
                sx={{
                  height: "100%",
                  py: 0,
                  px: 1.5,
                  borderRadius: 0,
                  color: "inherit",
                  mx: 0,
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
                    backgroundColor:
                      activeView === item.targetId
                        ? theme.palette.action.selected
                        : theme.palette.action.hover,
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Przełącznik motywu */}
          {/* <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton> */}

          {/* Menu mobilne */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {/* TODO: Mobile Menu */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
