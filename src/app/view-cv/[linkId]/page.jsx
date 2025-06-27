// Plik: src/app/view-cv/[linkId]/page.jsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Box, Alert } from "@mui/material";

// 1. Importujemy Twój działający komponent CV
import CvView from "@/components/CvView";

// 2. Importujemy wszystkie potrzebne dane do CV
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

  // Opcjonalnie: Oznacz link jako użyty. Na razie zostawmy to, żeby nie komplikować.
  // if (!link.usedAt) {
  //   await prisma.cvLink.update({ where: { id }, data: { usedAt: new Date() } });
  // }

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

  // Jeśli link jest poprawny, renderujemy Twoje prawdziwe CV
  return (
    <>
      {/* Dodajemy te same style do druku, co na starej stronie /cv */}
      <style
        jsx
        global
      >{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }
          @page {
            size: A4;
            margin: 1cm;
          }
        }
      `}</style>
      <CvView
        personalData={personalData}
        summary={summary}
        educationData={educationData}
        skillsData={skillsData}
        experienceData={experienceData}
        references={references}
        gdprClause={gdprClause}
      />
    </>
  );
}
