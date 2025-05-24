"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import {
  personalData,
  summary,
  educationData,
  skillsData,
  experienceData,
  references,
  gdprClause,
} from "@/data/cvData.js";

import CvView from "@/components/CvView";

export default function PrintCvPage() {
  const [isReadyForPrint, setIsReadyForPrint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReadyForPrint(true);
    }, 1200); // Możesz zwiększyć to opóźnienie, jeśli CV jest bardzo złożone

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isReadyForPrint && typeof window !== "undefined") {
      // Dodatkowe małe opóźnienie, aby DOM na pewno się zaktualizował po zmianie isReadyForPrint
      const printTimer = setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          console.error("Błąd podczas wywoływania window.print():", e);
        }
      }, 50); // Krótkie opóźnienie przed samym drukowaniem
      return () => clearTimeout(printTimer);
    }
  }, [isReadyForPrint]);

  if (!isReadyForPrint) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography>Przygotowywanie podglądu CV do druku...</Typography>
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            top: "-9999px",
            opacity: 0,
            zIndex: -1,
          }}
        >
          <CvView
            personalData={personalData}
            summary={summary}
            educationData={educationData}
            skillsData={skillsData}
            experienceData={experienceData}
            references={references}
            gdprClause={gdprClause}
          />
        </div>
      </Box>
    );
  }

  return (
    <>
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
          /* Dodatkowe style ukrywające elementy niepotrzebne na wydruku CV */
          /* Jeśli masz globalny header/appbar, możesz go tu ukryć */
          /* header, .site-header { display: none !important; } */
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
