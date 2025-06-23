import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import ScrollHandler from "@/components/ScrollHandler";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>
      <Box>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <PortfolioSection />
        <ContactSection />
      </Box>
    </>
  );
}
