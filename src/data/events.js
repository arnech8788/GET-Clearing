// Festivals / Events. Erweiterbar: neues Festival = neuer Eintrag + passende
// `events`-Tags in den Guides (src/data/guides.js).
//
// Der Wert 'all' in einer Guide bedeutet "gilt für alle Events" (generische
// GET-Anleitungen). Event-spezifische Guides tragen die jeweilige Event-ID.

export const EVENTS = [
  {
    id: 'all',
    name: 'GET allgemein',
    short: 'GET',
    desc: 'Generische GET Cashless-Anleitungen – gelten auf jedem Event.',
    color: '#f5a623',
    selectable: false // kein eigener Event-Filter, immer mitgezeigt
  },
  {
    id: 'rar',
    name: 'Rock am Ring 2025',
    short: 'RaR',
    desc: 'Nürburgring · 6.–8. Juni 2025 · Clearing / Cashless (Klangpiraten)',
    color: '#e23b3b',
    selectable: true
  },
  {
    id: 'parookaville',
    name: 'Parookaville',
    short: 'PV',
    desc: 'Weeze · Inhalte folgen, sobald Unterlagen vorliegen.',
    color: '#2d9cdb',
    selectable: true,
    placeholder: true
  }
];

export function getEvent(id) {
  return EVENTS.find((e) => e.id === id) || EVENTS[0];
}
