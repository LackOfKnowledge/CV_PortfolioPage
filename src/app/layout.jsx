// src/app/layout.jsx
import { chivo } from "@/theme/fonts";
import ThemeRegistry from "@/components/ThemeRegistry";
import Footer from "@/components/Footer"; // Importujemy Stopkę
import Box from "@mui/material/Box"; // Import Box do struktury flex
import "./globals.css";

// Metadata strony (bez zmian)
export const metadata = {
  title: "Portfolio", // Zmień na swoje dane
  description: "Portfolio Frontend Developera", // Zmień opis
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={chivo.className}>
        <ThemeRegistry>
          {/* Główny kontener flex, aby stopka była na dole */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            {/* Header jest teraz renderowany w page.jsx */}
            {/* Główna treść strony (renderowana przez page.jsx) */}
            <Box
              component="main"
              sx={{ flexGrow: 1 }}
            >
              {children}
            </Box>
            {/* Stopka na dole */}
            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
