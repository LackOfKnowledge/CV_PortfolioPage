// src/components/ClippyHelper.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";

const hints = {
  welcomeFirst: [
    {
      text: "Siemanko! Wygląda na to, że to pierwsza wizyta. Rozgość się i klikaj śmiało! PS. CV i Kontakt to dobre miejsca na start 😉",
    },
    {
      text: "Hej! Pierwszy raz tutaj? Super! Zobacz, co potrafię i daj znać, co myślisz (formularz na dole!).",
    },
  ],
  welcomeBack: [
    {
      text: "Witaj ponownie! Miło znów Cię tu widzieć. Może tym razem pora na Kontakt albo CV? 😉",
    },
    {
      text: "O, powrót na start! Gotowość na drugą rundę po sekcjach?",
    },
    {
      text: "Znowu tutaj? Super! Chyba Ci się podoba. Pamiętaj o przycisku 'Pobierz CV'!",
    },
  ],
  hero: [
    {
      text: "Strona startowa! Wygląda dobrze, co? 😉 Warto kliknąć dalej albo... pobrać CV!",
    },
    {
      text: "Fajnie tu, ale reszta czeka! Użyj nawigacji, żeby zobaczyć więcej.",
    },
  ],
  omnie: [
    {
      text: "Trochę faktów o autorze tego cuda. Potem warto sprawdzić Portfolio!",
    },
    {
      text: "Ciekawi Cię, z kim można by pracować? Czytaj, a potem pisz w sekcji Kontakt!",
    },
    {
      text: "Po lekturze zapraszam do sekcji Kontakt lub do pobrania CV (przycisk na górze strony!).",
    },
    {
      text: "Stonka, ah ta stonka... O! Jeszcze tutaj jesteś. To super! Kliknij w ten kontakt, nie daj się prosić... Poznajmy się! :)",
    },
  ],
  doswiadczenie: [
    {
      text: "Tu ciężko pracowałem. Potwierdzone info. Można potwierdzić, wysyłając mi ofertę pracy 😉.",
    },
    {
      text: "Moja droga przez firmy i projekty! Zobacz, gdzie nabijałem expa.",
    },
    {
      text: "Każdy wpis tutaj to krok bliżej do... Twojego projektu? 😉 Sekcja Kontakt jest dalej!",
    },
  ],
  umiejetnosci: [
    {
      text: "Lista moich supermocy! Od `<div>` po `useEffect`. Brakuje tylko Twojego projektu na liście!",
    },
    {
      text: "Tyle technologii... Aż sam jestem pod wrażeniem. Serio, napisz w Kontakcie!",
    },
    {
      text: "Skille twarde jak poranna kawa. Gotowe do użycia w Twoim zespole. PS. CV do pobrania jest na stronie głównej!",
    },
  ],
  portfolio: [
    {
      text: "Moje cyfrowe dzieci. Niektóre już dorosłe. Wszystkie z miłością tworzone.",
    },
    {
      text: "Dowody w sprawie pt. 'Czy on faktycznie umie kodować?'. Werdykt: sprawdź sam i daj znać w Kontakcie!",
    },
    {
      text: "Widzisz coś fajnego? Super! Pomyśl, co możemy stworzyć razem. Sekcja Kontakt czeka!",
    },
  ],
  kontakt: [
    {
      text: "Jesteś tu! Wiedziałem, że w końcu klikniesz 😉. Nie krępuj się, pisz śmiało!",
    },
    {
      text: "Ostatni krok do potencjalnej współpracy! Wypełnij, wyślij i... czekaj na odpowiedź!",
    },
    {
      text: "Nie zapomnij też pobrać CV, jeśli jeszcze tego nie zrobiłeś/aś! (Przycisk na górze strony)",
    },
  ],
  themeChangeLight: [
    { text: "Jasność! Czytelniej? Daj znać w Kontakcie!" },
    { text: "Tryb jasny - klasyka! Co teraz obejrzysz?" },
  ],
  themeChangeDark: [
    {
      text: "Witaj po Ciemnej Stronie Mocy! Lepiej widać animacje, co?",
    },
    { text: "Tryb ciemny - ulubiony tryb koderów!" },
  ],
  general: [
    {
      text: "Hmmm, może warto pobrać CV? Przycisk jest gdzieś na samej górze strony!",
    },
    { text: "Sekcja Kontakt na dole strony czeka na wiadomość!" },
    { text: "Ciekawe, co kryje się w następnej sekcji..." },
  ],
  idle: [
    {
      text: "Halo? Ziemia do użytkownika! Coś Cię szczególnie zainteresowało, czy po prostu podziwiasz? 😉 Jeśli szukasz czegoś, daj znać w sekcji Kontakt!",
    },
    {
      text: "Wygląda na to, że potrzebujesz chwili... albo zachęty! Może sekcja Portfolio Cię zaciekawi?",
    },
    {
      text: "Bardzo się cieszę, że rozkoszujesz się widokiem tej sekcji! Ja również ją uwielbiam, jest fenomenalna! Sprawdź też inne, są jeszcze lepsze! 😉",
    },
    {
      text: "Pssst... Kliknij pobierz CV i przejdź do Kontaktu, nie bądź taki... 😉 Warto!",
    },
  ],
};

const getRandomHint = (hintArray) => {
  if (!hintArray || hintArray.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * hintArray.length);
  const selected = hintArray[randomIndex];
  if (typeof selected === "string") return { text: selected };
  const { point, ...rest } = selected;
  return rest;
};

const bubbleVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  bobbing: {
    y: [0, -4, 0],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
  exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } },
};

const IDLE_TIMEOUT_MS = 30000;

export default function ClippyHelper({ activeView }) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const hintTimerRef = useRef(null);
  const idleTimerRef = useRef(null);
  const [showingWelcome, setShowingWelcome] = useState(false);
  const theme = useTheme();
  const currentMode = theme.palette.mode;
  const previousModeRef = useRef(currentMode);

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
    if (!isIdleHint) resetIdleTimer();
    return undefined;
  };

  const showIdleHint = () => {
    const idleHintData = getRandomHint(hints.idle);
    showHint(idleHintData, 10000, 100, false, true);
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
  }, [currentMode, showingWelcome]);

  const handleClose = () => {
    setIsVisible(false);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = null;
    setShowingWelcome(false);
    resetIdleTimer();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={bubbleVariants}
          initial="hidden"
          animate={["visible", "bobbing"]}
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
            🦥
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
