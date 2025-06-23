// src/components/CvView.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function getInitials(name) {
  if (!name || typeof name !== "string") return "?";
  const nameParts = name.trim().split(" ");
  if (nameParts.length === 1) return name.charAt(0).toUpperCase();
  return (
    nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
  ).toUpperCase();
}

export default function CvView({
  personalData,
  summary,
  educationData,
  skillsData,
  experienceData,
  references,
  gdprClause,
}) {
  const leftColumnBgColor = "#2C3E50";
  const rightColumnBgColor = "#FFFFFF";
  const darkTextColor = "#2C3E50";
  const lightTextColor = "#ECF0F1";
  const subtleDarkTextColor = "#34495E";
  const evenSubtlerDarkTextColor = "#7F8C8D";

  const headingSx = {
    mb: 0.8,
    color: darkTextColor,
    borderBottom: "1px solid #BDC3C7",
    pb: 0.2,
    fontWeight: "bold",
    fontSize: "11pt",
    pageBreakAfter: "avoid",
  };
  const leftHeadingSx = {
    mb: 1.2,
    color: lightTextColor,
    borderBottom: "1px solid #7F8C8D",
    pb: 0.6,
    fontWeight: "bold",
    fontSize: "10pt",
    pageBreakAfter: "avoid",
  };

  const baseFontSize = "9pt";
  const smallFontSize = "8pt";
  const smallerFontSize = "7pt";
  const tinyFontSize = "5.5pt";

  return (
    <Box
      className="cv-page-container"
      sx={{
        width: "210mm",
        minHeight: "297mm", // Zmienione z height na minHeight
        display: "flex",
        flexDirection: "column",
        margin: "auto", // Lepsze centrowanie na stronie
        fontFamily: "Arial, sans-serif",
        backgroundColor: rightColumnBgColor,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)", // Cień dla widoku na stronie
        "@media print": {
          boxShadow: "none",
          margin: 0,
        },
      }}
    >
      <Box
        className="cv-main-content"
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1, // Pozwala sekcji rosnąć
        }}
      >
        {/* Lewa kolumna */}
        <Box
          className="cv-left-column"
          sx={{
            width: "30%", // Nieco szersza dla lepszego balansu
            flexShrink: 0,
            backgroundColor: leftColumnBgColor,
            color: lightTextColor,
            p: "15pt",
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              mb: 2.5,
              fontSize: "2.8rem",
              bgcolor: lightTextColor,
              color: darkTextColor,
            }}
            src={personalData?.photo ? personalData.photo : undefined}
          >
            {!personalData?.photo ? getInitials(personalData?.name) : null}
          </Avatar>
          <Typography
            variant="h6"
            component="h2"
            sx={leftHeadingSx}
          >
            Dane kontaktowe
          </Typography>
          <List
            dense
            disablePadding
          >
            {/* ... reszta lewej kolumny bez zmian ... */}
          </List>
          {educationData?.length > 0 && (
            <Box
              sx={{ mt: 3, pageBreakInside: "avoid" }}
              className="cv-section-item"
            >
              {/* ... treść edukacji bez zmian ... */}
            </Box>
          )}
          {references && (
            <Box
              sx={{ mt: 3, pageBreakInside: "avoid" }}
              className="cv-section-item"
            >
              <Typography
                variant="h6"
                component="h2"
                sx={leftHeadingSx}
              >
                Referencje
              </Typography>
              <Typography sx={{ fontSize: smallFontSize }}>
                {references}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Prawa kolumna */}
        <Box
          className="cv-right-column"
          sx={{
            width: "70%",
            backgroundColor: rightColumnBgColor,
            color: darkTextColor, // Zapewniamy ciemny kolor tekstu
            p: "15pt",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: darkTextColor,
              mb: 0.3,
              fontSize: "20pt",
            }}
          >
            {personalData?.name}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: subtleDarkTextColor,
              mb: 2.5,
              borderBottom: `2px solid ${subtleDarkTextColor}`,
              pb: 0.8,
              fontSize: "13pt",
            }}
          >
            {personalData?.title}
          </Typography>
          {summary && (
            <Box
              sx={{ mb: 2, pageBreakInside: "avoid" }}
              className="cv-section-item"
            >
              <Typography
                variant="h6"
                component="h2"
                sx={headingSx}
              >
                Podsumowanie
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: baseFontSize,
                  textAlign: "justify",
                  color: darkTextColor,
                }}
              >
                {summary}
              </Typography>
            </Box>
          )}
          {experienceData?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                component="h2"
                sx={headingSx}
              >
                Doświadczenie zawodowe
              </Typography>
              {experienceData.map((job, index) => (
                <Box
                  key={index}
                  sx={{ mb: 1.5, pageBreakInside: "avoid" }}
                  className="cv-section-item"
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "10.5pt",
                      color: darkTextColor,
                    }}
                  >
                    {job.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: baseFontSize, color: subtleDarkTextColor }}
                  >
                    {job.company}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: smallerFontSize,
                      color: evenSubtlerDarkTextColor,
                      mb: 0.3,
                    }}
                  >
                    {job.dates}
                  </Typography>
                  {job.description && Array.isArray(job.description)
                    ? job.description.map((point, pIndex) => (
                        <Box
                          key={pIndex}
                          sx={{ display: "flex", mb: 0.2 }}
                        >
                          <Typography
                            sx={{
                              mr: 0.8,
                              lineHeight: 1.3,
                              color: darkTextColor,
                            }}
                          >
                            •
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: baseFontSize,
                              flexGrow: 1,
                              textAlign: "justify",
                              color: darkTextColor,
                            }}
                          >
                            {point}
                          </Typography>
                        </Box>
                      ))
                    : null}
                </Box>
              ))}
            </Box>
          )}
          {skillsData && Object.keys(skillsData).length > 0 && (
            <Box
              sx={{ mb: 2, pageBreakInside: "avoid" }}
              className="cv-section-item"
            >
              <Typography
                variant="h6"
                component="h2"
                sx={headingSx}
              >
                Umiejętności
              </Typography>
              {Object.entries(skillsData).map(([category, skills]) => (
                <Box
                  key={category}
                  sx={{ mb: 1.2, pageBreakInside: "avoid" }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "10.5pt",
                      mb: 0.3,
                      color: darkTextColor,
                    }}
                  >
                    {category}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: smallFontSize,
                      lineHeight: 1.4,
                      textAlign: "justify",
                      color: subtleDarkTextColor,
                    }}
                  >
                    {skills.map((skill) => skill.name).join(" • ")}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Stopka z klauzulą RODO */}
      <Box
        className="cv-footer-clause"
        sx={{
          p: "8pt 15pt",
          backgroundColor: "#f0f0f0", // Stały, jasnoszary kolor
          borderTop: `1px solid #e0e0e0`,
          "@media print": {
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            width: "210mm",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: tinyFontSize,
            color: "#555",
            textAlign: "justify",
            lineHeight: 1.2,
          }}
        >
          {gdprClause}
        </Typography>
      </Box>
    </Box>
  );
}
