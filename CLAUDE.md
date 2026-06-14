# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

**Festival Clearing & Crew** ist eine PWA für Festival-Crews: **Anleitungen für
Problemfälle** (Cashless-Clearing/Troubleshooting), Referenzdaten, Dienstpläne und
**eigene Fallnotizen**, damit man Vorgänge wiederfindet, wenn ein Gast später nochmal
kommt. Die App ist **festivalübergreifend** aufgebaut: oben (auf jedem Tab) wählt man
einen **Bereich** – zwei allgemeine Buckets **„GET Cashless"** (`kind: 'general'`,
`alwaysOn`, systemweit – erscheint zusätzlich in jedem Festival) und **„Klangpiraten"**
(`kind: 'employer'`, Arbeitgeber, festivalübergreifend) sowie die **Festivals**
(`kind: 'festival'`, z. B. Rock am Ring, Parookaville). Jeder Bereich zeigt nur seine
Inhalte; `scopeIncludes()` in `src/data/events.js` entscheidet die Sichtbarkeit. Läuft
komplett im Browser, ist offline-fähig und mit **Vite** (+ `vite-plugin-pwa`) gebaut.
Notizen liegen lokal (`localStorage`) mit optionalem Firebase-Team-Sync.

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
(`get-clearing.arne-chudobba.de`). Base ist `/`.

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
- **`src/dienstplan.js`** – Tab „Dienstplan": Tagesbrowser (Stationen/KB, einklappbar)
  + Namenssuche über alle Tage. Daten in `src/data/dienstplan.js`
  (`DIENSTPLAN_DAYS`, `DIENSTPLAN_META`); Schichttausche als `SHIFT_CHANGES`-Overrides
  (Tag-ID + Nr.), die im Render angewandt und als „geändert" markiert werden.
- **`src/sync.js`** – Optionaler Firebase-Team-Sync (lazy `import('firebase/…')`,
  Standard AUS).
- **`src/data/`** – Reiner Content (keine Logik):
  - `events.js` – Bereiche: allgemeine Buckets (`kind: 'general'`/`'employer'`) +
    Festivals (`kind: 'festival'`). `scopeIncludes(active, candidate)` regelt, welche
    Inhalte in welcher Ansicht erscheinen (`alwaysOn` = überall in Festivals mitgezeigt).
    Die ID `'all'` ist der GET-Cashless-Bucket (Bestands-Tags `events: ['all']`).
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
- **Navigation/History**: zentral in `main.js`. Jede tiefere Aktion (Tab-Wechsel,
  Detailansicht via `navGuide`, Modal via `window.__navModalOpen`) pusht einen
  History-Eintrag; der `popstate`-Handler ruft `applyNav()` und baut genau eine
  Ebene ab. Modals schließen über `closeModal()` → `history.back()` →
  `removeModalDOM()`. Der Zurück-Pfeil ruft `navBack()` (= `history.back()`).
  So beendet die Zurück-Geste die installierte PWA erst an der Wurzel.

### Neues Festival / neuen Bereich hinzufügen

1. Eintrag in `src/data/events.js` (`kind: 'festival'`, `selectable: true`).
2. Festival-spezifische Guides in `src/data/guides.js` mit `events: ['<id>']`
   (Bereich-übergreifende GET-Inhalte tragen `events: ['all']`).
3. Optional Kontakte/Infos (`contacts.js`, je Eintrag `event: '<id>'`) und
   Referenzdaten ergänzen. Reine RaR-Tabs (Referenz→Tickets, Dienstplan, Bestand)
   zeigen außerhalb von RaR derzeit einen Platzhalter.

## Datenschutz

Private Crew-Telefonnummern gehören **nicht** ins Repo. `contacts.js` enthält nur
offizielle Festival-Hotlines. Persönliche Kontakte legt der Nutzer in der App an
(„Referenz → Kontakte → eigener Kontakt"); diese bleiben lokal und werden **nicht**
über den Team-Sync übertragen.
