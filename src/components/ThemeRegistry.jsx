// src/components/ThemeRegistry.jsx
"use client";

import React, { useState, useMemo, createContext, useContext } from "react";
import { useAnimation } from "framer-motion";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "@/theme/theme";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

const TransitionContext = createContext(null);
export const useTransition = () => useContext(TransitionContext);

const createEmotionCache = () => createCache({ key: "mui-style" });

export default function ThemeRegistry({ children }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createEmotionCache();
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  const [mode, setMode] = useState("dark");
  const [overlayBg, setOverlayBg] = useState(
    lightTheme.palette.background.default
  );
  const controls = useAnimation();

  // Prosta i niezawodna animacja "cross-fade"
  const triggerTransition = async (targetMode) => {
    const targetTheme = targetMode === "light" ? lightTheme : darkTheme;
    setOverlayBg(targetTheme.palette.background.default);

    // 1. Płynnie pokaż nakładkę w kolorze docelowego tła
    await controls.start("visible");

    // 2. Zmień motyw
    setMode(targetMode);

    // 3. Płynnie schowaj nakładkę, odkrywając nową treść
    await controls.start("hidden");
  };

  const transitionValue = useMemo(
    () => ({
      controls,
      bgColor: overlayBg,
    }),
    [controls, overlayBg]
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const targetMode = mode === "light" ? "dark" : "light";
        triggerTransition(targetMode);
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <CacheProvider value={cache}>
      <TransitionContext.Provider value={transitionValue}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            {children}
          </ThemeProvider>
        </ColorModeContext.Provider>
      </TransitionContext.Provider>
    </CacheProvider>
  );
}
