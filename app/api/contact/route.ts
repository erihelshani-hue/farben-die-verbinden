import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// HTML-Escaping, damit Eingaben nicht als Markup in die Mail gelangen.
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, artwork, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Fehlende Felder" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.startsWith("re_xxx")) {
      // Kein gültiger Key gesetzt — klare Meldung statt undurchsichtigem Fehler.
      // Fallback-Option: stattdessen Formspree nutzen (siehe README.md).
      return NextResponse.json(
        { error: "E-Mail-Dienst ist noch nicht konfiguriert (RESEND_API_KEY fehlt)." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_EMAIL ?? "kontakt@farben-die-verbinden.de";
    // Bis eine eigene Domain in Resend verifiziert ist, funktioniert nur die
    // Test-Adresse onboarding@resend.dev. Danach via MAIL_FROM überschreibbar.
    const from = process.env.MAIL_FROM ?? "Farben die verbinden <onboarding@resend.dev>";

    const safe = {
      name: escapeHtml(String(name)),
      email: escapeHtml(String(email)),
      artwork: artwork ? escapeHtml(String(artwork)) : "",
      message: escapeHtml(String(message)).replace(/\n/g, "<br>"),
    };

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: safe.artwork
        ? `Anfrage zu „${safe.artwork}" von ${safe.name}`
        : `Kontaktanfrage von ${safe.name}`,
      html: `
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>E-Mail:</strong> ${safe.email}</p>
        ${safe.artwork ? `<p><strong>Werk:</strong> ${safe.artwork}</p>` : ""}
        <p><strong>Nachricht:</strong></p>
        <p>${safe.message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Fehler beim Senden" }, { status: 500 });
  }
}
