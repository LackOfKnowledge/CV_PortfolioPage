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
// import SchoolIcon from "@mui/icons-material/School";
// import WorkIcon from "@mui/icons-material/Work";

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
  const leftColumnSx = {
    backgroundColor: "#2C3E50",
    color: "#ECF0F1",
    p: "18pt",
    height: "100%", // Staramy się, aby komórka tabeli miała pełną wysokość
    display: "flex",
    flexDirection: "column",
  };
  const rightColumnContentWrapperSx = {
    // Nowy styl dla wewnętrznego wrappera prawej kolumny
    display: "flex",
    flexDirection: "column",
    height: "100%", // Ten wrapper ma wypełnić całą komórkę tabeli
    p: "18pt", // Padding przeniesiony tutaj z rightColumnTableCellSx
  };
  const rightColumnTableCellSx = {
    // Styl dla samej komórki tabeli (prawej kolumny)
    backgroundColor: "#FFFFFF",
    color: "#333",
    // Padding został przeniesiony do rightColumnContentWrapperSx
    // p: "18pt",
    height: "100%", // Staramy się, aby komórka tabeli miała pełną wysokość
    verticalAlign: "top", // Zachowujemy
  };
  const headingSx = {
    mb: 1,
    color: "#2C3E50",
    borderBottom: "1px solid #BDC3C7",
    pb: 0.3,
    fontWeight: "bold",
    fontSize: "11pt",
    pageBreakAfter: "avoid",
  };
  const leftHeadingSx = {
    mb: 1.5,
    color: "#fff",
    borderBottom: "1px solid #7F8C8D",
    pb: 0.8,
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
      sx={{
        width: "210mm",
        height: "297mm",
        margin: "auto",
        boxShadow: { xs: 0, sm: 3 },
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
        fontSize: baseFontSize,
        lineHeight: 1.35,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "table",
          width: "100%",
          height: "100%",
          tableLayout: "fixed",
          borderCollapse: "collapse",
        }}
      >
        {/* --- Lewa Kolumna --- */}
        <Box
          sx={{
            ...leftColumnSx,
            display: "table-cell",
            width: "35%",
            verticalAlign: "top",
          }}
        >
          <Avatar
            alt={`Inicjały ${personalData?.name}`}
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              mb: 2.5,
              fontSize: "2.8rem",
              bgcolor: "#ECF0F1",
              color: "#2C3E50",
            }}
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
                </Box>
              ))}
            </Box>
          )}
          {skillsData && Object.keys(skillsData).length > 0 && (
            <Box
              sx={{ mt: 3, pageBreakInside: "avoid" }}
              className="cv-section-item"
            >
              <Typography
                variant="h6"
                component="h2"
                sx={leftHeadingSx}
              >
                Umiejętności
              </Typography>
              {Object.entries(skillsData).map(([category, skills]) => (
                <Box
                  key={category}
                  sx={{ mb: 1.2 }}
                >
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "9.5pt", mb: 0.3 }}
                  >
                    {category}
                  </Typography>
                  <Box>
                    {skills.map((skill) => (
                      <Typography
                        key={skill.name}
                        sx={{
                          fontSize: smallFontSize,
                          mb: 0.1,
                          lineHeight: 1.3,
                        }}
                      >
                        • {skill.name} {skill.level ? `(${skill.level})` : ""}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* --- Prawa Kolumna (jako table-cell) --- */}
        <Box
          sx={{
            ...rightColumnTableCellSx,
            display: "table-cell",
            width: "65%",
          }}
        >
          {/* Wewnętrzny wrapper dla treści prawej kolumny, który będzie flex containerem */}
          <Box sx={rightColumnContentWrapperSx}>
            {/* Kontener na główną treść prawej kolumny, która będzie rosła */}
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
              {" "}
              {/* overflowY auto na wypadek gdyby treść była za długa dla jednej strony */}
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
                  sx={{ mb: 2.5, pageBreakInside: "avoid" }}
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
                <Box sx={{ mb: 2.5 }}>
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
                      sx={{ mb: 2, pageBreakInside: "avoid" }}
                      className="cv-section-item"
                    >
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "10.5pt" }}
                      >
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
              {references && (
                <Box
                  sx={{ mb: 2.5, pageBreakInside: "avoid" }}
                  className="cv-section-item"
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={headingSx}
                  >
                    Referencje
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: baseFontSize }}
                  >
                    {references}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Klauzula RODO na samym dole wewnętrznego wrappera prawej kolumny */}
            <Typography
              sx={{
                fontSize: tinyFontSize,
                color: "#777",
                textAlign: "justify",
                mt: "auto",
                pt: 2,
                pageBreakInside: "avoid",
              }}
            >
              {gdprClause}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
