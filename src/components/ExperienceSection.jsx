// src/components/ExperienceSection.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";

// --- WAŻNE: Podmień dane! ---
const experienceData = [
  {
    type: "work",
    title: "Frontend Dev",
    company: "Firma X",
    dates: "...",
    description: "...",
  },
  {
    type: "education",
    title: "Inżynier",
    company: "Uczelnia Y",
    dates: "...",
    description: "...",
  },
];

// Styl dla animowanego nagłówka
const animatedWaveSxSection = (theme) => ({
  background: `linear-gradient(60deg, ${theme.palette.primary.main}, #FBC02D, #4CAF50, #2196F3, ${theme.palette.primary.main})`,
  backgroundSize: "350% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  animation: "waveGradient 12s linear infinite",
  display: "inline-block", // Nadal potrzebne
  fontWeight: "medium", // Ustawiamy font-weight tutaj
});

export default function ExperienceSection() {
  return (
    <Box
      id="doswiadczenie"
      sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.default" }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={(theme) => ({
            // Używamy funkcji sx
            ...animatedWaveSxSection(theme), // Rozszerzamy style animacji
            mx: "auto", // <<== DODAJEMY TO, aby wycentrować sam element inline-block
          })}
        >
          Doświadczenie i Edukacja
        </Typography>
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
        <Timeline
          position="right"
          sx={{
            [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 },
          }}
        >
          {experienceData.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: "primary.main" }} />
                <TimelineDot
                  color={item.type === "work" ? "primary" : "secondary"}
                  variant="filled"
                  sx={{
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": { transform: "scale(1.25)", cursor: "pointer" },
                  }}
                >
                  {item.type === "work" ? (
                    <WorkIcon fontSize="small" />
                  ) : (
                    <SchoolIcon fontSize="small" />
                  )}
                </TimelineDot>
                {index < experienceData.length - 1 && (
                  <TimelineConnector sx={{ bgcolor: "primary.main" }} />
                )}
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography
                  variant="h6"
                  component="div"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  {item.company}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {item.dates}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ textAlign: "left" }}
                >
                  {item.description}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
}
