// Entry Point: globaler State, Persistenz, Navigation, Theme, PWA, "Mehr"-Screen.
import { registerSW } from 'virtual:pwa-register';
import { ICO, toast, openModal, escapeHtml, isModalOpen, removeModalDOM } from './ui.js';
import { EVENTS, getEvent } from './data/events.js';
import { GUIDES } from './data/guides.js';
import { renderGuides, setGuideCategory, setGuideSearch, setDetailGuide, getDetailGuide, isGuideDetail } from './guides.js';
import { renderNotes, newNote, editNote, deleteNote, openNote } from './notes.js';
import { renderReference, setRefTab } from './reference.js';
import { renderDienstplan } from './dienstplan.js';
import { renderBestand } from './bestand.js';
import { renderKlangpiraten } from './klangpiraten.js';
import { syncStatusLabel, openSyncModal, initSync, pushSync, pullSync } from './sync.js';

const STORE_KEY = 'getclr-v1';
const THEME_KEY = 'getclr-theme';

// ---- State ----------------------------------------------------------------
export let state = {
  notes: [],
  stock: [], // Bestandslisten (Bändchen-Bestand pro Station/Tag) – synchronisierbar
  favorites: [],
  contacts: [], // eigene, NUR lokale Kontakte (werden nicht in die Cloud gesynct)
  activeEvent: 'rar',
  schema: 1
};

export let currentScreen = 'guides';

// ---- Persistenz -----------------------------------------------------------
export function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('save failed', e);
  }
  // Optionaler Cloud-Sync (no-op, wenn nicht konfiguriert)
  pushSync({ notes: state.notes, stock: state.stock });
}

export function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };
      if (!Array.isArray(state.notes)) state.notes = [];
      if (!Array.isArray(state.stock)) state.stock = [];
      if (!Array.isArray(state.favorites)) state.favorites = [];
      if (!Array.isArray(state.contacts)) state.contacts = [];
      // Umschalter wählt nur Festivals; früher konnten GET/Klangpiraten aktiv sein.
      if (getEvent(state.activeEvent).kind !== 'festival') state.activeEvent = 'rar';
    }
  } catch (e) {
    console.warn('load failed', e);
  }
}

// Wird vom Sync aufgerufen, wenn entfernte Notizen ankommen (merge).
export function mergeRemoteNotes(remoteNotes) {
  if (!Array.isArray(remoteNotes)) return;
  const byId = new Map(state.notes.map((n) => [n.id, n]));
  let changed = false;
  for (const r of remoteNotes) {
    const local = byId.get(r.id);
    if (!local || (r.updated || 0) > (local.updated || 0)) {
      byId.set(r.id, r);
      changed = true;
    }
  }
  if (changed) {
    state.notes = [...byId.values()];
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch {}
    if (currentScreen === 'notes') renderNotes();
    toast('Notizen synchronisiert', 'ok');
  }
}

// Merge entfernter Bestandslisten (Last-Write-Wins über `updated`).
export function mergeRemoteStock(remoteStock) {
  if (!Array.isArray(remoteStock)) return;
  const byId = new Map((state.stock || []).map((r) => [r.id, r]));
  let changed = false;
  for (const r of remoteStock) {
    const local = byId.get(r.id);
    if (!local || (r.updated || 0) > (local.updated || 0)) { byId.set(r.id, r); changed = true; }
  }
  if (changed) {
    state.stock = [...byId.values()];
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch {}
    if (currentScreen === 'bestand') renderBestand();
    toast('Bestand synchronisiert', 'ok');
  }
}

// Wird vom Team-Sync mit dem gesamten Remote-Dokument aufgerufen.
export function mergeRemote(data) {
  if (!data) return;
  if (Array.isArray(data.notes)) mergeRemoteNotes(data.notes);
  if (Array.isArray(data.stock)) mergeRemoteStock(data.stock);
}

// ---- Favoriten ------------------------------------------------------------
export function isFavorite(id) {
  return state.favorites.includes(id);
}
export function toggleFavorite(id) {
  const i = state.favorites.indexOf(id);
  if (i >= 0) state.favorites.splice(i, 1);
  else state.favorites.push(id);
  save();
}

// ---- Event-Auswahl --------------------------------------------------------
export function setActiveEvent(id) {
  state.activeEvent = id;
  save();
  // Den aktuell sichtbaren Tab neu rendern – jeder Tab respektiert das aktive Event.
  renderActive(currentScreen);
}

// Wiederverwendbarer Event-Umschalter (RaR/PV-Chips) für den Kopf jedes Tabs.
export function eventChipsHtml() {
  return `<div class="event-chips">${EVENTS.filter((e) => e.selectable).map((e) => `
    <button class="chip ${state.activeEvent === e.id ? 'chip-active' : ''}" style="--chip:${e.color}" onclick="setActiveEvent('${e.id}')">${escapeHtml(e.short)}</button>`).join('')}</div>`;
}

// ---- Navigation (History-gesteuert) ---------------------------------------
// Jede „tiefere" Aktion (Tab-Wechsel, Detailansicht, Modal) pusht einen
// History-Eintrag. Der popstate-Handler (Zurück-Geste / Hardware-Button /
// Zurück-Pfeil) baut genau eine Ebene ab; erst an der Wurzel verlässt man die App.

function updateScreenVisibility(name) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  document.querySelectorAll('.nav button').forEach((b) => b.classList.remove('active'));
  document.getElementById('screen-' + name)?.classList.add('active');
  document.getElementById('nav-' + name)?.classList.add('active');
  window.scrollTo(0, 0);
}

function renderActive(name) {
  if (name === 'guides') renderGuides();
  else if (name === 'notes') renderNotes();
  else if (name === 'reference') renderReference();
  else if (name === 'dienstplan') renderDienstplan();
  else if (name === 'bestand') renderBestand();
  else if (name === 'klangpiraten') renderKlangpiraten();
  else if (name === 'more') renderMore();
}

// Rendert den Zielzustand OHNE History-Änderung.
function applyScreen(name) {
  currentScreen = name;
  updateScreenVisibility(name);
  renderActive(name);
}

function pushNav(stateObj) {
  history.pushState(stateObj, '');
}

function currentNavState() {
  return { app: true, screen: currentScreen, guide: isGuideDetail() ? getDetailGuide() : null, modal: false };
}

// Wendet einen History-Zustand an (von popstate).
function applyNav(st) {
  const s = st || { screen: 'guides', guide: null };
  if (isModalOpen() && !s.modal) removeModalDOM();
  const screen = s.screen || 'guides';
  setDetailGuide(screen === 'guides' ? (s.guide || null) : null);
  applyScreen(screen);
}

// Benutzer-Navigation: Tab-Wechsel über die untere Leiste.
export function showScreen(name) {
  const sameRoot = name === currentScreen && !isGuideDetail() && !isModalOpen();
  setDetailGuide(null); // ein Tab-Tipp zeigt immer die Wurzelansicht
  if (!sameRoot) pushNav({ app: true, screen: name, guide: null, modal: false });
  applyScreen(name);
}

// Benutzer-Navigation: Anleitung öffnen (Detailansicht).
export function navGuide(id) {
  setDetailGuide(id);
  pushNav({ app: true, screen: 'guides', guide: id, modal: false });
  applyScreen('guides');
}

// Zurück (Pfeil oben links / programmatisch): nutzt den Browserverlauf.
export function navBack() {
  history.back();
}

// Aus einem Modal heraus in eine Anleitung springen: aktuellen (Modal-)Eintrag
// durch die Detailansicht ersetzen, damit der Verlauf konsistent bleibt.
export function navReplaceGuide(id) {
  setDetailGuide(id);
  history.replaceState({ app: true, screen: 'guides', guide: id, modal: false }, '');
  applyScreen('guides');
}

// ---- Theme ----------------------------------------------------------------
export function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}
export function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', next === 'dark' ? '#15171e' : '#f5a623');
  if (currentScreen === 'more') renderMore();
}
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}

// ---- "Mehr" / Einstellungen ----------------------------------------------
const APP_VERSION = '3.1.0';
const CHANGELOG = [
  ['3.1.0', 'Klangpiraten ist jetzt ein eigener Tab (unten) statt einer Umschalt-Auswahl – festivalunabhängig erreichbar für arbeitgeberweite Crew-Infos. Der Umschalter oben wählt nur noch das Festival (Rock am Ring, Parookaville …); die allgemeinen GET-Cashless-Anleitungen werden in jedem Festival automatisch mitgezeigt.'],
  ['3.0.0', 'Festival-übergreifend umgebaut: Die App ist jetzt allgemein für Festival-Crews gedacht. Der Umschalter (oben auf jedem Tab) wählt den Bereich – zwei allgemeine Bereiche „GET Cashless" (systemweites Cashless-Wissen, erscheint zusätzlich in jedem Festival) und „Klangpiraten" (Arbeitgeber, festivalübergreifend) plus die Festivals (Rock am Ring, Parookaville …). Jeder Bereich zeigt nur seine Inhalte; neue Festivals lassen sich einfach ergänzen. Umbenannt zu „Festival Clearing & Crew".'],
  ['2.9.0', 'Strikte Event-Trennung: Der RaR/PV-Umschalter ist jetzt im Kopf jedes Tabs sichtbar, und jeder Tab zeigt nur die Daten des aktiven Events. Dienstplan, Bestand und Referenz → Tickets/Bändchen sind Rock-am-Ring-spezifisch und zeigen unter Parookaville einen Hinweis statt RaR-Daten. Eigene Fälle/Notizen bleiben bewusst über beide Events sichtbar (mit Event-Badge).'],
  ['2.8.0', 'Neuer Tab „Bestand": Mitarbeiter*innen-Bestandsliste digital führen – pro Station/Tag je Bändchen-Typ Erst-/Restbestand, „Angelegt" wird automatisch berechnet (überschreibbar). Stationen & Namen werden vorgeschlagen (Freitext möglich), Datum nur heute–Sonntag, jederzeit editierbar, optional übers Team synchronisiert. „Fälle/Notizen" sind jetzt über den „Mehr"-Tab erreichbar.'],
  ['2.7.0', 'Support-Tool-Anleitung: Support-Chat ohne Bändchen/Chip per Ticketnummer oder Handynummer klargestellt. Neue RaR-Anleitung „Welches Bändchen an welcher Station?" (Festival ohne Camping nur an B3, Festival+Camping an allen KBs).'],
  ['2.6.1', 'Kalender-Button jetzt auch bei Schichten ohne Uhrzeit (z. B. Sa/So) – wird als ganztägiger Termin gespeichert.'],
  ['2.6.0', 'Bändchentausch-Dienstplan vervollständigt: alle Tage Mittwoch–Sonntag (bisher nur Donnerstag). Damit sind im Dienstplan beide Pläne mit je 5 Tagen vorhanden und die Namenssuche findet alle Schichten einer Person (z. B. Stationsleitungen über die ganze Woche).'],
  ['2.5.0', 'Dienstplan: Kalender-Button neben jeder Schicht (mit Uhrzeit) – speichert die Schicht als Termin (.ics) direkt in den eigenen Kalender. Funktioniert in Tagesansicht und Namenssuche; berücksichtigt Schichten über Mitternacht.'],
  ['2.4.1', 'Dienstplan: statt eines Reiters pro Tag jetzt zwei Plan-Reiter („Bändchentausch" / „Clearing"); die Tage erscheinen darunter als Auswahl.'],
  ['2.4.0', 'Clearing-Dienstpläne vervollständigt: offizielle Pläne Mittwoch–Samstag ergänzt (zusätzlich zum Sonntag), inkl. Freitags-Hinweisen (Stationsschließung, Clearing INFIELD). Sonntag-Namen anhand der offiziellen Liste korrigiert. Ansprechperson „Fabian Gayer (Stationsleitung Infield)" ergänzt.'],
  ['2.3.0', 'Dienstplan erweitert: Clearing/Cashless-Plan (Sonntag 7.6.) ergänzt – der Tab enthält jetzt beide Plan-Typen (Bändertausch & Clearing), die Namenssuche geht über alle Pläne. Neuer Bereich „Ansprechpersonen" mit Telefonnummern (Leitung, Runner, Stationsleitungen) und Anruf-Links.'],
  ['2.2.0', 'Neuer Tab „Dienstplan" (Klangpiraten RaR 2026, Bändertausch/Ticketscan): Tagesbrowser nach Stationen/KB und Namenssuche – einen Namen suchen zeigt alle Schichten dieser Person. Schichttausche werden gepflegt und als „geändert" markiert.'],
  ['2.1.0', 'Support-Tool-Anleitung um „Voraussetzungen" (Chip-Repair-Gerät, Manage-Account, Internet) und „Support Case"-Begriffe ergänzt (GET Support handling tool 2026). GET-Troubleshooting-Fälle für 2026 als unverändert bestätigt.'],
  ['2.0.0', 'Rock am Ring 2026: Event-Daten, Einlassprozess (Festival + Camping, 7 Schritte), Ticket-/Bändchen-Typen (Kombi, VIP, Fast Lane, Camping-only-Papierband, rockAbility), Camping-Kategorien (inkl. Green Power), Jugendschutz und neue Awareness-Anleitung (Codes, Guardian Angels, Points) aktualisiert.'],
  ['1.2.0', 'Rock am Ring: Check-In C ergänzt – Standort (Parkplatz D10), Öffnungszeiten und Kontakt (Anleitung + klickbare Kontakte in der Referenz).'],
  ['1.1.0', 'Zurück-Geste / Zurück-Pfeil navigieren jetzt innerhalb der App (schließen Modal → Detail → Startansicht), statt die App zu beenden. Firebase-Team-Sync vereinfacht (Standardprojekt hinterlegt, nur Team-Code nötig).'],
  ['1.0.0', 'Erste Version: GET-Anleitungskatalog (Chip, Ticket, Guthaben, Swap, Top-Up, Tools), Rock-am-Ring-Clearing, eigene Fallnotizen, Referenz (Scan-Matrix, Bändchen, Kontakte), Suche, optionaler Team-Sync.']
];

export function renderMore() {
  const el = document.getElementById('screen-more');
  if (!el) return;
  const theme = getTheme();
  const noteCount = state.notes.length;
  el.innerHTML = `
    <header class="topbar"><h1>Mehr</h1></header>
    <div class="pad">
      <div class="card">
        <div class="card-title">Eigene Fälle / Notizen</div>
        <button class="row-btn" onclick="showScreen('notes')">
          <span class="row-ic">${ICO.note}</span>
          <span>Meine Fälle</span>
          <span class="row-arrow">${noteCount} ${noteCount === 1 ? 'Notiz' : 'Notizen'}</span>
        </button>
      </div>
      <div class="card">
        <div class="card-title">Darstellung</div>
        <button class="row-btn" onclick="toggleTheme()">
          <span class="row-ic">${theme === 'dark' ? ICO.moon : ICO.sun}</span>
          <span>Theme: ${theme === 'dark' ? 'Dunkel' : 'Hell'}</span>
          <span class="row-arrow">wechseln</span>
        </button>
      </div>

      <div class="card">
        <div class="card-title">Aktives Festival</div>
        <p class="muted small" style="margin:0 0 10px">Wähle das Festival – die App zeigt dessen Inhalte plus die allgemeinen GET-Cashless-Anleitungen. Klangpiraten-Infos liegen im eigenen Tab.</p>
        <div class="event-list">
          ${EVENTS.filter((e) => e.selectable).map((e) => `
            <button class="event-row ${state.activeEvent === e.id ? 'event-row-active' : ''}" onclick="setActiveEvent('${e.id}')">
              <span class="dot" style="background:${e.color}"></span>
              <span class="event-meta"><b>${escapeHtml(e.name)}</b><small>${escapeHtml(e.desc)}</small></span>
              ${state.activeEvent === e.id ? `<span class="row-ic ok">${ICO.check}</span>` : ''}
            </button>`).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-title">Team-Sync (optional)</div>
        <p class="muted small">Standardmäßig liegen deine Notizen nur lokal auf diesem Gerät. Du kannst optional einen Cloud-Sync einrichten, damit Kolleg:innen dieselben Fälle sehen.</p>
        <button class="row-btn" onclick="openSyncModal()">
          <span class="row-ic">${ICO.cloud}</span>
          <span>Sync einrichten / verwalten</span>
          <span class="row-arrow">${escapeHtml(syncStatusLabel())}</span>
        </button>
      </div>

      <div class="card">
        <div class="card-title">Daten</div>
        <div class="muted small" style="margin-bottom:10px">${noteCount} eigene Notiz${noteCount === 1 ? '' : 'en'} gespeichert.</div>
        <button class="row-btn" onclick="exportData()"><span class="row-ic">${ICO.note}</span><span>Notizen exportieren (JSON)</span><span class="row-arrow">Download</span></button>
        <button class="row-btn" onclick="importData()"><span class="row-ic">${ICO.note}</span><span>Notizen importieren</span><span class="row-arrow">Datei</span></button>
      </div>

      <div class="card">
        <div class="card-title">Info</div>
        <div class="muted small">Festival Clearing &amp; Crew · v${APP_VERSION}</div>
        <div class="muted small" style="margin-top:6px">Anleitungen, Referenz &amp; Fallnotizen für Festival-Crews (Cashless-Clearing, Dienstpläne u. a.). Inhalte ohne Gewähr – im Zweifel Teamlead / Support fragen.</div>
        <button class="row-btn" style="margin-top:10px" onclick="openChangelog()"><span class="row-ic">${ICO.info}</span><span>Changelog</span><span class="row-arrow">v${APP_VERSION}</span></button>
      </div>

      <div class="card">
        <div class="card-title" style="color:var(--warn)">Datenschutz</div>
        <p class="muted small" style="margin:0">Mitgelieferte Kontakte enthalten nur offizielle Festival-Hotlines. Private Crew-Nummern bitte nur als <b>eigene Kontakte</b> hinterlegen – diese bleiben lokal (bzw. im selbst eingerichteten Team-Sync).</p>
      </div>
    </div>`;
}

export function openChangelog() {
  openModal('Changelog', CHANGELOG.map(([v, t]) => `<div style="margin-bottom:12px"><b>v${escapeHtml(v)}</b><div class="muted small">${escapeHtml(t)}</div></div>`).join(''));
}

export function exportData() {
  const data = JSON.stringify({ notes: state.notes, favorites: state.favorites, exported: Date.now() }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `clearing-notizen-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('Export gestartet', 'ok');
}

export function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(reader.result);
        if (Array.isArray(obj.notes)) {
          mergeRemoteNotes(obj.notes);
          if (Array.isArray(obj.favorites)) {
            state.favorites = [...new Set([...state.favorites, ...obj.favorites])];
          }
          save();
          renderMore();
          toast('Import erfolgreich', 'ok');
        } else {
          toast('Keine Notizen in der Datei', 'err');
        }
      } catch {
        toast('Datei ungültig', 'err');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ---- PWA Update-Toast -----------------------------------------------------
function initPWA() {
  const updateSW = registerSW({
    onNeedRefresh() {
      const el = document.createElement('div');
      el.className = 'update-toast';
      el.innerHTML = `<span>Neue Version verfügbar</span><button class="btn btn-sm btn-primary">Aktualisieren</button>`;
      el.querySelector('button').onclick = () => updateSW(true);
      document.body.appendChild(el);
    }
  });
}

// ---- History-Verdrahtung --------------------------------------------------
function initHistory() {
  // Wurzelzustand (Anleitungen-Liste). Beim Zurück von hier wird die App verlassen.
  history.replaceState({ app: true, screen: 'guides', guide: null, modal: false }, '');
  // Beim Öffnen eines Modals einen History-Eintrag pushen (aus ui.js aufgerufen).
  window.__navModalOpen = () => pushNav({ ...currentNavState(), modal: true });
  window.addEventListener('popstate', (e) => {
    applyNav(e.state || { screen: 'guides', guide: null, modal: false });
  });
}

// ---- Init -----------------------------------------------------------------
function init() {
  initTheme();
  load();
  initSync({ notes: state.notes, stock: state.stock }, mergeRemote);
  initHistory();
  applyScreen('guides');
  initPWA();
}

// Alle für onclick benötigten Funktionen global registrieren (ES-Module sind nicht global).
Object.assign(window, {
  showScreen, navBack, setActiveEvent, toggleTheme,
  openGuide: navGuide, navGuide, setGuideCategory, setGuideSearch,
  newNote, editNote, deleteNote, openNote,
  setRefTab,
  openSyncModal, pullSync,
  renderMore, openChangelog, exportData, importData,
  toggleFavorite
});

document.addEventListener('DOMContentLoaded', init);
