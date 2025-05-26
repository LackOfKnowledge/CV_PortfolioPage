// src/app/api/cv/serve/[token]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
// Upewnij się, że importujesz poprawny, rozbudowany komponent PDF
import CvDocumentPdf from "@/components/CvDocument"; // Załóżmy, że CvDocument.jsx eksportuje CvDocumentPdf

export async function GET(request, { params }) {
  const { token } = params;

  if (!token) {
    return NextResponse.json({ error: "Brak tokenu." }, { status: 400 });
  }

  try {
    const cvTokenRecord = await prisma.cvToken.findUnique({
      where: { token: token },
    });

    if (!cvTokenRecord) {
      console.warn(`[API serve-cv] Token not found: ${token}`);
      return NextResponse.json(
        { error: "Nieprawidłowy link do CV." },
        { status: 404 }
      );
    }

    if (cvTokenRecord.isUsed) {
      console.warn(`[API serve-cv] Token already used: ${token}`);
      return NextResponse.json(
        { error: "Link do CV został już wykorzystany." },
        { status: 410 }
      ); // 410 Gone
    }

    if (new Date() > new Date(cvTokenRecord.expiresAt)) {
      console.warn(`[API serve-cv] Token expired: ${token}`);
      return NextResponse.json(
        { error: "Link do CV wygasł." },
        { status: 410 }
      ); // 410 Gone
    }

    // Oznacz token jako użyty
    await prisma.cvToken.update({
      where: { id: cvTokenRecord.id },
      data: { isUsed: true },
    });
    console.log(`[API serve-cv] Token validated and marked as used: ${token}`);

    // Generuj PDF używając @react-pdf/renderer i CvDocumentPdf
    // CvDocumentPdf sam powinien importować dane z cvData.js
    const pdfStream = await renderToBuffer(React.createElement(CvDocumentPdf));
    console.log(`[API serve-cv] PDF buffer generated for token: ${token}`);

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    // Sugerowana nazwa pliku przy pobieraniu
    headers.set(
      "Content-Disposition",
      `attachment; filename="CV-Krzysztof-Skuratowicz.pdf"`
    );

    return new Response(pdfStream, { headers, status: 200 });
  } catch (error) {
    console.error("[API serve-cv] Error serving CV:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera podczas generowania CV." },
      { status: 500 }
    );
  }
}
