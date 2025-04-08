// src/app/page.jsx
"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { motion, AnimatePresence } from "framer-motion";

// Import komponentów
import Header from "@/components/Header"; // Header jest teraz tutaj
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
// Stopka jest renderowana w layout.jsx

// Definicja animacji dla "slajdów"
const slideVariants = {
  initial: (direction) => ({
    // Kierunek wjazdu (1 = z prawej, -1 = z lewej)
    x: direction > 0 ? "100vw" : "-100vw",
    opacity: 0,
  }),
  animate: {
    // Stan docelowy
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: (direction) => ({
    // Kierunek wyjazdu
    x: direction < 0 ? "100vw" : "-100vw",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

// Główny komponent strony
export default function HomePage() {
  // Stan dla ID aktywnego widoku
  const [activeView, setActiveView] = useState("hero"); // Startujemy z widokiem 'hero'
  // Stan dla kierunku animacji (1: wjazd z prawej, -1: wjazd z lewej)
  const [slideDirection, setSlideDirection] = useState(1);

  // Mapowanie kolejności dla określenia kierunku (można rozbudować)
  const viewOrder = [
    "hero",
    "omnie",
    "doswiadczenie",
    "umiejetnosci",
    "portfolio",
    "kontakt",
  ];

  // Funkcja do zmiany widoku, przekazywana do Header
  const handleNavClick = (viewId) => {
    const currentIndex = viewOrder.indexOf(activeView);
    const nextIndex = viewOrder.indexOf(viewId);
    // Ustawiamy kierunek na podstawie indeksów (prosta logika)
    setSlideDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveView(viewId);
  };

  // Funkcja renderująca odpowiedni komponent sekcji
  const renderActiveSection = () => {
    switch (activeView) {
      // Przekazujemy funkcję nawigacji do Hero, jeśli są tam przyciski 'Kontakt' itp.
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
      {/* Renderujemy Header, przekazując stan i funkcję zwrotną */}
      <Header
        activeView={activeView}
        onNavClick={handleNavClick}
      />

      {/* Kontener dla dynamicznie podmienianych sekcji */}
      <Box
        sx={{
          position: "relative", // Potrzebne dla poprawnego działania AnimatePresence z pozycjonowaniem
          overflowX: "hidden", // Zapobiega paskom przewijania podczas animacji
          // Można dodać minimalną wysokość, jeśli sekcje są niskie
          // minHeight: 'calc(100vh - 64px - 70px)', // (Viewport - Header - Footer) - dostosuj!
        }}
      >
        {/* AnimatePresence obsługuje animacje wejścia/wyjścia */}
        <AnimatePresence
          initial={false}
          mode="wait"
          custom={slideDirection}
        >
          {/* motion.div animuje aktualnie renderowaną sekcję */}
          <motion.div
            key={activeView} // Klucz musi się zmieniać, aby AnimatePresence zadziałało
            custom={slideDirection} // Przekazuje kierunek do wariantów
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            // Jeśli wystąpią problemy z nachodzeniem się sekcji podczas animacji,
            // można dodać pozycjonowanie absolutne do tego diva:
            // style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
