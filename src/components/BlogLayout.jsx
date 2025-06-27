// Plik: src/components/BlogLayout.jsx

"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar"; // Używamy Twojego istniejącego sidebara

const sidebarWidth = 280; // Szerokość Twojego sidebara

export default function BlogLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Strefa przy krawędzi, która aktywuje sidebar
  const triggerZoneWidth = 25;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Ta sekcja dotyczy tylko widoku desktopowego */}
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {/* Niewidzialna strefa do aktywacji sidebara */}
        <Box
          onMouseEnter={() => setSidebarOpen(true)}
          sx={{
            position: "fixed",
            left: 0,
            top: 0,
            width: triggerZoneWidth,
            height: "100%",
            zIndex: 1201, // Tuż nad sidebarem
          }}
        />

        {/* Sidebar, który będzie się wysuwał */}
        <Box
          onMouseLeave={() => setSidebarOpen(false)}
          sx={{
            position: "fixed",
            left: 0,
            top: 0,
            height: "100%",
            width: sidebarWidth,
            transform: isSidebarOpen
              ? "translateX(0)"
              : `translateX(-${sidebarWidth - triggerZoneWidth}px)`, // Lekko wystaje, żeby było widać, że tam jest
            transition: "transform 0.3s ease-in-out",
            zIndex: 1200,
          }}
        >
          <Sidebar />
        </Box>
      </Box>

      {/* Główna treść strony */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // Płynne dopasowanie marginesu na desktopie
          transition: "margin-left 0.3s ease-in-out",
          marginLeft: {
            xs: 0, // Na mobilce bez zmian
            md: isSidebarOpen ? `${sidebarWidth}px` : `${triggerZoneWidth}px`,
          },
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
