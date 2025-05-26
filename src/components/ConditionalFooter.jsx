// src/components/ConditionalFooter.jsx
"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Jeśli ścieżka zaczyna się od /view-cv/, nie pokazuj stopki
  if (pathname?.startsWith("/view-cv/")) {
    return null;
  }

  return <Footer />;
}
