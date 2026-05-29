# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

**GET Clearing & Troubleshooting** ist eine PWA für das Festival-Clearing mit dem
GET-Cashless-System (Rock am Ring u. a.). Sie bündelt **Anleitungen für Problemfälle**
und erlaubt **eigene Fallnotizen**, damit man Vorgänge wiederfindet, wenn ein Gast
später nochmal kommt. Läuft komplett im Browser, ist offline-fähig und mit **Vite**
(+ `vite-plugin-pwa`) gebaut. Notizen liegen lokal (`localStorage`) mit optionalem
Firebase-Team-Sync.

## Build & Entwicklung

- `npm install`
- `npm run dev` – Dev-Server mit Hot Reload
- `npm run build` – Production-Build nach `dist/`
- `npm run preview` – Build-Vorschau

Service Worker wird von `vite-plugin-pwa` (Workbox, `generateSW`) erzeugt; kein
manuelles `sw.js`. Update-Toast via `registerSW({ onNeedRefresh })` in `src/main.js`.

## Deployment

Push auf `main` → GitHub Action (`.github/workflows/pages.yml`) baut mit Vite und
deployt `dist/` nach GitHub Pages. Custom Domain via `CNAME`
(`clearing.arne-chudobba.de`). Base ist `/`.

## Architektur

Statische Hülle (`index.html`) + `styles.css`, App-Logik in ES-Modulen unter `src/`:

- **`src/main.js`** – Entry Point: globaler `state`, `save()`/`load()`, Navigation
  (`showScreen`), Theme, Event-Auswahl, „Mehr"-Screen, PWA-Registrierung,
  `mergeRemoteNotes`. Registriert alle onclick-Funktionen per `Object.assign(window, …)`.
- **`src/ui.js`** – Toast, Modal, Confirm, `escapeHtml`, `highlight`, Icons (`ICO`).
- **`src/guides.js`** – Anleitungsliste (nach Kategorie/Suche/Event) + Detailansicht,
  Favoriten.
- **`src/notes.js`** – Eigene Fälle/Notizen (CRUD, Status, Verknüpfung mit Anleitung).
- **`src/reference.js`** – Referenz-Tabs: Ticket-Scan-Matrix, Camping-Kategorien,
  Bändchenfarben, Kontakte (offiziell + eigene lokale), Infos.
- **`src/sync.js`** – Optionaler Firebase-Team-Sync (lazy `import('firebase/…')`,
  Standard AUS).
- **`src/data/`** – Reiner Content (keine Logik):
  - `events.js` – Festivals (erweiterbar; `'all'` = generisch).
  - `guides.js` – Alle Anleitungen + `CATEGORIES`. Block-Format siehe Datei-Kopf.
  - `tickets.js` – Scan-Matrix, Kategorien, Bändchenfarben (RaR).
  - `contacts.js` – NUR offizielle Hotlines + `QUICK_INFO`.

### Konventionen

- **onclick-Handler**: ES-Module sind nicht global → jede in `innerHTML` per `onclick`
  referenzierte Funktion muss `export`iert und in einem `Object.assign(window, …)`
  registriert sein (in `main.js` oder dem jeweiligen Modul).
- **Geteilter State**: `export let state` in `main.js` (live binding). Schreiben nur
  über die Modulfunktionen; nach Änderungen `save()` aufrufen.
- **Rendering**: Jede `render*`-Funktion schreibt `innerHTML` ihres Screens.

### Neues Festival hinzufügen

1. Eintrag in `src/data/events.js` (`selectable: true`).
2. Event-spezifische Guides in `src/data/guides.js` mit `events: ['<id>']`.
3. Optional Referenzdaten/Kontakte ergänzen (`tickets.js`, `contacts.js`).

## Datenschutz

Private Crew-Telefonnummern gehören **nicht** ins Repo. `contacts.js` enthält nur
offizielle Festival-Hotlines. Persönliche Kontakte legt der Nutzer in der App an
(„Referenz → Kontakte → eigener Kontakt"); diese bleiben lokal und werden **nicht**
über den Team-Sync übertragen.
