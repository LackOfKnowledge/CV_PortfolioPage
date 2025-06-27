// Plik: src/components/PageWrapper.jsx

"use client";

import { usePathname } from "next/navigation";
import { Box } from "@mui/material";

import { ScrollSpyProvider } from "@/hooks/useScrollSpy";
import ConditionalFooter from "@/components/ConditionalFooter";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";

export default function PageWrapper({ children, navItems }) {
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blog");
  const isAdminPage = pathname.startsWith("/admin");

  // Dla strony bloga i admina, layout jest obsługiwany przez ich własne pliki layout.jsx
  // PageWrapper po prostu renderuje dzieci bez dodatkowego opakowania.
  if (isBlogPage || isAdminPage) {
    return <>{children}</>;
  }

  // Standardowy layout dla reszty stron (Portfolio)
  return (
    <ScrollSpyProvider navItems={navItems}>
      <Box sx={{ display: "flex" }}>
        <Sidebar navItems={navItems} />
        <Box
          id="main-content-area"
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
          <MobileHeader navItems={navItems} />
          <Box sx={{ flexGrow: 1 }}>{children}</Box>
          <ConditionalFooter />
        </Box>
      </Box>
    </ScrollSpyProvider>
  );
}
