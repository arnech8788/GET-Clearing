# GET Clearing & Troubleshooting

Eine **Progressive Web App** für das Festival-Clearing mit dem GET-Cashless-System
(Rock am Ring u. a.). Sie bündelt **Schritt-für-Schritt-Anleitungen** für die typischen
Problemfälle am Clearing Point / Bändchentausch und lässt dich **eigene Fälle notieren**,
damit du Vorgänge wiederfindest, wenn ein Gast später nochmal kommt.

📱 Installierbar (Add to Home Screen) · 🔌 offline-fähig · 🌙 Dark/Light Mode

## Funktionen

- **Anleitungen** – durchsuchbarer Katalog, gegliedert nach Kategorie:
  - Cashless-Armband / Chip (reagiert nicht, Tausch, verloren, QR-Code …)
  - Ticket & Zutritt (ungültig, falsche Berechtigung, roter Punkt, Eventportal …)
  - Guthaben & Cashless (Top-Up fehlt, Self-Service-Storno, Fehlbuchung, Transfer, Pay-Out …)
  - Ticket Swap · Top-Up (P400) · Geräte/GET Manage/Support
  - Rock am Ring – Clearing & Bändchentausch (Scanner rot, Ticket vergessen, RiP→RaR, Bändchen-Typen …)
- **Meine Fälle** – eigene Notizen mit Status (offen / in Bearbeitung / erledigt),
  Chip-/Ticketnummer, Verknüpfung zur passenden Anleitung, Volltextsuche.
- **Referenz** – Ticket-Scan-Matrix, Camping-Kategorien, Bändchenfarben, offizielle
  Kontakte/Hotlines (+ eigene lokale Kontakte) und Schnellinfos.
- **Optionaler Team-Sync** – Notizen per Firebase mit dem Team teilen (Standard: aus).
- **Multi-Event** – aktuell Rock am Ring 2025; weitere Festivals einfach ergänzbar.

## Entwicklung

```bash
npm install
npm run dev      # Dev-Server
npm run build    # Production-Build -> dist/
npm run preview  # Build-Vorschau
```

## Deployment

Push auf `main` → GitHub Action baut und deployt nach GitHub Pages (Custom Domain via `CNAME`).

## Hinweis

Die Inhalte basieren auf den GET-Leitfäden 2025 und den Rock-am-Ring-Briefings.
Ohne Gewähr – im Zweifel Teamlead oder GET-Support fragen.

**Datenschutz:** Mitgelieferte Kontakte sind ausschließlich offizielle Festival-Hotlines.
Private Crew-Nummern bitte nur als *eigene Kontakte* in der App hinterlegen (bleiben lokal).
