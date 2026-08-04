// Mitgelieferte Kontakte = NUR offizielle / öffentliche Festival-Nummern.
//
// DATENSCHUTZ: Private Handynummern einzelner Crew-Mitglieder werden NICHT
// im (öffentlichen) Repo gespeichert. Persönliche Team-Kontakte kannst du in
// der App selbst hinterlegen ("Referenz → Kontakte → eigener Kontakt") –
// diese liegen nur lokal auf deinem Gerät (bzw. im optionalen Team-Sync).

export const SHIPPED_CONTACTS = [
  {
    event: 'rar',
    group: 'Notfall & offizielle Hotlines (RaR 2025)',
    important: true,
    entries: [
      { name: 'Rettungs-/Sanitätsdienste (Notruf)', value: '+49 2691 302 112', tel: '+492691302112' },
      { name: 'Notfallseelsorge (24h Rufbereitschaft)', value: '+49 171 12 54 042', tel: '+491711254042' },
      { name: 'Infopoint', value: '+49 2691 80 992 95', tel: '+4926918099295' },
      { name: 'WhatsApp Hotline', value: '+49 1511 40 36 366', tel: '+4915114036366' },
      { name: 'Awareness Notfallnummer (Mi.–Mo.)', value: '+49 1523 61 61 051', tel: '+4915236161051' }
    ]
  },
  {
    event: 'rar',
    group: 'Rock am Ring – Check-In C',
    entries: [
      { name: 'Check-In C – Hotline', value: '+49 2691 8099291', tel: '+4926918099291' },
      { name: 'Check-In C – E-Mail', value: 'checkin@rock-am-ring.com', mail: 'checkin@rock-am-ring.com' },
      { name: 'Standort (Parkplatz D10)', value: 'Google Maps öffnen', url: 'https://maps.app.goo.gl/FgiCbdug5JNLWUYk6' },
      { name: 'Staufreie Anreise (NUNAV)', value: 'rock-am-ring.com/directions/check-in-b-c', url: 'https://www.rock-am-ring.com/directions/check-in-b-c' }
    ]
  },
  {
    event: 'natureone',
    group: 'Spektralwerk / Personalbüro (NATURE ONE 2026)',
    important: true,
    entries: [
      { name: 'Spektralwerk Hotline (WhatsApp & Call)', value: '06541 81 41 222', tel: '065418141222' },
      { name: 'Spektralwerk (Telefon & SMS)', value: '0171 30 55 115', tel: '01713055115' },
      { name: 'Personalbüro (während des Einsatzes, 24h)', value: '01522 52 55 614', tel: '015225255614' },
      { name: 'Spektralwerk – E-Mail', value: 'member@spektralwerk.de', mail: 'member@spektralwerk.de' }
    ]
  },
  {
    event: 'sanhejmo',
    group: 'San Hejmo – Crew (offiziell)',
    entries: [
      { name: 'Crew Camp – Buchung / Anfragen', value: 'crewcamp@sanhejmo.com', mail: 'crewcamp@sanhejmo.com' },
      { name: 'Cashless-Portal (Aufladen / Refund)', value: 'cashless.sanhejmo.com', url: 'https://cashless.sanhejmo.com' },
      { name: 'Crew-Info-Seite', value: 'sanhejmo.com/de/crew-info', url: 'https://www.sanhejmo.com/de/crew-info' }
    ]
  },
  {
    event: 'all',
    group: 'GET – Online-Plattformen',
    entries: [
      { name: 'GET Manage (Troubleshoot / Support)', value: 'manage.get.systems', url: 'https://manage.get.systems' },
      { name: 'Eventportal (Gast: Ticket/Chip/Guthaben)', value: 'eventportal.io', url: 'https://eventportal.io' },
      { name: 'GET – E-Mail', value: 'info@get.systems', mail: 'info@get.systems' }
    ]
  }
];

// Allgemeine Infos aus der RaR-Fibel, die am Clearing oft gebraucht werden.
export const QUICK_INFO = [
  {
    event: 'rar',
    title: 'Awareness-Codes',
    text: 'Meldet sich jemand mit „AWARENESS", „WO IST LUISA?" oder „WO GEHT\'S NACH PANAMA?" – ernst nehmen, Person nicht allein lassen, nicht nach Gründen fragen. An Supervisor:in wenden oder Awareness-Team (Guardian Angels, pinke Westen): +49 1523 6161051 / Funkkanal 28. Awareness Points: Infield (neben Infopoint) IH 20, Outfield ai 47.'
  },
  {
    event: 'rar',
    title: 'Jugendschutz (Einlass, 2026)',
    text: 'Unter 8 Jahren = kein Zutritt. Unter 14 = nur mit personensorgeberechtigter Person. Unter 16 = Campen nur mit personensorgeberechtigter Person. 14–16 Jahre = Konzerte bis 24:00 Uhr ohne Begleitung mit schriftlicher Erlaubnis der Eltern (Nachweis bei Zutritt). Ab 16 = auch nach Mitternacht ohne Begleitung. Personensorgeberechtigt sind i. d. R. die Eltern, nicht erziehungsbeauftragte Personen.'
  },
  {
    event: 'rar',
    title: 'Lost & Found',
    text: 'Fundsachen an allen Info Points abgeben; Abholung auf B3 bis Montag (09.06.) 13:30 Uhr. Danach Übergabe an das zentrale Fundbüro des Kreises.'
  },
  {
    event: 'rar',
    title: 'Cashless / Pay-Out',
    text: 'Gesamtes Festival cashless (Ausnahme: LIDL Rockstore). Pay-Out ab Mo 9.6., 18:00 Uhr über die RaR-Website (Chipnummer eingeben).'
  }
];
