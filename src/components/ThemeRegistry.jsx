// src/components/ThemeRegistry.jsx
"use client"; // Ta dyrektywa jest kluczowa!

import React, { useState, useMemo, createContext, useContext } from "react";
import createCache from "@emotion/cache"; // Do tworzenia cache Emotion
import { useServerInsertedHTML } from "next/navigation"; // Hook Next.js do wstrzykiwania HTML po stronie serwera
import { CacheProvider } from "@emotion/react"; // Provider dla cache Emotion
import { ThemeProvider } from "@mui/material/styles"; // Provider motywu MUI
import CssBaseline from "@mui/material/CssBaseline"; // Reset stylów i podstawowe style M3
import { lightTheme, darkTheme } from "@/theme/theme"; // Import Twoich zdefiniowanych motywów

// --- Konfiguracja Emotion Cache ---
// Funkcja tworząca nowy cache dla Emotion
const createEmotionCache = () => {
  return createCache({ key: "mui-style" }); // Klucz jest ważny dla identyfikacji stylów
};

// --- Kontekst do zarządzania trybem kolorów --- (Bez zmian)
export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

// --- Zaktualizowany Komponent ThemeRegistry ---
export default function ThemeRegistry(props) {
  const { children } = props; // Pobieramy 'children' z propsów

  // Stan przechowujący konfigurację Emotion Cache
  const [{ cache, flush }] = useState(() => {
    const cache = createEmotionCache();
    cache.compat = true; // Opcjonalnie: tryb kompatybilności dla starszych przeglądarek
    const prevInsert = cache.insert; // Zachowujemy oryginalną funkcję insert
    let inserted = []; // Tablica na śledzenie wstawionych nazw stylów
    // Nadpisujemy funkcję insert, aby śledzić style
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args); // Wywołujemy oryginalną funkcję insert
    };
    // Funkcja do "opróżniania" śledzonych stylów
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  // Hook Next.js do wstrzykiwania zebranych stylów do <head> podczas SSR
  useServerInsertedHTML(() => {
    const names = flush(); // Pobieramy nazwy stylów wstawionych podczas renderowania na serwerze
    if (names.length === 0) {
      return null; // Nic do wstrzyknięcia
    }
    let styles = "";
    // Pobieramy treść stylów z cache Emotion
    for (const name of names) {
      styles += cache.inserted[name];
    }
    // Zwracamy tag <style> do wstrzyknięcia
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  // --- Stan zarządzania trybem kolorów --- (Bez zmian)
  const [mode, setMode] = useState("dark"); // Domyślny tryb ciemny

  // Memoizowana funkcja do przełączania trybu
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // Memoizowany wybór aktualnego motywu
  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  // Zwracamy drzewo komponentów owinięte w odpowiednie Provider'y
  return (
    // 1. CacheProvider dostarcza skonfigurowany cache Emotion
    <CacheProvider value={cache}>
      {/* 2. ColorModeContext dostarcza funkcję toggleColorMode */}
      <ColorModeContext.Provider value={colorMode}>
        {/* 3. ThemeProvider dostarcza wybrany motyw MUI */}
        <ThemeProvider theme={theme}>
          {/* 4. CssBaseline stosuje globalne resety i style bazowe */}
          {/* enableColorScheme pomaga w lepszej integracji z preferencjami systemowymi dark/light mode */}
          <CssBaseline enableColorScheme />
          {/* 5. Renderujemy resztę aplikacji */}
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
