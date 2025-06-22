// src/app/layout.jsx
import { chivo } from "@/theme/fonts";
import ThemeRegistry from "@/components/ThemeRegistry";
import Box from "@mui/material/Box";
import AuthProviders from "@/components/AuthProviders";
import "./globals.css";
import ConditionalFooter from "@/components/ConditionalFooter";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";

export const metadata = {
  title: "Krzysztof Skuratowicz - Portfolio",
  description: "Portfolio Frontend Developera",
  icons: {
    icon: "/images/logo_bar.png",
    shortcut: "/images/logo_bar.png",
    apple: "/images/logo_bar.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={chivo.className}>
        <AuthProviders>
          <ThemeRegistry>
            <Box sx={{ display: "flex" }}>
              <Sidebar />
              {/* Główny kontener jest teraz znacznie prostszy */}
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                }}
              >
                <MobileHeader />
                <Box sx={{ flexGrow: 1 }}>{children}</Box>
                <ConditionalFooter />
              </Box>
            </Box>
          </ThemeRegistry>
        </AuthProviders>
      </body>
    </html>
  );
}
