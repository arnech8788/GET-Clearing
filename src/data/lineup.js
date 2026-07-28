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
            { von: '22:30', bis: '00:00', artist: 'Paul Kalkbrenner' },
            { von: '00:00', bis: '01:30', artist: 'Paul van Dyk' },
            { von: '01:30', bis: '03:00', artist: 'Neelix' },
            { von: '03:00', bis: '04:30', artist: 'Bennett' },
            { von: '04:30', bis: '06:00', artist: 'Rewi' }
          ] },
          { floor: 'Century Circus', color: '#d69a2d', sets: [
            { von: '19:00', bis: '21:00', artist: 'Ties van Dun' },
            { von: '21:00', bis: '22:30', artist: 'Felix Kröcher' },
            { von: '22:30', bis: '00:00', artist: 'Schrotthagen' },
            { von: '00:00', bis: '01:30', artist: 'Sven Väth' },
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
            { von: '02:00', bis: '03:00', artist: 'Angerfist' },
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
            { von: '23:30', bis: '01:10', artist: 'Fatboy Slim' },
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
  }
};
