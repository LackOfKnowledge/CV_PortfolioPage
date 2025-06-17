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
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();

  const leftColumnBgColor = "#2C3E50";
  const rightColumnBgColor = "#FFFFFF";

  const headingSx = {
    mb: 0.8,
    color: "#2C3E50",
    borderBottom: "1px solid #BDC3C7",
    pb: 0.2,
    fontWeight: "bold",
    fontSize: "11pt",
    pageBreakAfter: "avoid",
  };
  const leftHeadingSx = {
    mb: 1.2,
    color: "#fff",
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

  const footerBackgroundColor =
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[200];
  const footerTextColor =
    theme.palette.mode === "dark"
      ? theme.palette.grey[300]
      : theme.palette.grey[700];

  const footerHeight = "10mm";

  return (
    <Box
      className="cv-page-container"
      sx={{
        width: "210mm",
        height: "297mm",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Arial, sans-serif",
        fontSize: baseFontSize,
        lineHeight: 1.35,
        backgroundColor: rightColumnBgColor,
        overflow: "hidden",
        pageBreakInside: "avoid",
        border: "none",
        boxShadow: "none",
        margin: 0,
      }}
    >
      <Box
        className="cv-main-content-columns"
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          overflow: "visible",
          height: `calc(297mm - ${footerHeight})`,
        }}
      >
        <Box
          className="cv-left-column"
          sx={{
            width: "25%",
            flexShrink: 0,
            backgroundColor: leftColumnBgColor,
            color: "#ECF0F1",
            p: "15pt",
            overflowY: "visible",
            height: "100%",
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              mb: 2.5,
              fontSize: "2.8rem",
              bgcolor: "#ECF0F1",
              color: "#2C3E50",
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
            {personalData?.email && (
              <ListItem
                disablePadding
                sx={{ mb: 0.6 }}
              >
                <ListItemIcon sx={{ minWidth: "26px" }}>
                  <EmailIcon sx={{ color: "#ECF0F1", fontSize: "0.9rem" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link
                      href={`mailto:${personalData.email}`}
                      sx={{
                        color: "#ECF0F1",
                        fontSize: smallFontSize,
                        wordBreak: "break-all",
                      }}
                    >
                      {personalData.email}
                    </Link>
                  }
                />
              </ListItem>
            )}
            {personalData?.phone && (
              <ListItem
                disablePadding
                sx={{ mb: 0.6 }}
              >
                <ListItemIcon sx={{ minWidth: "26px" }}>
                  <PhoneIcon sx={{ color: "#ECF0F1", fontSize: "0.9rem" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: smallFontSize }}>
                      {personalData.phone}
                    </Typography>
                  }
                />
              </ListItem>
            )}
            {personalData?.location && (
              <ListItem
                disablePadding
                sx={{ mb: 0.6 }}
              >
                <ListItemIcon sx={{ minWidth: "26px" }}>
                  <LocationOnIcon
                    sx={{ color: "#ECF0F1", fontSize: "0.9rem" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: smallFontSize }}>
                      {personalData.location}
                    </Typography>
                  }
                />
              </ListItem>
            )}
            {personalData?.linkedin && (
              <ListItem
                disablePadding
                sx={{ mb: 0.6 }}
              >
                <ListItemIcon sx={{ minWidth: "26px" }}>
                  <LinkedInIcon sx={{ color: "#ECF0F1", fontSize: "0.9rem" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link
                      href={personalData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: "#ECF0F1", fontSize: smallFontSize }}
                    >
                      LinkedIn
                    </Link>
                  }
                />
              </ListItem>
            )}
            {personalData?.github && (
              <ListItem
                disablePadding
                sx={{ mb: 0.6 }}
              >
                <ListItemIcon sx={{ minWidth: "26px" }}>
                  <GitHubIcon sx={{ color: "#ECF0F1", fontSize: "0.9rem" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link
                      href={personalData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: "#ECF0F1", fontSize: smallFontSize }}
                    >
                      GitHub
                    </Link>
                  }
                />
              </ListItem>
            )}
          </List>

          {educationData?.length > 0 && (
            <Box
              sx={{ mt: 3, pageBreakInside: "avoid" }}
              className="cv-section-item"
            >
              <Typography
                variant="h6"
                component="h2"
                sx={leftHeadingSx}
              >
                Wykształcenie
              </Typography>
              {educationData.map((edu, index) => (
                <Box
                  key={index}
                  sx={{ mb: 1.2 }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "9.5pt" }}>
                    {edu.degree}
                  </Typography>
                  <Typography sx={{ fontSize: smallFontSize }}>
                    {edu.institution}
                  </Typography>
                  <Typography
                    sx={{ fontSize: smallerFontSize, color: "#BDC3C7" }}
                  >
                    {edu.dates}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: smallFontSize,
                        textDecoration: "underline",
                      }}
                    >
                      Praca inżynierska:
                    </Typography>
                    <Typography
                      sx={{ fontSize: smallFontSize, fontStyle: "italic" }}
                    >
                      "Monitoruj proces wieloelementowych zamówień produkcyjnych
                      dzięki aplikacji "Prodify" - część kliencka aplikacji"
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: smallerFontSize,
                        color: "#BDC3C7",
                        mt: 0.5,
                      }}
                    >
                      Kluczowe technologie: React, Next.js, Material UI,
                      JavaScript (ES6+), REST API
                    </Typography>
                  </Box>
                </Box>
              ))}
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

        <Box
          className="cv-right-column"
          sx={{
            width: "75%",
            flexGrow: 1,
            backgroundColor: rightColumnBgColor,
            color: "#333",
            p: "15pt",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            overflowY: "visible",
            height: "100%",
          }}
        >
          <Box className="cv-right-column-main-content">
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: "bold",
                color: "#2C3E50",
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
                color: "#34495E",
                mb: 2.5,
                borderBottom: "2px solid #34495E",
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
                  sx={{ fontSize: baseFontSize, textAlign: "justify" }}
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
                    <Typography sx={{ fontWeight: "bold", fontSize: "10.5pt" }}>
                      {job.title}
                    </Typography>
                    <Typography
                      sx={{ fontSize: baseFontSize, color: "#34495E" }}
                    >
                      {job.company}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: smallerFontSize,
                        color: "#7F8C8D",
                        mb: 0.3,
                      }}
                    >
                      {job.dates}
                    </Typography>
                    {job.description && Array.isArray(job.description) ? (
                      job.description.map((point, pIndex) => (
                        <Box
                          key={pIndex}
                          sx={{ display: "flex", mb: 0.2 }}
                        >
                          <Typography sx={{ mr: 0.8, lineHeight: 1.3 }}>
                            •
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: baseFontSize,
                              flexGrow: 1,
                              textAlign: "justify",
                            }}
                          >
                            {point}
                          </Typography>
                        </Box>
                      ))
                    ) : job.description ? (
                      <Typography
                        sx={{ fontSize: baseFontSize, textAlign: "justify" }}
                      >
                        {job.description}
                      </Typography>
                    ) : null}
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
                      sx={{ fontWeight: "bold", fontSize: "10.5pt", mb: 0.3 }}
                    >
                      {category}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: smallFontSize,
                        lineHeight: 1.4,
                        textAlign: "justify",
                      }}
                    >
                      {skills
                        .map((skill) =>
                          skill.level
                            ? `${skill.name} (${skill.level})`
                            : skill.name
                        )
                        .join(" • ")}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box
        className="cv-footer-clause"
        sx={{
          flexShrink: 0,
          pageBreakInside: "avoid",
          width: "210mm",
          height: footerHeight,
          minHeight: footerHeight,
          maxHeight: footerHeight,
          p: "8pt 15pt",
          backgroundColor: footerBackgroundColor,
          borderTop: `1px solid ${theme.palette.divider}`,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: tinyFontSize,
            color: footerTextColor,
            textAlign: "justify",
            pageBreakInside: "avoid",
            lineHeight: 1.2,
          }}
        >
          {gdprClause}
        </Typography>
      </Box>
    </Box>
  );
}
