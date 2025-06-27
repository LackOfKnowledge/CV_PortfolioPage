// Plik: src/components/BlogLayout.jsx

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import MobileHeader from "./MobileHeader"; // Używamy Twojego istniejącego nagłówka mobilnego

const sidebarWidth = 240;

export default function BlogLayout({ children, blogSidebar }) {
  const [isSidebarHovered, setSidebarHovered] = useState(false);
  const pathname = usePathname();

  const isBlogRoot = pathname === "/blog";

  return (
    <Box sx={{ display: "flex", width: "100vw" }}>
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
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        {blogSidebar} {/* Tu wstawimy nasz BlogSidebar */}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflowY: "auto",
          transition: "padding-left 0.3s ease-in-out",
          pl: {
            xs: 0,
            md: isSidebarHovered || isBlogRoot ? `${sidebarWidth}px` : "0px",
          },
        }}
      >
        {/* Na mobilce nie potrzebujemy MobileHeader, bo jest on już w głównym layoucie */}
        <Box sx={{ flexGrow: 1, width: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
}
