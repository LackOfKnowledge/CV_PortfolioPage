// src/components/SkillsSection.jsx
"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion";

// --- TODO: Zastąp swoimi umiejętnościami! ---
const skillsData = {
  Frontend: [
    { name: "HTML5 (JSX)" },
    { name: "CSS3" },
    { name: "React" },
    { name: "Next.js" },
    { name: "Material UI (MUI)" },
    { name: "Framer Motion" },
    { name: "Vue (Podstawy)" },
    { name: "Axios" },
    { name: "js-cookie" },
  ],
  Narzędzia: [
    { name: "Git / GitHub" },
    { name: "npm / yarn" },
    { name: "VS Code" },
    { name: "Przeglądarkowe DevTools" },
    { name: "Postman" },
    { name: "Figma (Podstawy)" },
    { name: "eslint" },
    { name: "Node.js" },
  ],
  Inne: [{ name: "Angielski B2" }],
};
const categoryTitleSparkleVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: [0, 0.8, 0.5, 1],
    y: 0,
    scale: [0.95, 1.05, 0.98, 1],
    transition: { duration: 0.5, ease: "circOut", delay: 0.2 },
  },
};
const chipContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.4 },
  },
};
const chipItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};
const chipPulseAnimation = () => ({
  opacity: [1, 0.65, 1],
  transition: {
    duration: 2 + Math.random() * 2,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
});

// Definicje stylów animacji nagłówka
const animatedWaveSxBase = (theme) => ({
  background: `linear-gradient(60deg, ${theme.palette.primary.main}, #FBC02D, #4CAF50, #2196F3, ${theme.palette.primary.main})`,
  backgroundSize: "350% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  display: "inline-block",
  animationName: "waveGradient",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  animationDuration: "var(--gradient-anim-duration)",
  transition: "animation-duration 0.4s ease-out",
  "&:hover": { animationDuration: "var(--gradient-anim-duration-hover)" },
});
const animatedWaveSxSection = (theme) => ({
  ...animatedWaveSxBase(theme),
  fontWeight: "medium",
});

export default function SkillsSection() {
  return (
    <Box
      id="umiejetnosci"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: "background.default",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={animatedWaveSxSection}
          >
            Umiejętności i Technologie
          </Typography>
        </Box>
        <Divider
          variant="middle"
          sx={{
            mb: { xs: 4, md: 6 },
            mx: "auto",
            width: "80px",
            height: "3px",
            backgroundColor: "primary.main",
            borderRadius: "2px",
          }}
        />
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          justifyContent="center"
        >
          {Object.entries(skillsData).map(([category, skills]) => (
            <Grid
              key={category}
              xs={12}
              sm={6}
              md={4}
            >
              <motion.div
                variants={categoryTitleSparkleVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 3, textAlign: "center", fontWeight: 500 }}
                >
                  {category}
                </Typography>
              </motion.div>
              <motion.div
                variants={chipContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  justifyContent: "center",
                }}
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={chipItemVariant}
                    animate={chipPulseAnimation()}
                  >
                    <Chip
                      label={skill.name}
                      variant="outlined"
                      color="primary"
                      sx={{
                        fontSize: "0.9rem",
                        padding: "0.5rem 0.8rem",
                        borderColor: "primary.main",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.action.hover,
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
