// Dienstpläne (Einsatzpläne) – Klangpiraten, Rock am Ring 2026.
//
// Enthält mehrere Plan-Typen (z. B. Bändertausch/Ticketscan, Clearing/Cashless),
// je als Eintrag in DIENSTPLAN_DAYS mit `plan`-Feld. Weitere Tage/Pläne werden
// ergänzt, sobald sie vorliegen.
//
// DIENSTPLAN_CONTACTS = Ansprechpersonen/wichtige Telefonnummern (Leitung,
// Runner, Stationsleitungen). ACHTUNG: private Nummern – auf Wunsch hinter
// Zugangscode legen.
//
// Schichttausche werden als Overrides in SHIFT_CHANGES gepflegt (per Repo-Update,
// auf Basis der zugeschickten WhatsApp-Nachrichten). Ein Override referenziert
// Tag-ID + Nr. und kann Name/Zeiten/Position überschreiben oder die Schicht als
// gestrichen markieren.
//   { day:"do-04", nr:2, name:"…", von:"…", bis:"…", pos:"…",
//     cancelled:false, note:"getauscht mit … (WhatsApp 03.06.)" }

export const DIENSTPLAN_META = {
  event: "rar",
  title: "Klangpiraten · Rock am Ring 2026 – Einsatzpläne"
};

export const SHIFT_CHANGES = [];

export const DIENSTPLAN_DAYS = [
  {
    "id": "do-04",
    "plan": "Bändertausch / Ticketscan",
    "label": "Bändertausch · Donnerstag, 4. Juni 2026",
    "short": "Bändertausch · Do",
    "stations": [
      {
        "name": "Station D9",
        "kb": "KB3",
        "rows": [
          {
            "nr": 1,
            "name": "Julia Reise",
            "pos": "1",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 2,
            "name": "Phil Fries",
            "pos": "2",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 3,
            "name": "Jessica Kot",
            "pos": "3",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 4,
            "name": "Vivian Braesel",
            "pos": "4",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 5,
            "name": "Mark Bremer",
            "pos": "5",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 6,
            "name": "David Pergande",
            "pos": "6",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 7,
            "name": "Ann Kogel",
            "pos": "7",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 8,
            "name": "Julien Gercke",
            "pos": "8",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 9,
            "name": "Farid Ajlani",
            "pos": "9",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 10,
            "name": "Rici Ajlani",
            "pos": "10",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 11,
            "name": "Leonie Kauert",
            "pos": "11",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 12,
            "name": "Kim Hütter",
            "pos": "12",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 13,
            "name": "Fabian Müller",
            "pos": "13",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 14,
            "name": "Lukas Müller",
            "pos": "14",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 15,
            "name": "Moritz Weigel",
            "pos": "Stationsleitung",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 16,
            "name": "Helena Kaden",
            "pos": "Stationsleitung",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station A5",
        "kb": "KB4",
        "rows": [
          {
            "nr": 17,
            "name": "Taisha Kelley",
            "pos": "1",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 18,
            "name": "Anna Deinhardt",
            "pos": "2",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 19,
            "name": "Dominick da Silva Fernandes",
            "pos": "3",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 20,
            "name": "Corinna Janßen",
            "pos": "4",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 21,
            "name": "Lisa Jäschke",
            "pos": "5",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 22,
            "name": "Lara Jäschke",
            "pos": "6",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 23,
            "name": "Tanja Reiprich",
            "pos": "7",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 24,
            "name": "Xenia Ohler",
            "pos": "8",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 25,
            "name": "Elisa Sandig",
            "pos": "9",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 26,
            "name": "Colette Sandig",
            "pos": "10",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 27,
            "name": "Pi Rätzer",
            "pos": "11",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 28,
            "name": "Janet Thiel-Jakobs",
            "pos": "12",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 29,
            "name": "Gökce Elma",
            "pos": "13",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 30,
            "name": "Artur Wagner",
            "pos": "14",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 31,
            "name": "Lui Schmidt",
            "pos": "Stationsleitung",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 32,
            "name": "Julia Reichert",
            "pos": "Stationsleitung",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station Krebsberg",
        "kb": "KB2",
        "rows": [
          {
            "nr": 33,
            "name": "Geronimo Berg",
            "pos": "1",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 34,
            "name": "Nele Berg",
            "pos": "2",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 35,
            "name": "Phillip Völker",
            "pos": "3",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 36,
            "name": "Justin Schliwinski",
            "pos": "4",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 37,
            "name": "Mel Fernandes Risso Miguez",
            "pos": "5",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 38,
            "name": "Anuschka Bauer",
            "pos": "6",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 39,
            "name": "Nisha Bhonsle",
            "pos": "7",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 40,
            "name": "Rebekka Bienert",
            "pos": "8",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 41,
            "name": "Johannes Block",
            "pos": "9",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 42,
            "name": "Benedikt Clemens",
            "pos": "10",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 43,
            "name": "Katrin Filtgen",
            "pos": "11",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 44,
            "name": "Olesja Dutt",
            "pos": "12",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 45,
            "name": "Malin Hirschfeld",
            "pos": "Stationsleitung",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 46,
            "name": "Frida Funke",
            "pos": "Stationsleitung",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station Schwalbenschwanz",
        "kb": "KB12",
        "rows": [
          {
            "nr": 47,
            "name": "Hannah Mähler",
            "pos": "1",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 48,
            "name": "Dominik Duval",
            "pos": "2",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 49,
            "name": "Lukas Karshüning",
            "pos": "3",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 50,
            "name": "Lynn Selzner",
            "pos": "4",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 51,
            "name": "Sarah Lergenmüller",
            "pos": "Stationsleitung",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 52,
            "name": "Justin Stoidtner",
            "pos": "Stationsleitung",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station Pflanzgarten",
        "kb": "KB14",
        "rows": [
          {
            "nr": 53,
            "name": "Caro Hauck",
            "pos": "1",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 54,
            "name": "Sandra Schneider",
            "pos": "2",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 55,
            "name": "Anke Garba",
            "pos": "3",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 56,
            "name": "Tobi Roepke",
            "pos": "4",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 57,
            "name": "Leo Alex Heisel",
            "pos": "5",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 58,
            "name": "Mina Gölzer",
            "pos": "6",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 59,
            "name": "Vanessa Kowalewski",
            "pos": "7",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 60,
            "name": "Diana Speicher",
            "pos": "8",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 61,
            "name": "Lisa Böhle",
            "pos": "9",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 62,
            "name": "Adriana Tack",
            "pos": "10",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 63,
            "name": "Cecilia Thoms",
            "pos": "11",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 64,
            "name": "Dalia El-Negiry",
            "pos": "12",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 65,
            "name": "Elly Wistuba",
            "pos": "Stationsleitung",
            "von": "08:00",
            "bis": "16:00",
            "note": ""
          },
          {
            "nr": 66,
            "name": "Hannah Greitemann",
            "pos": "Stationsleitung",
            "von": "15:30",
            "bis": "00:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station D5",
        "kb": "KB10",
        "rows": [
          {
            "nr": 67,
            "name": "Marvin Schmerer",
            "pos": "1",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 68,
            "name": "Hauke Helmke",
            "pos": "2",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 69,
            "name": "Emma Farken",
            "pos": "3",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 70,
            "name": "Dodo Kudaschow",
            "pos": "4",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 71,
            "name": "Shawn Gigla",
            "pos": "Stationsleitung",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 72,
            "name": "Tom Blödorn",
            "pos": "Stationsleitung",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station C6",
        "kb": "KB8",
        "rows": [
          {
            "nr": 73,
            "name": "Dana Schröder",
            "pos": "1",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 74,
            "name": "Sarah Klein",
            "pos": "2",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 75,
            "name": "Jessica Goeden",
            "pos": "3",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 76,
            "name": "Linda Queng",
            "pos": "4",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 77,
            "name": "Caro Lares",
            "pos": "5",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 78,
            "name": "Tine Rodarius",
            "pos": "6",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 79,
            "name": "Jan Scholz",
            "pos": "7",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 80,
            "name": "Jens Rohlmann",
            "pos": "8",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 81,
            "name": "Tamara Tuchel",
            "pos": "9",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 82,
            "name": "Kai Burholt",
            "pos": "10",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 83,
            "name": "Fabio von Dornis",
            "pos": "11",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 84,
            "name": "Mo Rothfischer",
            "pos": "12",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 85,
            "name": "Anki Brinkmann",
            "pos": "Stationsleitung",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 86,
            "name": "Laura Fleischer",
            "pos": "Stationsleitung",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station B9",
        "kb": "KB9",
        "rows": [
          {
            "nr": 87,
            "name": "Eva Schneider",
            "pos": "USC",
            "von": "08:00",
            "bis": "17:00",
            "note": "Utopia Stage Camping - 08 Uhr bis 13 Uhr"
          },
          {
            "nr": 88,
            "name": "Lea Diederich",
            "pos": "USC",
            "von": "08:00",
            "bis": "17:00",
            "note": "Utopia Stage Camping - 08 Uhr bis 13 Uhr"
          },
          {
            "nr": 89,
            "name": "Steffi Gessner",
            "pos": "1",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 90,
            "name": "Patrice Gherbi",
            "pos": "2",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 91,
            "name": "Sascha Grob",
            "pos": "3",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 92,
            "name": "Annika Frosch",
            "pos": "4",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 93,
            "name": "Annika Hoffmann",
            "pos": "5",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 94,
            "name": "Annika Heß",
            "pos": "6",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 95,
            "name": "Celine Wagner",
            "pos": "7",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 96,
            "name": "Patricia Heidenreich",
            "pos": "8",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 97,
            "name": "Julia Gard",
            "pos": "9",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 98,
            "name": "Evyn Liebl",
            "pos": "10",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 99,
            "name": "Jason Windisch",
            "pos": "11",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 100,
            "name": "Dennis Willet",
            "pos": "12",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 101,
            "name": "Mike Kapfhammer",
            "pos": "13",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 102,
            "name": "Süreya Demirbas",
            "pos": "14",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 103,
            "name": "Greta Weber",
            "pos": "15",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 104,
            "name": "Martina Weber",
            "pos": "16",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 105,
            "name": "Kerstin Thieltges",
            "pos": "17",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 106,
            "name": "Natascha Würden",
            "pos": "18",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 107,
            "name": "Eva Baasch",
            "pos": "Stationsleitung",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 108,
            "name": "Jacquelin Reith",
            "pos": "Stationsleitung",
            "von": "16:30",
            "bis": "01:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station B3",
        "kb": "KB1",
        "rows": [
          {
            "nr": 109,
            "name": "Viktoria Luft genannt Plaisier",
            "pos": "1",
            "von": "08:00",
            "bis": "16:30",
            "note": "Utopia Stage Camping - 08 Uhr bis 13 Uhr"
          },
          {
            "nr": 110,
            "name": "Neo Kecht",
            "pos": "2",
            "von": "08:00",
            "bis": "16:30",
            "note": "Utopia Stage Camping - 08 Uhr bis 13 Uhr"
          },
          {
            "nr": 111,
            "name": "Manuela König",
            "pos": "3",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 112,
            "name": "Annika Heinrich",
            "pos": "4",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 113,
            "name": "Sophie Schubert",
            "pos": "5",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 114,
            "name": "Mathea Valerius",
            "pos": "6",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 115,
            "name": "Emma Veit",
            "pos": "7",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 116,
            "name": "Luisa Veit",
            "pos": "8",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 117,
            "name": "Annika Kahle",
            "pos": "9",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 118,
            "name": "Diesel Vathauer",
            "pos": "10",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 119,
            "name": "Vivien Schneider",
            "pos": "11",
            "von": "16:00",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 120,
            "name": "Deniz Sieger",
            "pos": "12",
            "von": "16:00",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 121,
            "name": "Chloe Schmedes",
            "pos": "Stationsleitung",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 122,
            "name": "Nina Guthmann",
            "pos": "Stationsleitung",
            "von": "16:00",
            "bis": "01:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station B5",
        "kb": "KB5",
        "rows": [
          {
            "nr": 123,
            "name": "Niklas Klöpper",
            "pos": "Tor 23",
            "von": "08:00",
            "bis": "16:30",
            "note": "Tor 23 - 08 Uhr bis 13 Uhr"
          },
          {
            "nr": 124,
            "name": "Dennis Klöpper",
            "pos": "Tor 23",
            "von": "08:00",
            "bis": "16:30",
            "note": "Tor 23 - 08 Uhr bis 13 Uhr"
          },
          {
            "nr": 125,
            "name": "Mattea Steinmetz",
            "pos": "1",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 126,
            "name": "Romy Cronau",
            "pos": "2",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 127,
            "name": "Jasmin Düren",
            "pos": "3",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 128,
            "name": "Jana Reuter",
            "pos": "4",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 129,
            "name": "Greta Reuter",
            "pos": "5",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 130,
            "name": "Corinna Janke",
            "pos": "6",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 131,
            "name": "Rommi Rommersbach",
            "pos": "7",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 132,
            "name": "Luke Grolmes",
            "pos": "8",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 133,
            "name": "Julian Grolmes",
            "pos": "9",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 134,
            "name": "Marc Fuhr",
            "pos": "10",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 135,
            "name": "Tascha Stefan",
            "pos": "11",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 136,
            "name": "Annika Steiger",
            "pos": "12",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 137,
            "name": "Jennifer Kalinowski",
            "pos": "13",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 138,
            "name": "Peter Kunz",
            "pos": "14",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 139,
            "name": "Veronika Lang",
            "pos": "15",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 140,
            "name": "Naz Bana Behbahani",
            "pos": "16",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 141,
            "name": "Sundri Althoff",
            "pos": "Stationsleitung",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 142,
            "name": "Giovanna Scigliano",
            "pos": "Stationsleitung",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station B5b",
        "kb": "KB7",
        "rows": [
          {
            "nr": 143,
            "name": "Silke Nichau",
            "pos": "1",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 144,
            "name": "Marius König",
            "pos": "2",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 145,
            "name": "Michael Herges",
            "pos": "3",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 146,
            "name": "Marcel Hoffmann",
            "pos": "4",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 147,
            "name": "Kevin Klein",
            "pos": "5",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 148,
            "name": "Naomi Kron da Silva",
            "pos": "6",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 149,
            "name": "Philipp Schleg",
            "pos": "7",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 150,
            "name": "Mathis König",
            "pos": "8",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 151,
            "name": "Sinan Corukcu",
            "pos": "9",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 152,
            "name": "Christoph Mayer",
            "pos": "10",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 153,
            "name": "Lisa Mann",
            "pos": "Stationsleitung",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 154,
            "name": "Erika Wilches Quintero",
            "pos": "Stationsleitung",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station B5c",
        "kb": "KB6",
        "rows": [
          {
            "nr": 155,
            "name": "Kathy Gindorff",
            "pos": "1",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 156,
            "name": "Sandra Schwindenhammer",
            "pos": "2",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 157,
            "name": "Kai Schwindenhammer",
            "pos": "3",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 158,
            "name": "Pauline Schilling",
            "pos": "4",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 159,
            "name": "Tatjana Pesch",
            "pos": "5",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 160,
            "name": "Anna Stais",
            "pos": "6",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 161,
            "name": "Fabian Kleinbillengeretsches",
            "pos": "7",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 162,
            "name": "Debby Schäfer",
            "pos": "8",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 163,
            "name": "Julia Jäger",
            "pos": "9",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 164,
            "name": "Jan Schapfeld",
            "pos": "10",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 165,
            "name": "Saskia Ersfeld",
            "pos": "11",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 166,
            "name": "Phillip Dumhard",
            "pos": "12",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 167,
            "name": "Sophie Bährens",
            "pos": "Stationsleitung",
            "von": "08:00",
            "bis": "16:30",
            "note": ""
          },
          {
            "nr": 168,
            "name": "Martha Gilles",
            "pos": "Stationsleitung",
            "von": "16:00",
            "bis": "00:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station Utopia Stage",
        "kb": "KB13",
        "rows": [
          {
            "nr": 169,
            "name": "Dustin Brandt",
            "pos": "1",
            "von": "13:00",
            "bis": "20:00",
            "note": ""
          },
          {
            "nr": 170,
            "name": "Matthias Schmidt",
            "pos": "2",
            "von": "13:00",
            "bis": "20:00",
            "note": ""
          },
          {
            "nr": 171,
            "name": "Lara Hupperten",
            "pos": "3",
            "von": "13:00",
            "bis": "20:00",
            "note": ""
          },
          {
            "nr": 172,
            "name": "Gina Michele Köhler",
            "pos": "4",
            "von": "13:00",
            "bis": "20:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station Tor 23",
        "kb": "KB11",
        "rows": [
          {
            "nr": 173,
            "name": "Justus Struwe",
            "pos": "1",
            "von": "13:00",
            "bis": "20:00",
            "note": ""
          },
          {
            "nr": 174,
            "name": "Alexander Jost",
            "pos": "2",
            "von": "13:00",
            "bis": "20:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Station Nürburgring",
        "kb": null,
        "rows": [
          {
            "nr": 175,
            "name": "Laura Hammes",
            "pos": "1",
            "von": "12:00",
            "bis": "18:00",
            "note": ""
          },
          {
            "nr": 176,
            "name": "Sabrina Beaujean",
            "pos": "2",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 177,
            "name": "Pascal Grünheit",
            "pos": "3",
            "von": "18:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 178,
            "name": "Alice Metz",
            "pos": "4",
            "von": "",
            "bis": "",
            "note": ""
          }
        ]
      },
      {
        "name": "EXTRA / BÜRO",
        "kb": null,
        "rows": [
          {
            "nr": 179,
            "name": "Pia Hiller",
            "pos": "Büroleitung",
            "von": "08:00",
            "bis": "20:00",
            "note": ""
          },
          {
            "nr": 180,
            "name": "Holger Tingelhoff",
            "pos": "Büro / Mobil",
            "von": "08:00",
            "bis": "20:00",
            "note": ""
          },
          {
            "nr": 181,
            "name": "Mark Schrader",
            "pos": "Runner*in",
            "von": "07:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 182,
            "name": "Lena Grießl",
            "pos": "Runner*in",
            "von": "07:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 183,
            "name": "Anna Grießl",
            "pos": "Runner*in",
            "von": "07:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 184,
            "name": "Manu Jäger",
            "pos": "Runner*in",
            "von": "16:00",
            "bis": "01:30",
            "note": ""
          },
          {
            "nr": 185,
            "name": "Martin Collatz",
            "pos": "Runner*in",
            "von": "16:00",
            "bis": "01:30",
            "note": ""
          },
          {
            "nr": 186,
            "name": "Mandy Ilgner",
            "pos": "Runner*in",
            "von": "16:00",
            "bis": "01:30",
            "note": ""
          },
          {
            "nr": 187,
            "name": "Max Bilski",
            "pos": "Runner*in",
            "von": "07:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 188,
            "name": "Ulrich Endemann",
            "pos": "Runner*in",
            "von": "07:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 189,
            "name": "Lukas Heinkel",
            "pos": "Runner*in",
            "von": "16:00",
            "bis": "01:30",
            "note": ""
          },
          {
            "nr": 190,
            "name": "Franziska Pietzonka",
            "pos": "Runner*in",
            "von": "16:00",
            "bis": "01:30",
            "note": ""
          },
          {
            "nr": 191,
            "name": "Jo Frank",
            "pos": "INFO",
            "von": "08:00",
            "bis": "20:00",
            "note": ""
          },
          {
            "nr": 192,
            "name": "Tina Müller",
            "pos": "CLEARING",
            "von": "08:00",
            "bis": "20:00",
            "note": ""
          }
        ]
      },
      {
        "name": "Springer/Ersatz",
        "kb": null,
        "rows": [
          {
            "nr": 193,
            "name": "Oli Compes",
            "pos": "1",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 194,
            "name": "Florian Cristino",
            "pos": "2",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 195,
            "name": "Julian Pfeiffer",
            "pos": "3",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 196,
            "name": "Jacky Rosenkranz",
            "pos": "4",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 197,
            "name": "Rosi Rosenkranz",
            "pos": "5",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 198,
            "name": "Dominique Mainka",
            "pos": "6",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 199,
            "name": "Monique Klafki",
            "pos": "7",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 200,
            "name": "Regen Weidemann",
            "pos": "8",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 201,
            "name": "Christine Wippel",
            "pos": "9",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 202,
            "name": "Alex Konietzny",
            "pos": "10",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 203,
            "name": "Anna Böker",
            "pos": "11",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 204,
            "name": "Wiebke Kruse",
            "pos": "12",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 205,
            "name": "Enie Bibow",
            "pos": "13",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 206,
            "name": "Alexander Puchert",
            "pos": "14",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 207,
            "name": "Julija Hofmann",
            "pos": "15",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 208,
            "name": "Kirill Taube",
            "pos": "16",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 209,
            "name": "Emilia Kieslich",
            "pos": "17",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 210,
            "name": "Lena Thieme",
            "pos": "18",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          },
          {
            "nr": 211,
            "name": "Marielle Pannier",
            "pos": "19",
            "von": "",
            "bis": "",
            "note": "Telefonisch erreichbar sein! 9 Uhr - 18Uhr (Keine Arbeitszeit, Tatsächliche Einsatzzeiten können variieren)"
          }
        ]
      }
    ]
  },
  {
    "id": "clearing-so-07",
    "plan": "Clearing / Cashless",
    "label": "Clearing/Cashless · Sonntag, 7. Juni 2026",
    "short": "Clearing · So",
    "stations": [
      {
        "name": "Clearing Infield",
        "kb": null,
        "rows": [
          {
            "nr": 1,
            "name": "Michelle Quedenbaum",
            "pos": "",
            "von": "",
            "bis": " ",
            "note": ""
          },
          {
            "nr": 2,
            "name": "Mary Narewski",
            "pos": "1 Früh",
            "von": "13:00",
            "bis": "19:00",
            "note": ""
          },
          {
            "nr": 3,
            "name": "Borschi Borsch",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 4,
            "name": "Arne Chudobba",
            "pos": "2 Früh",
            "von": "13:00",
            "bis": "19:00",
            "note": ""
          },
          {
            "nr": 5,
            "name": "Lina Eggebrecht",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 6,
            "name": "Fabian Gayer",
            "pos": "Stationsleitung",
            "von": "13:00",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 7,
            "name": "Julia Schäfer",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 8,
            "name": "Julian Grotbans",
            "pos": "1 Spät",
            "von": "19:00",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 9,
            "name": "Pascal Rosen",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 10,
            "name": "Alexander Hofmann",
            "pos": "2 Spät",
            "von": "19:00",
            "bis": "01:00",
            "note": ""
          },
          {
            "nr": 11,
            "name": "Felix Schlaf",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 12,
            "name": "Lena Gebhardt",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 13,
            "name": "Jens Krämer",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 14,
            "name": "Alina Gerland",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 15,
            "name": "Annika Endres",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 16,
            "name": "Dennis Herrmann",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          }
        ]
      },
      {
        "name": "Clearing Station B3",
        "kb": null,
        "rows": [
          {
            "nr": 17,
            "name": "Jana Kuch",
            "pos": "1",
            "von": "08:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 18,
            "name": "Tom Khuu",
            "pos": "2",
            "von": "10:00",
            "bis": "17:00",
            "note": ""
          },
          {
            "nr": 19,
            "name": "Tamara Melissa Temmur",
            "pos": "3",
            "von": "17:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 20,
            "name": "Philipp Jansen",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 21,
            "name": "Lea Dichter",
            "pos": "4",
            "von": "17:00",
            "bis": "00:00",
            "note": ""
          },
          {
            "nr": 22,
            "name": "Valentin Slivonik",
            "pos": "6",
            "von": "23:30",
            "bis": "03:30",
            "note": ""
          },
          {
            "nr": 23,
            "name": "Leon Schmitz",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 24,
            "name": "Björn Münker",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 25,
            "name": "Joana Schnubel",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 26,
            "name": "Kristin Walter",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 27,
            "name": "Sarah Böhm",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 28,
            "name": "Amy Wilkans",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 29,
            "name": "Anna Stegink",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 30,
            "name": "Dennis Beck",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          }
        ]
      },
      {
        "name": "EXTRA / BÜRO",
        "kb": null,
        "rows": [
          {
            "nr": 31,
            "name": "Pia Hiller",
            "pos": "Büro",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 32,
            "name": "Holger Tingelhoff",
            "pos": "Büro / Mobil",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 33,
            "name": "Mark Schrader",
            "pos": "Runner*in",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 34,
            "name": "Lena Grießl",
            "pos": "Runner*in",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 35,
            "name": "Anna Grießl",
            "pos": "Runner*in",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 36,
            "name": "Manu Jäger",
            "pos": "Runner*in",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 37,
            "name": "Martin Collatz",
            "pos": "Runner*in",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 38,
            "name": "Mandy Ilgner",
            "pos": "Runner*in",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 39,
            "name": "Max Bilski",
            "pos": "Runner*in",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 40,
            "name": "Ulrich Endemann",
            "pos": "Runner*in",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 41,
            "name": "Lukas Heinkel",
            "pos": "Runner*in",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 42,
            "name": "Franziska Pietzonka",
            "pos": "Runner*in",
            "von": "",
            "bis": "",
            "note": ""
          }
        ]
      },
      {
        "name": "Springer/Ersatz",
        "kb": null,
        "rows": [
          {
            "nr": 43,
            "name": "Annika Czekalla",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          },
          {
            "nr": 44,
            "name": "Susi Czekalla",
            "pos": "",
            "von": "",
            "bis": "",
            "note": ""
          }
        ]
      }
    ]
  }
];

export const DIENSTPLAN_CONTACTS = [
  {
    "name": "Raphael Siemers",
    "role": "Gesamtleitung",
    "phone": "0152 27605462",
    "tel": "015227605462"
  },
  {
    "name": "Pia Hiller",
    "role": "Büroleitung",
    "phone": "0178 1326632",
    "tel": "01781326632"
  },
  {
    "name": "Holger Tingelhoff",
    "role": "Büro / Mobil",
    "phone": "0151 16792582",
    "tel": "015116792582"
  },
  {
    "name": "Mark Schrader",
    "role": "Runner*in Früh",
    "phone": "0176 10815723",
    "tel": "017610815723"
  },
  {
    "name": "Lena Grießl",
    "role": "Runner*in Früh",
    "phone": "0178 1801429",
    "tel": "01781801429"
  },
  {
    "name": "Anna Grießl",
    "role": "Runner*in Früh",
    "phone": "0178 6809537",
    "tel": "01786809537"
  },
  {
    "name": "Manu Jäger",
    "role": "Runner*in Spät",
    "phone": "0152 08952076",
    "tel": "015208952076"
  },
  {
    "name": "Martin Collatz",
    "role": "Runner*in Spät",
    "phone": "0172 8667681",
    "tel": "01728667681"
  },
  {
    "name": "Mandy Ilgner",
    "role": "Runner*in Spät",
    "phone": "0173 4677108",
    "tel": "01734677108"
  },
  {
    "name": "Max Bilski",
    "role": "Runner*in Früh",
    "phone": "0162 6449695",
    "tel": "01626449695"
  },
  {
    "name": "Ulrich Endemann",
    "role": "Runner*in Spät",
    "phone": "0174 7397888",
    "tel": "01747397888"
  },
  {
    "name": "Lukas Heinkel",
    "role": "Runner*in Früh",
    "phone": "0152 27886584",
    "tel": "015227886584"
  },
  {
    "name": "Franziska Pietzonka",
    "role": "Runner*in Spät",
    "phone": "0176 36375316",
    "tel": "017636375316"
  },
  {
    "name": "Jo Frank",
    "role": "INFO Ansprech",
    "phone": "0157 36447320",
    "tel": "015736447320"
  },
  {
    "name": "Tina Müller",
    "role": "CLEARING Ansprech",
    "phone": "0152 53457718",
    "tel": "015253457718"
  },
  {
    "name": "Moritz Weigel",
    "role": "Stationsleitung D9 Früh",
    "phone": "0152 23804355",
    "tel": "015223804355"
  },
  {
    "name": "Helena Kaden",
    "role": "Stationsleitung D9 Spät",
    "phone": "0152 03453710",
    "tel": "015203453710"
  },
  {
    "name": "Lui Schmidt",
    "role": "Stationsleitung A5 Früh",
    "phone": "0176 21827255",
    "tel": "017621827255"
  },
  {
    "name": "Julia Reichert",
    "role": "Stationsleitung A5 Spät",
    "phone": "0157 73562463",
    "tel": "015773562463"
  },
  {
    "name": "Malin Hirschfeld",
    "role": "Stationsleitung Krebsberg Früh",
    "phone": "0157 85448553",
    "tel": "015785448553"
  },
  {
    "name": "Frida Funke",
    "role": "Stationsleitung Krebsberg Spät",
    "phone": "01578 0475598",
    "tel": "015780475598"
  },
  {
    "name": "Sarah Lergenmüller",
    "role": "Stationsleitung Schwalbenschwanz Früh",
    "phone": "0152 31701669",
    "tel": "015231701669"
  },
  {
    "name": "Justin Stoidtner",
    "role": "Stationsleitung Schwalbenschwanz Spät",
    "phone": "0151 51381920",
    "tel": "015151381920"
  },
  {
    "name": "Elly Wistuba",
    "role": "Stationsleitung Pflanzgarten Früh",
    "phone": "0177 8060195",
    "tel": "01778060195"
  },
  {
    "name": "Hannah Greitemann",
    "role": "Stationsleitung Pflanzgarten Spät",
    "phone": "0151 59134110",
    "tel": "015159134110"
  },
  {
    "name": "Shawn Gigla",
    "role": "Stationsleitung D5 Früh",
    "phone": "0162 9061748",
    "tel": "01629061748"
  },
  {
    "name": "Tom Blödorn",
    "role": "Stationsleitung D5 Früh",
    "phone": "0157 39623429",
    "tel": "015739623429"
  },
  {
    "name": "Anki Brinkmann",
    "role": "Stationsleitung C6 Früh",
    "phone": "0172 2883173",
    "tel": "01722883173"
  },
  {
    "name": "Laura Fleischer",
    "role": "Stationsleitung C6 Spät",
    "phone": "0178 8050347",
    "tel": "01788050347"
  },
  {
    "name": "Eva Baasch",
    "role": "Stationsleitung B9 Früh",
    "phone": "0151 46108441",
    "tel": "015146108441"
  },
  {
    "name": "Jacquelin Reith",
    "role": "Stationsleitung B9 Spät",
    "phone": "0160 5286563",
    "tel": "01605286563"
  },
  {
    "name": "Chloe Schmedes",
    "role": "Stationsleitung B3 Früh",
    "phone": "0172 6405259",
    "tel": "01726405259"
  },
  {
    "name": "Nina Guthmann",
    "role": "Stationsleitung B3 Spät",
    "phone": "0151 51959381",
    "tel": "015151959381"
  },
  {
    "name": "Sundri Althoff",
    "role": "Stationsleitung B5 Früh",
    "phone": "0176 84767584",
    "tel": "017684767584"
  },
  {
    "name": "Giovanna Scigliano",
    "role": "Stationsleitung B5 Spät",
    "phone": "0160 93395567",
    "tel": "016093395567"
  },
  {
    "name": "Lisa Mann",
    "role": "Stationsleitung B5b Früh",
    "phone": "0172 8623061",
    "tel": "01728623061"
  },
  {
    "name": "Erika Wilches Quintero",
    "role": "Stationsleitung B5b Spät",
    "phone": "0162 4421574",
    "tel": "01624421574"
  },
  {
    "name": "Sophie Bährens",
    "role": "Stationsleitung B5c Früh",
    "phone": "0160 6803526",
    "tel": "01606803526"
  },
  {
    "name": "Martha Gilles",
    "role": "Stationsleitung B5c Spät",
    "phone": "0151 44930330",
    "tel": "015144930330"
  }
];
