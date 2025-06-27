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

// --- Komponent dla widoku desktopowego (bez zmian) ---
const DesktopLayout = ({ children, navItems }) => {
  const pathname = usePathname();
  const [isSidebarHovered, setSidebarHovered] = useState(false);
  const isHomePage = pathname === "/";
  const isSinglePostPage =
    pathname.startsWith("/blog/") && pathname.length > "/blog/".length;

  const sidebarComponent = (
    <Sidebar
      navItems={navItems}
      scrollSpyEnabled={isHomePage}
    />
  );

  const mainContentArea = (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "background.default",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <ConditionalFooter />
    </Box>
  );

  const entirePageLayout = (
    <Box sx={{ display: "flex" }}>
      <Box
        component="aside"
        onMouseEnter={
          isSinglePostPage ? () => setSidebarHovered(true) : undefined
        }
        onMouseLeave={
          isSinglePostPage ? () => setSidebarHovered(false) : undefined
        }
        sx={{
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

      {isSinglePostPage && (
        <Box
          onMouseEnter={() => setSidebarHovered(true)}
          sx={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "25px",
            height: "100vh",
            zIndex: 1199,
          }}
        />
      )}

      <Box
        sx={{
          flexGrow: 1,
          transition: "padding-left 0.3s ease-in-out",
          pl:
            isSinglePostPage && !isSidebarHovered ? "0px" : `${sidebarWidth}px`,
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
};

// --- Komponent dla widoku mobilnego (TUTAJ JEST POPRAWKA) ---
const MobileLayout = ({ children, navItems }) => {
  return (
    // Dodajemy backgroundColor i minHeight do głównego kontenera
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <MobileHeader navItems={navItems} />
      <Box
        component="main"
        sx={{ pt: "64px" }}
      >
        {children}
      </Box>
      <ConditionalFooter />
    </Box>
  );
};

// --- Główny komponent-przełącznik (bez zmian) ---
export default function PageWrapper({ children, navItems }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/view-cv")) {
    return <>{children}</>;
  }

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <DesktopLayout navItems={navItems}>{children}</DesktopLayout>
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <MobileLayout navItems={navItems}>{children}</MobileLayout>
      </Box>
    </>
  );
}
