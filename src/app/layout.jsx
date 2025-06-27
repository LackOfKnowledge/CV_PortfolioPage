// Plik: src/app/layout.jsx

// --- ABSOLUTNIE BEZ "use client" ---
import { chivo } from "@/theme/fonts";
import ThemeRegistry from "@/components/ThemeRegistry";
import AuthProviders from "@/components/AuthProviders";
import SecretCodeHandler from "@/components/SecretCodeHandler";
import PageWrapper from "@/components/PageWrapper"; // Importujemy nasz nowy komponent
import "./globals.css";

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
            <SecretCodeHandler />
            <PageWrapper navItems={navItems}>{children}</PageWrapper>
          </ThemeRegistry>
        </AuthProviders>
      </body>
    </html>
  );
}
