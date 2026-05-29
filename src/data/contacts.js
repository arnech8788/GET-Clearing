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
    title: 'Awareness-Code',
    text: 'Kommt eine Person mit dem Code „WO IST PANAMA?" auf dich zu, ernst nehmen – diese Person braucht Hilfe. An Supervisor / Vorgesetzten / Bereichsleiter wenden.'
  },
  {
    event: 'rar',
    title: 'Jugendschutz (Einlass)',
    text: 'unter 8 Jahren = kein Zutritt · 8–14 Jahre = nur in Begleitung einer personensorgeberechtigten Person · 14–16 Jahre = allein mit schriftlicher Erlaubnis der Eltern · ab 16 Jahren = ok.'
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
