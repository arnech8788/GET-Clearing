// Troubleshooting-/Clearing-Anleitungen.
//
// Quellen:
//  - GET Troubleshooting Guideline (2025; 2026 inhaltlich unverändert)
//  - GET Support handling tool 2026
//  - GET Ticket Swap Leitfaden (2025/2026, identisch)
//  - GET Bemanntes Top-Up via P400 2025
//  - RaR26 Briefing Bändchentausch + Awareness-Crew-Briefing, RaR Check-In C
//  - RaR Ticketing Clearing / Ticketoverview
//
// Block-Format für `body` (wird in src/guides.js gerendert):
//   { h:  'Zwischenüberschrift' }
//   { p:  'Absatz' }
//   { ul: ['Punkt', ...] }            – Aufzählung
//   { ol: ['Schritt', ...] }          – nummerierte Liste
//   { steps: [{ t:'Titel', d:'Detail' }] } – Prozess-Schritte (Karten)
//   { note: 'Hinweis' }               – blauer Info-Kasten
//   { warn: 'Achtung' }               – roter Achtung-Kasten
//   { tip:  'Tipp' }                  – grüner Tipp-Kasten

export const CATEGORIES = [
  { id: 'chip', name: 'Cashless-Armband / Chip', icon: 'chip', color: '#f5a623' },
  { id: 'ticket', name: 'Ticket & Zutritt', icon: 'ticket', color: '#2d9cdb' },
  { id: 'guthaben', name: 'Guthaben & Cashless', icon: 'money', color: '#4ad07a' },
  { id: 'swap', name: 'Ticket Swap', icon: 'swap', color: '#9b59b6' },
  { id: 'topup', name: 'Top-Up (P400)', icon: 'topup', color: '#1abc9c' },
  { id: 'tools', name: 'Geräte, GET Manage & Support', icon: 'tool', color: '#7f8c9a' },
  { id: 'rar', name: 'Rock am Ring – Clearing & Bändchen', icon: 'flag', color: '#e23b3b' },
  { id: 'pv', name: 'Parookaville – Crew-Infos', icon: 'flag', color: '#2d9cdb' }
];

export const GUIDES = [
  // ============================================================== GRUNDLAGEN / TOOLS
  {
    id: 'intro-was-macht-get',
    cat: 'tools',
    events: ['all'],
    title: 'Was macht GET & was ist Troubleshooting?',
    problem: 'Grundverständnis: Cashless-System, Aufgabe als Troubleshooter.',
    tags: ['intro', 'grundlagen', 'cashless', 'einführung'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { p: 'GET verwendet für Zutrittskontrolle und Cashless Payment Mobilgeräte. Für bargeldloses Bezahlen braucht der Gast ein Cashless-Armband oder eine Cashless-Karte. Diese können vorab online oder vor Ort mit Bargeld, EC oder Kreditkarte aufgeladen werden. Alle Transaktionen samt Rechnungen sind danach im Online-Eventportal einsehbar.' },
      { h: 'Vorteile des Systems' },
      { ul: [
        'Schneller Einlass – Tickets werden gescannt und die Berechtigungen auf den Chip gespielt.',
        'Kürzere Wartezeiten an den Bars – kein Suchen nach Wechselgeld.',
        'Verlust von Bändchen – der verlorene Chip kann gesperrt werden, der Gast bekommt einen neuen.'
      ] },
      { h: 'Deine Aufgabe als Troubleshooter' },
      { p: 'Du interagierst vor allem mit Besuchern und hilfst bei Problemen mit Chips/Karten oder den Self-Service-Stationen (EC & Cash).' },
      { note: 'Findest du keine Lösung oder hast eine Frage: über das GET-Gerät per Support-Tool an einen GET-Mitarbeiter wenden.' }
    ]
  },
  {
    id: 'hardware-ueberblick',
    cat: 'tools',
    events: ['all'],
    title: 'Hardware-Überblick',
    problem: 'Welche Geräte stehen zur Verfügung und wofür?',
    tags: ['hardware', 'geräte', 'xcover', 'zebra', 'laptop', 'reader'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { steps: [
        { t: 'Troubleshooting-Gerät (Samsung xCover)', d: 'Damit wird das Troubleshooting durchgeführt – und du kannst GET direkt kontaktieren.' },
        { t: 'Ticketing-Gerät (Zebra)', d: 'Damit werden Tickets gescannt & auf den Chip gespielt.' },
        { t: 'Troubleshooting-Laptop', d: 'Damit kann auf GET Manage zugegriffen werden.' }
      ] },
      { h: 'Überblick Troubleshoot-Gerät' },
      { ul: [
        'Akkuanzeige – auf den Akkustand achten und laden, wenn das Gerät nicht genutzt wird.',
        'ID des Gerätes – eindeutige Geräte-ID.',
        'Position des Gerätes – zeigt, welcher Position das Gerät zugeordnet ist.',
        'Chip Reader – auf der Rückseite; Chip auf diese Höhe halten für beste Performance.'
      ] },
      { h: 'Die Chips' },
      { p: 'Gäste bekommen einen Chip als Cashless-Armband („Wristband") oder Cashless-Karte. Auf der Rückseite stehen die 14-stellige Chipnummer und die 5-stellige PIN.' }
    ]
  },
  {
    id: 'geraete-entsperren',
    cat: 'tools',
    events: ['all'],
    title: 'Geräte entsperren',
    problem: 'Wie entsperre ich Handheld bzw. Laptop?',
    tags: ['entsperren', 'pin', 'login', 'manager-karte', 'manage'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { h: 'Handheld (Option 1)' },
      { ol: ['Eigenes Cashless-Armband / die Manager-Karte auf die Rückseite des Gerätes halten.'] },
      { h: 'Handheld (Option 2)' },
      { ol: [
        'Auf das gelbe Symbol am Bildschirm drücken.',
        'Im erscheinenden PIN-Eingabefeld die PIN eingeben.'
      ] },
      { h: 'Laptop / GET Manage' },
      { p: 'www.manage.get.systems → mit deinem User einloggen und das passende Event auswählen.' },
      { note: 'Keine Login-Daten? An deinen Manager oder einen GET-Mitarbeiter wenden.' }
    ]
  },
  {
    id: 'chip-info',
    cat: 'tools',
    events: ['all'],
    title: 'Chip Info auslesen',
    problem: 'Ich möchte Informationen zu einem Chip sehen (Guthaben, Berechtigungen, Transaktionen).',
    tags: ['chip info', 'guthaben', 'auslesen', 'handheld', 'transaktionen'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { h: 'Der Prozess' },
      { steps: [
        { t: 'Gerät entsperren', d: '' },
        { t: '„Chip Info" auswählen', d: '' },
        { t: 'Gerät ist bereit', d: '' },
        { t: 'Chip auf das Gerät halten', d: 'An den RFID-Reader auf der Rückseite.' },
        { t: 'Chip Info wird angezeigt', d: '' }
      ] },
      { h: 'Was die Chip-Info zeigt' },
      { ol: [
        'Guthaben: verfügbares Guthaben auf dem Chip.',
        'Details: Art des Chips, Chipnummer, Pre-Top-Up, Top-Up, Giftguthaben (Pre-Gift, Pure-Gift).',
        'Zutrittsbereich: Zutrittsberechtigungen – Grün = Zutritt, Rot = kein Zutritt.',
        'Project Fields („Flags"): aktive Flags – Grün = aktiv/verfügbar, Rot = inaktiv.',
        'Transaktionsverlauf: die letzten Transaktionen des Chips.'
      ] },
      { tip: 'Bei vielen Guthaben-Problemen löst sich die Sache schon, indem du einmal „Chip Info" durchführst und danach gemeinsam mit dem Gast prüfst, ob alles passt.' }
    ]
  },
  {
    id: 'manage-troubleshoot',
    cat: 'tools',
    events: ['all'],
    title: 'Problemlösung in GET Manage',
    problem: 'Wie finde ich einen Chip/Gast in GET Manage und welche Suchfelder gibt es?',
    tags: ['manage', 'suche', 'chipnummer', 'barcode', 'tag assignment'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { p: 'Login unter manage.get.systems. Kannst du dich nicht einloggen, wende dich an deinen Manager oder GET.' },
      { h: 'Suchfelder in der Troubleshoot-Sektion' },
      { ul: [
        'Chipnummer – die 14-stellige Nummer von der Rückseite des Armbands/der Karte.',
        'Barcode – der Ticket-Barcode (nicht die Bestellnummer!).',
        'Vorname und Nachname – Name der jeweiligen Person.',
        'E-Mail – bei personalisiertem Ticket die zugehörige E-Mail-Adresse.',
        'Zusätzliche Daten – nur nötig, wenn z. B. nur die letzten 4 Stellen der Kartennummer bekannt sind.'
      ] },
      { h: 'Informationen zum Chip finden' },
      { ol: [
        'Bei „ChipNr" die 14-stellige Chipnummer eingeben (Groß-/Kleinschreibung egal) und auf „Search" klicken.',
        'Es erscheinen vier Begriffe: Tag Assignment, Taglink, Tag, Tag session. Auf „VIEW TAG ASSIGNMENT" klicken für weitere Infos.',
        'In der Transaktionsübersicht jede Transaktion einzeln aufklappen für Details.'
      ] },
      { ul: [
        'Taglink: Info über den User im Eventportal.',
        'Tag: Infos wie Chipnummer und PIN.',
        'Tag session: welche Transaktion mit welchem Chip in welcher Session passiert ist.'
      ] },
      { warn: 'Offline-Transaktionen erscheinen in Manage erst, wenn sie an GET übermittelt wurden. Auch Zutrittskontrollen und Info-Abfragen an Self-Service-Stationen tauchen als Transaktion auf.' }
    ]
  },
  {
    id: 'support-tool',
    cat: 'tools',
    events: ['all'],
    title: 'Support-Tool in GET Manage nutzen',
    problem: 'Ich brauche Hilfe von GET und möchte einen Support-Fall (Support Case) anlegen.',
    tags: ['support', 'fall', 'case', 'chat', 'qr', 'manage', 'get kontakt', 'voraussetzungen', 'ohne bändchen', 'kein chip', 'ohne chip', 'handynummer'],
    source: 'GET Support handling tool 2026',
    body: [
      { h: 'Voraussetzungen' },
      { ul: [
        'Chip-Repair-Gerät, das von GET eingestellt wurde.',
        'Laptop mit Manage-Account – bitte vor Schichtbeginn unter manage.get.systems anmelden.',
        'Internet: Das Gerät muss online sein, um uns eine Nachricht senden zu können.'
      ] },
      { h: '1. Support-Tool öffnen' },
      { p: 'Auf manage.get.systems einloggen → zu „Troubleshoot" (1) und „Support Cases / Support Fälle" (2).' },
      { h: '2. Mobilgerät verbinden' },
      { ol: [
        'QR-Code im Support-Tool im Manage anzeigen.',
        'Auf dem Chip-Repair-Gerät auf „Chat login" tippen.',
        'QR-Code mit dem Gerät abscannen.'
      ] },
      { h: '3. Neuen Support-Case anlegen' },
      { p: 'Case am Mobilgerät öffnen – wahlweise per Chip, Ticketnummer oder Handynummer – und erste Informationen mitteilen:' },
      { ul: [
        'Ticket: Ticketnummer abscannen.',
        'Chip: Chip an den Reader halten oder Chipnummer eintippen.',
        'Handynummer: Mobilnummer des Gastes eingeben.',
        'Nächster Schritt: Kurzbeschreibung eingeben.'
      ] },
      { note: 'Kein Bändchen / kein Chip? Du brauchst ihn nicht – öffne den Fall einfach per Ticketnummer (Barcode scannen) oder Handynummer. Der Chip ist nur eine von drei Möglichkeiten. In GET Manage findest du die Person zusätzlich über Barcode, Name oder E-Mail.' },
      { h: '4. Support-Case bearbeiten' },
      { p: 'Ein Case läuft als Chat – du kannst am Laptop oder am Chip-Repair-Gerät arbeiten und folgst den Anweisungen des Support-Teams. Status: Geöffnet → In Bearbeitung → Geschlossen.' }
    ]
  },
  {
    id: 'ansprechpartner',
    cat: 'tools',
    events: ['all'],
    title: 'Ansprechpartner auf dem Event',
    problem: 'An wen wende ich mich bei Fragen oder Problemen?',
    tags: ['kontakt', 'ansprechpartner', 'hilfe', 'support'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { ul: [
        'Der Veranstalter: direkt an den Ansprechpartner vom Veranstalter-Team wenden – telefonisch oder per Mail.',
        'Das GET-Team vor Ort: GET-Standort auf dem Gelände besuchen oder das Support-Tool nutzen.'
      ] },
      { note: 'Event-spezifische Telefonnummern findest du im Tab „Referenz → Kontakte".' }
    ]
  },

  // ============================================================== CASHLESS-ARMBAND / CHIP
  {
    id: 'chip-defekt',
    cat: 'chip',
    events: ['all'],
    title: 'Chip reagiert nicht / ist defekt',
    problem: 'Der Chip reagiert / funktioniert nicht mehr.',
    tags: ['chip', 'defekt', 'reparatur', 'reagiert nicht', 'kaputt'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { h: 'Lösung: Chip-Reparatur' },
      { steps: [
        { t: 'Gerät entsperren', d: '' },
        { t: 'Chipnummer & PIN ausfüllen', d: 'Beides steht auf der Rückseite des Chips.' },
        { t: 'Rückseite des Chips checken', d: '' },
        { t: 'Warten, bis das Gerät reagiert', d: '' },
        { t: 'Neuen Chip anhalten', d: '' },
        { t: 'Vorgang abgeschlossen', d: '' }
      ] }
    ]
  },
  {
    id: 'chip-tausch',
    cat: 'chip',
    events: ['all'],
    title: 'Chip funktioniert, Band muss ersetzt werden',
    problem: 'Der Chip funktioniert, aber der Gast braucht ein neues Band (z. B. zu eng / falsche Farbe / beschädigt).',
    tags: ['chip', 'tausch', 'band', 'ersetzen', 'zu eng', 'farbe'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { h: 'Lösung: Chip-Tausch' },
      { steps: [
        { t: 'Gerät entsperren', d: '' },
        { t: 'Grund für Tausch auswählen', d: '' },
        { t: 'Gerät ist bereit', d: '' },
        { t: 'Alten Chip auf das Gerät halten', d: '' },
        { t: 'Warten, bis das Gerät reagiert', d: '' },
        { t: 'Neuen Chip anhalten', d: '' },
        { t: 'Vorgang abgeschlossen', d: '' }
      ] },
      { note: '„Cashless Armband zu eng / falsche Farbe" wird über denselben Chip-Tausch-Prozess gelöst.' }
    ]
  },
  {
    id: 'chip-verloren',
    cat: 'chip',
    events: ['all'],
    title: 'Chip verloren / gestohlen',
    problem: 'Der Chip wurde verloren oder gestohlen.',
    tags: ['chip', 'verloren', 'gestohlen', 'sperren', 'neu'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { h: 'Lösung: Chip Verloren' },
      { steps: [
        { t: 'Gerät entsperren', d: '' },
        { t: 'Erneut bestätigen', d: '' },
        { t: 'Chipnummer im Manage raussuchen', d: 'Über Name/Ticket/E-Mail in GET Manage.' },
        { t: 'Chipnummer auf dem Gerät eintragen', d: '' },
        { t: 'Warten, bis das Gerät reagiert', d: '' },
        { t: 'Neuen Chip anhalten', d: '' },
        { t: 'Vorgang abgeschlossen', d: '' }
      ] },
      { tip: 'Der verlorene Chip wird gesperrt – etwaiges Guthaben wandert auf den neuen Chip.' }
    ]
  },
  {
    id: 'qr-code-defekt',
    cat: 'chip',
    events: ['all'],
    title: 'QR-Code auf dem Chip funktioniert nicht',
    problem: 'Der QR-Code auf dem Cashless-Armband funktioniert nicht (Schnelles Top-Up).',
    tags: ['qr', 'code', 'top-up', 'eventportal', 'aufladen'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { h: 'Lösung: Schnelles Top-Up' },
      { steps: [
        { t: 'QR-Code scannen & Link öffnen', d: 'eventportal.io' },
        { t: 'Top-Up-Produkt auswählen', d: '' },
        { t: 'Kauf abschließen', d: '' },
        { t: 'Kauf erfolgreich', d: '' }
      ] },
      { warn: 'Das Top-Up funktioniert nur, wenn sich ein Ticket auf dem Chip befindet.' }
    ]
  },

  // ============================================================== TICKET & ZUTRITT
  {
    id: 'falsche-berechtigung',
    cat: 'ticket',
    events: ['all'],
    title: 'Falsche / fehlende Berechtigung',
    problem: 'Besucher hat keinen oder falschen Zutritt in einen Bereich (z. B. fehlende Duschrate, Camping, Geld).',
    tags: ['berechtigung', 'zutritt', 'camping', 'dusche', 'swap', 'flags'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { h: 'Lösung' },
      { ol: [
        'Prüfen, welche Bereiche nicht betreten werden können bzw. ob Zutritt gewährt werden sollte.',
        'Prüfen, ob alle Tickets des Besuchers geswappt (= auf sein Cashless-Armband übertragen) wurden.',
        'Falls ja: an GET wenden – mit Chipnummer und Ticketnummer.'
      ] }
    ]
  },
  {
    id: 'ticket-nicht-gueltig',
    cat: 'ticket',
    events: ['all'],
    title: 'Ticket ist nicht gültig',
    problem: 'Das Ticket des Besuchers ist nicht gültig.',
    tags: ['ticket', 'ungültig', 'gültigkeit', 'storno', 'gefälscht'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { h: 'Mögliche Gründe' },
      { ul: [
        'Ticket ist an einem anderen Tag gültig.',
        'Ticket ist an einem anderen Eingang gültig.',
        'Ticket wurde bereits verwendet.',
        'Ticket ist nicht original / gefälscht.',
        'Ticket ist aus dem Vorjahr.'
      ] },
      { h: 'Lösung' },
      { p: 'Ticket überprüfen. Ist das Problem nicht offensichtlich, den Teamlead / Vorgesetzten um Hilfe bitten.' }
    ]
  },
  {
    id: 'roter-punkt-scan',
    cat: 'ticket',
    events: ['all'],
    title: 'Roter Punkt beim Ticketscan („Tap again")',
    problem: 'Das Gerät zeigt einen roten Punkt beim Ticketscan.',
    tags: ['roter punkt', 'scan', 'tap again', 'success', 'transaktion'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { p: 'Der Transaktions-Vorgang wurde nicht durchgeführt.' },
      { h: 'Lösung' },
      { p: 'Den Chip nochmals an die Stirnseite des Gerätes halten, bis der grüne „SUCCESS"-Screen erscheint.' }
    ]
  },
  {
    id: 'ticket-chip-hinzufuegen',
    cat: 'ticket',
    events: ['all'],
    title: 'Ticket / Chip hinzufügen (Eventportal)',
    problem: 'Wie kann ich mein Ticket bzw. meinen Chip hinzufügen?',
    tags: ['eventportal', 'ticket hinzufügen', 'chip verlinken', 'pin', 'barcode'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { p: 'Auf eventportal.io gehen.' },
      { steps: [
        { t: 'QR-Code scannen oder Link öffnen', d: '' },
        { t: 'Ticket hinzufügen', d: 'Den Barcode vom Ticket eingeben – nicht die Bestellnummer! Nach dem Ticketscan ist der Chip mit dem Account verknüpft.' },
        { t: 'Chip hinzufügen', d: 'Falls kein Ticket hinterlegt ist, Chip manuell verlinken. Dafür Chipnummer und PIN (Rückseite des Chips).' }
      ] },
      { warn: 'Wichtig: nicht die Bestellnummer verwenden, sondern den Ticket-Barcode.' }
    ]
  },

  // ============================================================== GUTHABEN & CASHLESS
  {
    id: 'online-topup-fehlt',
    cat: 'guthaben',
    events: ['all'],
    title: 'Pre-/Online-Top-Up ist nicht auf dem Chip',
    problem: 'Vorab/online aufgeladenes Guthaben ist nicht auf dem Chip.',
    tags: ['online top-up', 'pre top-up', 'guthaben fehlt', 'chip info'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { h: 'Lösung' },
      { ol: [
        'Chip Info durchführen – häufig löst sich das Problem so bereits. Anschließend gemeinsam mit dem Gast prüfen, ob alles wieder funktioniert.'
      ] },
      { h: 'Problem nicht gelöst?' },
      { p: 'Folgende Infos an GET schicken:' },
      { ul: [
        'Chipnummer',
        'Ticketnummer',
        'Top-Up-Betrag',
        '(idealerweise auch Top-Up-Datum)'
      ] }
    ]
  },
  {
    id: 'selfservice-cash-storno',
    cat: 'guthaben',
    events: ['all'],
    title: 'Self-Service CASH: Geldschein eingezogen, kein Guthaben',
    problem: 'Stornierte Transaktion an der Cash-Station: Geldschein eingezogen – aber kein Guthaben auf dem Chip.',
    tags: ['self-service', 'cash', 'bargeld', 'storno', 'korrekturbuchung'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { steps: [
        { t: 'Guthaben überprüfen', d: 'Beim Gast nachfragen, wie viel einbezahlt wurde und ob EC oder CASH.' },
        { t: 'Chipnummer suchen', d: 'In GET Manage suchen und Transaktionen abrufen.' },
        { t: 'Transaktion überprüfen', d: 'Die richtige Buchung des Gastes raussuchen und den Status prüfen.' },
        { t: 'Korrekturbuchung vornehmen', d: 'Steht neben der Buchung „Abgebrochen", darf der Betrag korrekturgebucht werden.' }
      ] }
    ]
  },
  {
    id: 'selfservice-ec-storno',
    cat: 'guthaben',
    events: ['all'],
    title: 'Self-Service EC: Zahlung erfolgt, Betrag nicht auf dem Chip',
    problem: 'Stornierte Transaktion an der EC-Station: Zahlung per EC erfolgt – Betrag nicht auf dem Chip.',
    tags: ['self-service', 'ec', 'karte', 'storno', 'retour'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { steps: [
        { t: 'Guthaben überprüfen', d: 'Beim Gast nachfragen, wie viel einbezahlt wurde und ob EC oder CASH.' },
        { t: 'Chipnummer suchen', d: 'In GET Manage suchen und Transaktionen abrufen.' },
        { t: 'Transaktion überprüfen', d: 'Die richtige Buchung raussuchen und den Status prüfen.' },
        { t: 'Vorgang abschließen', d: 'Steht „Abgebrochen", darf NICHT korrekturgebucht werden – das Geld wird automatisch retour gebucht.' }
      ] },
      { warn: 'Bei EC niemals manuell korrekturbuchen, wenn „Abgebrochen" steht – sonst wird doppelt gebucht. Die Rückbuchung passiert automatisch.' }
    ]
  },
  {
    id: 'fehlbuchung',
    cat: 'guthaben',
    events: ['all'],
    title: 'Fehlbuchung: Guthaben ≠ gezahlter Betrag',
    problem: 'Aufgeladenes Guthaben stimmt nicht mit dem gezahlten Betrag überein.',
    tags: ['fehlbuchung', 'guthaben', 'kulanz', 'veranstalter', 'betreiber'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { steps: [
        { t: 'Chipnummer suchen', d: 'In GET Manage raussuchen und Transaktionen abrufen.' },
        { t: 'Transaktionen durchsehen', d: 'Der Gast soll sich die falsche Buchung notieren (Standname / Uhrzeit / Betrag).' },
        { t: 'Veranstalter kontaktieren', d: 'Für eine Kulanzlösung muss der Gast den Veranstalter im Nachgang kontaktieren.' }
      ] },
      { warn: 'GET kann keine Buchungen eines Betreibers stornieren oder korrigieren!' }
    ]
  },
  {
    id: 'guthaben-transfer',
    cat: 'guthaben',
    events: ['all'],
    title: 'Guthaben auf anderen Chip übertragen',
    problem: 'Das Guthaben soll von einem Chip auf einen anderen übertragen werden.',
    tags: ['transfer', 'guthaben', 'übertragen', 'chip wechsel'],
    source: 'GET Troubleshooting Guideline 2025/2026 (RaR, unverändert)',
    body: [
      { h: 'Lösung: Guthaben-Transfer' },
      { steps: [
        { t: 'Chip Info machen', d: '' },
        { t: 'Guthaben-Transfer starten', d: '' },
        { t: 'Betrag eingeben', d: '' },
        { t: 'Abzug vom 1. Chip', d: '' },
        { t: 'Hinzufügen zum 2. Chip', d: '' },
        { t: 'Transfer bestätigen', d: '' },
        { t: 'Vorgang abgeschlossen', d: '' }
      ] }
    ]
  },
  {
    id: 'geldauszahlung',
    cat: 'guthaben',
    events: ['all'],
    title: 'Gast möchte Geld auszahlen (Pay-Out)',
    problem: 'Der Besucher möchte sein Restguthaben auszahlen lassen.',
    tags: ['auszahlung', 'pay-out', 'restguthaben', 'eventportal', 'rückerstattung'],
    source: 'GET Troubleshooting Guideline 2025/2026 (unverändert)',
    body: [
      { p: 'Nach der Veranstaltung kann das Geld online über das Eventportal ausbezahlt werden. Wann genau, bestimmt der Veranstalter – das Datum steht auf seiner Website.' },
      { h: 'Auf eventportal.io kann der Besucher außerdem' },
      { ul: [
        'das aktuelle Guthaben einsehen,',
        'Geld aufladen / Produkte kaufen (falls vom Veranstalter angeboten),',
        'seine Transaktionen einsehen,',
        'Rechnungen / Belege herunterladen.'
      ] },
      { note: 'Rock am Ring: Pay-Out nach dem Festival über die RaR-Website (Cashless) per Eingabe der Chipnummer – genaues Datum siehe Website.' }
    ]
  },

  // ============================================================== TICKET SWAP
  {
    id: 'swap-scanner-entsperren',
    cat: 'swap',
    events: ['all'],
    title: 'Ticketscanner entsperren',
    problem: 'Wie entsperre ich das Ticket-Swap-Gerät?',
    tags: ['swap', 'scanner', 'entsperren', 'pin', '0000', 'worker-karte'],
    source: 'GET Ticket Swap Leitfaden 2026',
    body: [
      { h: 'Option 1 – PIN' },
      { p: 'Lange auf den gelben Button drücken und den PIN-Code eingeben (Standard: 0000).' },
      { h: 'Option 2 – Chip' },
      { p: 'Chip-Armband („dein Armbändchen") oder Chip-Karte („Worker-Karte") auf die Stirnseite des Gerätes halten.' }
    ]
  },
  {
    id: 'swap-prozess',
    cat: 'swap',
    events: ['all'],
    title: 'Ticket Swap – der Prozess',
    problem: 'Ticket(s) auf ein Cashless-Armband übertragen.',
    tags: ['swap', 'übertragen', 'armband', 'warenkorb', 'prozess'],
    source: 'GET Ticket Swap Leitfaden 2026',
    body: [
      { steps: [
        { t: 'Gerät entsperren', d: 'Karte/Armband ans Gerät halten oder lange auf den gelben Button drücken und PIN eingeben.' },
        { t: 'Ticket(s) scannen', d: 'Gelben Knopf an der Seite drücken, um Ticket-Barcodes / QR-Codes zu scannen.' },
        { t: 'Tickets werden angezeigt', d: 'Das Ticket erscheint im Warenkorb. Durch erneutes Scannen werden mehr Tickets hinzugefügt.' },
        { t: 'Armbandfarbe wird angezeigt', d: 'Das zu verwendende Armband wird angezeigt – dieses muss verwendet werden. Mit „OK" bestätigen.' },
        { t: 'Ticket Swap auf Armband', d: 'Chip hinten ans Gerät halten, um die Tickets zu übertragen, bis der nächste Screen erscheint.' },
        { t: 'Erfolgreiche Übertragung', d: 'Armband dem Besucher anlegen und mit „OK" bestätigen.' },
        { t: 'Neuen Scan starten', d: 'Der Ticket Swap ist abgeschlossen – der nächste kann direkt durchgeführt werden.' }
      ] }
    ]
  },
  {
    id: 'swap-geraet-sperren',
    cat: 'swap',
    events: ['all'],
    title: 'Gerät sperren / abmelden',
    problem: 'Wie melde ich mich vom Swap-Gerät ab?',
    tags: ['swap', 'abmelden', 'sperren', 'logout'],
    source: 'GET Ticket Swap Leitfaden 2026',
    body: [
      { steps: [
        { t: 'Menü öffnen', d: 'Direkt vom linken Bildschirmrand nach rechts wischen.' },
        { t: 'Auf „Abmelden" klicken', d: 'Nach unten scrollen und „Abmelden" wählen.' },
        { t: 'Zurück im Sperrbildschirm', d: 'Das Gerät ist gesperrt.' }
      ] }
    ]
  },
  {
    id: 'swap-probleme',
    cat: 'swap',
    events: ['all'],
    title: 'Häufige Swap-Probleme',
    problem: 'Ticket Swap nicht erfolgreich oder Ticket nicht gültig.',
    tags: ['swap', 'fehler', 'nicht erfolgreich', 'ungültig'],
    source: 'GET Ticket Swap Leitfaden 2026',
    body: [
      { h: 'Ticket Swap nicht erfolgreich' },
      { p: 'Der Vorgang wurde nicht durchgeführt. Lösung: Chip nochmals an die Stirnseite des Gerätes halten, bis der grüne „ERFOLGREICH"-Screen erscheint.' },
      { h: 'Das Ticket ist nicht gültig' },
      { p: 'Mögliche Gründe: anderer Tag, anderer Eingang, bereits verwendet, gefälscht. Lösung: Ticket überprüfen, bei Unklarheit den Vorgesetzten um Hilfe bitten.' }
    ]
  },

  // ============================================================== TOP-UP (P400)
  {
    id: 'p400-startbildschirm',
    cat: 'topup',
    events: ['all'],
    title: 'P400 – Startbildschirm verstehen',
    problem: 'Was zeigt der Startbildschirm des Top-Up-Geräts (P400)?',
    tags: ['p400', 'top-up', 'startbildschirm', 'reader'],
    source: 'GET Bemanntes Top-Up via P400 2025',
    body: [
      { ol: [
        'Akkuanzeige.',
        'Projektname.',
        'Site / Standort.',
        'Operator vom Gerät.',
        'RFID-Reader – befindet sich auf der Rückseite des Gerätes.'
      ] },
      { h: 'Good to know' },
      { ul: [
        'Das Gerät ist geliehen und muss am Ende der Veranstaltung zurück.',
        'Der Akku hält ca. 8 Stunden – selbstständig laden.',
        'Das Gerät ist für alle Wetterlagen geeignet.',
        'Bei Fragen an die zuständige Kontaktperson vor Ort wenden.'
      ] }
    ]
  },
  {
    id: 'p400-entsperren',
    cat: 'topup',
    events: ['all'],
    title: 'P400 entsperren & Bedienung',
    problem: 'Gerät entsperren und Mengen im Warenkorb anpassen.',
    tags: ['p400', 'entsperren', 'warenkorb', 'menge', 'bedienung'],
    source: 'GET Bemanntes Top-Up via P400 2025',
    body: [
      { p: 'Lange drücken bzw. Chip scannen, um das Gerät zu entsperren.' },
      { h: 'Bedienung' },
      { ul: [
        'Kurzer Druck auf den Artikel: Menge um 1 erhöhen.',
        'Langer Druck auf den Artikel: Menge um 1 verringern.',
        'Druck auf den Warenkorb: Mengen im Einkaufswagen anpassen.',
        'Langer Druck auf „Löschen": alle Artikel im Warenkorb löschen.'
      ] }
    ]
  },
  {
    id: 'p400-aufladen',
    cat: 'topup',
    events: ['all'],
    title: 'P400 – Geld aufladen mit Karte',
    problem: 'Guthaben per Karte auf ein Armband laden.',
    tags: ['p400', 'aufladen', 'karte', 'get pay', 'bezahlen'],
    source: 'GET Bemanntes Top-Up via P400 2025',
    body: [
      { steps: [
        { t: 'Gerät entsperren', d: 'Lange drücken.' },
        { t: 'Top-Up-Betrag auswählen', d: 'Artikel kurz drücken zum Erhöhen, lang drücken zum Verringern.' },
        { t: 'Eingabe bestätigen', d: 'Warenkorb prüfen (Gesamtbetrag & Artikel).' },
        { t: 'Zahlungsmethode auswählen', d: '„GET Pay" auswählen, dann auf „OK", um mit der Zahlung fortzufahren.' },
        { t: 'Zahlung am P400 abschließen', d: 'Karte anhalten, um zu bezahlen.' },
        { t: 'Wristband an die Rückseite halten', d: 'Chip des Besuchers an die Rückseite des Geräts.' },
        { t: 'Bildschirm zeigen & bestätigen', d: 'Dem Gast den Bildschirm zeigen und mit „OK" abschließen.' }
      ] }
    ]
  },
  {
    id: 'p400-storno',
    cat: 'topup',
    events: ['all'],
    title: 'P400 – letzte Transaktion stornieren',
    problem: 'Die zuletzt gebuchte Transaktion am P400 rückgängig machen.',
    tags: ['p400', 'storno', 'stornieren', 'letzte transaktion'],
    source: 'GET Bemanntes Top-Up via P400 2025',
    body: [
      { steps: [
        { t: 'Menü öffnen', d: 'Gerät ggf. entsperren.' },
        { t: '„Letzte Transaktion" wählen', d: 'Auf „Letzte Transaktionen" klicken, um die vorherige Transaktion anzuzeigen.' },
        { t: 'Bestellung stornieren', d: 'Auf „Storno" klicken.' },
        { t: 'Mit „OK" bestätigen', d: '' }
      ] }
    ]
  },

  // ============================================================== ROCK AM RING – CLEARING & BÄNDCHEN
  {
    id: 'rar-scanner-rot',
    cat: 'rar',
    events: ['rar'],
    title: 'Scanner leuchtet ROT – Ticket nicht gültig',
    problem: 'Beim Bändchentausch zeigt der Scanner rot.',
    tags: ['rar', 'scanner rot', 'ticket', 'clearing', 'cts', 'storno'],
    source: 'RaR25 Ticketing Clearing',
    body: [
      { ol: [
        'Prüfen, ob das Ticket aus Versehen doppelt vom Einlasspersonal gescannt wurde – MANAGE GET.',
        'CTS prüft das Ticket auf Gültigkeit.'
      ] },
      { h: 'Ergebnis der CTS-Prüfung' },
      { ul: [
        'Storno JA: Kunde wird abgewiesen.',
        'Storno NEIN: CTS prüft, was mit dem Ticket ist (Barcode defekt, nicht lesbar, etc.) – Kunde bekommt am Clearing sein Bändchen.'
      ] }
    ]
  },
  {
    id: 'rar-ticket-vergessen',
    cat: 'rar',
    events: ['rar'],
    title: 'Kunde hat sein Ticket vergessen',
    problem: 'Der Kunde hat kein physisches/digitales Ticket dabei.',
    tags: ['rar', 'ticket vergessen', 'barcode', 'bestellbestätigung', 'cts'],
    source: 'RaR25 Ticketing Clearing',
    body: [
      { ul: [
        'Kunde zeigt Bild mit Barcodes vor – muss über CTS geprüft werden, ob das Ticket dem Originalkäufer gehört.',
        'Kunde zeigt Bestellbestätigung vor – muss über CTS geprüft werden, ob das Ticket dem Originalkäufer gehört.'
      ] }
    ]
  },
  {
    id: 'rar-zusatztickets-vergessen',
    cat: 'rar',
    events: ['rar'],
    title: 'Zusatztickets (Camping) vergessen',
    problem: 'Camping-/Zusatztickets fehlen beim Check-In.',
    tags: ['rar', 'camping', 'zusatzticket', 'clearing', 'cts'],
    source: 'RaR25 Ticketing Clearing',
    body: [
      { ul: [
        'Müssen auch über den Clearing Point.',
        'Check durch CTS wie bei „Ticket vergessen" (Barcode-Bild oder Bestellbestätigung, Originalkäufer prüfen).'
      ] }
    ]
  },
  {
    id: 'rar-rip-zu-rar',
    cat: 'rar',
    events: ['rar'],
    title: 'Rock im Park kommt zu Rock am Ring',
    problem: 'Gast mit Rock-im-Park-Ticket steht bei Rock am Ring.',
    tags: ['rar', 'rock im park', 'rip', 'universal code', 'kombiticket'],
    source: 'RaR25 Ticketing Clearing',
    body: [
      { ul: [
        'Die Clearing Station hat einen Rock-im-Park-Scanner, um die Tickets zu validieren.',
        'Zudem liegen in jedem Container Universal Codes zum Scannen: Weekend Festival | General Camping | Green Camping.',
        'Clearing-Personal scannt die Universal Codes passend zum gekauften RiP-Ticket (nur Kombitickets Weekend Festival + General Camping). Kunde bekommt am Clearing sein Bändchen.'
      ] }
    ]
  },
  {
    id: 'rar-ticket-im-zielbereich',
    cat: 'rar',
    events: ['rar'],
    title: 'Ticket befindet sich bereits im Zielbereich',
    problem: 'Das Ticket gilt laut System als bereits eingelöst / im Zielbereich.',
    tags: ['rar', 'zielbereich', 'doppelt gescannt', 'manage'],
    source: 'RaR25 Ticketing Clearing',
    body: [
      { ul: [
        'Prüfen, ob das Ticket aus Versehen 2× gescannt wurde (siehe „Scanner rot", Punkt 1).',
        'Sind die Ticket-Infos in MANAGE nicht plausibel, muss ein neues Ticket gekauft werden.'
      ] }
    ]
  },
  {
    id: 'rar-falscher-eingang',
    cat: 'rar',
    events: ['rar'],
    title: 'Falscher Eingang',
    problem: 'Gast steht am falschen Eingang / der falschen Tauschstation.',
    tags: ['rar', 'eingang', 'station', 'kb', 'weiterleiten'],
    source: 'RaR25 Ticketing Clearing',
    body: [
      { p: 'Muss an den richtigen Bändchentausch gesendet werden. Welcher Ticket-Typ an welchen Tagen und an welcher Station scanbar ist, steht in der Referenz.' },
      { note: 'Details: Tab „Referenz → Ticket-Scan-Matrix".' }
    ]
  },
  {
    id: 'rar-checkin-ablauf',
    cat: 'rar',
    events: ['rar'],
    title: 'Einlassprozess – Festival & Camping',
    problem: 'Wie läuft der Check-In / Bändchentausch ab?',
    tags: ['rar', 'check-in', 'ablauf', 'bändchen', 'swap', 'festival', 'camping'],
    source: 'RaR26 Briefing Bändchentausch (Klangpiraten)',
    body: [
      { warn: 'Festivalticket UND Campingticket sind zusammen zwingend erforderlich! Immer zuerst fragen, ob der Gast auch ein Campingticket hat → dann Kombi-Band statt Festivalband.' },
      { ul: [
        'Nur Festivalticket = erst ab Freitag (Donnerstag Preparty) gültig → Einlass nur an B3.',
        'Nur Campingticket → an Info-/Clearingpoint verweisen.'
      ] },
      { h: 'Ablaufschritte' },
      { steps: [
        { t: 'Festivalticket scannen', d: '' },
        { t: 'Campingticket scannen', d: '' },
        { t: 'Passendes Armband auswählen', d: 'Das richtige Band wird vom Scanner angezeigt.' },
        { t: 'Festivalband/Chip koppeln (Swap)', d: 'Scanner an den Chip des Armbands halten – der Swap wird automatisch durchgeführt.' },
        { t: 'Bestätigung am Scanner prüfen', d: 'Scanner zeigt einen grünen Bildschirm – diesen dem Gast unbedingt zeigen.' },
        { t: 'Vorgebuchtes Guthaben anzeigen', d: 'Bildschirm mit dem Guthaben dem Gast zwingend zeigen und aktive Bestätigung per Blickkontakt einholen. Hinweis: Guthaben ist jetzt auf dem Armband.' },
        { t: 'Festivalband anlegen', d: 'Nicht zu fest, nicht zu locker (Richtwert: ca. 2 Finger breit Platz). Sicherstellen, dass es nicht mehr abgenommen werden kann.' }
      ] },
      { note: 'Ist der Scanner rot, muss die Person zum Clearing – im Container neben jeder Bändchentauschstation.' }
    ]
  },
  {
    id: 'rar-checkin-c',
    cat: 'rar',
    events: ['rar'],
    title: 'Check-In C – Standort & Öffnungszeiten',
    problem: 'Wo ist Check-In C, wann ist geöffnet und wie ist er erreichbar?',
    tags: ['rar', 'check-in c', 'standort', 'd10', 'öffnungszeiten', 'anreise', 'crew'],
    source: 'RaR Check-In C (Pick-Up Details)',
    body: [
      { h: 'Standort' },
      { ul: [
        'Nürburgring, Parkplatz D10',
        '50°20\'18.1"N 6°57\'04.5"E',
        '53520 Nürburg'
      ] },
      { h: 'Anreise' },
      { ul: [
        'Google Maps: https://maps.app.goo.gl/FgiCbdug5JNLWUYk6',
        'Staufreie Anreise mit der NUNAV-App: www.rock-am-ring.com/directions/check-in-b-c'
      ] },
      { h: 'Kontakt' },
      { ul: [
        'Telefon: +49 2691 8099291',
        'E-Mail: checkin@rock-am-ring.com'
      ] },
      { note: 'Klickbare Links (Karte, Telefon, E-Mail) findest du unter „Referenz → Kontakte".' },
      { h: 'Öffnungszeiten 2026' },
      { ul: [
        'Mo, 01.06.2026: 07:00 – 20:00 Uhr',
        'Di, 02.06.2026: 07:00 – 20:00 Uhr',
        'Mi, 03.06.2026: 07:00 – 23:00 Uhr',
        'Do, 04.06.2026: 07:00 – 23:00 Uhr',
        'Fr, 05.06.2026: 07:00 – 19:00 Uhr',
        'Sa, 06.06.2026: 10:00 – 19:00 Uhr',
        'So, 07.06.2026: 10:00 – 19:00 Uhr'
      ] }
    ]
  },
  {
    id: 'rar-cashless-kommunikation',
    cat: 'rar',
    events: ['rar'],
    title: 'Cashless erklären – die 4 Schritte',
    problem: 'Wie erkläre ich Gästen das Cashless-System?',
    tags: ['rar', 'cashless', 'register', 'top-up', 'pay-out', 'kommunikation'],
    source: 'RaR25 Briefing Bändchentausch',
    body: [
      { p: 'Rock am Ring ist Cashless – außer im LIDL Rockstore wird alles mit dem Chip am Festival-Wristband bezahlt.' },
      { steps: [
        { t: 'Register & Top-Up', d: 'Vor dem Festival das Ticket registrieren und direkt Guthaben aufladen.' },
        { t: 'Wristband', d: 'Am Festival-Check-In wird das Ticket gegen ein Wristband inkl. Cashless-Chip getauscht.' },
        { t: 'Pay', d: 'Bargeldlos auf dem Festival zahlen. Über App und Top-Up-Stationen jederzeit nachladen.' },
        { t: 'Pay-Out', d: 'Restguthaben nach dem Festival über die RaR-Website zurückfordern (genaues Datum siehe Website).' }
      ] }
    ]
  },
  {
    id: 'rar-wristband-typen',
    cat: 'rar',
    events: ['rar'],
    title: 'Ticket- & Bändchen-Typen 2026',
    problem: 'Welche Tickets/Bändchen gibt es und wo werden sie getauscht?',
    tags: ['rar', 'wristband', 'bändchen', 'kombi', 'vip', 'fastlane', 'experience', 'utopia', 'papierband'],
    source: 'RaR26 Briefing Bändchentausch (Klangpiraten)',
    body: [
      { h: 'Festival Ticket (ohne Camping)' },
      { p: 'Gültig an allen drei Veranstaltungstagen 05.–07. Juni 2026 (jeweilige Öffnungszeiten). Nur Zutritt zum Infield (Konzertgelände) – zum Parken/Campen ist ein zusätzliches Parking-/Camping-Ticket nötig.' },
      { warn: 'Immer erst fragen, ob der Gast auch ein Camping Ticket hat. Dann Kombi-Band statt Festivalband ausgeben!' },
      { h: 'Kombi-Ticket (Festival + Camping)' },
      { p: 'Kombi-Stoffband (Festival + Camping in einem), mit Cashless-Chip → Swap nötig.' },
      { h: 'Experience & Utopia Stage Camping' },
      { p: 'Diese Tickets sind 2× gültig (Camping & Festival für 2 Personen). Das Ticket kann aber nur einmal entwertet werden – die zweite Person wird über einen Universal Code eingecheckt.' },
      { h: 'VIP Ticket (kein Upgrade)' },
      { ul: [
        'Check-In im Nürburgring Info Center.',
        'Kombi-Stoffband – die Person braucht KEIN zusätzliches Festivalticket.',
        'Hat Zugang zum VIP Camp/Parken → beim Check-In erfragen, ob eine VIP-Parking-Vignette benötigt wird.'
      ] },
      { h: 'VIP Upgrade' },
      { p: 'Zusatzticket zum Festivalticket; Zugang zu Boxendach, Balkon (Laubengang) und je nach Auslastung Zonen A & B vor der Utopia Stage. Einlösen im Outfield- oder Infield-Infopoint: Ticket scannen → Band ausgeben. Bei Kauf im Cashless Shop / als Bundle wird beim Festival-Check-In eine Flag auf den Chip gespielt, die an den Infopoints ausgelesen wird.' },
      { h: 'Fast Lane Upgrade' },
      { p: 'Zusatzticket, garantiert schnellen Zugang zu Zone A & B der Utopia Stage. Einlösen im Outfield- oder Infield-Infopoint (Ticket scannen → Band). Bei Cashless-Shop-/Bundle-Kauf Flag auf dem Chip (wie VIP Upgrade).' },
      { note: 'Fastlane Friday: exklusiv für den Linkin-Park-Fanclub und ausschließlich am Check-In Outfield.' },
      { h: 'Nur Camping (kein Festivalticket)' },
      { p: 'Gäste mit nur Campingticket erhalten KEIN Stoffband, sondern ein Papierband (ohne Chip) am Clearing Counter (Container) neben der Check-In-Station. Für Käufe gibt es eine Cashless Card für 5 € an B3 (KB1). Die Anzahl ausgegebener Papierbänder wird pro Station dokumentiert.' },
      { h: 'rockAbility Camping' },
      { p: 'Voraussetzung: reguläres Festivalticket + Schwerbehindertenausweis mit Merkzeichen (B, G, aG, H, BL). Platz ist limitiert/ausgebucht, nur nach vorheriger Anmeldung, max. zwei Begleitpersonen, gemeinsame Anreise im Fahrzeug. Die zweite Begleitperson benötigt ein reguläres General-Camping-Ticket.' }
    ]
  },
  {
    id: 'rar-baendchen-station',
    cat: 'rar',
    events: ['rar'],
    title: 'Welches Bändchen an welcher Station?',
    problem: 'An welcher Check-In-Station wird welches Ticket/Bändchen getauscht?',
    tags: ['rar', 'bändchen', 'station', 'b3', 'kb', 'festival only', 'kombi', 'camping', 'tausch', 'eingang'],
    source: 'RaR26 Festivalbändchen-Übersicht',
    body: [
      { h: 'Festival ONLY (ohne Camping) → NUR an B3' },
      { ul: [
        'Festival Ticket',
        'Fast Lane Pass & Festival Ticket',
        'VIP Upgrade & Festival Ticket'
      ] },
      { warn: 'Reine Festivaltickets (ohne Campingticket) werden ausschließlich an Station B3 getauscht – nicht an den anderen KBs.' },
      { h: 'Festival + Camping (Kombi) → an ALLEN KBs' },
      { p: 'Kombinationen aus Festival- + Campingticket (auch mit Fast Lane Pass bzw. VIP Upgrade) werden an allen Kassenbereichen getauscht – für folgende Camping-Kategorien:' },
      { ul: [
        'General Camping + Parking',
        'Green Camping + Parking',
        'Green Power Camping + Parking',
        "Rock'n'Roll Camping + Parking",
        'Caravan Camping',
        'Car & Tent Camping',
        'Utopia Stage Camping + Parking',
        "Racetrack Rock'n'Roll Camping + Parking",
        'Experience Camping – The Rockotel / The Rocksuite / The Lodge / The Rockrelax / The Rockrelax Premium'
      ] },
      { note: 'Diese Kombi-Tickets gibt es jeweils auch als „Fast Lane Pass & Festival" und „VIP Upgrade & Festival" – ebenfalls an allen KBs.' },
      { h: 'Upgrades' },
      { ul: [
        'VIP Upgrade – Weekend',
        'Fast Lane Pass – Weekend'
      ] },
      { p: 'Upgrades werden an den Infopoints eingelöst (siehe „Ticket- & Bändchen-Typen 2026").' },
      { h: 'Besonderheit' },
      { ul: ['Festival Ticket mit Rabattstufe „VIP Comps".'] }
    ]
  },
  {
    id: 'rar-good-to-know',
    cat: 'rar',
    events: ['rar'],
    title: 'Good to know – häufige Gästefragen',
    problem: 'Typische Fragen von Gästen am Clearing/Check-In.',
    tags: ['rar', 'faq', 'top-up', 'pay-out', 'shuttle', 'dusche', 'fast lane'],
    source: 'RaR25 Briefing Bändchentausch',
    body: [
      { h: 'Wie lade ich den Chip mit Geld auf?' },
      { p: 'An 15 Self-Service-Stationen im Outfield (mit Top-Up-Symbol im Geländeplan) und an Top-Up-Möglichkeiten im Infield.' },
      { h: 'Was passiert mit meinem Restguthaben? (Pay-Out)' },
      { p: 'Nach dem Festival auf der RaR-Website unter „Cashless" mit Eingabe der Chipnummer das nicht verbrauchte Guthaben aufs Konto gutschreiben lassen (genaues Datum/Uhrzeit siehe Website).' },
      { h: 'Gibt es Shuttle- oder Duschbändchen?' },
      { p: 'Nein. Nutzung aller sanitären Einrichtungen und des Bus-Shuttleservice ist in allen Tickets inklusive.' },
      { h: 'Wo gibt es das Fast-Lane-Bändchen?' },
      { p: 'Fast Lane ist ein Upgrade und wird im Outfield- oder Infield-Infopoint gegen Band getauscht (siehe „Ticket- & Bändchen-Typen 2026"). Es garantiert schnellen Zugang zu Zone A & B der Utopia Stage.' }
    ]
  },
  {
    id: 'rar-awareness',
    cat: 'rar',
    events: ['rar'],
    title: 'Awareness – was tun, wenn sich jemand meldet?',
    problem: 'Eine Person braucht Unterstützung oder meldet sich mit einem Code.',
    tags: ['rar', 'awareness', 'code', 'panama', 'luisa', 'guardian angels', 'hilfe', 'übergriff'],
    source: 'RaR26 Awareness Crew-Briefing',
    body: [
      { warn: 'Codes, mit denen sich Betroffene möglicherweise melden: „AWARENESS" · „WO IST LUISA?" · „WO GEHT\'S NACH PANAMA?". Solche Personen immer ernst nehmen – sie brauchen Hilfe.' },
      { h: 'So verhältst du dich' },
      { ul: [
        'Person ernst nehmen und nicht allein stehen lassen.',
        'Nicht nach (Hinter-)Gründen fragen und das Anliegen nicht bewerten.',
        'An deine Supervisor:innen wenden, damit schnell passende Hilfe organisiert wird – oder das Awareness-Team direkt kontaktieren.'
      ] },
      { h: 'Notfälle zuerst' },
      { ul: [
        'Bei körperlicher Gewalt zuerst Sicherheitsdienst oder Polizei rufen.',
        'Bei medizinischen Notfällen zuerst den Sanitätsdienst rufen.'
      ] },
      { h: 'Awareness-Team (Guardian Angels)' },
      { ul: [
        'Rund um die Uhr für Besuchende da, erkennbar an den pinken Awareness-Westen.',
        'Telefon: +49 1523 6161051 · Funkkanal 28.',
        'Awareness Points: Infield (neben Infopoint) IH 20 · Outfield ai 47.'
      ] },
      { note: 'Kein Platz für Rassismus, Sexismus, Queerfeindlichkeit oder andere Diskriminierung. Grenzen respektieren, auf gegenseitiges Einverständnis achten.' }
    ]
  },

  // ---- Parookaville 2026 -----------------------------------------------------
  {
    id: 'pv-oeffnungszeiten',
    cat: 'pv',
    events: ['parookaville'],
    title: 'Öffnungszeiten – Büro, Zufahrt & Crew-Check-in',
    problem: 'Wann haben Produktionsbüro, Zufahrt und Crew-Check-in geöffnet?',
    tags: ['parookaville', 'pv', 'öffnungszeiten', 'produktionsbüro', 'klever tor', 'zufahrt', 'check-in', 'crew', 'p21', 'p23'],
    source: 'Parookaville 2026 – Crew-Infos (parookaville.com/de/crew-info)',
    body: [
      { h: 'Produktionsbüro' },
      { ul: [
        '29.06.–03.07.2026: 07:00–20:00 Uhr',
        'ab 04.07.2026: 08:00–14:00 Uhr'
      ] },
      { h: 'Klever Tor 2 (Produktionszufahrt)' },
      { ul: [
        '06.07.–16.07.2026: 07:00–20:00 Uhr'
      ] },
      { h: 'Festival Crew-Check-in (P21)' },
      { ul: [
        '14.07.2026: 16:00–20:00 Uhr',
        '15.07.–16.07.2026: 07:00–22:00 Uhr',
        '17.07.–19.07.2026: 07:00–00:00 Uhr'
      ] },
      { h: 'Campsite Crew-Check-in (P23)' },
      { ul: [
        '14.07.2026: 09:00–14:00 Uhr & 18:00–22:00 Uhr',
        '15.07.–19.07.2026: 07:00–22:00 Uhr'
      ] },
      { note: 'Angaben ohne Gewähr – Zeiten können sich kurzfristig ändern. Im Zweifel an der Quelle (parookaville.com/de/crew-info) prüfen.' }
    ]
  },
  {
    id: 'pv-crew-catering',
    cat: 'pv',
    events: ['parookaville'],
    title: 'Crew-Catering – Essenszeiten',
    problem: 'Wann gibt es Frühstück, Mittag- und Abendessen für die Crew?',
    tags: ['parookaville', 'pv', 'catering', 'essen', 'essenszeiten', 'frühstück', 'mittagessen', 'abendessen', 'crew', 'mahlzeit'],
    source: 'Parookaville 2026 – Crew-Infos (parookaville.com/de/crew-info)',
    body: [
      { h: 'Frühstück' },
      { ul: [
        '29.06.–12.07.2026: 07:00–09:00 Uhr',
        '13.07.–15.07.2026: 07:00–11:30 Uhr',
        'Pre-Party 16.07.2026: 07:00–11:30 Uhr',
        'Festival 17.–19.07.2026: 07:00–11:30 Uhr',
        '20.07.–30.07.2026: 07:00–09:00 Uhr',
        '31.07.2026: 07:00–09:00 Uhr'
      ] },
      { h: 'Mittagessen' },
      { ul: [
        '29.06.–12.07.2026: 12:00–14:00 Uhr',
        '13.07.–15.07.2026: 12:00–18:00 Uhr',
        'Pre-Party 16.07.2026: 12:00–18:00 Uhr',
        'Festival 17.–19.07.2026: 12:00–18:00 Uhr',
        '20.07.–30.07.2026: 12:00–14:00 Uhr',
        '31.07.2026: 12:00–14:00 Uhr'
      ] },
      { h: 'Abendessen' },
      { ul: [
        '29.06.–12.07.2026: 18:00–19:30 Uhr',
        '13.07.–15.07.2026: 18:00–21:00 Uhr',
        'Pre-Party 16.07.2026: 18:00–01:00 Uhr',
        'Festival 17.–19.07.2026: 18:00–01:00 Uhr'
      ] },
      { note: 'Für 20.07.–31.07.2026 ist kein Abendessen ausgewiesen. Angaben ohne Gewähr.' }
    ]
  },
  {
    id: 'pv-anreise-p22',
    cat: 'pv',
    events: ['parookaville'],
    title: 'Anreise & Parken – P22 Crew York',
    problem: 'Wie komme ich zum Parkplatz P22 Crew York und weiter aufs Gelände?',
    tags: ['parookaville', 'pv', 'anreise', 'parken', 'p22', 'crew york', 'shuttle', 'weeze', 'route'],
    source: 'Parookaville 2026 – Crew-Infos (parookaville.com/de/crew-info)',
    body: [
      { warn: 'Nur für Crew, die in Crew York untergebracht ist (Parkticket P22).' },
      { h: 'Route' },
      { steps: [
        { t: 'Beschilderung zum Flughafen Weeze folgen', d: '' },
        { t: 'Nicht durch die Hauptschranke fahren', d: 'Stattdessen die 2. Ausfahrt im Kreisverkehr nutzen.' },
        { t: 'Einfahrt Crew York', d: 'Nach ca. 800 m auf der rechten Seite – hier ist auch der Parkplatz P22 Crew York.' },
        { t: 'Mit dem Crew-Shuttle aufs Festivalgelände', d: 'Vom Parkplatz P22 fährt der Crew-Shuttle zum Gelände.' }
      ] }
    ]
  },
  {
    id: 'pv-kp-meeting',
    cat: 'pv',
    events: ['parookaville'],
    title: 'Klangpiraten-Meeting & Anreise',
    problem: 'Wann/wo ist das Gesamtmeeting, und wie plane ich An- und Abreise?',
    tags: ['parookaville', 'pv', 'meeting', 'anreise', 'abreise', 'schulung', 'fahrgemeinschaft', 'klangpiraten', 'p23'],
    source: 'Klangpiraten Infomail – Parookaville 2026',
    body: [
      { h: 'Gesamtmeeting' },
      { ul: ['Dienstag, 14.07.2026, 17:30 Uhr', 'Treffpunkt: Eingang Basic Camping', 'Parken auf P23, dann zu Fuß zum Treffpunkt'] },
      { h: 'Inhalt' },
      { ul: ['Begrüßung & Allgemeines', 'Schulung/Einweisung für Bändertausch & Cashless', 'Im Anschluss gemeinsam ins Crew-Catering zum Abendessen'] },
      { warn: 'Vorher zur Akkreditierung gehen! Ohne Akkreditierung kein Zutritt aufs Gelände oder ins Catering.' },
      { h: 'Anreise' },
      { ul: ['Rechtzeitig anreisen, um 17:30 Uhr am Meeting zu sein', 'Fahrgemeinschaften über die Fahrgemeinschaftsgruppe in der WhatsApp-Community organisieren'] },
      { h: 'Abreise' },
      { p: 'Selbstständig nach der letzten Schicht planbar.' },
      { note: 'Sonstige Meetings werden separat in der Gruppe oder per DM angekündigt.' }
    ]
  },
  {
    id: 'pv-kp-akkreditierung',
    cat: 'pv',
    events: ['parookaville'],
    title: 'Akkreditierung & Crew-Check-in',
    problem: 'Wo hole ich Bändchen/Carpass, und was muss ich mitbringen?',
    tags: ['parookaville', 'pv', 'akkreditierung', 'check-in', 'bändchen', 'carpass', 'ausweis', 'basic camping', 'crew york'],
    source: 'Klangpiraten Infomail – Parookaville 2026',
    body: [
      { p: 'Akkreditierung / Bändchen / Carpässe gibt es bei Ankunft vor Ort an der Akkreditierung.' },
      { warn: 'Gültiges Ausweisdokument zwingend erforderlich!' },
      { h: 'Check-in-Standorte (Dienstag)' },
      { ul: ['Eingang Basic Camping: Di 10:00–22:00 Uhr', 'Eingang Crew York: Di 16:00–22:00 Uhr'] },
      { h: 'Vorab online' },
      { p: 'Die Akkreditierung muss jede*r selbstständig online vervollständigt haben (die E-Mail dazu wurde im Vorfeld verschickt).' },
      { note: 'Auch während der Arbeitszeit stets ein gültiges Ausweisdokument mitführen (für eventuelle Kontrollen).' }
    ]
  },
  {
    id: 'pv-kp-crew-camp',
    cat: 'pv',
    events: ['parookaville'],
    title: 'Crew-Camp – Crew York (Fläche E)',
    problem: 'Wo campt die Klangpiraten-Crew?',
    tags: ['parookaville', 'pv', 'camping', 'crew york', 'fläche e', 'hausordnung'],
    source: 'Klangpiraten Infomail – Parookaville 2026',
    body: [
      { ul: ['Gecampt wird im Crew York', 'Für die Klangpiraten ist die Fläche E reserviert (wie letztes Jahr) – wir campen als Crew zusammen'] },
      { note: 'Der genaue Standort kommt am Montag in die Ankündigungen der WhatsApp-Community.' },
      { warn: 'Crew-York-Hausordnung durchlesen und an die Regeln halten!' }
    ]
  },
  {
    id: 'pv-kp-kleidung',
    cat: 'pv',
    events: ['parookaville'],
    title: 'Arbeits- & Sicherheitskleidung',
    problem: 'Was muss ich tragen (Warnweste, T-Shirt, Schuhe)?',
    tags: ['parookaville', 'pv', 'kleidung', 'warnweste', 'sicherheit', 'cashless', 'ing', 'schuhe'],
    source: 'Klangpiraten Infomail – Parookaville 2026',
    body: [
      { h: 'Warnkleidung' },
      { ul: ['Gelbe Warnwesten werden beim Gesamtmeeting ausgeteilt', 'Außerhalb der Showzeiten auf dem gesamten Gelände tragen'] },
      { h: 'Bändertausch' },
      { ul: ['Während der Arbeitszeit Warnweste tragen', 'Stationsleitungen tragen orange Warnwesten (gut erkennbar)'] },
      { h: 'Cashless' },
      { p: 'Für die Arbeit an den Cashless-Stationen gibt es von der ING gebrandete T-Shirts – bitte überziehen.' },
      { h: 'Schuhwerk' },
      { p: 'Festes, geschlossenes Schuhwerk tragen. Keine Flip-Flops oder Latschen!' },
      { warn: 'Sicherheitsbestimmungen unbedingt einhalten – ein Verstoß kann zum Ausschluss von der Veranstaltung führen!' }
    ]
  },
  {
    id: 'pv-kp-catering',
    cat: 'pv',
    events: ['parookaville'],
    title: 'Catering – Regeln & Ablauf',
    problem: 'Wie funktioniert die Verpflegung im Crew-Catering?',
    tags: ['parookaville', 'pv', 'catering', 'verpflegung', 'essen', 'abscannen', 'mahlzeiten'],
    source: 'Klangpiraten Infomail – Parookaville 2026',
    body: [
      { ul: ['An Arbeitstagen 3 Mahlzeiten im Crew-Catering (alle Klangpirat*innen sind eingebucht)', 'Dienstagabend nach dem Gesamtmeeting sind alle im Catering eingeplant'] },
      { warn: 'Essen immer abscannen! Wird es nicht an den Arbeitsplatz geliefert, selbstständig im Catering einnehmen oder zumindest abscannen. Nicht abgeholte/abgescannte Mahlzeiten führen zur Verantwortung – für euch und uns.' },
      { ul: ['Genug Zeit vor der Schicht fürs Catering und die Wege zum Einsatzort einplanen', 'Kein Arbeitstag = kein Zutritt zum Catering', 'Kaffee/Getränke gibt es auch im Bereich vor dem Scan-Eingang'] },
      { note: 'Das Essenskontingent ist begrenzt – nehmt nur, was euch zusteht.' }
    ]
  },
  {
    id: 'pv-kp-dienstplan',
    cat: 'pv',
    events: ['parookaville'],
    title: 'Dienstplan & Schichttausch',
    problem: 'Wann kommt der Einsatzplan, und wie tausche ich Schichten?',
    tags: ['parookaville', 'pv', 'dienstplan', 'einsatzplan', 'schichttausch', 'whatsapp'],
    source: 'Klangpiraten Infomail – Parookaville 2026',
    body: [
      { h: 'Dienstplan' },
      { p: 'Der Einsatzplan wird spätestens am Dienstag per Mail verschickt.' },
      { h: 'Schichttausch' },
      { ul: ['Über die Schichttausch-WhatsApp-Gruppe möglich', 'Mittwoch und Donnerstag sind keine Tausche möglich', 'Kein Tausch mit Personen aus dem Akkreditierungsteam', 'Jeder Tausch muss genehmigt werden – nicht alle Wünsche können erfüllt werden'] },
      { note: 'Genaue Anleitung in der Gruppenbeschreibung (siehe Guide „Schichttausch – Nachrichten-Vorlagen"). Die Infomail nennt „ab Freitag 17.06." – der Festival-Freitag ist der 17.07.2026; im Zweifel mit dem Büro / der Schichttausch-Gruppe abklären.' }
    ]
  },
  {
    id: 'pv-kp-arbeitszeiten',
    cat: 'pv',
    events: ['parookaville'],
    title: 'Arbeitszeiten & Pausen',
    problem: 'Wie werden Arbeitszeiten dokumentiert, welche Pausen gelten?',
    tags: ['parookaville', 'pv', 'arbeitszeit', 'pausen', 'pausenregelung', 'unterschrift'],
    source: 'Klangpiraten Infomail – Parookaville 2026',
    body: [
      { ul: ['Arbeits- und Pausenzeiten werden von der Stationsleitung vor Ort dokumentiert', 'Alle müssen für ihre Arbeitszeiten unterschreiben', 'Bei Fragen direkt die Stationsleitung und/oder die zuständige Schichttausch-Person ansprechen'] },
      { h: 'Pausen (verpflichtend)' },
      { ul: ['0–6 h Arbeitszeit: keine Pause', '6,1–8 h: 30 min', '8,1–10 h: 45 min', '10,1–12 h: 60 min'] },
      { warn: 'Keine selbstständige Pausennahme – nur nach Bestätigung durch die Stationsleitung. Pausenzeiten genau einhalten!' },
      { note: 'Arbeitszeit über 10 h nur in Ausnahmesituationen und ausschließlich mit Einverständnis der Mitarbeiter*innen & der Gesamtleitung.' }
    ]
  },
  {
    id: 'pv-kp-leitfaeden',
    cat: 'pv',
    events: ['parookaville'],
    title: 'Leitfäden & Verhaltensregeln',
    problem: 'Welche Anhänge/Leitfäden gelten, und was erwartet Klangpiraten?',
    tags: ['parookaville', 'pv', 'leitfäden', 'anhänge', 'verhaltensregeln', 'crewlove', 'bargeld', 'bänder', 'topup', 'ticket swap', 'hausordnung'],
    source: 'Klangpiraten Infomail – Parookaville 2026',
    body: [
      { h: 'Bitte sorgfältig lesen (Anhänge der Infomail)' },
      { ul: ['Klangpiraten-Verhaltensregeln', 'Anweisung Bargeld', 'Anweisung Bänder', 'Leitfaden Top-Up', 'Leitfaden Ticket Swap', 'Crew-York-Hausordnung'] },
      { note: 'Die eigentlichen Leitfäden sind separate Dokumente. Allgemeine GET-Anleitungen zu Top-Up und Ticket Swap findest du im Bereich „GET Cashless".' },
      { h: 'Crewlove' },
      { ul: ['Zuverlässigkeit und verantwortliches Handeln', 'Achtsamer, wertschätzender Umgang mit allen Menschen', 'Keine Diskriminierung oder Diffamierung'] },
      { p: 'Nach Feierabend sind wir auch „Gäste des Festivals" – genießt Parookaville, schaut euch Bands und DJ-Sets an, habt Spaß.' }
    ]
  },
  {
    id: 'pv-kp-schichttausch-vorlagen',
    cat: 'pv',
    events: ['parookaville'],
    title: 'Schichttausch – Nachrichten-Vorlagen',
    problem: 'Wie schreibe ich Angebot/Suche/Tausch/Übernahme in der Schichttausch-Gruppe aus?',
    tags: ['parookaville', 'pv', 'schichttausch', 'tausch', 'übernahme', 'whatsapp', 'vorlage', 'gruppe'],
    source: 'Klangpiraten Schichttausch-Gruppe – Parookaville 2026 (Gruppenbeschreibung)',
    body: [
      { p: 'So werden Schichten in der WhatsApp-Schichttausch-Gruppe der Klangpiraten-Crew (Parookaville 2026) ausgeschrieben. Bitte genau an die Vorlagen halten.' },
      { h: 'Schicht anbieten' },
      { p: 'Ich „Nr. + Vor- und Nachname" BIETE „Tag, Schichtdaten (Dienstzeiten & Position), Station"' },
      { h: 'Schicht suchen' },
      { p: 'Ich „Nr. + Vor- und Nachname" SUCHE „Tag, Schichtdaten (Tag & Dienstzeiten & Position), Station"' },
      { h: 'Fixer Tausch' },
      { p: '„Vor- und Nachname" „Tag, Schichtdaten" TAUSCHT mit „Vor- und Nachname" „Tag + Schichtdaten"' },
      { h: 'Übernahme (ohne Tausch)' },
      { p: '„Vor- und Nachname" ÜBERNIMMT die Schicht von „Vor- und Nachname" „Tag, Schichtdaten"' },
      { h: 'Bestätigung' },
      { ul: ['Der Tausch bzw. die Übernahme wird durch das Büro bestätigt', 'Nach Bestätigung selbstständig der Stationsleitung mitteilen!'] },
      { warn: 'Erst nach Bestätigung durch das Büro gilt der Tausch – danach unbedingt die Stationsleitung informieren!' },
      { note: 'Wann Tausche möglich sind (nicht Mittwoch/Donnerstag, kein Tausch mit dem Akkreditierungsteam, Genehmigungspflicht), steht im Guide „Dienstplan & Schichttausch".' }
    ]
  }
];

// Schneller Lookup
export function getGuide(id) {
  return GUIDES.find((g) => g.id === id);
}

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id);
}
