import { Resend } from "resend";
import { NextResponse } from "next/server";

const resendApiKey = process.env.RESEND_API_KEY;
const recipientEmail = process.env.CONTACT_EMAIL_TO;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!resendApiKey)
  console.error(
    "FATAL: Zmienna środowiskowa RESEND_API_KEY nie jest ustawiona!"
  );
if (!recipientEmail)
  console.error(
    "FATAL: Zmienna środowiskowa CONTACT_EMAIL_TO nie jest ustawiona!"
  );

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request) {
  if (!resend || !recipientEmail) {
    console.error(
      "Błąd konfiguracji serwera: Brak klucza Resend lub emaila odbiorcy."
    );
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
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Podaj poprawny adres e-mail." },
        { status: 400 }
      );
    }

    console.log(
      `Próba wysłania emaila do: ${recipientEmail} od: onboarding@resend.dev (reply-to: ${email})`
    );
    const sanitizedMessage = message
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [recipientEmail],
      subject: `Nowa wiadomość z Twojego Portfolio od: ${email}`,
      reply_to: email,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;"><h2 style="color: #0B57D0;">Nowa wiadomość z Portfolio</h2><p>Otrzymałeś/aś wiadomość od użytkownika:</p><ul><li><strong>Email:</strong> ${email}</li></ul><h3>Treść wiadomości:</h3><div style="background-color: #f4f4f4; border: 1px solid #ddd; padding: 15px; border-radius: 5px; white-space: pre-wrap; word-wrap: break-word;">${sanitizedMessage.replace(/\n/g, "<br>")}</div><hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"><p style="font-size: 0.9em; color: #777;">Wiadomość wysłana z formularza kontaktowego na Twojej stronie.</p></div>`,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json(
        {
          error: "Nie udało się wysłać wiadomości.",
          details: error.message,
          statusCode: error.statusCode || 500,
        },
        { status: error.statusCode || 500 }
      );
    }

    console.log("Email wysłany pomyślnie, ID:", data?.id);
    return NextResponse.json({
      success: true,
      message: "Wiadomość została wysłana pomyślnie!",
      emailId: data?.id,
    });
  } catch (err) {
    console.error("Błąd w API Route /api/contact:", err);
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane wejściowe." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Wewnętrzny błąd serwera." },
      { status: 500 }
    );
  }
}

const message = "Method Not Allowed";
const status = 405;

export async function GET() {
  return NextResponse.json({ error: message }, { status: status });
}

export async function PUT() {
  return NextResponse.json({ error: message }, { status: status });
}

export async function DELETE() {
  return NextResponse.json({ error: message }, { status: status });
}

export async function PATCH() {
  return NextResponse.json({ error: message }, { status: status });
}

export async function HEAD() {
  return new Response(null, { status: status });
}

export async function OPTIONS() {
  return NextResponse.json({ error: message }, { status: status });
}
