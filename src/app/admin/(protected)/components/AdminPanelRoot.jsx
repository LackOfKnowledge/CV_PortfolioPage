"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import AdminAppBar from "./AdminAppBar";
import { AdminThemeProvider } from "../../theme-provider";

export default function AdminPanelRoot({ children }) {
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AdminThemeProvider>
      <Box sx={{ display: "flex" }}>
        <AdminAppBar
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        />
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
            bgcolor: "background.default",
            minHeight: "100vh",
          }}
        >
          <Box sx={{ height: "64px" }} />
          {children}
        </Box>
      </Box>
    </AdminThemeProvider>
  );
}
