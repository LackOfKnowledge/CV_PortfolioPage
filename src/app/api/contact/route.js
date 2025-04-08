// Plik: src/app/api/contact/route.js
import { Resend } from "resend";
import { NextResponse } from "next/server";

// Wymagane zmienne środowiskowe:
// RESEND_API_KEY=re_twoj_klucz
// CONTACT_EMAIL_TO=twoj@adres.email
const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.CONTACT_EMAIL_TO;

export async function POST(request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("Server Config Error: RESEND_API_KEY is not set.");
    return NextResponse.json(
      { error: "Błąd konfiguracji serwera." },
      { status: 500 }
    );
  }
  if (!toEmail) {
    console.error("Server Config Error: CONTACT_EMAIL_TO is not set.");
    return NextResponse.json(
      { error: "Błąd konfiguracji serwera." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { email, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Brakuje wymaganych pól (email, message)." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Kontakt z Portfolio <onboarding@resend.dev>", // Użyj swojego zweryfikowanego adresu w Resend
      to: [toEmail],
      subject: `Nowa wiadomość z Twojego Portfolio od: ${email}`,
      reply_to: email,
      html: `<div style="font-family: sans-serif; line-height: 1.6;">
               <p>Otrzymałeś/aś nową wiadomość z formularza kontaktowego:</p><hr>
               <p><strong>Adres e-mail nadawcy:</strong> ${email}</p>
               <p><strong>Treść wiadomości:</strong></p>
               <p style="background-color: #f8f9fa; border-left: 4px solid #dee2e6; padding: 10px; margin-top: 5px;">
                 ${message.replace(/\n/g, "<br>")}
               </p><hr>
             </div>`,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json(
        { error: "Nie udało się wysłać wiadomości.", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Wiadomość została wysłana pomyślnie!",
      emailId: data?.id,
    });
  } catch (err) {
    console.error("API Route Error:", err);
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane wejściowe." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Wystąpił wewnętrzny błąd serwera." },
      { status: 500 }
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
// ... itd.
