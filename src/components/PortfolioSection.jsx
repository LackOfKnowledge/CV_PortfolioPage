// src/components/PortfolioSection.jsx
"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";

// --- TODO: Zastąp dane projektami! ---
const portfolioData = [
  {
    title: "Prodify",
    description:
      "Praca inżynierska - aplikacja działająca na serwerze lokalnym",
    image: "/images/projekt1.png",
    tags: ["React", "Next.js", "CSS", "HTML5", "Postman", "Node.js"],
    demoUrl: "...",
    repoUrl: "https://github.com/LackOfKnowledge/prodify-app-frontend",
  },
];
const portfolioContainerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const portfolioItemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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

export default function PortfolioSection() {
  return (
    <Box
      id="portfolio"
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
            Portfolio
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
        <motion.div
          variants={portfolioContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Grid
            container
            spacing={4}
            justifyContent="center"
          >
            {portfolioData.map((project, index) => (
              <Grid
                key={index}
                xs={12}
                sm={6}
                md={4}
              >
                <motion.div variants={portfolioItemVariant}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition:
                        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={project.image || "/images/projekt1.png"}
                      alt={`Screenshot ${project.title}`}
                      sx={{
                        borderBottom: (theme) =>
                          `1px solid ${theme.palette.divider}`,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {project.description}
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                        {project.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </CardContent>
                    {(project.demoUrl || project.repoUrl) && (
                      <CardActions
                        sx={{ justifyContent: "flex-start", px: 2, pb: 2 }}
                      >
                        {" "}
                        {project.demoUrl && (
                          <Button
                            size="small"
                            startIcon={<LaunchIcon />}
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Demo
                          </Button>
                        )}{" "}
                        {project.repoUrl && (
                          <IconButton
                            aria-label={`GitHub ${project.title}`}
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                          >
                            <GitHubIcon />
                          </IconButton>
                        )}{" "}
                      </CardActions>
                    )}
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
