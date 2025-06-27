// Plik: src/app/blog/layout.jsx

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar"; // Używamy Twojego istniejącego sidebara
import MobileHeader from "@/components/MobileHeader"; // Używamy Twojego istniejącego nagłówka mobilnego

const sidebarWidth = 240; // Szerokość Twojego sidebara

// Kopia Twojej listy navItems z głównego layoutu
const navItems = [
  { label: "Start", targetId: "hero" },
  { label: "O mnie", targetId: "omnie" },
  { label: "Doświadczenie", targetId: "doswiadczenie" },
  { label: "Umiejętności", targetId: "umiejetnosci" },
  { label: "Portfolio", targetId: "portfolio" },
  { label: "Kontakt", targetId: "kontakt" },
];

export default function BlogPagesLayout({ children }) {
  const [isSidebarHovered, setSidebarHovered] = useState(false);
  const pathname = usePathname();

  // Na stronie głównej bloga sidebar jest widoczny domyślnie
  const isBlogRoot = pathname === "/blog";

  return (
    <Box sx={{ display: "flex" }}>
      {/* --- Sekcja dla urządzeń desktopowych --- */}
      <Box
        component="aside"
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
        sx={{
          display: { xs: "none", md: "block" },
          position: "fixed",
          left: 0,
          top: 0,
          width: sidebarWidth,
          height: "100vh",
          zIndex: 1200,
          transform:
            isSidebarHovered || isBlogRoot
              ? "translateX(0)"
              : `translateX(-${sidebarWidth}px)`,
          transition: "transform 0.3s ease-in-out",
          overflowY: "auto",
          backgroundColor: "background.paper",
        }}
      >
        <Sidebar navItems={navItems} />
      </Box>

      {/* --- Sekcja dla urządzeń mobilnych --- */}
      <Box sx={{ display: { md: "none" }, width: "100%" }}>
        <MobileHeader navItems={navItems} />
      </Box>

      {/* --- Główna treść strony --- */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "padding-left 0.3s ease-in-out",
          pl: {
            xs: 0,
            md: isSidebarHovered || isBlogRoot ? `${sidebarWidth}px` : "0px",
          },
          pt: { xs: "64px", md: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
