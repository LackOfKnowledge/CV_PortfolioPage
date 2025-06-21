// src/components/MobileHeader.jsx
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import NavigationLinks from "./NavigationLinks";

const navItems = [
  { label: "Start", targetId: "hero" },
  { label: "O mnie", targetId: "omnie" },
  { label: "Doświadczenie", targetId: "doswiadczenie" },
  { label: "Umiejętności", targetId: "umiejetnosci" },
  { label: "Portfolio", targetId: "portfolio" },
  { label: "Kontakt", targetId: "kontakt" },
];

export default function MobileHeader() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLinkClick = (to, isClick = false) => {
    setActiveSection(to);
    if (isClick) {
      setDrawerOpen(false);
    }
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
          color="inherit"
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
          <NavigationLinks
            navItems={navItems}
            activeSection={activeSection}
            onLinkClick={handleLinkClick}
          />
        </Box>
      </Drawer>
    </AppBar>
  );
}
