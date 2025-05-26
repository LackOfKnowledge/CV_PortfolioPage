// src/app/layout.jsx
import { chivo } from "@/theme/fonts";
import ThemeRegistry from "@/components/ThemeRegistry";
import Footer from "@/components/Footer";
import Box from "@mui/material/Box";
import AuthProviders from "@/components/AuthProviders"; // Importuj AuthProviders
import "./globals.css";
import ConditionalFooter from "@/components/ConditionalFooter";

export const metadata = {
  title: "Krzysztof Skuratowicz - Portfolio", // Zmień na swoje dane
  description: "Portfolio Frontend Developera", // Zmień opis
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={chivo.className}>
        <AuthProviders>
          {/* Owiń ThemeRegistry (lub bezpośrednio Box) */}
          <ThemeRegistry>
            <Box>
              <Box component="main">{children}</Box>
              <ConditionalFooter />
            </Box>
          </ThemeRegistry>
        </AuthProviders>
      </body>
    </html>
  );
}
