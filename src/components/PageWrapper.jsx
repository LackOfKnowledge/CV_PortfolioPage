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

  if (pathname.startsWith("/admin") || pathname.startsWith("/view-cv")) {
    return <>{children}</>;
  }

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
      }}
    >
      <MobileHeader navItems={navItems} />
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
