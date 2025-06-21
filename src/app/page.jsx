// src/app/page.jsx
"use client";

import React from "react";
import Box from "@mui/material/Box";

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <Box>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <PortfolioSection />
      <ContactSection />
    </Box>
  );
}
