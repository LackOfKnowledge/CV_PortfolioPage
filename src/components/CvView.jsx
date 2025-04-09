// src/components/CvView.jsx
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar"; // <-- Import Avatar
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

// Funkcja pomocnicza do generowania inicjałów
function getInitials(name) {
  if (!name || typeof name !== "string") return "?";
  const nameParts = name.trim().split(" ");
  if (nameParts.length === 1) return name.charAt(0).toUpperCase();
  // Bierzemy pierwszą literę pierwszego i ostatniego członu nazwiska/imienia
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
  const leftColumnSx = {
    backgroundColor: "#2C3E50",
    color: "#ECF0F1",
    p: "20pt",
  };
  const rightColumnSx = {
    backgroundColor: "#FFFFFF",
    color: "#333",
    p: "20pt",
  };
  const headingSx = {
    mb: 1.5,
    color: "#2C3E50",
    borderBottom: "1px solid #BDC3C7",
    pb: 0.5,
    fontWeight: "bold",
    fontSize: "12pt",
    pageBreakAfter: "avoid",
  };
  const leftHeadingSx = {
    mb: 2,
    color: "#fff",
    borderBottom: "1px solid #7F8C8D",
    pb: 1,
    fontWeight: "bold",
    fontSize: "11pt",
    pageBreakAfter: "avoid",
  };
  const baseFontSize = "10pt";
  const smallFontSize = "9pt";
  const smallerFontSize = "8pt";
  const tinyFontSize = "6pt";

  return (
    <Box
      sx={{
        maxWidth: "210mm",
        margin: "auto",
        boxShadow: { xs: 0, sm: 3 },
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
        fontSize: baseFontSize,
        lineHeight: 1.4,
      }}
    >
      <Box
        sx={{
          display: "table",
          width: "100%",
          tableLayout: "fixed",
          borderCollapse: "collapse" /* Zapobiega podwójnym borderom */,
        }}
      >
        {/* --- Lewa Kolumna --- */}
        <Box
          sx={{
            ...leftColumnSx,
            display: "table-cell",
            width: "34%",
            verticalAlign: "top",
          }}
        >
          {/* Placeholder na zdjęcie (Avatar z inicjałami) */}
          <Avatar
            alt={`Inicjały ${personalData?.name}`}
            // src={personalData?.photo} // Możesz tu wstawić ścieżkę, jeśli dodasz ją do danych
            sx={{
              width: 110, // Rozmiar Avatara
              height: 110,
              mx: "auto", // Wyśrodkowanie
              mb: 3, // Margines pod spodem
              fontSize: "3rem", // Rozmiar inicjałów
              // Kolory kontrastujące z tłem kolumny
              bgcolor: "#ECF0F1", // Jasne tło avatara
              color: "#2C3E50", // Ciemny kolor inicjałów
              // Opcjonalnie: border
              // border: `2px solid #7F8C8D`,
            }}
          >
            {/* Wyświetl inicjały, jeśli nie ma obrazka w src */}
            {!personalData?.photo ? getInitials(personalData?.name) : null}
          </Avatar>

          {/* --- Reszta lewej kolumny bez zmian --- */}
          <Typography
            variant="h6"
            component="h2"
            sx={leftHeadingSx}
          >
            {" "}
            Dane kontaktowe{" "}
          </Typography>
          <List
            dense
            disablePadding
          >
            {personalData?.email && (
              <ListItem
                disablePadding
                sx={{ mb: 0.8 }}
              >
                {" "}
                <ListItemIcon sx={{ minWidth: "28px" }}>
                  <EmailIcon sx={{ color: "#ECF0F1", fontSize: "1rem" }} />
                </ListItemIcon>{" "}
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
                />{" "}
              </ListItem>
            )}
            {personalData?.phone && (
              <ListItem
                disablePadding
                sx={{ mb: 0.8 }}
              >
                {" "}
                <ListItemIcon sx={{ minWidth: "28px" }}>
                  <PhoneIcon sx={{ color: "#ECF0F1", fontSize: "1rem" }} />
                </ListItemIcon>{" "}
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: smallFontSize }}>
                      {personalData.phone}
                    </Typography>
                  }
                />{" "}
              </ListItem>
            )}
            {personalData?.location && (
              <ListItem
                disablePadding
                sx={{ mb: 0.8 }}
              >
                {" "}
                <ListItemIcon sx={{ minWidth: "28px" }}>
                  <LocationOnIcon sx={{ color: "#ECF0F1", fontSize: "1rem" }} />
                </ListItemIcon>{" "}
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: smallFontSize }}>
                      {personalData.location}
                    </Typography>
                  }
                />{" "}
              </ListItem>
            )}
            {personalData?.linkedin && (
              <ListItem
                disablePadding
                sx={{ mb: 0.8 }}
              >
                {" "}
                <ListItemIcon sx={{ minWidth: "28px" }}>
                  <LinkedInIcon sx={{ color: "#ECF0F1", fontSize: "1rem" }} />
                </ListItemIcon>{" "}
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
                />{" "}
              </ListItem>
            )}
            {personalData?.github && (
              <ListItem
                disablePadding
                sx={{ mb: 0.8 }}
              >
                {" "}
                <ListItemIcon sx={{ minWidth: "28px" }}>
                  <GitHubIcon sx={{ color: "#ECF0F1", fontSize: "1rem" }} />
                </ListItemIcon>{" "}
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
                />{" "}
              </ListItem>
            )}
          </List>
          {educationData?.length > 0 && (
            <Box
              sx={{ mt: 3.5, pageBreakInside: "avoid" }}
              className="cv-section-item"
            >
              {" "}
              <Typography
                variant="h6"
                component="h2"
                sx={leftHeadingSx}
              >
                {" "}
                Wykształcenie{" "}
              </Typography>{" "}
              {educationData.map((edu, index) => (
                <Box
                  key={index}
                  sx={{ mb: 1.5 }}
                >
                  {" "}
                  <Typography sx={{ fontWeight: "bold", fontSize: "10pt" }}>
                    {edu.degree}
                  </Typography>{" "}
                  <Typography sx={{ fontSize: smallFontSize }}>
                    {edu.institution}
                  </Typography>{" "}
                  <Typography
                    sx={{ fontSize: smallerFontSize, color: "#BDC3C7" }}
                  >
                    {edu.dates}
                  </Typography>{" "}
                </Box>
              ))}{" "}
            </Box>
          )}
          {skillsData && Object.keys(skillsData).length > 0 && (
            <Box
              sx={{ mt: 3.5, pageBreakInside: "avoid" }}
              className="cv-section-item"
            >
              {" "}
              <Typography
                variant="h6"
                component="h2"
                sx={leftHeadingSx}
              >
                {" "}
                Umiejętności{" "}
              </Typography>{" "}
              {Object.entries(skillsData).map(([category, skills]) => (
                <Box
                  key={category}
                  sx={{ mb: 1.5 }}
                >
                  {" "}
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "10pt", mb: 0.5 }}
                  >
                    {category}
                  </Typography>{" "}
                  <Box>
                    {" "}
                    {skills.map((skill) => (
                      <Typography
                        key={skill.name}
                        sx={{ fontSize: smallFontSize, mb: 0.2 }}
                      >
                        • {skill.name} {skill.level ? `(${skill.level})` : ""}
                      </Typography>
                    ))}{" "}
                  </Box>{" "}
                </Box>
              ))}{" "}
            </Box>
          )}
        </Box>

        {/* --- Prawa Kolumna (bez zmian) --- */}
        <Box
          sx={{
            ...rightColumnSx,
            display: "table-cell",
            width: "66%",
            verticalAlign: "top",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: "bold", color: "#2C3E50", mb: 0.5 }}
          >
            {" "}
            {personalData?.name}{" "}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "#34495E",
              mb: 3,
              borderBottom: "2px solid #34495E",
              pb: 1,
            }}
          >
            {" "}
            {personalData?.title}{" "}
          </Typography>
          {summary && (
            <Box
              sx={{ mb: 3, pageBreakInside: "avoid" }}
              className="cv-section-item"
            >
              {" "}
              <Typography
                variant="h6"
                component="h2"
                sx={headingSx}
              >
                {" "}
                Podsumowanie{" "}
              </Typography>{" "}
              <Typography
                variant="body2"
                sx={{ fontSize: baseFontSize }}
              >
                {summary}
              </Typography>{" "}
            </Box>
          )}
          {experienceData?.length > 0 && (
            <Box sx={{ mb: 3 }}>
              {" "}
              <Typography
                variant="h6"
                component="h2"
                sx={headingSx}
              >
                {" "}
                Doświadczenie zawodowe{" "}
              </Typography>{" "}
              {experienceData.map((job, index) => (
                <Box
                  key={index}
                  sx={{ mb: 2.5, pageBreakInside: "avoid" }}
                  className="cv-section-item"
                >
                  {" "}
                  <Typography sx={{ fontWeight: "bold", fontSize: "11pt" }}>
                    {job.title}
                  </Typography>{" "}
                  <Typography sx={{ fontSize: baseFontSize, color: "#34495E" }}>
                    {job.company}
                  </Typography>{" "}
                  <Typography
                    sx={{
                      fontSize: smallerFontSize,
                      color: "#7F8C8D",
                      mb: 0.5,
                    }}
                  >
                    {job.dates}
                  </Typography>{" "}
                  {job.points?.map((point, pIndex) => (
                    <Box
                      key={pIndex}
                      sx={{ display: "flex", mb: 0.3 }}
                    >
                      {" "}
                      <Typography sx={{ mr: 1, lineHeight: 1.4 }}>
                        •
                      </Typography>{" "}
                      <Typography sx={{ fontSize: baseFontSize, flexGrow: 1 }}>
                        {point}
                      </Typography>{" "}
                    </Box>
                  ))}{" "}
                </Box>
              ))}{" "}
            </Box>
          )}
          {references && (
            <Box
              sx={{ mb: 3, pageBreakInside: "avoid" }}
              className="cv-section-item"
            >
              {" "}
              <Typography
                variant="h6"
                component="h2"
                sx={headingSx}
              >
                {" "}
                Referencje{" "}
              </Typography>{" "}
              <Typography
                variant="body2"
                sx={{ fontSize: baseFontSize }}
              >
                {references}
              </Typography>{" "}
            </Box>
          )}
          <Typography
            sx={{
              fontSize: tinyFontSize,
              color: "#999",
              textAlign: "justify",
              mt: 4,
            }}
          >
            {" "}
            {gdprClause}{" "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
