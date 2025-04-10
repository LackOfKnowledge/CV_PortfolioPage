// src/components/ClippyHelper.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const hints = {
  welcomeFirst: [
    {
      text: "Siemanko! Wygląda na to, że to pierwsza wizyta. Rozgość się i klikaj śmiało! PS. CV i Kontakt to dobre miejsca na start 😉",
      point: true,
    },
    {
      text: "Hej! Pierwszy raz tutaj? Super! Zobacz, co potrafię i daj znać, co myślisz (formularz na dole!).",
      point: true,
    },
  ],
  welcomeBack: [
    {
      text: "Witaj ponownie! Miło znów Cię tu widzieć. Może tym razem pora na Kontakt albo CV? 😉",
      point: true,
    },
    {
      text: "O, powrót na start! Gotowość na drugą rundę po sekcjach?",
      point: false,
    },
    {
      text: "Znowu tutaj? Super! Chyba Ci się podoba. Pamiętaj o przycisku 'Pobierz CV'!",
      point: true,
    },
  ],
  hero: [
    {
      text: "Strona startowa! Wygląda dobrze, co? 😉 Warto kliknąć dalej albo... pobrać CV!",
      point: true,
    },
    {
      text: "Fajnie tu, ale reszta czeka! Użyj nawigacji, żeby zobaczyć więcej.",
      point: false,
    },
  ],
  omnie: [
    {
      text: "Trochę faktów o autorze tego cuda. Potem warto sprawdzić Portfolio!",
      point: false,
    },
    {
      text: "Ciekawi Cię, z kim można by pracować? Czytaj, a potem pisz w sekcji Kontakt!",
      point: true,
    },
    {
      text: "Po lekturze zapraszam do sekcji Kontakt lub do pobrania CV (przycisk na górze strony!).",
      point: true,
    },
    {
      text: "Stonka, ah ta stonka... O! Jeszcze tutaj jesteś. To super! Kliknij w ten kontakt, nie daj się prosić... Poznajmy się! :)",
    },
  ],
  doswiadczenie: [
    {
      text: "Tu ciężko pracowałem. Potwierdzone info. Można potwierdzić, wysyłając mi ofertę pracy 😉.",
      point: true,
    },
    {
      text: "Moja droga przez firmy i projekty! Zobacz, gdzie nabijałem expa.",
      point: false,
    },
    {
      text: "Każdy wpis tutaj to krok bliżej do... Twojego projektu? 😉 Sekcja Kontakt jest dalej!",
      point: true,
    },
  ],
  umiejetnosci: [
    {
      text: "Lista moich supermocy! Od `<div>` po `useEffect`. Brakuje tylko Twojego projektu na liście!",
      point: false,
    },
    {
      text: "Tyle technologii... Aż sam jestem pod wrażeniem. Serio, napisz w Kontakcie!",
      point: true,
    },
    {
      text: "Skille twarde jak poranna kawa. Gotowe do użycia w Twoim zespole. PS. CV do pobrania jest na stronie głównej!",
      point: true,
    },
  ],
  portfolio: [
    {
      text: "Moje cyfrowe dzieci. Niektóre już dorosłe. Wszystkie z miłością tworzone.",
      point: false,
    },
    {
      text: "Dowody w sprawie pt. 'Czy on faktycznie umie kodować?'. Werdykt: sprawdź sam i daj znać w Kontakcie!",
      point: true,
    },
    {
      text: "Widzisz coś fajnego? Super! Pomyśl, co możemy stworzyć razem. Sekcja Kontakt czeka!",
      point: true,
    },
  ],
  kontakt: [
    {
      text: "Jesteś tu! Wiedziałem, że w końcu klikniesz 😉. Nie krępuj się, pisz śmiało!",
      point: false,
    },
    {
      text: "Ostatni krok do potencjalnej współpracy! Wypełnij, wyślij i... czekaj na odpowiedź!",
      point: false,
    },
    {
      text: "Nie zapomnij też pobrać CV, jeśli jeszcze tego nie zrobiłeś/aś! (Przycisk na górze strony)",
      point: true,
    },
  ],
  themeChangeLight: [
    { text: "Jasność! Czytelniej? Daj znać w Kontakcie!", point: true },
    { text: "Tryb jasny - klasyka! Co teraz obejrzysz?", point: false },
  ],
  themeChangeDark: [
    {
      text: "Witaj po Ciemnej Stronie Mocy! Lepiej widać animacje, co?",
      point: false,
    },
    { text: "Tryb ciemny - ulubiony tryb koderów!", point: false },
  ],
  general: [
    {
      text: "Hmmm, może warto pobrać CV? Przycisk jest gdzieś na samej górze strony!",
      point: true,
    },
    { text: "Sekcja Kontakt na dole strony czeka na wiadomość!", point: true },
    { text: "Ciekawe, co kryje się w następnej sekcji...", point: false },
  ],
  idle: [
    {
      text: "Halo? Ziemia do użytkownika! Coś Cię szczególnie zainteresowało, czy po prostu podziwiasz? 😉 Jeśli szukasz czegoś, daj znać w sekcji Kontakt!",
      point: true,
    },
    {
      text: "Wygląda na to, że potrzebujesz chwili... albo zachęty! Może sekcja Portfolio Cię zaciekawi?",
      point: false,
    },
    {
      text: "Bardzo się cieszę, że rozkoszujesz się widokiem tej sekcji! Ja również ją uwielbiam, jest fenomenalna! Sprawdź też inne, są jeszcze lepsze! 😉",
      point: false,
    },
    {
      text: "Pssst... Kliknij pobierz CV i przejdź do Kontaktu, nie bądź taki... 😉 Warto!",
      point: true,
    },
  ],
};

// Funkcja losująca (teraz obsługuje string lub obiekt)
const getRandomHint = (hintArray) => {
  if (!hintArray || hintArray.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * hintArray.length);
  const selected = hintArray[randomIndex];
  // Zwracamy obiekt z tekstem i flagą point
  if (typeof selected === "string") return { text: selected, point: false };
  return selected; // Zakładamy, że to obiekt { text: ..., point?: ... }
};

// Warianty animacji dymku
const bubbleVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } },
};

// Warianty animacji dla wskaźnika
const pointerVariants = {
  initial: { opacity: 0, scale: 0.5, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.2, type: "spring", stiffness: 120 },
  },
  exit: { opacity: 0, scale: 0.5, y: 10, transition: { duration: 0.15 } },
  // Dodajemy ciągłą animację "wskazywania"
  pointing: {
    y: [0, -4, 0], // Lekki ruch góra-dół
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

// Czas bezczynności w milisekundach (np. 30 sekund)
const IDLE_TIMEOUT_MS = 30000;

export default function ClippyHelper({ activeView }) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [showPointer, setShowPointer] = useState(false);
  const hintTimerRef = useRef(null); // Timer do ukrywania podpowiedzi
  const idleTimerRef = useRef(null); // Timer do wykrywania bezczynności
  const [showingWelcome, setShowingWelcome] = useState(false);
  const theme = useTheme();
  const currentMode = theme.palette.mode;
  const previousModeRef = useRef(currentMode);

  // Funkcja pomocnicza do pokazywania dymku (z modyfikacją czyszczenia idle timera)
  const showHint = (
    hintData,
    duration = 8000,
    delay = 600,
    isWelcome = false,
    isIdleHint = false
  ) => {
    if (!isIdleHint && idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = null;
    setIsVisible(false);
    if (hintData && hintData.text) {
      setMessage(hintData.text);
      setShowPointer(!!hintData.point);
      const showTimer = setTimeout(() => {
        setIsVisible(true);
        hintTimerRef.current = setTimeout(() => {
          setIsVisible(false);
          hintTimerRef.current = null;
          if (isWelcome) setShowingWelcome(false);
          if (!isIdleHint) resetIdleTimer();
        }, duration);
      }, delay);
      return () => clearTimeout(showTimer);
    }
    setIsVisible(false);
    setShowPointer(false);
    if (!isIdleHint) resetIdleTimer();
    return undefined;
  };

  // --- LOGIKA IDLE TIMERA ---
  const showIdleHint = () => {
    console.log("Idle timer fired!");
    const idleHintData = getRandomHint(hints.idle);
    showHint(idleHintData, 10000, 100, false, true); // isIdleHint = true
  };

  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (!showingWelcome && !isVisible) {
      idleTimerRef.current = setTimeout(showIdleHint, IDLE_TIMEOUT_MS);
    }
  };

  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keydown",
      "touchstart",
      "scroll",
      "wheel",
    ];
    const eventListener = () => resetIdleTimer();
    events.forEach((event) =>
      window.addEventListener(event, eventListener, { passive: true })
    );
    resetIdleTimer();
    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, eventListener)
      );
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [showingWelcome, isVisible]);
  // --- KONIEC LOGIKI IDLE TIMERA ---

  // Efekt powitalny
  useEffect(() => {
    let cleanupShowTimer;
    if (typeof window !== "undefined") {
      const visited = localStorage.getItem("hasVisitedClippyPortfolio");
      if (!visited) {
        const welcomeHint = getRandomHint(hints.welcomeFirst);
        setShowingWelcome(true);
        cleanupShowTimer = showHint(welcomeHint, 10000, 800, true, false);
        localStorage.setItem("hasVisitedClippyPortfolio", "true");
      }
    }
    return () => {
      if (cleanupShowTimer) cleanupShowTimer();
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  // Efekt zmiany widoku
  useEffect(() => {
    if (showingWelcome) return;
    let hintData;
    const visited =
      typeof window !== "undefined"
        ? localStorage.getItem("hasVisitedClippyPortfolio")
        : null;
    if (activeView === "hero" && visited) {
      hintData = getRandomHint(hints.welcomeBack);
    } else if (activeView !== "hero") {
      hintData = getRandomHint(hints[activeView] || hints.general);
    } else {
      hintData = null;
    }
    const cleanupShowTimer = showHint(hintData, 8000, 600, false, false);
    return () => {
      if (cleanupShowTimer) cleanupShowTimer();
    };
  }, [activeView, showingWelcome]);

  // Efekt zmiany motywu
  useEffect(() => {
    if (previousModeRef.current !== currentMode) {
      if (showingWelcome) {
        previousModeRef.current = currentMode;
        return;
      }
      const themeHints =
        currentMode === "light"
          ? hints.themeChangeLight
          : hints.themeChangeDark;
      const hintData = getRandomHint(themeHints);
      const cleanupShowTimer = showHint(hintData, 5000, 100, false, false);
      previousModeRef.current = currentMode;
      if (cleanupShowTimer) return () => cleanupShowTimer();
    }
  }, [currentMode]); // Poprawiona zależność

  // Funkcja zamknięcia
  const handleClose = () => {
    setIsVisible(false);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = null;
    setShowingWelcome(false);
    resetIdleTimer();
  };

  // JSX
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={bubbleVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "30px",
            zIndex: 1300,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Typography
            sx={{
              fontSize: "2.8rem",
              mr: -1,
              mb: -1,
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            🐛
          </Typography>
          <Paper
            elevation={6}
            sx={{
              p: 1.5,
              pl: 2,
              pr: 4,
              maxWidth: "280px",
              borderRadius: "12px",
              position: "relative",
              bgcolor: "background.paper",
            }}
          >
            <IconButton
              aria-label="Zamknij podpowiedź"
              onClick={handleClose}
              size="small"
              sx={{ position: "absolute", top: "4px", right: "4px" }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ fontSize: "0.85rem" }}
            >
              {message}
            </Typography>
          </Paper>
          <AnimatePresence>
            {showPointer && (
              <motion.div
                variants={pointerVariants}
                initial="initial"
                animate={["animate", "pointing"]}
                exit="exit"
                style={{
                  marginLeft: "-10px",
                  marginBottom: "5px",
                  color: theme.palette.primary.main,
                }}
              >
                <ArrowUpwardIcon
                  sx={{ fontSize: "2rem", transform: "rotate(-45deg)" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
