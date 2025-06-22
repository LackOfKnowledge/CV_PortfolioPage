// src/components/MobileHeader.jsx
"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "@/components/ThemeRegistry";
import { smoothScrollTo } from "@/utils/smoothScroll";

const navItems = [
  { label: "Start", targetId: "hero" },
  { label: "O mnie", targetId: "o-mnie" },
  { label: "Doświadczenie", targetId: "doswiadczenie" },
  { label: "Umiejętności", targetId: "umiejetnosci" },
  { label: "Portfolio", targetId: "portfolio" },
  { label: "Kontakt", targetId: "kontakt" },
];

export default function MobileHeader() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const colorMode = useColorMode();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLinkClick = (targetId) => {
    setDrawerOpen(false);
    smoothScrollTo(targetId, "main-content-area");
  };

  if (pathname.startsWith("/admin") || pathname.startsWith("/view-cv")) {
    return null;
  }

  return (
    <AppBar
      position="sticky"
      sx={{ display: { xs: "block", md: "none" } }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          K. Skuratowicz
        </Typography>
        <IconButton
          onClick={colorMode.toggleColorMode}
          // Usunięto prop color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        <IconButton
          color="inherit" // Ten jest OK, bo dotyczy ikony hamburgera
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Box
          sx={{
            width: 250,
            p: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.default",
          }}
          role="presentation"
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ ml: "auto" }}
          >
            <CloseIcon />
          </IconButton>
          <Stack
            spacing={1}
            sx={{ mt: 2, position: "relative" }}
          >
            {navItems.map((item) => (
              <Box
                key={item.label}
                onClick={() => handleLinkClick(item.targetId)}
                sx={{
                  padding: "12px 16px",
                  cursor: "pointer",
                  color: "text.secondary",
                  "&:hover": { color: "text.primary" },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
}
