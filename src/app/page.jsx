"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { smoothScrollTo } from "@/utils/smoothScroll";
import Box from "@mui/material/Box";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const targetSection = searchParams.get("scrollTo");
    if (targetSection) {
      setTimeout(() => {
        smoothScrollTo(targetSection, "main-content-area");
      }, 100);
    }
  }, [searchParams]);

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
