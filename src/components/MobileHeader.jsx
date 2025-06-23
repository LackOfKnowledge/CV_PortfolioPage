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
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "@/components/ThemeRegistry";
import NavLinks from "./NavLinks";

export default function MobileHeader({ navItems }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const colorMode = useColorMode();

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
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
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
            onClick={() => setDrawerOpen(false)}
            sx={{ ml: "auto" }}
          >
            <CloseIcon />
          </IconButton>
          <NavLinks
            navItems={navItems}
            onLinkClick={() => setDrawerOpen(false)}
          />
        </Box>
      </Drawer>
    </AppBar>
  );
}
