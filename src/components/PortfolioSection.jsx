// src/components/PortfolioSection.jsx
"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentModal from "@mui/material/DialogContent";
import Backdrop from "@mui/material/Backdrop";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

const portfolioData = [
  {
    title: "Prodify - System Zarządzania Produkcją",
    description:
      "Praca inżynierska - aplikacja webowa o architekturze klient-serwer, działająca na serwerze lokalnym, stworzona z myślą o optymalizacji procesów.",
    image: "/images/projekt1.png",
    tags: [
      "JavaScript",
      "Material UI",
      "React",
      "Next.js",
      "CSS",
      "HTML5",
      "Postman",
      "Node.js",
      "JWT",
      "REST API",
      "UI/UX",
    ],
    demoUrl: "...",
    repoUrl: "https://github.com/LackOfKnowledge/prodify-app-frontend",
    detailedDescription: `
      Prodify to aplikacja webowa, której jestem współtwórcą - byłem odpowiedzialny za część frontendową projektu. Głównym celem przedsięwzięcia było dostarczenie intuicyjnego interfejsu do monitorowania wieloelementowych zamówień
      produkcyjnych oraz planowania produkcji tygodniowej, odpowiadając na potrzebę digitalizacji i usprawnienia przepływu informacji w firmach produkcyjnych. Frontend został zbudowany przy wykorzystania technologii takich jak React oraz Next.js w wersji 14.0.3 -
      routing aplikacji został zrealizowany przy użyciu App Router, co zapewniło wysoką wydajność, dynamiczne renderowanie oraz responsywność na urządzeniach desktopowych (aplikacja nie jest przewidziana na urządzenia mobilne). Frontend komunikuje się z backendowym API w celu
      uwierzytelniania użytkowników, pobierania danych, wysyłania żądań do bazy danych itd.

      Kluczowe funkcjonalności:
      - Planowanie produkcji
      - Monitorowanie zleceń
      - Zarządzanie danymi
      - Interakcja w procesie produkcyjnym
      - Personalizacja
      - Generowanie dokumentów

      Interfejs został zaprojektowany z myślą o zróżnicowanych grupach użytkowników, od pracowników fizycznych po kadrę zarządzającą.
      Wykorzystano bibliotekę komponentów Material UI (MUI) dla zapewnienia spójności wizualnej i estetyki. Aplikacja oferuje
      kontekstowe podpowiedzi oraz onboarding (samouczek), aby ułatwić wdrożenie nowych użytkowników. Do zarządzania stanem globalnym,
      takim jak sesja użytkownika i jego ustawienia, wykorzstano React Context API. Centralnm modułem komunikacji z API jest dataFetcher.js, 
      obsługujący zapytania HTTP i automatyczne dołączanie tokenów JWT. Całość została zaprojektowana głównie z myślą o ekranach desktopowych
      i laptopach, z częsciową adaptacją niektórych elementów interfejsu do mniejszych szerokości (minimalna rozdzielczość ekranu to 1024pxx768px)
    `,
  },
  {
    title: "Właśnie to portfolio",
    description: "Moje portfolio, które aktualnie przeglądasz.",
    image: null,
    tags: [
      "Next.js",
      "React",
      "Material UI",
      "Framer Motion",
      "CSS",
      "JavaScript",
      "Responsive Design",
    ],
    demoUrl: "",
    repoUrl: "https://github.com/LackOfKnowledge/CV_PortfolioPage",
    detailedDescription: `
      Ta strona portfolio została stworzona, aby zaprezentować moje umiejętności i projekty. 
      Zbudowana została przy użyciu Next.js dla wydajnego renderowania i struktury, Material UI do tworzenia spójnych komponentów interfejsu użytkownika, 
      oraz Framer Motion do dodania płynnych animacji. 
      Kładłem nacisk na czysty kod, responsywność oraz estetykę.
      Możesz tu znaleźć informacje o moim doświadczeniu, umiejętnościach oraz zobaczyć inne projekty.
      Dodatkowo zaimplementowałem asystenta "Clippy" dla urozmaicenia interakcji.
    `,
  },
  {
    title: "test",
    description: "test",
    image: null,
    tags: [
      "Next.js",
      "React",
      "Material UI",
      "Framer Motion",
      "CSS",
      "JavaScript",
      "Responsive Design",
    ],
    demoUrl: "",
    repoUrl: "https://github.com/LackOfKnowledge/xxxx",
    detailedDescription: `
      test
    `,
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
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenDialog = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProject(null);
  };

  const cardMargin = theme.spacing(2);

  // Funkcja pomocnicza do renderowania obrazka lub ikony
  const renderProjectImage = (projectImage) => {
    if (typeof projectImage === "string") {
      // Jeśli 'image' to string (ścieżka)
      return (
        <CardMedia
          component="img"
          height="180"
          image={projectImage}
          alt="Project image"
          sx={{ objectFit: "cover", flexShrink: 0 }}
        />
      );
    } else if (
      projectImage &&
      typeof projectImage === "object" &&
      projectImage.type &&
      projectImage.type.muiName === "SvgIcon"
    ) {
      // Jeśli 'image' to komponent ikony MUI (bardziej niezawodne sprawdzenie)
      const IconComponent = projectImage;
      return (
        <Box
          sx={{
            height: "180px", // Dopasuj wysokość do CardMedia
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[800]
                : theme.palette.grey[200], // Placeholder tło
            color: theme.palette.text.secondary,
            flexShrink: 0,
          }}
        >
          <IconComponent sx={{ fontSize: "4rem" }} />{" "}
          {/* Dostosuj rozmiar ikony */}
        </Box>
      );
    }
    // Domyślny fallback, jeśli obrazek nie jest ani stringiem, ani poprawnym komponentem ikony
    return (
      <Box
        sx={{
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[800]
              : theme.palette.grey[200],
          color: theme.palette.text.secondary,
          flexShrink: 0,
        }}
      >
        <ImageNotSupportedIcon sx={{ fontSize: "4rem" }} />
      </Box>
    );
  };

  return (
    <Box
      id="portfolio"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: "background.default",
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: cardMargin,
              mt: theme.spacing(6),
              alignItems: "stretch",
            }}
          >
            {portfolioData.map((project, index) => (
              <Card
                key={index}
                component={motion.div}
                variants={portfolioItemVariant}
                onClick={() => handleOpenDialog(project)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  overflow: "hidden",
                  // Przywrócone
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    // Przywrócone
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[6],
                    cursor: "pointer",
                  },
                }}
              >
                {/* Użycie funkcji pomocniczej do renderowania obrazka/ikony */}
                {renderProjectImage(project.image)}

                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    py: 2,
                    px: 2,
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                      wordBreak: "break-word",
                      flexShrink: 0,
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{
                      wordBreak: "break-word",
                      flexShrink: 0,
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Box
                    sx={{
                      mt: "auto",
                      display: "flex",
                      flexWrap: "wrap",
                      flexShrink: 0,
                      pt: 1,
                    }}
                  >
                    {project.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{
                          m: "5px",
                          maxWidth: "100%",
                          "& .MuiChip-label": {
                            display: "inline-block",
                            whiteSpace: "normal",
                            wordBreak: "break-all",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
                {(project.demoUrl || project.repoUrl) && (
                  <CardActions
                    sx={{
                      justifyContent: "flex-start",
                      px: 2,
                      pb: 2,
                      pt: 1,
                      flexShrink: 0,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.demoUrl && project.demoUrl !== "..." && (
                      <Button
                        size="small"
                        startIcon={<LaunchIcon />}
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Demo
                      </Button>
                    )}
                    {project.repoUrl && (
                      <IconButton
                        size="small"
                        aria-label={`GitHub ${project.title}`}
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                        sx={{ p: 0.5 }}
                      >
                        <GitHubIcon fontSize="small" />
                      </IconButton>
                    )}
                  </CardActions>
                )}
              </Card>
            ))}
          </Box>
        </motion.div>
      </Container>

      {selectedProject && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="project-dialog-title"
          aria-describedby="project-dialog-description"
          maxWidth="md"
          fullWidth
          PaperProps={{ sx: { borderRadius: 2 } }}
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              sx: {
                backdropFilter: "blur(3px)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          }}
        >
          <DialogTitle
            id="project-dialog-title"
            sx={{ m: 0, p: 2, pr: 8 }}
          >
            {selectedProject.title}
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContentModal dividers>
            {/* W modalu również użyjemy funkcji pomocniczej */}
            {renderProjectImage(selectedProject.image)}
            <Typography
              gutterBottom
              id="project-dialog-description"
              sx={{ whiteSpace: "pre-line", mt: selectedProject.image ? 2 : 0 }} // Dodaj margines, jeśli obrazek jest obecny
            >
              {selectedProject.detailedDescription}
            </Typography>
            {selectedProject.tags && selectedProject.tags.length > 0 && (
              <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ width: "100%", mb: 0.5 }}
                >
                  Technologie:
                </Typography>
                {selectedProject.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                  />
                ))}
              </Box>
            )}
          </DialogContentModal>
          {(selectedProject.demoUrl && selectedProject.demoUrl !== "...") ||
          selectedProject.repoUrl ? (
            <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
              {selectedProject.demoUrl && selectedProject.demoUrl !== "..." && (
                <Button
                  onClick={handleCloseDialog}
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<LaunchIcon />}
                >
                  Zobacz Demo
                </Button>
              )}
              {selectedProject.repoUrl && (
                <Button
                  onClick={handleCloseDialog}
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GitHubIcon />}
                >
                  Repozytorium
                </Button>
              )}
            </CardActions>
          ) : null}
        </Dialog>
      )}
    </Box>
  );
}
