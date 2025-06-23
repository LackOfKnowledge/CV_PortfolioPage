"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { smoothScrollTo } from "@/utils/smoothScroll";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NavLinks({ navItems, onLinkClick = () => {} }) {
  const pathname = usePathname();
  const router = useRouter();
  const { activeSection } = useScrollSpy();

  const handleLinkClick = (targetId) => {
    onLinkClick();
    if (pathname === "/") {
      smoothScrollTo(targetId, "main-content-area");
    } else {
      router.push(`/?scrollTo=${targetId}`);
    }
  };

  return (
    <Stack
      spacing={1}
      sx={{ mt: 2, position: "relative" }}
    >
      {navItems.map((item) => {
        const isActive = pathname === "/" && activeSection === item.targetId;
        return (
          <Box
            key={item.label}
            onClick={() => handleLinkClick(item.targetId)}
            sx={{
              padding: "8px 16px",
              cursor: "pointer",
              position: "relative",
              color: isActive ? "text.primary" : "text.secondary",
              fontWeight: isActive ? "bold" : "normal",
              transition: "color 0.2s, font-weight 0.2s",
              "&:hover": { color: "text.primary" },
            }}
          >
            {isActive && (
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
        );
      })}
      <Link
        href="/blog"
        passHref
        style={{ textDecoration: "none" }}
      >
        <Box
          sx={{
            padding: "8px 16px",
            cursor: "pointer",
            position: "relative",
            color: pathname.startsWith("/blog")
              ? "text.primary"
              : "text.secondary",
            fontWeight: pathname.startsWith("/blog") ? "bold" : "normal",
            "&:hover": { color: "text.primary" },
          }}
        >
          Blog
        </Box>
      </Link>
    </Stack>
  );
}
