// src/components/NavigationLinks.jsx
"use client";

import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

export default function NavigationLinks({
  navItems,
  activeSection,
  onLinkClick,
}) {
  return (
    <Stack
      spacing={1}
      sx={{ mt: 5, position: "relative", width: "100%" }}
    >
      {navItems.map((item) => (
        <ScrollLink
          key={item.label}
          to={item.targetId}
          spy={true}
          smooth={true}
          duration={500}
          offset={0}
          onSetActive={onLinkClick} // Przekazujemy funkcję do onSetActive
          style={{
            display: "block",
            padding: "8px 16px",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={
            onLinkClick ? () => onLinkClick(item.targetId, true) : undefined
          }
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
        </ScrollLink>
      ))}
    </Stack>
  );
}
