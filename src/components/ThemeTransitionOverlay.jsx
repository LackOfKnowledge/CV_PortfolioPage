// src/components/ThemeTransitionOverlay.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTransition } from "./ThemeRegistry";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function ThemeTransitionOverlay() {
  const { controls, bgColor } = useTransition();

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: bgColor,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
