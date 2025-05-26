// src/app/layout.jsx
import { chivo } from "@/theme/fonts";
import ThemeRegistry from "@/components/ThemeRegistry";
import Box from "@mui/material/Box";
import AuthProviders from "@/components/AuthProviders";
import "./globals.css";
import ConditionalFooter from "@/components/ConditionalFooter";

export const metadata = {
  title: "Krzysztof Skuratowicz - Portfolio",
  description: "Portfolio Frontend Developera",
  icons: {
    icon: "/images/logo_bar.png", // to działa dla wielu formatów, ale...
    shortcut: "/images/logo_bar.png",
    apple: "/images/logo_bar.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pl"
      style={{ height: "100%" }}
    >
      <body
        className={chivo.className}
        style={{
          display: "flex", // Kluczowe dla flexbox layout
          flexDirection: "column", // Układ kolumnowy dla body
          minHeight: "100vh", // Minimalna wysokość body na całe okno
          margin: 0, // Usunięcie domyślnych marginesów body
        }}
      >
        <AuthProviders>
          <ThemeRegistry>
            {/* Główny kontener aplikacji, który będzie zarządzał układem flex */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1, // Ten Box ma zająć całą dostępną przestrzeń w body
              }}
            >
              <Box
                component="main"
                sx={{
                  flexGrow: 1, // Główna treść (main) rozciąga się, wypychając stopkę w dół
                  // Możesz dodać tutaj padding lub inne style dla głównej treści, jeśli są potrzebne
                }}
              >
                {children}
              </Box>
              <ConditionalFooter /> {/* Stopka będzie naturalnie na dole */}
            </Box>
          </ThemeRegistry>
        </AuthProviders>
      </body>
    </html>
  );
}
