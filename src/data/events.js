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
    name: 'Rock am Ring 2026',
    short: 'RaR',
    desc: 'Nürburgring · Festival 5.–7. Juni 2026 · Camping Mi 03.06.–Mo 08.06. · Clearing / Cashless (Klangpiraten)',
    color: '#e23b3b',
    selectable: true
  },
  {
    id: 'parookaville',
    name: 'Parookaville',
    short: 'PV',
    desc: 'Weeze · Festival 17.–19.07.2026 (Pre-Party 16.07.) · Crew-Infos',
    color: '#2d9cdb',
    selectable: true
  }
];

export function getEvent(id) {
  return EVENTS.find((e) => e.id === id) || EVENTS[0];
}
