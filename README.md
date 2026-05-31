# Farben die verbinden

Website der Kunstausstellung **„Farben die verbinden"** von Vjollca Reshani.
Die Werke werden als Galerie präsentiert; Anfragen laufen über ein Kontaktformular
(„Preis auf Anfrage", kein Online-Checkout).

**Tech-Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 ·
Sanity CMS · Framer Motion · Resend (E-Mail) · Deployment auf Vercel.

---

## 1. Lokal starten

```bash
npm install
cp .env.local.example .env.local   # danach Werte eintragen (siehe Abschnitt 3)
npm run dev
```

→ Öffne [http://localhost:3000](http://localhost:3000)
→ Das Sanity-Studio (Inhalte bearbeiten) läuft unter [http://localhost:3000/studio](http://localhost:3000/studio)

---

## 2. Sanity einrichten

1. Auf [sanity.io](https://sanity.io) kostenlos registrieren.
2. Neues Projekt erstellen. Die **Project ID** steht im Dashboard unter
   *Project settings* und gehört in `.env.local` (siehe unten).
3. Dataset `production` anlegen (falls nicht vorhanden).
4. Schema deployen, damit das Studio die Felder kennt:

   ```bash
   npx sanity login
   npx sanity schema deploy
   ```

5. **Beispiel-Inhalte einspielen** (13 Werke + Texte mit Platzhalterbildern):

   ```bash
   npm run seed
   ```

   Die Platzhalterbilder lassen sich später im Studio einfach durch echte
   Werk-Fotos ersetzen. Das Skript ist idempotent — erneutes Ausführen
   überschreibt, dupliziert aber nicht.

---

## 3. Umgebungsvariablen (`.env.local`)

| Variable | Bedeutung |
|----------|-----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Project ID aus dem Sanity-Dashboard |
| `NEXT_PUBLIC_SANITY_DATASET` | meist `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | z.B. `2024-01-01` |
| `RESEND_API_KEY` | API-Key von [resend.com](https://resend.com) |
| `CONTACT_EMAIL` | Empfänger-Adresse für Anfragen |
| `MAIL_FROM` *(optional)* | Eigene Absenderadresse (erst nach Domain-Verifizierung in Resend) |

> Solange keine eigene Domain in Resend verifiziert ist, versendet die App
> automatisch über die Test-Adresse `onboarding@resend.dev`.

**Fallback ohne Resend:** Ist kein gültiger `RESEND_API_KEY` gesetzt, meldet das
Formular das klar zurück. Alternativ kann das Formular auf
[Formspree](https://formspree.io) umgestellt werden — dort ein Formular anlegen
und den POST-Endpunkt in `components/ContactForm.tsx` statt `/api/contact`
eintragen.

---

## 4. Deployment (GitHub + Vercel)

```bash
git add .
git commit -m "Website Farben die verbinden"
git push
```

In [Vercel](https://vercel.com):

1. *Add New Project* → das GitHub-Repo importieren.
2. Unter *Environment Variables* dieselben Werte wie in `.env.local` eintragen.
3. *Deploy* klicken.

### Domain verbinden

1. Domain `farben-die-verbinden.de` bei einem Anbieter kaufen (z.B. IONOS, Strato).
2. In Vercel: *Project Settings → Domains → Add* und den DNS-Anweisungen folgen.
3. Für den E-Mail-Versand die Domain zusätzlich in Resend verifizieren und
   `MAIL_FROM` setzen.

---

## 5. Inhalte bearbeiten (für Vjollca)

Alle Texte und Bilder lassen sich ohne Programmierkenntnisse im **Studio** ändern:

- Lokal: [http://localhost:3000/studio](http://localhost:3000/studio)
- Nach dem Deployment: `https://deine-vercel-url.vercel.app/studio`

Im Studio gibt es vier Bereiche:

| Bereich | Inhalt |
|---------|--------|
| **Ausstellung** | Titel, Einleitung, Story und Botschaft der Startseite |
| **Künstlerin** | Name, Foto, Biografie und Statement |
| **Website-Einstellungen** | Kontakt-E-Mail, Telefon, Social-Media-Links |
| **Kunstwerke** | Alle Werke — Bild, Titel, Kategorie, Technik, Maße, Jahr, Beschreibung |

Ein Werk auf der Startseite hervorheben: im Werk den Schalter
**„Auf Startseite zeigen"** aktivieren. Die Reihenfolge steuert das Feld
**Reihenfolge** (kleinere Zahl zuerst).

---

## 6. Projektstruktur

```
app/                     Seiten (App Router)
  page.tsx               Startseite
  galerie/               Galerie + Werk-Detailseite ([slug])
  kuenstlerin/           Über die Künstlerin
  kontakt/               Kontaktseite
  studio/                Sanity-Studio
  api/                   contact (E-Mail) + artworks (JSON)
components/              Navigation, Footer, ArtworkCard, ContactForm, FadeIn
sanity/
  schema/                artwork, artist, exhibitionInfo, siteSettings
  lib/                   client, image, queries
  structure.ts           Studio-Navigation
scripts/seed.ts          Beispiel-Inhalte
```
