// Optionaler Team-Sync über Firebase (Firestore).
//
// Standard: AUS. Notizen liegen rein lokal. Wird ein Team eingerichtet, werden
// die Notizen in einem Dokument `teams/{teamCode}` abgelegt und per onSnapshot
// live gemerged (Last-Write-Wins pro Notiz über das `updated`-Feld).
//
// Firebase wird NUR per dynamischem Import geladen, wenn Sync aktiv ist –
// die Standard-App bleibt schlank und voll offline-fähig.

import { ICO, escapeHtml, openModal, closeModal, toast } from './ui.js';

const CFG_KEY = 'getclr-sync';

let cfg = null;          // { config:{...}, team:'code', enabled:true }
let db = null;
let unsub = null;
let mergeCb = null;
let localNotesRef = [];
let status = 'off';      // off | connecting | active | error
let pushTimer = null;

export function loadCfg() {
  try {
    const raw = localStorage.getItem(CFG_KEY);
    cfg = raw ? JSON.parse(raw) : null;
  } catch { cfg = null; }
  return cfg;
}

export function syncStatusLabel() {
  if (!cfg || !cfg.enabled) return 'aus';
  if (status === 'active') return 'aktiv: ' + cfg.team;
  if (status === 'connecting') return 'verbinde…';
  if (status === 'error') return 'Fehler';
  return 'aus';
}

export function initSync(notes, onMerge) {
  localNotesRef = notes;
  mergeCb = onMerge;
  loadCfg();
  if (cfg && cfg.enabled) connect();
}

async function connect() {
  if (!cfg || !cfg.config || !cfg.team) return;
  status = 'connecting';
  try {
    const { initializeApp } = await import('firebase/app');
    const { getFirestore, doc, onSnapshot } = await import('firebase/firestore');
    const app = initializeApp(cfg.config, 'getclr-' + cfg.team);
    db = getFirestore(app);
    const ref = doc(db, 'teams', cfg.team);
    if (unsub) unsub();
    unsub = onSnapshot(ref, (snap) => {
      status = 'active';
      const data = snap.data();
      if (data && Array.isArray(data.notes) && mergeCb) mergeCb(data.notes);
      refreshMore();
    }, (err) => {
      console.warn('sync snapshot error', err);
      status = 'error';
      refreshMore();
    });
  } catch (e) {
    console.warn('sync connect failed', e);
    status = 'error';
    toast('Sync-Verbindung fehlgeschlagen', 'err');
    refreshMore();
  }
}

// Wird bei jedem save() aufgerufen – no-op, wenn Sync aus.
export function pushNotes(notes) {
  localNotesRef = notes;
  if (!cfg || !cfg.enabled || !db) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(async () => {
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'teams', cfg.team), { notes, updatedAt: Date.now() }, { merge: true });
    } catch (e) {
      console.warn('push failed', e);
    }
  }, 800);
}

export async function pullNotes() {
  if (!cfg || !cfg.enabled || !db) { toast('Sync ist nicht aktiv', 'err'); return; }
  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const snap = await getDoc(doc(db, 'teams', cfg.team));
    const data = snap.data();
    if (data && Array.isArray(data.notes) && mergeCb) mergeCb(data.notes);
    toast('Aktualisiert', 'ok');
  } catch (e) {
    toast('Abruf fehlgeschlagen', 'err');
  }
}

function refreshMore() {
  if (window.renderMore && document.getElementById('screen-more')?.classList.contains('active')) {
    window.renderMore();
  }
}

// ---- UI -------------------------------------------------------------------
export function openSyncModal() {
  loadCfg();
  const active = cfg && cfg.enabled;
  openModal('Team-Sync', `
    <p class="muted small" style="margin:0 0 14px;line-height:1.5">
      Optional: Notizen mit dem Team teilen. Du brauchst ein (kostenloses) Firebase-Projekt.
      Trage die Firebase-Web-Konfiguration und einen frei wählbaren Team-Code ein.
      Alle mit demselben Code &amp; Projekt sehen dieselben Fälle.
    </p>
    ${active ? `<div class="callout callout-tip">${ICO.check}<div>Sync aktiv für Team „<b>${escapeHtml(cfg.team)}</b>" (${escapeHtml(syncStatusLabel())}).</div></div>` : ''}
    <form id="syncForm" onsubmit="return false">
      <label class="fld">
        <span>Team-Code</span>
        <input name="team" type="text" value="${escapeHtml(cfg?.team || '')}" placeholder="z. B. rar25-clearing">
      </label>
      <label class="fld">
        <span>Firebase-Konfiguration (JSON)</span>
        <textarea name="config" rows="8" placeholder='{ "apiKey": "…", "projectId": "…", … }'>${cfg?.config ? escapeHtml(JSON.stringify(cfg.config, null, 2)) : ''}</textarea>
      </label>
      <div class="callout callout-note">${ICO.info}<div>Firestore-Regeln so setzen, dass nur dein Team schreiben darf. Eigene Kontakte werden <b>nicht</b> gesynct.</div></div>
      <div class="modal-actions">
        ${active ? `<button type="button" class="btn btn-danger" onclick="disableSync()">Sync deaktivieren</button>` : '<span></span>'}
        <button type="button" class="btn btn-primary" onclick="enableSync()">${active ? 'Speichern & neu verbinden' : 'Aktivieren'}</button>
      </div>
    </form>
    ${active ? `<button class="btn btn-ghost full" style="margin-top:10px" onclick="pullNotes()">${ICO.cloud} Jetzt manuell abrufen</button>` : ''}`);
}

export function enableSync() {
  const form = document.getElementById('syncForm');
  if (!form) return;
  const fd = new FormData(form);
  const team = (fd.get('team') || '').toString().trim();
  const cfgText = (fd.get('config') || '').toString().trim();
  if (!team) { toast('Team-Code fehlt', 'err'); return; }
  let config;
  try {
    config = JSON.parse(cfgText);
  } catch {
    toast('Firebase-Konfiguration ist kein gültiges JSON', 'err');
    return;
  }
  if (!config.apiKey || !config.projectId) {
    toast('Konfiguration unvollständig (apiKey/projectId)', 'err');
    return;
  }
  cfg = { config, team, enabled: true };
  localStorage.setItem(CFG_KEY, JSON.stringify(cfg));
  closeModal();
  toast('Sync aktiviert', 'ok');
  // direkt Push der aktuellen lokalen Notizen + verbinden
  connect().then(() => pushNotes(localNotesRef));
  refreshMore();
}

export function disableSync() {
  if (cfg) { cfg.enabled = false; localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); }
  if (unsub) { unsub(); unsub = null; }
  db = null;
  status = 'off';
  closeModal();
  toast('Sync deaktiviert');
  refreshMore();
}

Object.assign(window, { openSyncModal, enableSync, disableSync, pullNotes });
