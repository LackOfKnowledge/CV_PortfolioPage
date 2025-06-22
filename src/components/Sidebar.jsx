// src/components/Sidebar.jsx
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link as ScrollLink, Events, scrollSpy, scroller } from "react-scroll";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "@/components/ThemeRegistry";

const navItems = [
  { label: "Start", targetId: "hero" },
  { label: "O mnie", targetId: "o-mnie" },
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

  useEffect(() => {
    Events.scrollEvent.register("begin", () => {});
    Events.scrollEvent.register("end", () => {});
    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  if (pathname.startsWith("/admin") || pathname.startsWith("/view-cv")) {
    return null;
  }

  const handleSetActive = (to) => {
    setActiveSection(to);
  };

  // ================== NOWA FUNKCJA DO KLIKNIĘĆ ==================
  const handleLinkClick = (target) => {
    // Natychmiast ustawiamy podświetlenie dla lepszego UX
    setActiveSection(target);

    // Dla 'hero' używamy natywnego scrolla - to jest niezawodne
    if (target === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Dla pozostałych używamy scroller'a z biblioteki
      scroller.scrollTo(target, {
        duration: 500,
        smooth: "easeInOutQuad",
        offset: 0,
      });
    }
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
          color="inherit"
          aria-label="toggle theme"
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
        {/* Ta niewidoczna pętla jest tylko dla mechanizmu 'spy' */}
        {navItems.map((item) => (
          <ScrollLink
            key={`spy-${item.label}`}
            to={item.targetId}
            spy={true}
            onSetActive={handleSetActive}
            style={{ display: "none" }}
          />
        ))}
        {/* Ta pętla renderuje widoczne, klikalne linki */}
        {navItems.map((item) => (
          <Box
            key={item.label}
            onClick={() => handleLinkClick(item.targetId)}
            style={{
              display: "block",
              padding: "8px 16px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Box
              sx={{
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
