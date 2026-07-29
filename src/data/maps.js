// Geländekarten je Festival (event-id → Liste von { src, title }).
// Werden in der Referenz unter „Infos" als antippbare Bilder gezeigt
// (src/reference.js#renderInfo). Bilder liegen in public/.

export const EVENT_MAPS = {
  natureone: [
    { src: '/no-illu-overview.jpg', title: 'Overview – Laufwege' },
    { src: '/no-illu-pydna.jpg', title: 'Raketenbasis Pydna – Clubfloors' },
    { src: '/no-illu-camping.jpg', title: 'Camping Village' },
    { src: '/no-illu-campfloors.jpg', title: 'Camp-Floors (F-Nummern)' },
    { src: '/no-illu-silent.jpg', title: 'Silent Camp' },
    { src: '/no-karte-uebersicht.jpg', title: 'Detailplan – Gesamtübersicht' },
    { src: '/no-karte-festival.jpg', title: 'Detailplan – Festival-Kern (Theken / Cashless)' },
    { src: '/no-karte-camping.jpg', title: 'Detailplan – CampingVillage' }
  ]
};
