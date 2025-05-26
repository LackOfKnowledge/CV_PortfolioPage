// src/components/Header.jsx
"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "O mnie", targetId: "omnie" },
  { label: "Doświadczenie", targetId: "doswiadczenie" },
  { label: "Umiejętności", targetId: "umiejetnosci" },
  { label: "Portfolio", targetId: "portfolio" },
  { label: "Kontakt", targetId: "kontakt" },
];

export default function Header({ activeView, onNavClick }) {
  const theme = useTheme();
  const pathname = usePathname();

  const isChatActive = pathname === "/chat";

  const logoHeight = "60px";

  return (
    <AppBar
      position="sticky"
      elevation={1}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo - obrazek */}
          <Box
            onClick={() => onNavClick("hero")}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              ml: { xs: 1, md: 0 },
              mr: 2,
            }}
          >
            <img
              src="/images/logo.png" // Ścieżka do Twojego logo w folderze public
              alt="Logo"
              style={{
                height: logoHeight, // Ustawienie wysokości logo
                width: "auto", // Szerokość dostosuje się proporcjonalnie
                display: "block", // Usuwa dodatkową przestrzeń pod obrazkiem inline
              }}
            />
          </Box>

          {/* Pusty Box, aby odepchnąć nawigację na prawo, jeśli logo jest po lewej */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Nawigacja dla desktopu */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignSelf: "stretch" }}
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
                  color: "inherit", // Kolor tekstu dziedziczony lub dostosowany
                  mx: 0.5, // Mały margines między przyciskami
                  fontWeight:
                    !isChatActive && activeView === item.targetId
                      ? "bold"
                      : "normal",
                  borderBottom:
                    !isChatActive && activeView === item.targetId
                      ? `2px solid ${theme.palette.primary.main}`
                      : "2px solid transparent",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    borderBottom: `2px solid ${theme.palette.primary.light}`,
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
