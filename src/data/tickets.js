// Referenz: Ticket-Typen, Scan-Matrix und Camping-Kategorien (Rock am Ring 2025).
// Quellen: RaR25 Ticketing Clearing (Tabelle "Falscher Eingang") + Briefing Bändchentausch.

// Ticket-Scan-Matrix: an welchen Tagen / Stationen ist welcher Ticket-Typ scanbar?
export const SCAN_MATRIX = [
  {
    group: 'Festival Ticket',
    rows: [
      { type: 'WEEKEND FESTIVAL TICKET', days: 'FR / SA / SO', where: 'alle KB' }
    ]
  },
  {
    group: 'Camping Tickets',
    rows: [
      { type: 'GENERAL CAMPING / PARKING', days: 'MI / DO / FR / SA / SO', where: 'alle KB' },
      { type: 'GREEN CAMPING / PARKING', days: 'MI / DO / FR / SA / SO', where: 'alle KB' },
      { type: "ROCK'N'ROLL CAMPING / PARKING", days: 'MI / DO / FR / SA / SO', where: 'alle KB' },
      { type: 'CARAVAN CAMPING', days: 'MI / DO / FR / SA / SO', where: 'alle KB' },
      { type: 'UTOPIA STAGE CAMPING / PARKING', days: 'MI / DO / FR / SA / SO', where: 'Utopia Stage Camping (KB 13)' },
      { type: "RACETRACK ROCK'N'ROLL CAMPING / PARKING", days: 'MI / DO / FR / SA / SO', where: 'Tor 23 (KB11)' },
      { type: 'Experience Camping – Lodge', days: 'MI / DO / FR / SA / SO', where: 'Tor 23 (KB11)' },
      { type: 'Experience Camping – Rockotel', days: 'MI / DO / FR / SA / SO', where: 'Tor 23 (KB11)' },
      { type: 'Experience Camping – Rocksuite', days: 'MI / DO / FR / SA / SO', where: 'Tor 23 (KB11)' }
    ]
  },
  {
    group: 'Upgrades – nur an bestimmten Stationen',
    rows: [
      { type: 'FAST LANE PASS', days: 'FR / SA / SO', where: 'Nur an der Fast Lane am Haupteingang' },
      { type: 'Fastlane Freitag', days: 'Freitag', where: 'Nur an der Fast Lane am Haupteingang' },
      { type: 'Fastlane Samstag', days: 'Samstag', where: 'Nur an der Fast Lane am Haupteingang' },
      { type: 'Fastlane Sonntag', days: 'Sonntag', where: 'Nur an der Fast Lane am Haupteingang' },
      { type: 'VIP UPGRADE Weekend', days: 'FR / SA / SO', where: 'Nur am Infopoint im Infield' },
      { type: 'VIP Upgrade Freitag', days: 'Freitag', where: 'Nur am Infopoint im Infield' },
      { type: 'VIP Upgrade Samstag', days: 'Samstag', where: 'Nur am Infopoint im Infield' },
      { type: 'VIP Upgrade Sonntag', days: 'Sonntag', where: 'Nur am Infopoint im Infield' }
    ]
  },
  {
    group: 'Parking Tickets – muss ins Fahrzeug gelegt werden!',
    rows: [
      { type: 'WEEKEND CAR PASS', days: 'FR / SA / SO – 1× pro Tag scanbar', where: 'Nur auf den Dayparking-Parkplätzen' },
      { type: 'DAY CAR PASS', days: 'FR / SA / SO – 1× scanbar', where: 'Nur auf den Dayparking-Parkplätzen' },
      { type: 'CARAVAN PASS – Zone B', days: '—', where: 'Werden nicht gescannt' },
      { type: 'CARAVAN PASS – Zone C', days: '—', where: 'Werden nicht gescannt' },
      { type: 'CARAVAN PASS – Zone D', days: '—', where: 'Werden nicht gescannt' },
      { type: 'CAR & TENT PASS', days: '—', where: 'Werden nicht gescannt' }
    ]
  }
];

// Camping-Kategorien & benötigte Tickets (Ticketübersicht).
export const CATEGORY_OVERVIEW = [
  { cat: 'General Camping', ticket: 'General Camping Ticket pro Person', add: '—', right: 'Zutritt zu allen General Campingplätzen' },
  { cat: 'Green Camping', ticket: 'Green Camping Ticket pro Person', add: '—', right: 'Zutritt zu allen Green Campingplätzen' },
  { cat: 'Car & Tent Camping', ticket: 'General Camping Ticket pro Person', add: 'Car & Tent Pass pro PKW', right: 'Zutritt + Zufahrt zum Car & Tent Campingbereich' },
  { cat: 'Caravan Camping', ticket: 'Caravan Camping Ticket pro Person', add: 'Caravan Pass pro Fahrzeug', right: 'Zutritt zu allen Caravan Campingplätzen + Zufahrt zu Zonen B/C/D' },
  { cat: "Rock'n'Roll Camping", ticket: "Rock'n'Roll Camping Ticket pro Person", add: '—', right: "Zutritt zum Rock'n'Roll Campingplatz" },
  { cat: "Racetrack Rock'n'Roll Camping", ticket: "Racetrack Rock'n'Roll Camping Ticket pro Person", add: '—', right: "Zutritt zum Racetrack Rock'n'Roll Campingplatz" },
  { cat: 'Utopia Stage Camping', ticket: 'Utopia Stage Camping Ticket (für 2 Personen)', add: '—', right: 'Zutritt zum Utopia Stage Campingbereich' },
  { cat: 'Experience Camping', ticket: 'Experience Camping Ticket (Rockotel/Comfotel/Lodge – je 2 Personen)', add: '—', right: 'Zutritt zum Experience Campingbereich' },
  { cat: 'Rockability Camping', ticket: 'mind. General Camping pro Person', add: 'Voranmeldung: specialneeds@rock-am-ring.com', right: 'Zutritt & Zufahrt zum Rockability Campingplatz B2a' },
  { cat: 'Weekend Festivalpass', ticket: 'Weekend Festivalticket pro Person', add: '—', right: 'Zutritt zum Infield / Konzertgelände, kein Camping' },
  { cat: 'Weekend Car Pass', ticket: '—', add: '—', right: 'Zufahrt zu Tagesparkplätzen (kein Bändchen)' }
];

// Bändchenfarben (Schnellreferenz).
export const WRISTBAND_COLORS = [
  { color: 'Glitzer-Rot', meaning: 'General Camping', hex: '#e23b3b', chip: false },
  { color: 'Glitzer-Grün', meaning: 'Green Camping', hex: '#2ecc71', chip: false },
  { color: 'Glitzer-Blau', meaning: "Rock'n'Roll Camping", hex: '#3498db', chip: false },
  { color: 'Glitzer-Pink', meaning: 'Caravan Camping', hex: '#e84393', chip: false },
  { color: 'Gelb (Stoff)', meaning: 'Utopia Stage Camping', hex: '#f1c40f', chip: true },
  { color: 'Grün (Stoff)', meaning: 'Experience Camping', hex: '#27ae60', chip: true },
  { color: 'Lila (Stoff)', meaning: 'Racetrack Camping', hex: '#8e44ad', chip: true }
];
