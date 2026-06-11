// Bereich „Bestand": Mitarbeiter*innen-Bestandsliste (Bändchen-Bestand pro Station/Tag).
// CRUD wie src/notes.js; Stationen/Namen werden aus dem Dienstplan vorgeschlagen
// (Freitext erlaubt); Datum nur heute..Sonntag; lokal + optionaler Team-Sync.
import { ICO, escapeHtml, highlight, openModal, closeModal, toast, confirmDialog } from './ui.js';
import { state, save, eventChipsHtml } from './main.js';
import { DIENSTPLAN_DAYS } from './data/dienstplan.js';

// Bändchen-Typen (Zeilen, wie auf dem Blatt).
const BAND_TYPES = [
  'Festival',
  'Festival / General Camping',
  'Festival / Car & Tent',
  'Festival / Caravan Camping',
  'Festival / Green Camping',
  'Festival / Green Power',
  "Festival / Rock'n'Roll",
  'Camping Only'
];
const PLANS = ['Bändchentausch', 'Clearing'];
const FEST_SUNDAY = [2026, 6, 7]; // Festival-Sonntag

let filter = { query: '' };

function uid() { return 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }
function num(v) { const n = parseInt(v, 10); return Number.isFinite(n) ? n : null; }

// ---- Vorschläge & Datum ----------------------------------------------------
function stationSuggestions() {
  const set = new Set();
  for (const d of DIENSTPLAN_DAYS) for (const s of d.stations) if (s.name && !/ohne|Springer|EXTRA/i.test(s.name)) set.add(s.name);
  return [...set].sort((a, b) => a.localeCompare(b, 'de'));
}
function nameSuggestions() {
  const set = new Set();
  for (const d of DIENSTPLAN_DAYS) for (const s of d.stations) for (const r of s.rows) if (r.name) set.add(r.name);
  return [...set].sort((a, b) => a.localeCompare(b, 'de'));
}
function isoToday() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
}
function dateOptions() {
  const sunday = new Date(FEST_SUNDAY[0], FEST_SUNDAY[1] - 1, FEST_SUNDAY[2]);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const start = today <= sunday ? today : new Date(2026, 5, 3); // sonst Festivalwoche ab Mi 03.06.
  const out = [];
  const cur = new Date(start);
  for (let i = 0; i < 14 && cur <= sunday; i++) {
    out.push(`${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}-${String(cur.getDate()).padStart(2, '0')}`);
    cur.setDate(cur.getDate() + 1);
  }
  if (!out.length) for (let d = 3; d <= 7; d++) out.push(`2026-06-0${d}`);
  return out;
}
function dateLabel(iso) {
  const wd = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return `${wd[dt.getDay()]} ${String(d).padStart(2, '0')}.${String(m).padStart(2, '0')}.`;
}

export function setBestandSearch(q) { filter.query = q; renderBestand({ keepFocus: true }); }

// ---- Liste ----------------------------------------------------------------
export function renderBestand(opts = {}) {
  const el = document.getElementById('screen-bestand');
  if (!el) return;
  // Bestandslisten sind Rock-am-Ring-spezifisch (Bändchen-Typen, Festivaltage).
  if (state.activeEvent !== 'rar') {
    el.innerHTML = `
      <header class="topbar"><h1>Bestand</h1>${eventChipsHtml()}</header>
      <div class="pad">
        <div class="empty">${ICO.clipboard}<p>Bestandslisten gibt es aktuell nur für Rock am Ring.</p></div>
      </div>`;
    return;
  }
  const q = filter.query.trim().toLowerCase();
  let list = [...(state.stock || [])].sort((a, b) => (b.updated || 0) - (a.updated || 0));
  if (q) list = list.filter((r) => `${r.plan} ${r.station} ${r.name} ${r.date}`.toLowerCase().includes(q));

  el.innerHTML = `
    <header class="topbar"><h1>Bestand</h1>${eventChipsHtml()}</header>
    <div class="pad">
      <div class="muted small" style="margin-bottom:10px">Mitarbeiter*innen-Bestandsliste · Bändchen-Bestand pro Station &amp; Tag</div>
      <div class="search-wrap">
        ${ICO.search}
        <input id="stkSearch" type="search" placeholder="Suchen (Station, Name, Tag, Plan)…"
               value="${escapeHtml(filter.query)}" oninput="setBestandSearch(this.value)" autocomplete="off">
      </div>
      ${list.length ? list.map((r) => card(r, q)).join('') : empty()}
    </div>
    <button class="fab" onclick="newStock()" aria-label="Neue Bestandsliste">${ICO.plus}</button>`;

  if (opts.keepFocus) { const i = document.getElementById('stkSearch'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }
}

function empty() {
  return `<div class="empty">${ICO.clipboard}<p>Noch keine Bestandsliste.</p><p class="muted small">Lege pro Station &amp; Tag eine Liste an: Erstbestand erfassen, später Restbestand – „Angelegt" rechnet die App aus.</p></div>`;
}

function sumAngelegt(r) {
  let s = 0, any = false;
  for (const t of BAND_TYPES) { const v = num(r.rows?.[t]?.angelegt); if (v != null) { s += v; any = true; } }
  return any ? s : null;
}

function card(r, q) {
  const sa = sumAngelegt(r);
  return `
    <div class="note-card" onclick="editStock('${r.id}')">
      <div class="nc-top">
        <span class="status-badge" style="--sc:var(--accent)">${escapeHtml(r.plan || '–')}</span>
        <span class="ev-badge" style="background:var(--accent2)">${escapeHtml(dateLabel(r.date))}</span>
        <span class="nc-time">${sa != null ? 'Σ angelegt: ' + sa : ''}</span>
      </div>
      <div class="nc-title">${highlight(escapeHtml(r.station || '(ohne Station)'), q)}</div>
      ${r.name ? `<div class="nc-meta">${highlight(escapeHtml(r.name), q)}</div>` : ''}
      ${r.bemerkung ? `<div class="nc-body">${escapeHtml(r.bemerkung)}</div>` : ''}
    </div>`;
}

// ---- Editor ---------------------------------------------------------------
function editorHtml(r) {
  const stations = stationSuggestions();
  const names = nameSuggestions();
  const dates = dateOptions();
  const rowsHtml = BAND_TYPES.map((t, i) => {
    const cell = r.rows?.[t] || {};
    return `
      <div class="bestand-row">
        <div class="bestand-type">${escapeHtml(t)}</div>
        <input class="bestand-num" name="erst_${i}" type="number" inputmode="numeric" min="0" placeholder="Erst" value="${escapeHtml(cell.erst ?? '')}" oninput="bestandRecalc(${i})">
        <input class="bestand-num" name="rest_${i}" type="number" inputmode="numeric" min="0" placeholder="Rest" value="${escapeHtml(cell.rest ?? '')}" oninput="bestandRecalc(${i})">
        <input class="bestand-num bestand-ang" name="ang_${i}" type="number" inputmode="numeric" min="0" placeholder="Angel." value="${escapeHtml(cell.angelegt ?? '')}" data-dirty="${cell.angelegt != null && cell.angelegt !== '' ? '1' : ''}" oninput="this.dataset.dirty='1'">
      </div>`;
  }).join('');
  return `
    <form id="stockForm" onsubmit="return false">
      <div class="fld-row">
        <label class="fld"><span>Plan</span>
          <select name="plan">${PLANS.map((p) => `<option ${r.plan === p ? 'selected' : ''}>${escapeHtml(p)}</option>`).join('')}</select>
        </label>
        <label class="fld"><span>Tag</span>
          <select name="date">${dateOptions().map((iso) => `<option value="${iso}" ${r.date === iso ? 'selected' : ''}>${escapeHtml(dateLabel(iso))}</option>`).join('')}</select>
        </label>
      </div>
      <label class="fld"><span>Station</span>
        <input name="station" list="stkStations" value="${escapeHtml(r.station || '')}" placeholder="z. B. B3 / Station A5" autocomplete="off">
      </label>
      <datalist id="stkStations">${stations.map((s) => `<option value="${escapeHtml(s)}"></option>`).join('')}</datalist>
      <label class="fld"><span>Name, Vorname</span>
        <input name="name" list="stkNames" value="${escapeHtml(r.name || '')}" placeholder="wer führt die Liste" autocomplete="off">
      </label>
      <datalist id="stkNames">${names.map((n) => `<option value="${escapeHtml(n)}"></option>`).join('')}</datalist>

      <div class="bestand-head"><span>Bändchen-Typ</span><span>Erst</span><span>Rest</span><span>Angel.</span></div>
      ${rowsHtml}
      <div class="muted small" style="margin:6px 0 12px">„Angelegt" wird automatisch als Erst − Rest berechnet, lässt sich aber überschreiben.</div>

      <label class="fld"><span>Bemerkungen / Besonderheiten</span>
        <textarea name="bemerkung" rows="3" placeholder="optional">${escapeHtml(r.bemerkung || '')}</textarea>
      </label>
      <div class="modal-actions">
        ${state.stock?.some((x) => x.id === r.id) ? `<button type="button" class="btn btn-danger" onclick="deleteStock('${r.id}')">${ICO.trash} Löschen</button>` : '<button type="button" class="btn btn-ghost" onclick="closeStockModal()">Abbrechen</button>'}
        <button type="button" class="btn btn-primary" onclick="saveStockForm('${r.id}')">Speichern</button>
      </div>
    </form>`;
}

export function newStock() {
  const opts = dateOptions();
  const r = { id: uid(), event: state.activeEvent, plan: PLANS[0], date: opts.includes(isoToday()) ? isoToday() : opts[0], station: '', name: '', rows: {}, bemerkung: '', created: Date.now(), updated: Date.now() };
  openModal('Neue Bestandsliste', editorHtml(r));
}

export function editStock(id) {
  const r = (state.stock || []).find((x) => x.id === id);
  if (!r) return;
  openModal('Bestandsliste bearbeiten', editorHtml(r));
}

export function saveStockForm(id) {
  const form = document.getElementById('stockForm');
  if (!form) return;
  const fd = new FormData(form);
  const station = (fd.get('station') || '').toString().trim();
  if (!station) { toast('Bitte eine Station angeben', 'err'); return; }
  const rows = {};
  BAND_TYPES.forEach((t, i) => {
    const erst = (fd.get(`erst_${i}`) || '').toString().trim();
    const rest = (fd.get(`rest_${i}`) || '').toString().trim();
    let ang = (fd.get(`ang_${i}`) || '').toString().trim();
    if (ang === '' && erst !== '' && rest !== '') { const v = num(erst) - num(rest); if (Number.isFinite(v)) ang = String(Math.max(0, v)); }
    if (erst || rest || ang) rows[t] = { erst, rest, angelegt: ang };
  });
  let r = (state.stock || []).find((x) => x.id === id);
  const isNew = !r;
  if (isNew) { r = { id, event: state.activeEvent, created: Date.now() }; if (!Array.isArray(state.stock)) state.stock = []; state.stock.push(r); }
  r.plan = (fd.get('plan') || PLANS[0]).toString();
  r.date = (fd.get('date') || '').toString();
  r.station = station;
  r.name = (fd.get('name') || '').toString().trim();
  r.rows = rows;
  r.bemerkung = (fd.get('bemerkung') || '').toString();
  r.updated = Date.now();
  save();
  closeModal();
  renderBestand();
  toast(isNew ? 'Bestandsliste angelegt' : 'Gespeichert', 'ok');
}

export async function deleteStock(id) {
  const ok = await confirmDialog('Diese Bestandsliste löschen?', { okLabel: 'Löschen', danger: true });
  if (!ok) return;
  const i = (state.stock || []).findIndex((x) => x.id === id);
  if (i >= 0) { state.stock.splice(i, 1); save(); }
  closeModal();
  renderBestand();
  toast('Gelöscht');
}

export function closeStockModal() { closeModal(); }

// live Neuberechnung „Angelegt" (nur solange nicht manuell überschrieben)
function bestandRecalc(idx) {
  const e = document.querySelector(`[name="erst_${idx}"]`);
  const r = document.querySelector(`[name="rest_${idx}"]`);
  const a = document.querySelector(`[name="ang_${idx}"]`);
  if (!a || a.dataset.dirty === '1') return;
  const ev = num(e.value), rv = num(r.value);
  a.value = (ev != null && rv != null) ? String(Math.max(0, ev - rv)) : '';
}

Object.assign(window, { setBestandSearch, newStock, editStock, saveStockForm, deleteStock, closeStockModal, bestandRecalc });
