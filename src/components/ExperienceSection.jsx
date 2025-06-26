// src/components/ExperienceSection.jsx
"use client";

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

const experienceData = [
  {
    type: "work",
    title: "Geodeta",
    company: "Zenit",
    dates: "10.2020 - teraz",
    description:
      "Jako geodeta realizowałem kompleksowo projekty inwestycyjne, ze szczególnym uwzględnieniem klientów biznesowych. Współpracując przy projektach dla Orange Polska, odpowiadałem za kontakt operacyjny między firmą geodezyjną a podwykonawcą oraz konsultacje z projektantami. Nie boję się wymagających zadań – byłem współodpowiedzialny za przygotowanie dokumentacji projektowej pod budowę nowego dworca PKP w Słupsku.",
  },
  {
    type: "education",
    title: "Inżynier",
    company: "Uniwersytet Pomorski w Słupsku",
    dates: "10.2021 - 06.2025",
    description:
      "Aplikacja Prodify (część kliencka) - aplikacja przeznaczona dla średnich i dużych firm produkcyjnych mająca za zadanie automatyzację, optymalizację i nadzór nad produkcją",
  },
];

export default function ExperienceSection() {
  return (
    <Box
      id="doswiadczenie"
      sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.default" }}
    >
      <Container maxWidth="md">
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Typography
            variant="h4"
            component="h2"
          >
            Doświadczenie i Edukacja
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
