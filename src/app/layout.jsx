// src/app/layout.jsx
import { chivo } from "@/theme/fonts";
import ThemeRegistry from "@/components/ThemeRegistry";
import Box from "@mui/material/Box";
import AuthProviders from "@/components/AuthProviders";
import "./globals.css";
import ConditionalFooter from "@/components/ConditionalFooter";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import ThemeTransitionOverlay from "@/components/ThemeTransitionOverlay";

export const metadata = {
  title: "Krzysztof Skuratowicz - Portfolio",
  description: "Portfolio",
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
            <ThemeTransitionOverlay />
            <Box sx={{ display: "flex" }}>
              <Sidebar />
              <Box
                id="main-content-area"
                component="main"
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: "100vh",
                  overflowY: "auto",
                  backgroundColor: "background.default",
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
