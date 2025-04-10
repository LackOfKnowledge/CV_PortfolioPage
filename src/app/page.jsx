// src/app/page.jsx
"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { motion, AnimatePresence } from "framer-motion";

// Import komponentów
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import ClippyHelper from "@/components/ClippyHelper"; // Import pomocnika

// Warianty animacji slajdów
const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? "100vw" : "-100vw",
    opacity: 0,
  }),
  animate: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: (direction) => ({
    x: direction < 0 ? "100vw" : "-100vw",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

// Główny komponent strony
export default function HomePage() {
  const [activeView, setActiveView] = useState("hero");
  const [slideDirection, setSlideDirection] = useState(1);
  const viewOrder = [
    "hero",
    "omnie",
    "doswiadczenie",
    "umiejetnosci",
    "portfolio",
    "kontakt",
  ];

  const handleNavClick = (viewId) => {
    const currentIndex = viewOrder.indexOf(activeView);
    const nextIndex = viewOrder.indexOf(viewId);
    setSlideDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveView(viewId);
  };

  const renderActiveSection = () => {
    switch (activeView) {
      case "hero":
        return (
          <HeroSection
            key="hero"
            onNavigate={handleNavClick}
          />
        );
      case "omnie":
        return <AboutSection key="omnie" />;
      case "doswiadczenie":
        return <ExperienceSection key="doswiadczenie" />;
      case "umiejetnosci":
        return <SkillsSection key="umiejetnosci" />;
      case "portfolio":
        return <PortfolioSection key="portfolio" />;
      case "kontakt":
        return <ContactSection key="kontakt" />;
      default:
        return (
          <HeroSection
            key="hero"
            onNavigate={handleNavClick}
          />
        );
    }
  };

  return (
    <Box>
      <Header
        activeView={activeView}
        onNavClick={handleNavClick}
      />

      <Box sx={{ position: "relative", overflowX: "hidden" }}>
        <AnimatePresence
          initial={false}
          mode="wait"
          custom={slideDirection}
        >
          <motion.div
            key={activeView}
            custom={slideDirection}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Renderujemy komponent pomocnika, przekazując aktywny widok */}
      <ClippyHelper activeView={activeView} />
    </Box>
  );
}
