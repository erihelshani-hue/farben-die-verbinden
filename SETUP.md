# Setup-Anleitung: Farben die verbinden

## Schritt 1 — Abhängigkeiten installieren

```bash
cd farben-die-verbinden
npm install
```

---

## Schritt 2 — Umgebungsvariablen anlegen

Kopiere `.env.local.example` zu `.env.local`:

```bash
cp .env.local.example .env.local
```

Die Werte füllst du in den folgenden Schritten aus.

---

## Schritt 3 — Sanity Projekt einrichten

1. Gehe zu [sanity.io](https://sanity.io) → kostenlos registrieren
2. Neues Projekt erstellen → Name: `farben-die-verbinden`
3. Deine **Project ID** findest du im Sanity Dashboard unter „Project settings"
4. Trage sie in `.env.local` ein:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=deine-id-hier
NEXT_PUBLIC_SANITY_DATASET=production
```

5. Sanity Studio starten & Schema deployen:

```bash
npx sanity@latest init --env .env.local
npx sanity deploy
```

6. Studio öffnen unter: `https://dein-projekt.sanity.studio`
7. Die 13 Werke anlegen: **Kunstwerk** → Neu → Bild hochladen, Titel, Technik, Maße ausfüllen
8. Künstlerinnen-Eintrag anlegen: **Künstlerin** → Neu → Name, Bio, Statement, Foto

---

## Schritt 4 — Resend (E-Mail) einrichten

1. Gehe zu [resend.com](https://resend.com) → kostenlos registrieren
2. API Key erstellen unter „API Keys"
3. In `.env.local` eintragen:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=vjollca@deine-email.de
```

> **Tipp:** Für Tests kannst du zunächst deine eigene E-Mail als `CONTACT_EMAIL` verwenden.

---

## Schritt 5 — Lokal testen

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

Checkliste:
- [ ] Startseite zeigt Hero + Featured Werke
- [ ] Galerie zeigt alle Werke mit Filter
- [ ] Werk-Detail öffnet sich korrekt
- [ ] Kontaktformular sendet E-Mail an dich

---

## Schritt 6 — GitHub & Vercel Deployment

```bash
# Neues GitHub Repo erstellen, dann:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/dein-nutzername/farben-die-verbinden.git
git push -u origin main
```

In [Vercel](https://vercel.com):
1. „Add New Project" → GitHub Repo importieren
2. Environment Variables eintragen (die gleichen wie in `.env.local`)
3. Deploy klicken

---

## Schritt 7 — Domain verbinden

1. Domain `farben-die-verbinden.de` kaufen (z.B. Namecheap, IONOS, Strato)
2. In Vercel: Project Settings → Domains → Domain hinzufügen
3. DNS-Einträge beim Domain-Anbieter setzen (Vercel zeigt dir genau welche)

---

## Sanity Studio für Vjollca

Nach dem Deployment kann Vjollca selbst Bilder und Texte bearbeiten:

**URL:** `https://dein-projekt.sanity.studio`

Was sie selbst ändern kann:
- Bilder der Werke austauschen
- Beschreibungen und Techniken anpassen
- Ihren Bio-Text und Statement bearbeiten
- Neue Werke hinzufügen

---

## Häufige Fehler

| Fehler | Lösung |
|--------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID is not defined` | `.env.local` prüfen, Server neu starten |
| Bilder laden nicht | `next.config.ts` enthält `cdn.sanity.io` als remotePattern ✓ |
| E-Mail kommt nicht an | Resend-Dashboard prüfen, `CONTACT_EMAIL` korrekt? |
| Build-Fehler TypeScript | `npm run lint` für Details |
