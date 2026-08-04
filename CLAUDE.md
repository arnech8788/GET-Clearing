# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

**Festival** ist eine PWA für Festival-Crews: **Anleitungen für
Problemfälle** (Cashless-Clearing/Troubleshooting), Referenzdaten, Dienstpläne und
**eigene Fallnotizen**, damit man Vorgänge wiederfindet, wenn ein Gast später nochmal
kommt. Die App ist **festivalübergreifend** aufgebaut: der **Umschalter** oben (auf
jedem Tab) wählt nur das **Festival** (`kind: 'festival'`, z. B. Rock am Ring,
Parookaville). Die allgemeinen **GET-Cashless**-Anleitungen (`id: 'all'`,
`kind: 'general'`, `alwaysOn`) sind nicht wählbar, sondern werden in jedem Festival
automatisch mitgezeigt. **Klangpiraten** (`kind: 'employer'`, Arbeitgeber) ist ein
**eigener Tab** unten – festivalunabhängig (Inhalte mit `events: ['klangpiraten']`).
`scopeIncludes(active, candidate)` in `src/data/events.js` entscheidet die Sichtbarkeit
(Festival + `alwaysOn`-Inhalte). Läuft
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
deployt `dist/` nach GitHub Pages. Custom Domain via `public/CNAME`
(`festival.arne-chudobba.de`) – landet im Build-Output `dist/CNAME`. Base ist `/`.

## Architektur

Statische Hülle (`index.html`) + `styles.css`, App-Logik in ES-Modulen unter `src/`:

- **`src/main.js`** – Entry Point: globaler `state`, `save()`/`load()`, Navigation
  (`showScreen`), Theme, Event-Auswahl, „Mehr"-Screen, PWA-Registrierung,
  `mergeRemoteNotes`. Registriert alle onclick-Funktionen per `Object.assign(window, …)`.
- **`src/ui.js`** – Toast, Modal, Confirm, `escapeHtml`, `highlight`, Icons (`ICO`).
- **`src/guides.js`** – Anleitungsliste (nach Kategorie/Suche/Event) + Detailansicht,
  Favoriten.
- **`src/notes.js`** – Eigene Fälle/Notizen (CRUD, Status, Verknüpfung mit Anleitung).
- **`src/klangpiraten.js`** – Tab „Klangpiraten": festivalübergreifender Arbeitgeber-
  Bereich; listet Guides mit `events: ['klangpiraten']` (kategoriegruppiert, Suche),
  Detail-/Notiz-Flow via `guideCard`/`openGuide` aus `guides.js`.
- **`src/reference.js`** – Referenz-Tabs: Ticket-Scan-Matrix, Camping-Kategorien,
  Bändchenfarben, Kontakte (offiziell + eigene lokale), Infos.
- **`src/dienstplan.js`** – Tab „Dienstplan": Tagesbrowser (Stationen/KB, einklappbar)
  + Namenssuche über alle Tage. Daten in `src/data/dienstplan.js`
  (`DIENSTPLAN_DAYS`, `DIENSTPLAN_META`); Schichttausche als `SHIFT_CHANGES`-Overrides
  (Tag-ID + Nr.), die im Render angewandt und als „geändert" markiert werden.
- **`src/sync.js`** – Optionaler Firebase-Team-Sync (lazy `import('firebase/…')`,
  Standard AUS).
- **`src/data/`** – Reiner Content (keine Logik):
  - `events.js` – Bereiche mit `kind`: `'festival'` (im Umschalter wählbar,
    `selectable: true`), `'general'` (GET Cashless, `id: 'all'`, `alwaysOn`,
    nicht wählbar) und `'employer'` (Klangpiraten, eigener Tab, nicht wählbar).
    `scopeIncludes(active, candidate)` regelt die Sichtbarkeit (`alwaysOn` = überall
    in Festivals mitgezeigt). Bestands-Tags der GET-Guides: `events: ['all']`.
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
