// Plik: src/app/view-cv/[linkId]/page.jsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Box, Alert } from "@mui/material";

// Importujemy nasz NOWY komponent kliencki
import CvDisplay from "./CvDisplay";

// Importujemy dane, które przekażemy dalej
import {
  personalData,
  summary,
  educationData,
  skillsData,
  experienceData,
  references,
  gdprClause,
} from "@/data/cvData.js";

async function validateLink(id) {
  const link = await prisma.cvLink.findUnique({
    where: { id },
  });

  if (!link) return "not_found";
  if (new Date(link.expiresAt) < new Date()) return "expired";
  return "valid";
}

export default async function ViewCvPage({ params }) {
  const status = await validateLink(params.linkId);

  if (status === "not_found") {
    notFound();
  }

  if (status === "expired") {
    return (
      <Box sx={{ maxWidth: "900px", mx: "auto", my: 5, p: 2 }}>
        <Alert severity="error">Ten link wygasł i nie jest już aktywny.</Alert>
      </Box>
    );
  }

  // Tworzymy obiekt z wszystkimi danymi CV
  const cvData = {
    personalData,
    summary,
    educationData,
    skillsData,
    experienceData,
    references,
    gdprClause,
  };

  // Renderujemy komponent kliencki, przekazując mu dane jako props
  return <CvDisplay cvData={cvData} />;
}
