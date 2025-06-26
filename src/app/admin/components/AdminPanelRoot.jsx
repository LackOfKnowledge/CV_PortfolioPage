"use client";

import { Box, CssBaseline } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import AdminAppBar from "./AdminAppBar";
import { AdminThemeProvider } from "../theme-provider";

export default function AdminPanelRoot({ children }) {
  const drawerWidth = 240;

  return (
    // Owijamy wszystko w dostawcę motywu. Ponieważ cały ten plik jest
    // komponentem klienckim, nie ma już konfliktu.
    <AdminThemeProvider>
      <Box sx={{ display: "flex" }}>
        <AdminAppBar drawerWidth={drawerWidth} />
        <AdminSidebar drawerWidth={drawerWidth} />
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
