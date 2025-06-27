// Plik: src/app/admin/(protected)/layout.jsx

"use client"; // Ten layout musi być kliencki z powodu stanu otwarcia menu

import { useState } from "react";
import { Box, Toolbar, IconButton, CssBaseline } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdminSidebar from "../(protected)/components/AdminSidebar";
import { AdminThemeProvider } from "../theme-provider";

const drawerWidth = 240;

export default function ProtectedAdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AdminThemeProvider>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminSidebar
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar sx={{ display: { sm: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          {children}
        </Box>
      </Box>
    </AdminThemeProvider>
  );
}
