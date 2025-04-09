// src/app/cv/page.jsx
"use client"; // Potrzebne dla useEffect

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

// Import danych
import {
  personalData,
  summary,
  educationData,
  skillsData,
  experienceData,
  references,
  gdprClause,
} from "@/data/cvData.js"; // Upewnij się, że ścieżka jest poprawna

// Import komponentu widoku CV
import CvView from "@/components/CvView";

export default function PrintCvPage() {
  // Stan wskazujący, czy strona jest gotowa do druku
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    // Dajemy przeglądarce chwilę na wyrenderowanie layoutu przed drukiem
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        setIsReady(true); // Oznaczamy jako gotowe
        try {
          window.print(); // Wywołaj okno dialogowe drukowania
        } catch (e) {
          console.error("Błąd podczas wywoływania window.print():", e);
          // Można dodać powiadomienie dla użytkownika
        }
      }
    }, 800); // Opóźnienie w ms (np. 0.8 sekundy) - dostosuj w razie potrzeby

    // Cleanup timera, jeśli komponent zostanie odmontowany przed czasem
    return () => clearTimeout(timer);
  }, []); // Pusta tablica zależności - uruchom tylko raz po zamontowaniu

  // Opcjonalnie: Pokaż wskaźnik ładowania lub komunikat przed wywołaniem print()
  if (!isReady) {
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
        <Typography>Przygotowywanie podglądu CV...</Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Globalne style tylko dla tej strony (opcjonalnie) */}
      <style
        jsx
        global
      >{`
        /* Można dodać style specyficzne dla podglądu CV tutaj, jeśli layout główny przeszkadza */
        /* body { background: #eee !important; } // Na przykład inne tło dla podglądu */
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }
          /* Style z globals.css powinny być wystarczające, ale można tu dodać specyficzne reguły @page */
          @page {
            size: A4;
            margin: 1.5cm;
          } /* Marginesy dla druku */
        }
      `}</style>
      {/* Renderujemy komponent CV, przekazując zaimportowane dane */}
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
