// src/app/api/admin/generate-cv-link/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Upewnij się, że ścieżka jest poprawna
import prisma from "@/lib/prisma"; // Twój skonfigurowany klient Prisma
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  console.log("[API generate-cv-link] Session:", session);

  if (!session || session.user?.role !== "admin") {
    console.warn("[API generate-cv-link] Unauthorized attempt.");
    return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
  }

  try {
    const tokenString = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Link ważny przez 7 dni

    console.log(
      `[API generate-cv-link] Generating token for admin: ${session.user.id}`
    );

    const newCvToken = await prisma.cvToken.create({
      data: {
        token: tokenString,
        expiresAt: expiresAt,
        isUsed: false,
        userId: session.user.id, // Powiązanie z adminem, który wygenerował
      },
    });

    console.log(
      "[API generate-cv-link] Token created successfully:",
      newCvToken
    );
    // Zwracamy tylko ścieżkę, pełny URL zostanie złożony po stronie klienta
    return NextResponse.json({
      success: true,
      link: `/view-cv/${newCvToken.token}`,
    });
  } catch (error) {
    console.error("[API generate-cv-link] Error generating CV token:", error);
    return NextResponse.json(
      { error: "Nie udało się wygenerować linku do CV." },
      { status: 500 }
    );
  }
}
