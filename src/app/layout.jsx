// src/app/layout.jsx
import { chivo } from "@/theme/fonts";
import ThemeRegistry from "@/components/ThemeRegistry";
import Box from "@mui/material/Box";
import AuthProviders from "@/components/AuthProviders";
import "./globals.css";
import ConditionalFooter from "@/components/ConditionalFooter";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import { ScrollSpyProvider } from "@/hooks/useScrollSpy";

const navItems = [
  { label: "Start", targetId: "hero" },
  { label: "O mnie", targetId: "omnie" },
  { label: "Doświadczenie", targetId: "doswiadczenie" },
  { label: "Umiejętności", targetId: "umiejetnosci" },
  { label: "Portfolio", targetId: "portfolio" },
  { label: "Kontakt", targetId: "kontakt" },
];

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
            <ScrollSpyProvider navItems={navItems}>
              <Box sx={{ display: "flex" }}>
                <Sidebar navItems={navItems} />
                <Box
                  id="main-content-area"
                  component="main"
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    overflowY: "auto",
                    backgroundColor: "background.default", // <-- DODANA LINIA
                  }}
                >
                  <MobileHeader navItems={navItems} />
                  <Box sx={{ flexGrow: 1 }}>{children}</Box>
                  <ConditionalFooter />
                </Box>
              </Box>
            </ScrollSpyProvider>
          </ThemeRegistry>
        </AuthProviders>
      </body>
    </html>
  );
}
