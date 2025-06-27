// Plik: src/components/PageWrapper.jsx

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import { ScrollSpyProvider } from "@/hooks/useScrollSpy";
import ConditionalFooter from "@/components/ConditionalFooter";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";

const sidebarWidth = 280;

export default function PageWrapper({ children, navItems }) {
  const pathname = usePathname();
  const [isSidebarHovered, setSidebarHovered] = useState(false);

  const isHomePage = pathname === "/";
  const isSinglePostPage =
    pathname.startsWith("/blog/") && pathname.length > "/blog/".length;
  const isBlogPage = pathname.startsWith("/blog");

  if (pathname.startsWith("/admin") || pathname.startsWith("/view-cv")) {
    return <>{children}</>;
  }

  const sidebarComponent = (
    <Sidebar
      navItems={navItems}
      scrollSpyEnabled={isHomePage}
    />
  );

  // DEFINICJA GŁÓWNEJ TREŚCI Z POPRAWNYM TŁEM
  const mainContentArea = (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "background.default", // <-- POPRAWKA TŁA JEST TUTAJ
      }}
    >
      <MobileHeader navItems={navItems} />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <ConditionalFooter />
    </Box>
  );

  const entirePageLayout = (
    <Box sx={{ display: "flex" }}>
      {/* 1. OSOBNA, NIEWIDZIALNA STREFA DO AKTYWACJI SIDEBARA */}
      {isSinglePostPage && (
        <Box
          onMouseEnter={() => setSidebarHovered(true)}
          sx={{
            display: { xs: "none", md: "block" },
            position: "fixed",
            left: 0,
            top: 0,
            width: "25px", // Szerokość strefy
            height: "100vh",
            zIndex: 1199, // Pod sidebarem
          }}
        />
      )}

      {/* 2. SIDEBAR, KTÓRY REAGUJE NA onMouseLeave */}
      <Box
        component="aside"
        onMouseLeave={() => setSidebarHovered(false)}
        sx={{
          display: { xs: "none", md: "block" },
          position: "fixed",
          left: 0,
          top: 0,
          width: sidebarWidth,
          height: "100vh",
          zIndex: 1200,
          borderRight: "1px solid",
          borderColor: "divider",
          transition: "transform 0.3s ease-in-out",
          transform:
            isSinglePostPage && !isSidebarHovered
              ? `translateX(-${sidebarWidth}px)`
              : "translateX(0)",
        }}
      >
        {sidebarComponent}
      </Box>

      {/* 3. KONTENER Z TREŚCIĄ, KTÓRY SIĘ DOPASOWUJE */}
      <Box
        sx={{
          flexGrow: 1,
          transition: "padding-left 0.3s ease-in-out",
          pl: {
            xs: 0,
            md:
              isSinglePostPage && !isSidebarHovered
                ? "0px"
                : `${sidebarWidth}px`,
          },
        }}
      >
        {mainContentArea}
      </Box>
    </Box>
  );

  if (isHomePage) {
    return (
      <ScrollSpyProvider navItems={navItems}>
        {entirePageLayout}
      </ScrollSpyProvider>
    );
  }

  return entirePageLayout;
}
