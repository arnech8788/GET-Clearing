// Line-Up / Timetables je Festival (event-id → { title, imageSrc, days }).
// Reine Daten. Favoriten pro Set liegen in state.lineupFavorites (ID-Strings,
// gebildet aus event|day|floor|von|artist – siehe src/lineup.js#setId).
//
// Set: { von, bis, artist, note? }. Ohne Uhrzeit (von/bis leer) + note z. B.
// "All Night Long".

export const LINEUP = {
  natureone: {
    title: 'NATURE ONE 2026 · Timetable – Headfloors',
    imageSrc: '/no-lineup.jpg',
    days: [
      {
        day: 'Freitag',
        floors: [
          { floor: 'Open Air Floor', color: '#e5399a', sets: [
            { von: '19:00', bis: '21:00', artist: 'Jasmin Blust' },
            { von: '21:00', bis: '22:30', artist: 'Dominik Eulberg' },
            { von: '22:30', bis: '00:00', artist: 'Paul Kalkbrenner', info: 'Berliner Techno-Produzent & Live-Act – bekannt durch „Berlin Calling" und „Sky and Sand".' },
            { von: '00:00', bis: '01:30', artist: 'Paul van Dyk' },
            { von: '01:30', bis: '03:00', artist: 'Neelix' },
            { von: '03:00', bis: '04:30', artist: 'Bennett' },
            { von: '04:30', bis: '06:00', artist: 'Rewi' }
          ] },
          { floor: 'Century Circus', color: '#d69a2d', sets: [
            { von: '19:00', bis: '21:00', artist: 'Ties van Dun' },
            { von: '21:00', bis: '22:30', artist: 'Felix Kröcher' },
            { von: '22:30', bis: '00:00', artist: 'Schrotthagen' },
            { von: '00:00', bis: '01:30', artist: 'Sven Väth', info: 'Techno-Urgestein aus Frankfurt und Gründer des Cocoon-Labels.' },
            { von: '01:30', bis: '03:00', artist: 'Klaudia Gawlas' },
            { von: '03:00', bis: '04:30', artist: 'Fantasm' },
            { von: '04:30', bis: '06:00', artist: 'A.N.I.' }
          ] },
          { floor: 'Classic Terminal', color: '#2f8fc7', sets: [
            { von: '20:00', bis: '21:30', artist: 'Sunshine Live DJ Team' },
            { von: '21:30', bis: '23:00', artist: 'Talla 2XLC' },
            { von: '23:00', bis: '00:30', artist: 'Judge Jules' },
            { von: '00:30', bis: '02:00', artist: 'Westbam' },
            { von: '02:00', bis: '03:30', artist: 'DJ Quicksliver' },
            { von: '03:30', bis: '05:00', artist: 'Schiller' },
            { von: '05:00', bis: '06:00', artist: 'Mijk van Dijk' }
          ] },
          { floor: 'Syndicate Zone', color: '#8b5cf6', sets: [
            { von: '20:00', bis: '21:00', artist: 'Distress' },
            { von: '21:00', bis: '22:00', artist: 'Act of Rage' },
            { von: '22:00', bis: '23:00', artist: 'Rebelion' },
            { von: '23:00', bis: '00:00', artist: 'Predator vs. Vince' },
            { von: '00:00', bis: '01:00', artist: 'Hysta' },
            { von: '01:00', bis: '02:00', artist: 'D-Fence vs. Karun' },
            { von: '02:00', bis: '03:00', artist: 'Angerfist', info: 'Niederländischer Hardcore-/Gabber-DJ – einer der bekanntesten des Genres.' },
            { von: '03:00', bis: '04:00', artist: 'N-Vitral' },
            { von: '04:00', bis: '05:00', artist: '99prblmz' },
            { von: '05:00', bis: '06:00', artist: 'DRS' },
            { von: '', bis: '', artist: 'Nolz', note: 'All Night Long' }
          ] }
        ]
      },
      {
        day: 'Samstag',
        floors: [
          { floor: 'Open Air Floor', color: '#e5399a', sets: [
            { von: '18:00', bis: '19:00', artist: 'Nena Polap' },
            { von: '19:00', bis: '20:30', artist: 'Nick Schwenderling' },
            { von: '20:30', bis: '22:00', artist: 'Gestört aber Geil' },
            { von: '22:00', bis: '23:30', artist: 'Felix Jaehn' },
            { von: '23:30', bis: '01:10', artist: 'Fatboy Slim', info: 'Britischer Big-Beat-DJ (Norman Cook) – „Praise You", „Right Here, Right Now".' },
            { von: '01:10', bis: '01:30', artist: 'Nature One Inc.' },
            { von: '01:30', bis: '03:00', artist: 'Alle Farben' },
            { von: '03:00', bis: '04:30', artist: 'Holy Priest' },
            { von: '04:30', bis: '06:00', artist: 'Einmusik b2b Solee' },
            { von: '06:00', bis: '08:00', artist: 'DJ Dag' }
          ] },
          { floor: 'Century Circus', color: '#d69a2d', sets: [
            { von: '18:00', bis: '19:30', artist: 'Peter Pahn' },
            { von: '19:30', bis: '21:00', artist: 'Gregor Tresher' },
            { von: '21:00', bis: '22:30', artist: 'Ueberrest' },
            { von: '22:30', bis: '00:00', artist: 'Yanamaste' },
            { von: '00:00', bis: '01:30', artist: 'Lilly Palmer' },
            { von: '01:30', bis: '03:00', artist: 'I Hate Models' },
            { von: '03:00', bis: '04:30', artist: 'Alignment' },
            { von: '04:30', bis: '06:00', artist: 'Cristobal Pesce' },
            { von: '06:00', bis: '07:30', artist: 'Pappenheimer' }
          ] },
          { floor: 'Classic Terminal', color: '#2f8fc7', sets: [
            { von: '18:00', bis: '19:30', artist: 'Fräggel b2b Raoul' },
            { von: '19:30', bis: '21:00', artist: 'Woody van Eyden' },
            { von: '21:00', bis: '22:30', artist: 'Da Hool' },
            { von: '22:30', bis: '00:00', artist: 'Jam El Mar' },
            { von: '00:00', bis: '01:30', artist: 'Mental Theo' },
            { von: '01:30', bis: '03:00', artist: 'DJ Raw (fka Dune)' },
            { von: '03:00', bis: '04:30', artist: 'Oliver Lieb' },
            { von: '04:30', bis: '06:00', artist: 'Kyau & Albert' }
          ] },
          { floor: 'Syndicate Zone', color: '#8b5cf6', sets: [
            { von: '18:00', bis: '19:00', artist: 'Insurgent' },
            { von: '19:00', bis: '20:00', artist: 'Insurgent' },
            { von: '20:00', bis: '21:00', artist: 'Crypsis' },
            { von: '21:00', bis: '22:00', artist: 'Omnya' },
            { von: '22:00', bis: '23:00', artist: 'D-Sturb' },
            { von: '23:00', bis: '00:00', artist: 'The Viper' },
            { von: '00:00', bis: '01:00', artist: 'Anime' },
            { von: '01:00', bis: '02:00', artist: 'Miss K8' },
            { von: '02:00', bis: '03:00', artist: 'The Dark Horror' },
            { von: '03:00', bis: '04:00', artist: 'Deadly Guns vs. Kili' },
            { von: '04:00', bis: '05:00', artist: 'Gezellige Uptempo' },
            { von: '05:00', bis: '06:00', artist: 'Roosterz vs. Juliëx' },
            { von: '', bis: '', artist: 'Alee', note: 'All Night Long' }
          ] }
        ]
      }
    ]
  },
  sanhejmo: {
    title: 'San Hejmo 2026 · Timetable',
    days: [
      {
        day: 'Donnerstag · 13.08.',
        floors: [
          { floor: 'PENNY Stage', color: '#e67e22', sets: [
            { von: '12:00', bis: '13:00', artist: 'David Teiner' },
            { von: '13:00', bis: '14:15', artist: 'Xela Vie' },
            { von: '14:15', bis: '15:30', artist: 'DBroke' },
            { von: '15:30', bis: '16:45', artist: 'Adaptiv' },
            { von: '16:45', bis: '18:00', artist: 'JøA' },
            { von: '18:00', bis: '19:15', artist: 'Steve Marks' },
            { von: '19:30', bis: '20:15', artist: 'Mätropolis' },
            { von: '20:15', bis: '21:30', artist: 'Flimmy' },
            { von: '21:45', bis: '22:30', artist: 'Planschemalöör' },
            { von: '22:30', bis: '00:00', artist: 'Felicia Bianco' }
          ] }
        ]
      },
      {
        day: 'Freitag · 14.08.',
        floors: [
          { floor: 'Mainstage', color: '#ec4899', sets: [
            { von: '15:00', bis: '15:45', artist: 'Veedelperlen' },
            { von: '16:30', bis: '17:30', artist: 'Leony' },
            { von: '18:15', bis: '19:15', artist: 'Kamrad' },
            { von: '20:00', bis: '21:15', artist: 'Roy Bianco & Die Abbrunzati Boys' },
            { von: '22:15', bis: '23:30', artist: 'Bebe Rexha', info: 'US-amerikanische Pop-Sängerin – u. a. „I\'m Good (Blue)" mit David Guetta.' },
            { von: '00:30', bis: '02:00', artist: 'Jason Derulo', info: 'US-amerikanischer Pop-/R&B-Star mit zahlreichen Chart-Hits.' }
          ] },
          { floor: 'Electronic Stage', color: '#8b5cf6', sets: [
            { von: '15:00', bis: '16:30', artist: 'Felicia Bianco' },
            { von: '16:30', bis: '18:00', artist: 'Salvatore Mancuso' },
            { von: '18:00', bis: '19:30', artist: 'Brandon' },
            { von: '19:30', bis: '21:00', artist: 'Lovra' },
            { von: '21:00', bis: '22:15', artist: 'Noel Holler' },
            { von: '22:15', bis: '23:30', artist: 'Tujamo' },
            { von: '23:30', bis: '01:00', artist: 'Alle Farben' },
            { von: '01:00', bis: '02:00', artist: 'Lari Luke' },
            { von: '02:00', bis: '03:00', artist: 'Teknoclash' }
          ] },
          { floor: 'Party Stage', color: '#f5a623', sets: [
            { von: '15:00', bis: '16:30', artist: 'Urban O' },
            { von: '16:30', bis: '17:15', artist: 'Kord' },
            { von: '17:45', bis: '18:30', artist: 'Lina' },
            { von: '19:00', bis: '20:00', artist: 'Milleniumkid' },
            { von: '20:30', bis: '21:30', artist: 'Esther Graf' },
            { von: '22:00', bis: '23:00', artist: 'Eko Fresh' },
            { von: '23:30', bis: '00:30', artist: 'BIBIZA' },
            { von: '01:15', bis: '02:15', artist: '102 Boyz' },
            { von: '02:15', bis: '03:00', artist: 'Urban O' }
          ] },
          { floor: 'WG Party 1', color: '#2d9cdb', sets: [
            { von: '15:00', bis: '17:00', artist: 'Steve Marks' },
            { von: '17:00', bis: '19:00', artist: 'Dirk Siedhoff' },
            { von: '19:00', bis: '20:15', artist: 'Lost Identity X Teknoclash' },
            { von: '20:15', bis: '21:45', artist: 'Isek' },
            { von: '21:45', bis: '23:30', artist: 'Vali Thun' },
            { von: '23:30', bis: '02:00', artist: 'Jan-Christian Zeller' }
          ] },
          { floor: 'WG Party 2', color: '#1abc9c', sets: [
            { von: '15:00', bis: '17:00', artist: 'DJ Binsi' },
            { von: '17:00', bis: '19:00', artist: 'Fabiasco' },
            { von: '19:00', bis: '21:00', artist: 'Sebastian Hup' },
            { von: '21:00', bis: '22:30', artist: 'Jetset Jourdain' },
            { von: '22:30', bis: '00:30', artist: 'Sebastian Hup' },
            { von: '00:30', bis: '02:00', artist: 'DJ Binsi' }
          ] },
          { floor: 'PENNY Stage', color: '#e67e22', sets: [
            { von: '13:00', bis: '15:00', artist: 'Danny' }
          ] },
          { floor: 'PLOOM Heat Club', color: '#e84393', sets: [
            { von: '18:00', bis: '20:00', artist: 'Flimmy' },
            { von: '20:00', bis: '21:30', artist: 'DJ Zacari' },
            { von: '21:30', bis: '23:00', artist: 'Juizzed' },
            { von: '23:00', bis: '01:00', artist: 'Frizzo' }
          ] },
          { floor: 'The KEEP WALKING Stage', color: '#27ae60', sets: [
            { von: '15:45', bis: '16:30', artist: 'Keisha' },
            { von: '17:30', bis: '17:45', artist: 'Keisha + Cypher44' },
            { von: '17:45', bis: '18:15', artist: 'Dimi Rompos' },
            { von: '19:15', bis: '20:00', artist: 'GG Vybe' },
            { von: '21:15', bis: '21:45', artist: 'Beautyinblack + Cypher44' },
            { von: '21:45', bis: '22:15', artist: 'Kelvyn Colt' },
            { von: '23:30', bis: '00:30', artist: 'Bipolar Soundsytem' }
          ] }
        ]
      },
      {
        day: 'Samstag · 15.08.',
        floors: [
          { floor: 'Mainstage', color: '#ec4899', sets: [
            { von: '15:00', bis: '16:00', artist: 'Kati k' },
            { von: '16:45', bis: '17:45', artist: 'Juli' },
            { von: '18:30', bis: '19:30', artist: 'Nura' },
            { von: '20:15', bis: '21:15', artist: 'Montez' },
            { von: '22:15', bis: '23:30', artist: 'Marteria', info: 'Deutscher Rapper aus Rostock (Marten Laciny).' },
            { von: '00:30', bis: '02:00', artist: 'SDP', info: 'Deutsches Pop-/Hip-Hop-Duo aus Berlin.' }
          ] },
          { floor: 'Electronic Stage', color: '#8b5cf6', sets: [
            { von: '15:00', bis: '16:30', artist: 'Angie Mill' },
            { von: '16:30', bis: '18:00', artist: 'Oliver Magenta' },
            { von: '18:00', bis: '19:30', artist: 'Glockenbach' },
            { von: '19:30', bis: '20:45', artist: 'Twocolors' },
            { von: '20:45', bis: '22:00', artist: 'Topic' },
            { von: '22:00', bis: '23:30', artist: 'YouNotUs' },
            { von: '23:30', bis: '01:00', artist: 'David Puentez' },
            { von: '01:00', bis: '02:00', artist: 'Ely Oaks' },
            { von: '02:00', bis: '03:00', artist: 'Lost Identity' }
          ] },
          { floor: 'Party Stage', color: '#f5a623', sets: [
            { von: '15:00', bis: '16:00', artist: 'Urban O' },
            { von: '16:30', bis: '17:15', artist: 'DROII' },
            { von: '17:45', bis: '18:45', artist: 'anaïs' },
            { von: '19:30', bis: '20:30', artist: 'Tom Twers' },
            { von: '21:15', bis: '22:15', artist: 'Monet192' },
            { von: '23:00', bis: '00:00', artist: 'PA69' },
            { von: '00:45', bis: '01:45', artist: 'SHOKI287 (LIVE)' },
            { von: '01:45', bis: '03:00', artist: 'Urban O' }
          ] },
          { floor: 'WG Party 1', color: '#2d9cdb', sets: [
            { von: '15:00', bis: '16:30', artist: 'Adaptiv' },
            { von: '16:30', bis: '18:00', artist: 'Max Bering' },
            { von: '18:00', bis: '19:00', artist: 'Sternbush' },
            { von: '19:00', bis: '20:00', artist: 'Lost Identity' },
            { von: '20:00', bis: '21:45', artist: 'Monamour' },
            { von: '21:45', bis: '23:30', artist: 'Domenico Anzaldi' },
            { von: '23:30', bis: '02:00', artist: 'Jan-Christian Zeller' }
          ] },
          { floor: 'WG Party 2', color: '#1abc9c', sets: [
            { von: '15:00', bis: '20:30', artist: 'DJ Binsi' },
            { von: '20:30', bis: '02:00', artist: 'Matilda Midnights' }
          ] },
          { floor: 'PENNY Stage', color: '#e67e22', sets: [
            { von: '13:00', bis: '15:00', artist: 'Danny' }
          ] },
          { floor: 'PLOOM Heat Club', color: '#e84393', sets: [
            { von: '19:00', bis: '20:30', artist: 'Alex&Tony' },
            { von: '20:30', bis: '22:00', artist: 'Maddi Bu' },
            { von: '22:00', bis: '23:30', artist: 'Lari Luke' },
            { von: '23:30', bis: '01:00', artist: 'Charleen Herzig' }
          ] },
          { floor: 'The KEEP WALKING Stage', color: '#27ae60', sets: [
            { von: '16:00', bis: '16:45', artist: 'Lolo Sace' },
            { von: '17:45', bis: '18:00', artist: 'Lolo Sace + Cypher44' },
            { von: '18:00', bis: '18:30', artist: 'Maikel' },
            { von: '19:30', bis: '20:15', artist: 'Beautyinblack' },
            { von: '21:15', bis: '21:45', artist: 'Beautyinblack + Cypher44' },
            { von: '21:45', bis: '22:15', artist: 'Laura Nahr' },
            { von: '23:30', bis: '00:30', artist: 'Bipolar Soundsystem' }
          ] }
        ]
      }
    ]
  },

  gluecksgefuehle: {
    title: 'Glücksgefühle Festival 2026 · Timetable (Pre-Party Do · Fr · Sa)',
    days: [
      {
        day: 'Donnerstag (Pre-Party)',
        floors: [
          { floor: 'Dopamin Stage', color: '#f5b301', sets: [
            { von: '17:00', bis: '17:50', artist: 'Knolldoll' },
            { von: '18:05', bis: '18:50', artist: 'Alexander Marcus' },
            { von: '19:00', bis: '19:30', artist: 'Pietro Lombardi' },
            { von: '19:35', bis: '20:05', artist: 'Malle Anja' },
            { von: '20:10', bis: '21:10', artist: 'Alle Farben' },
            { von: '21:15', bis: '22:00', artist: 'Jebroer' }
          ] },
          { floor: 'Technobus', color: '#8b5cf6', sets: [
            { von: '17:00', bis: '19:00', artist: 'Nightoftech' },
            { von: '19:00', bis: '20:30', artist: 'Caro van Ee' },
            { von: '20:30', bis: '22:00', artist: 'QRIS' },
            { von: '22:00', bis: '23:55', artist: 'Pappenheimer' }
          ] }
        ]
      },
      {
        day: 'Freitag',
        floors: [
          { floor: 'Euphoria Stage', color: '#e5399a', sets: [
            { von: '14:00', bis: '14:30', artist: 'Loi' },
            { von: '15:00', bis: '15:45', artist: 'Tom Gregory' },
            { von: '16:15', bis: '16:45', artist: 'Leony' },
            { von: '17:15', bis: '18:00', artist: 'Montez' },
            { von: '18:30', bis: '19:30', artist: 'Scooter' },
            { von: '20:15', bis: '21:15', artist: 'Ayliva' },
            { von: '22:00', bis: '23:00', artist: 'Marteria', info: 'Rapper aus Rostock – Hits wie „Kids (2 Finger an den Kopf)" und „Lila Wolken".' }
          ] },
          { floor: 'Dopamin Stage', color: '#f5b301', sets: [
            { von: '14:00', bis: '14:20', artist: 'Grüngürtelrosen' },
            { von: '14:30', bis: '15:00', artist: 'Alphaville' },
            { von: '15:30', bis: '16:15', artist: 'Nura' },
            { von: '16:30', bis: '17:30', artist: 'Mia Julia' },
            { von: '18:00', bis: '19:00', artist: '01099' },
            { von: '19:45', bis: '20:30', artist: 'Andreas Gabalier' },
            { von: '21:30', bis: '22:45', artist: 'Ski Aggu' }
          ] },
          { floor: 'Cloud 9 Stage', color: '#2f8fc7', sets: [
            { von: '14:00', bis: '15:00', artist: 'Noel Holler' },
            { von: '15:00', bis: '16:00', artist: 'Ely Oaks' },
            { von: '16:00', bis: '17:00', artist: 'Brennan Heart' },
            { von: '17:00', bis: '18:00', artist: 'David Puentez' },
            { von: '18:00', bis: '19:15', artist: 'Bunt.' },
            { von: '19:15', bis: '20:30', artist: 'Boris Brejcha' },
            { von: '20:30', bis: '21:45', artist: 'Dimitri Vegas & Like Mike' },
            { von: '21:45', bis: '23:00', artist: 'Hardwell' }
          ] },
          { floor: 'Technobus', color: '#8b5cf6', sets: [
            { von: '12:30', bis: '14:00', artist: 'Chroove' },
            { von: '14:00', bis: '15:30', artist: 'Jetset Jourdain' },
            { von: '15:30', bis: '17:00', artist: 'Isek' },
            { von: '17:00', bis: '18:30', artist: 'Chany Dakota' },
            { von: '18:30', bis: '20:00', artist: 'noch offen', note: 'Act noch nicht bestätigt' },
            { von: '20:00', bis: '21:30', artist: 'Bovski' },
            { von: '21:30', bis: '23:00', artist: 'Anvee' },
            { von: '23:00', bis: '00:55', artist: 'Kxxma' }
          ] }
        ]
      },
      {
        day: 'Samstag',
        floors: [
          { floor: 'Euphoria Stage', color: '#e5399a', sets: [
            { von: '14:00', bis: '14:45', artist: 'Blue' },
            { von: '15:15', bis: '16:00', artist: 'Jazeek' },
            { von: '16:30', bis: '17:15', artist: 'Max Giesinger' },
            { von: '17:20', bis: '17:40', artist: 'Mark Medlock' },
            { von: '18:00', bis: '19:00', artist: 'Zartmann' },
            { von: '19:30', bis: '20:30', artist: 'Mark Forster' },
            { von: '21:30', bis: '22:45', artist: 'David Guetta', info: 'French House-/EDM-Superstar – „Titanium", „When Love Takes Over", „Memories".' },
            { von: '22:45', bis: '23:00', artist: 'Closing Ritual' }
          ] },
          { floor: 'Dopamin Stage', color: '#f5b301', sets: [
            { von: '14:00', bis: '14:30', artist: 'Milleniumkid' },
            { von: '15:00', bis: '15:30', artist: 'Julian Sommer' },
            { von: '16:00', bis: '16:30', artist: 'Culcha Candela' },
            { von: '17:00', bis: '17:45', artist: 'Bausa' },
            { von: '18:00', bis: '19:00', artist: 'HBz' },
            { von: '19:30', bis: '20:15', artist: 'No Angels' },
            { von: '21:00', bis: '22:30', artist: 'SDP', info: 'Berliner Pop-/Hip-Hop-Duo – bekannt für „Ich will nur dass du weißt" und energiegeladene Live-Shows.' }
          ] },
          { floor: 'Cloud 9 Stage', color: '#2f8fc7', sets: [
            { von: '14:00', bis: '15:00', artist: 'Fast Boy' },
            { von: '15:00', bis: '16:00', artist: 'Nervo' },
            { von: '16:00', bis: '17:00', artist: 'Felix Jaehn' },
            { von: '17:00', bis: '18:00', artist: 'Neelix' },
            { von: '18:00', bis: '19:00', artist: 'KSHMR' },
            { von: '19:00', bis: '20:00', artist: 'Lost Frequencies' },
            { von: '20:00', bis: '21:15', artist: 'W&W' },
            { von: '21:15', bis: '22:30', artist: 'Timmy Trumpet' }
          ] },
          { floor: 'Technobus', color: '#8b5cf6', sets: [
            { von: '12:30', bis: '14:00', artist: 'Max Bering' },
            { von: '14:00', bis: '15:30', artist: 'Peter Pahn' },
            { von: '15:30', bis: '17:00', artist: 'Jason Wats' },
            { von: '17:00', bis: '18:30', artist: 'Matthias Olck' },
            { von: '18:30', bis: '20:00', artist: 'Ava Crown' },
            { von: '20:00', bis: '21:30', artist: 'Drumkomplex' },
            { von: '21:30', bis: '23:00', artist: 'noch offen', note: 'Act noch nicht bestätigt' },
            { von: '23:00', bis: '00:55', artist: 'Nick Schwenderling' }
          ] }
        ]
      }
    ]
  }
};
