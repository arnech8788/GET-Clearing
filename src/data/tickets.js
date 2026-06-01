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
      { type: 'CARAVAN PLAKETTE – Zone B', days: '—', where: 'Werden nicht gescannt' },
      { type: 'CARAVAN PLAKETTE – Zone C', days: '—', where: 'Werden nicht gescannt' },
      { type: 'CARAVAN PLAKETTE – Zone D', days: '—', where: 'Werden nicht gescannt' },
      { type: 'CAR & TENT PLAKETTE', days: '—', where: 'Werden nicht gescannt' }
    ]
  }
];

// Camping-Kategorien & benötigte Tickets (Ticketübersicht 2026).
// Camping-/Parkingflächen geöffnet: Mi 03.06.2026 12:00 – Mo 08.06.2026 12:00.
// Für den Zutritt zum Infield ist immer zusätzlich ein Festivalticket nötig.
export const CATEGORY_OVERVIEW = [
  { cat: 'Festival Ticket (ohne Camping)', ticket: 'Festivalticket pro Person', add: '—', right: 'Zutritt zum Infield 05.–07.06.2026; kein Parken/Camping' },
  { cat: 'General Camping + Parking', ticket: 'General Camping Ticket pro Person', add: '—', right: 'Camping + Parken auf ausgewiesenen Flächen' },
  { cat: 'Green Camping + Parking', ticket: 'Green Camping Ticket pro Person', add: '—', right: 'Green Camping (Naturschutz/Mülltrennung, Nachtruhe 01–08 Uhr) + Parken' },
  { cat: 'Green Power Camping + Parking', ticket: 'Green Power Camping Ticket pro Person', add: '—', right: 'Wie Green Camping + gemeinschaftliche Stromanschlüsse (Verlängerungskabel mitbringen)' },
  { cat: "Rock'n'Roll Camping + Parking", ticket: "Rock'n'Roll Camping Ticket pro Person", add: '—', right: 'Camping + Parken, gemeinschaftlicher Strom' },
  { cat: "Racetrack Rock'n'Roll Camping + Parking", ticket: "Racetrack Camping Ticket pro Person", add: '—', right: 'Zelten auf der Rennstrecke (nur Zelte!), WiFi, Strom, eigener Check-in/Parkplatz; Zugang über Treppe (nicht barrierefrei)' },
  { cat: 'Caravan Camping', ticket: 'Caravan Camping Ticket pro Person', add: 'Caravan Plakette pro Fahrzeug', right: 'Zutritt + Zufahrt zu Zone B, C, D oder Nord, mit gemeinschaftlichem Strom' },
  { cat: 'Car & Tent Camping', ticket: 'Car & Tent Camping Ticket pro Person', add: 'Car & Tent Plakette pro Fahrzeug', right: 'Camping + Zufahrt; kein Strom' },
  { cat: 'Utopia Stage Camping', ticket: 'Utopia Stage Camping Ticket (gilt 2×)', add: '—', right: '2 Personen; 2. Person per Universal Code; Camping + Festival' },
  { cat: 'Experience Camping', ticket: 'Experience Camping Ticket (Lodge/Rockotel/Rocksuite, gilt 2×)', add: '—', right: '2 Personen; 2. Person per Universal Code; Camping + Festival' },
  { cat: 'rockAbility Camping', ticket: 'Festivalticket + Schwerbehindertenausweis (B/G/aG/H/BL)', add: 'Voranmeldung erforderlich (ausgebucht)', right: 'Max. 2 Begleitpersonen, gemeinsame Anreise; 2. Begleitung braucht General Camping' }
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
