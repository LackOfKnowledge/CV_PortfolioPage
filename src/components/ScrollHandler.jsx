"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { smoothScrollTo } from "@/utils/smoothScroll";

export default function ScrollHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const targetSection = searchParams.get("scrollTo");
    if (targetSection) {
      // Dajemy przeglądarce chwilę na "zauważenie" odpowiedniej sekcji
      setTimeout(() => {
        smoothScrollTo(targetSection, "main-content-area");
      }, 100);
    }
  }, [searchParams]);

  return null; // Ten komponent nic nie renderuje
}
