// src/app/api/cv/verify-token/[token]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  const { token } = params;

  if (!token) {
    return NextResponse.json(
      { error: "Brak tokenu.", isValid: false },
      { status: 400 }
    );
  }

  try {
    const cvTokenRecord = await prisma.cvToken.findUnique({
      where: { token: token },
    });

    if (!cvTokenRecord) {
      console.warn(`[API verify-token] Token not found: ${token}`);
      return NextResponse.json(
        { error: "Nieprawidłowy link do CV.", isValid: false },
        { status: 404 }
      );
    }

    if (cvTokenRecord.isUsed) {
      console.warn(`[API verify-token] Token already used: ${token}`);
      return NextResponse.json(
        { error: "Link do CV został już wykorzystany.", isValid: false },
        { status: 410 }
      );
    }

    if (new Date() > new Date(cvTokenRecord.expiresAt)) {
      console.warn(`[API verify-token] Token expired: ${token}`);
      return NextResponse.json(
        { error: "Link do CV wygasł.", isValid: false },
        { status: 410 }
      );
    }

    // Oznacz token jako użyty PO tym, jak strona frontendowa go zweryfikuje i przygotuje się do druku
    // W tym miejscu tylko weryfikujemy. Strona frontendowa może wywołać inny endpoint do oznaczenia jako użyty,
    // lub ten endpoint może być wywoływany tuż przed window.print() na frontendzie.
    // Dla uproszczenia, na razie tylko zwracamy, że jest ważny.
    // Logikę oznaczania jako użyty można dodać później, np. przez osobne żądanie POST z frontendu
    // po udanym wyświetleniu CvView.
    // LUB, jeśli chcemy oznaczyć od razu po pierwszej weryfikacji (co jest prostsze):
    await prisma.cvToken.update({
      where: { id: cvTokenRecord.id },
      data: { isUsed: true },
    });
    console.log(
      `[API verify-token] Token validated and marked as used: ${token}`
    );

    return NextResponse.json({
      message: "Token jest prawidłowy. Przygotowywanie CV do wyświetlenia.",
      isValid: true,
      // Możemy tu zwrócić dane CV, jeśli chcemy uniknąć ich publicznego importu w komponencie strony
      // ale na razie zakładamy, że CvView ma dostęp do cvData.js
    });
  } catch (error) {
    console.error("[API verify-token] Error verifying token:", error);
    return NextResponse.json(
      {
        error: "Wystąpił błąd serwera podczas weryfikacji linku.",
        isValid: false,
      },
      { status: 500 }
    );
  }
}
