// Bereiche der App: zwei allgemeine Buckets (System / Arbeitgeber) + die Festivals.
// Erweiterbar: neues Festival = neuer Eintrag (kind: 'festival') + passende
// `events`-Tags in den Guides (src/data/guides.js).
//
// kind:
//   'general'  – systemweites Wissen (z. B. GET Cashless), für jedes Festival relevant.
//   'employer' – Arbeitgeber-/Crew-Bereich (z. B. Klangpiraten), festivalübergreifend.
//   'festival' – konkretes Festival.
//
// alwaysOn: true → diese Inhalte erscheinen zusätzlich in jeder Festival-Ansicht
// (z. B. GET-Cashless-Basics gelten auf jedem Festival). Die allgemeinen Buckets
// selbst zeigen nur ihre eigenen Inhalte (strikt getrennt).

export const EVENTS = [
  {
    id: 'all', // ID bleibt 'all' für Bestands-Tags (events: ['all']) der GET-Guides
    kind: 'general',
    name: 'GET Cashless',
    short: 'GET',
    desc: 'Cashless-System (Chip, Tickets, Top-up, Troubleshooting) – auf jedem Festival relevant.',
    color: '#f5a623',
    selectable: false, // nicht im Umschalter wählbar; via alwaysOn überall mitgezeigt
    alwaysOn: true
  },
  {
    id: 'klangpiraten',
    kind: 'employer',
    name: 'Klangpiraten',
    short: 'KP',
    desc: 'Arbeitgeber – festivalübergreifende Crew-Infos & Abläufe.',
    color: '#9b59b6',
    selectable: false // eigener Tab „Klangpiraten" statt Umschalter-Auswahl
  },
  {
    id: 'rar',
    kind: 'festival',
    name: 'Rock am Ring 2026',
    short: 'RaR',
    desc: 'Nürburgring · Festival 5.–7. Juni 2026 · Camping Mi 03.06.–Mo 08.06. · Clearing / Cashless (Klangpiraten)',
    color: '#e23b3b',
    selectable: true
  },
  {
    id: 'parookaville',
    kind: 'festival',
    name: 'Parookaville',
    short: 'PV',
    desc: 'Weeze · Festival 17.–19.07.2026 (Pre-Party 16.07.) · Crew-Infos',
    color: '#2d9cdb',
    selectable: true
  },
  {
    id: 'natureone',
    kind: 'festival',
    name: 'NATURE ONE 2026',
    short: 'NO',
    desc: 'Raketenbasis Pydna, Kastellaun · 31.07.–02.08.2026 · Crew via Spektralwerk',
    color: '#27ae60',
    selectable: true,
    standalone: true // eigener Cashless-/Arbeitgeber-Kontext → keine alwaysOn-Inhalte (z. B. GET) mitzeigen
  }
];

export function getEvent(id) {
  return EVENTS.find((e) => e.id === id) || EVENTS[0];
}

// Gehört `candidateId`-Inhalt in die aktuell gewählte Ansicht `activeId`?
// - identischer Bereich → ja
// - Festival aktiv → zusätzlich alle `alwaysOn`-Bereiche (z. B. GET Cashless)
// - allgemeiner Bucket aktiv (general/employer) → nur eigene Inhalte (strikt)
export function scopeIncludes(activeId, candidateId) {
  if (candidateId === activeId) return true;
  const active = getEvent(activeId);
  // Festivals zeigen zusätzlich alwaysOn-Inhalte (z. B. GET Cashless) – außer sie
  // sind `standalone` (eigener Kontext, z. B. NATURE ONE mit anderem Cashless-System).
  if (active.kind === 'festival' && !active.standalone) return !!getEvent(candidateId).alwaysOn;
  return false;
}
