// src/components/Sidebar.jsx
"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "@/components/ThemeRegistry";
import { smoothScrollTo } from "@/utils/smoothScroll";

const navItems = [
  { label: "Start", targetId: "hero" },
  { label: "O mnie", targetId: "omnie" },
  { label: "Doświadczenie", targetId: "doswiadczenie" },
  { label: "Umiejętności", targetId: "umiejetnosci" },
  { label: "Portfolio", targetId: "portfolio" },
  { label: "Kontakt", targetId: "kontakt" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("hero");
  const theme = useTheme();
  const colorMode = useColorMode();

  if (pathname.startsWith("/admin") || pathname.startsWith("/view-cv")) {
    return null;
  }

  const handleLinkClick = (targetId) => {
    setActiveSection(targetId);
    smoothScrollTo(targetId, "main-content-area");
  };

  return (
    <Box
      sx={{
        width: "280px",
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
        borderRight: "1px solid",
        borderColor: "divider",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        p: 4,
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            Krzysztof Skuratowicz
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
          >
            Frontend Developer
          </Typography>
        </Box>
        <IconButton
          onClick={colorMode.toggleColorMode}
          aria-label="toggle theme"
          // Usunięto prop color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>

      <Stack
        spacing={1}
        sx={{ mt: 5, position: "relative" }}
      >
        {navItems.map((item) => (
          <Box
            key={item.label}
            onClick={() => handleLinkClick(item.targetId)}
            sx={{
              display: "block",
              padding: "8px 16px",
              cursor: "pointer",
              position: "relative",
              color:
                activeSection === item.targetId
                  ? "text.primary"
                  : "text.secondary",
              transition: "color 0.2s",
              "&:hover": {
                color: "text.primary",
              },
            }}
          >
            {activeSection === item.targetId && (
              <motion.div
                layoutId="nav-indicator"
                style={{
                  position: "absolute",
                  top: "25%",
                  bottom: "25%",
                  left: 0,
                  width: "2px",
                  backgroundColor: "var(--mui-palette-primary-main)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            {item.label}
          </Box>
        ))}
      </Stack>

      <Box sx={{ mt: "auto" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Zapraszam do zapoznania się z moim portfolio. Jeśli masz pytania,
          skorzystaj z formularza w sekcji kontaktowej.
        </Typography>
        <Stack
          direction="row"
          spacing={1}
        >
          <IconButton
            component={Link}
            href="https://github.com/LackOfKnowledge"
            target="_blank"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="https://www.linkedin.com/in/skuratowiczkrzysztofgeo/"
            target="_blank"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
