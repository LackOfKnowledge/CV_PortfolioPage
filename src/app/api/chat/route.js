// src/app/api/chat/route.js
import { NextResponse } from "next/server";
import { streamText, StreamingTextResponse } from "ai"; // Poprawny import dla rdzenia ai (v3+)
import { google } from "@ai-sdk/google"; // Poprawny import dla dostawcy Google

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Sprawdzenie klucza API
    if (!process.env.GOOGLE_API_KEY) {
      console.error("Server Config Error: GOOGLE_API_KEY is not set.");
      return NextResponse.json(
        { error: "Błąd konfiguracji serwera: Brak klucza API dla AI." },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    // Wywołanie modelu przez streamText
    const result = await streamText({
      model: google("models/gemini-pro"), // Używamy dostawcy google
      messages: messages,
      // system: "Jesteś pomocnym asystentem...", // Opcjonalny prompt systemowy
    });

    // Zwracamy strumień używając StreamingTextResponse
    // Poprawny sposób dla rdzenia 'ai' v3+ to użycie strumienia z wyniku
    return new StreamingTextResponse(result.stream);
  } catch (error) {
    console.error("Błąd w /api/chat:", error);
    const errorMessage = error.message || "Wystąpił nieznany błąd.";
    // Sprawdzenie, czy błąd ma status code (przydatne dla błędów API LLM)
    const status =
      typeof error === "object" && error !== null && "status" in error
        ? error.status
        : 500;
    return NextResponse.json(
      { error: `Błąd podczas komunikacji z AI: ${errorMessage}` },
      { status: status || 500 }
    );
  }
}

// Blokowanie innych metod HTTP
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
export async function PUT() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
export async function DELETE() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
export async function PATCH() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
export async function HEAD() {
  return new Response(null, { status: 405 });
}
export async function OPTIONS() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
