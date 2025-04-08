// Plik: src/app/api/generate-cv/route.js
import { NextResponse } from "next/server";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer"; // Użyjemy renderToBuffer dla prostoty
import CvDocument from "@/components/CvDocument"; // Komponent definiujący strukturę PDF

// --- TODO: Zaimportuj swoje dane (przeniesione np. do src/data/) ---
// import { personalData, experienceData, skillsData } from '@/data/cvData';
const personalData = { name: "Krzysztof", title: "Frontend Developer" };
const experienceData = [
  { title: "Dev", company: "Comp", dates: "...", description: "..." } /* ... */,
];
const skillsData = { Frontend: [{ name: "React" }, { name: "JS" }] /* ... */ };
// --- Koniec Danych ---

// Funkcja pomocnicza do konwersji strumienia na bufor (jeśli używasz renderToStream)
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export async function GET() {
  try {
    // Tworzenie elementu React reprezentującego CV
    const cvElement = React.createElement(CvDocument, {
      personalData: personalData,
      experience: experienceData,
      skills: skillsData,
    });

    // Renderowanie komponentu React do bufora PDF
    const pdfBuffer = await renderToBuffer(cvElement);

    // Zwrócenie odpowiedzi z buforem PDF i odpowiednimi nagłówkami
    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Twoje_Imie_Nazwisko_CV.pdf"', // Nazwa pobieranego pliku
      },
      status: 200,
    });
  } catch (error) {
    console.error("Błąd podczas generowania PDF CV:", error);
    return NextResponse.json(
      { error: "Nie udało się wygenerować pliku CV PDF." },
      { status: 500 }
    );
  }
}
