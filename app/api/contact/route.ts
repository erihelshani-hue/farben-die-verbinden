import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, artwork, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Fehlende Felder" }, { status: 400 });
    }

    const to = process.env.CONTACT_EMAIL ?? "kontakt@beispiel.de";

    await resend.emails.send({
      from: "Farben die verbinden <noreply@farben-die-verbinden.de>",
      to,
      replyTo: email,
      subject: artwork
        ? `Anfrage zu „${artwork}" von ${name}`
        : `Kontaktanfrage von ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        ${artwork ? `<p><strong>Werk:</strong> ${artwork}</p>` : ""}
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Fehler beim Senden" }, { status: 500 });
  }
}
