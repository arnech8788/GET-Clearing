// Standard-Firebase-Projekt für den Team-Sync.
//
// HINWEIS ZUR SICHERHEIT: Ein Firebase-Web-API-Key ist KEIN Geheimnis – er
// identifiziert nur das Projekt. Der tatsächliche Zugriffsschutz läuft über die
// Firestore-Regeln (siehe firestore.rules) in Kombination mit dem TEAM-CODE,
// der die Dokument-ID ist und NICHT im Repo steht. `list` ist in den Regeln
// verboten, d. h. ohne Kenntnis des exakten Team-Codes kommt man an keine Daten.
//
// Auf null setzen, wenn KEIN Standardprojekt gewünscht ist (dann muss die
// Konfiguration manuell im Sync-Dialog eingetragen werden).

export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCOr9QH18-dkY8LK7g8zxmaXXqOhYQUIC4',
  authDomain: 'get-clearing.firebaseapp.com',
  projectId: 'get-clearing',
  storageBucket: 'get-clearing.firebasestorage.app',
  messagingSenderId: '488477647728',
  appId: '1:488477647728:web:aa05f471930ff9aebee5b5',
  measurementId: 'G-E0YYX0TYVH'
};
