"use client";

import React, { createContext, useMemo, useState, useContext } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Tworzymy kontekst, który będzie przechowywał funkcję do zmiany motywu
const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function AdminThemeProvider({ children }) {
  const [mode, setMode] = useState("dark"); // Domyślnie startujemy z motywem jasnym

  // Używamy useMemo, aby funkcja nie była tworzona na nowo przy każdym renderowaniu
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // Tworzymy motyw MUI na podstawie aktualnego trybu (jasny/ciemny)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline resetuje style i aplikuje kolor tła z motywu */}
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}

// Customowy hook, aby łatwo dostać się do funkcji przełączającej motyw
export const useColorMode = () => useContext(ColorModeContext);
