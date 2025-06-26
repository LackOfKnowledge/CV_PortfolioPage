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
    description:
      "Dynamiczna platforma CV/Portfolio oparta na Next.js i Material-UI. Posiada system generowania CV w PDF na żądanie z dostępem na token, panel admina (NextAuth.js) do zarządzania blogiem opartym o Markdown oraz integrację z bazą danych PostgreSQL przez Prisma.",
    video: "/videos/portfolio-demo.mp4",
    tags: [
      "Next.js",
      "React",
      "Material UI",
      "Framer Motion",
      "CSS Modules",
      "JavaScript",
      "Responsive Design",
      "Resend",
    ],
    demoUrl: "https://ksportfoliodev.vercel.app",
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
    title: "Strona Wizytówka (Portfolio)",
    description:
      "W pełni responsywna, nowoczesna strona-wizytówka zbudowana w Next.js. Posiada interaktywne animacje (Framer Motion), formularz kontaktowy zintegrowany z Resend API oraz czysty, modułowy kod z wykorzystaniem CSS Modules.",
    video: "/videos/wizytowka-demo.mp4",
    demoUrl: "https://wizytowka.onrender.com",
    repoUrl: "https://github.com/LackOfKnowledge/wizytowka",
    tags: ["Next.js", "React", "CSS Modules", "Framer Motion", "Resend"],
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

  const renderProjectMedia = (project) => {
    if (project.video) {
      return (
        <CardMedia
          component="video"
          src={project.video}
          autoPlay
          loop
          muted
          playsInline
          sx={{ height: "180px", objectFit: "cover" }}
        />
      );
    }

    if (project.image && typeof project.image === "string") {
      return (
        <CardMedia
          component="img"
          height="180"
          image={project.image}
          alt="Project image"
          sx={{ objectFit: "cover" }}
        />
      );
    }

    return (
      <Box
        sx={{
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.grey[200],
          color: theme.palette.text.secondary,
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
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ mb: 1 }}
        >
          Portfolio
        </Typography>
        <Divider
          variant="middle"
          sx={{
            mb: { xs: 4, md: 6 },
            mx: "auto",
            width: "80px",
            height: "2px",
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
              gap: 3,
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
                  cursor: "pointer",
                }}
              >
                {renderProjectMedia(project)}

                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                  >
                    {project.description}
                  </Typography>
                  <Box
                    sx={{
                      mt: "auto",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      pt: 1,
                    }}
                  >
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
                    sx={{
                      justifyContent: "flex-start",
                      px: 2,
                      pb: 2,
                      pt: 1,
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
                      >
                        <GitHubIcon />
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
            {renderProjectMedia(selectedProject)}
            <Typography
              gutterBottom
              id="project-dialog-description"
              sx={{
                whiteSpace: "pre-line",
                mt: selectedProject.image || selectedProject.video ? 2 : 0,
              }}
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
