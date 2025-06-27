"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "@/components/ThemeRegistry";
import NavLinks from "./NavLinks";

export default function Sidebar({ navItems, scrollSpyEnabled }) {
  const pathname = usePathname();
  const theme = useTheme();
  const colorMode = useColorMode();

  if (pathname.startsWith("/admin") || pathname.startsWith("/view-cv")) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "280px",
        height: "100%",
        display: "flex",
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
          sx={{
            color:
              theme.palette.mode === "light" ? "text.secondary" : "inherit",
          }}
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>

      <NavLinks
        navItems={navItems}
        scrollSpyEnabled={scrollSpyEnabled}
      />

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
            component="a"
            href="https://github.com/LackOfKnowledge"
            target="_blank"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            component="a"
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
