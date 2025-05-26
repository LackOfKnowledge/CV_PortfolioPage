// src/app/view-cv/[token]/page.jsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation"; // Dodano useRouter
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

// Importujemy komponent CV i dane
import CvView from "@/components/CvView"; //
import {
  personalData,
  summary,
  educationData,
  skillsData,
  experienceData,
  references,
  gdprClause,
} from "@/data/cvData.js"; //

export default function ViewAndPrintCvPage() {
  const params = useParams();
  const router = useRouter(); // Inicjalizujemy routera
  const token = params?.token;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isValidForViewing, setIsValidForViewing] = useState(false);
  const printInitiated = useRef(false);

  useEffect(() => {
    if (!token) {
      setError("Brak tokenu w adresie URL. Nie można wyświetlić CV.");
      setIsValidForViewing(false);
      setIsLoading(false);
      return;
    }

    const verifyTokenAndPrepareCv = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/cv/verify-token/${token}`);
        const data = await response.json();

        if (!response.ok || !data.isValid) {
          // Jeśli token jest nieważny, od razu przekierowujemy
          // (lub wyświetlamy błąd i dajemy przycisk do strony głównej)
          console.warn("Token verification failed:", data.error);
          setError(
            data.error ||
              "Link do CV jest nieprawidłowy, wygasł lub został już użyty."
          );
          setIsValidForViewing(false);
          setIsLoading(false);
          // Opcjonalnie: router.push('/'); po krótkim timeout, aby użytkownik zobaczył błąd
          return;
        }

        console.log("Token valid, preparing to display CV and print dialog.");
        setIsValidForViewing(true);
        // Token jest oznaczany jako użyty po stronie API
      } catch (e) {
        console.error("Błąd weryfikacji tokenu na stronie /view-cv:", e);
        setError(
          e.message || "Wystąpił nieoczekiwany błąd podczas weryfikacji linku."
        );
        setIsValidForViewing(false);
      } finally {
        // Nie ustawiamy setIsLoading(false) tutaj, jeśli isValidForViewing jest true,
        // bo chcemy, aby CvView się wyrenderował przed próbą drukowania.
        // Jeśli wystąpił błąd, wtedy ustawiamy.
        if (!isValidForViewing) {
          // Jeśli po weryfikacji token nie jest ważny
          setIsLoading(false);
        }
      }
    };

    verifyTokenAndPrepareCv();
  }, [token, router]); // Dodano router do zależności

  useEffect(() => {
    if (isValidForViewing && !isLoading && !printInitiated.current) {
      // Ten useEffect uruchomi się, gdy isValidForViewing stanie się true
      // a setIsLoading (z poprzedniego useEffect) ustawi się na false po wyrenderowaniu CvView
      const timer = setTimeout(() => {
        if (
          document.readyState === "complete" ||
          document.readyState === "interactive"
        ) {
          console.log("DOM ready, initiating print.");
          printInitiated.current = true;
          window.print();
          // Możesz dodać logikę po zamknięciu dialogu drukowania, np. przekierowanie
          // window.onafterprint = () => { router.push('/thank-you-for-viewing'); };
        } else {
          console.log(
            "DOM not ready, will try print again via event listener."
          );
          // Fallback, jeśli setTimeout nie wystarczył
          const attemptPrintOnLoad = () => {
            if (!printInitiated.current) {
              console.log(
                "DOM fully loaded (event listener), initiating print."
              );
              printInitiated.current = true;
              window.print();
            }
            window.removeEventListener("load", attemptPrintOnLoad);
          };
          window.addEventListener("load", attemptPrintOnLoad);
        }
      }, 500); // Dajmy chwilę na render
      return () => clearTimeout(timer);
    }
  }, [isValidForViewing, isLoading, router]); // Dodano router

  // Ten useEffect monitoruje isValidForViewing i isLoading, aby wywołać render po zmianie isValidForViewing
  useEffect(() => {
    if (isValidForViewing) {
      setIsLoading(false); // Pozwól na render CvView
    }
  }, [isValidForViewing]);

  if (isLoading) {
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
        <Typography>Weryfikowanie linku i przygotowywanie CV...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
          p: 3,
          textAlign: "center",
        }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%", maxWidth: "500px" }}
        >
          {error}
        </Alert>
        <Button
          variant="outlined"
          href="/"
        >
          Wróć na stronę główną
        </Button>
      </Box>
    );
  }

  // Jeśli isValidForViewing jest true, renderujemy CvView
  // useEffect powyżej zajmie się wywołaniem window.print()
  if (isValidForViewing) {
    return (
      <>
        <CvView
          personalData={personalData}
          summary={summary}
          educationData={educationData}
          skillsData={skillsData}
          experienceData={experienceData}
          references={references}
          gdprClause={gdprClause}
        />
        {/* Komunikat dla użytkownika po zainicjowaniu druku, jeśli jest potrzebny */}
        {printInitiated.current && (
          <Box
            sx={{
              position: "fixed",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "background.paper",
              p: 2,
              borderRadius: 1,
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="body2">
              CV zostało przygotowane. Proszę wybrać "Zapisz jako PDF" w oknie
              dialogowym drukowania.
            </Typography>
            <Button
              size="small"
              sx={{ mt: 1 }}
              onClick={() => window.print()}
            >
              Drukuj ponownie
            </Button>
          </Box>
        )}
      </>
    );
  }

  // Fallback, jeśli coś poszło nie tak, a nie ma błędu i nie ładuje
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: 2,
        p: 3,
        textAlign: "center",
      }}
    >
      <Alert
        severity="warning"
        sx={{ width: "100%", maxWidth: "500px" }}
      >
        Nie można załadować strony CV. Spróbuj ponownie później.
      </Alert>
      <Button
        variant="outlined"
        href="/"
      >
        Wróć na stronę główną
      </Button>
    </Box>
  );
}
