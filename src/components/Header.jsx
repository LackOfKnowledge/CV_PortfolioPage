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
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Import nadal tu jest, na wypadek odkomentowania
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Import nadal tu jest
import { useColorMode } from "./ThemeRegistry";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import hooka do odczytu ścieżki
// Import funkcji stylu nagłówka z motywu
import { animatedWaveSxHeader } from "@/theme/theme"; // Upewnij się, że ścieżka jest poprawna

// Elementy nawigacji dla widoków SPA
const navItems = [
  { label: "O mnie", targetId: "omnie" },
  { label: "Doświadczenie", targetId: "doswiadczenie" },
  { label: "Umiejętności", targetId: "umiejetnosci" },
  { label: "Portfolio", targetId: "portfolio" },
  { label: "Kontakt", targetId: "kontakt" },
];

export default function Header({ activeView, onNavClick }) {
  const theme = useTheme();
  const colorMode = useColorMode();
  const pathname = usePathname(); // Pobranie aktualnej ścieżki URL

  const isChatActive = pathname === "/chat"; // Flaga dla strony /chat

  return (
    <AppBar
      position="sticky"
      elevation={1}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Tytuł/Logo - link do strony startowej (widok 'hero') */}
          <Typography
            variant="h6"
            component="div"
            onClick={() => onNavClick("hero")}
            sx={{
              ...animatedWaveSxHeader(theme),
              flexGrow: 1,
              cursor: "pointer",
              ml: { xs: 1, md: 0 },
            }}
          >
            <i>KS</i>
          </Typography>

          {/* Nawigacja dla desktopu */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignSelf: "stretch" }}
          >
            {/* Przyciski dla widoków SPA */}
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
                  // Podświetlenie tylko jeśli NIE jesteśmy na /chat i widok SPA pasuje
                  fontWeight:
                    !isChatActive && activeView === item.targetId
                      ? "bold"
                      : "normal",
                  color:
                    !isChatActive && activeView === item.targetId
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
            {/* Link do /chat */}
            <Link
              href="/chat"
              passHref
              legacyBehavior
            >
              <Button
                component="a" // Ważne dla Link + Button
                sx={{
                  height: "100%",
                  py: 0,
                  px: 1.5,
                  borderRadius: 0,
                  color: "inherit",
                  mx: 0,
                  // Podświetlenie tylko jeśli JESTEŚMY na /chat
                  fontWeight: isChatActive ? "bold" : "normal",
                  color: isChatActive ? theme.palette.primary.main : "inherit",
                  "&:hover": {
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.primary.dark,
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                Czat AI
              </Button>
            </Link>
          </Box>

          {/* Zakomentowany przycisk zmiany motywu */}
          {/*
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          */}

          {/* Menu mobilne */}
          <Box sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}>
            {/* TODO: Implementacja Drawer Menu z linkami SPA i Link do /chat */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
