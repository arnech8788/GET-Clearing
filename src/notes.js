// Eigene Fälle / Notizen: anlegen, bearbeiten, Status verfolgen, durchsuchen.
import { ICO, escapeHtml, highlight, openModal, closeModal, toast, confirmDialog } from './ui.js';
import { state, save, showScreen } from './main.js';
import { getEvent } from './data/events.js';
import { getGuide } from './data/guides.js';

const STATUS = {
  open: { label: 'Offen', color: '#e23b3b' },
  progress: { label: 'In Bearbeitung', color: '#f5a623' },
  done: { label: 'Erledigt', color: '#4ad07a' }
};

let filter = { status: '', query: '' };

function uid() {
  return 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function fmtTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export function setNoteFilter(status) {
  filter.status = filter.status === status ? '' : status;
  renderNotes();
}
export function setNoteSearch(q) {
  filter.query = q;
  renderNotes({ keepFocus: true });
}

export function renderNotes(opts = {}) {
  const el = document.getElementById('screen-notes');
  if (!el) return;
  const q = filter.query.trim().toLowerCase();
  let notes = [...state.notes].sort((a, b) => (b.updated || 0) - (a.updated || 0));
  if (filter.status) notes = notes.filter((n) => (n.status || 'open') === filter.status);
  if (q) {
    notes = notes.filter((n) =>
      (n.title + ' ' + (n.body || '') + ' ' + (n.chip || '') + ' ' + (n.ticket || '') + ' ' + (n.tags || []).join(' '))
        .toLowerCase().includes(q));
  }

  const counts = { all: state.notes.length };
  for (const k of Object.keys(STATUS)) counts[k] = state.notes.filter((n) => (n.status || 'open') === k).length;

  el.innerHTML = `
    <header class="topbar"><h1>Meine Fälle</h1></header>
    <div class="pad">
      <div class="search-wrap">
        ${ICO.search}
        <input id="noteSearch" type="search" placeholder="Fälle durchsuchen (Chip, Ticket, Stichwort)…"
               value="${escapeHtml(filter.query)}" oninput="setNoteSearch(this.value)" autocomplete="off">
      </div>
      <div class="cat-chips">
        <button class="catchip ${!filter.status ? 'catchip-active' : ''}" onclick="setNoteFilter('')">Alle <span class="cc-count">${counts.all}</span></button>
        ${Object.entries(STATUS).map(([k, s]) => `
          <button class="catchip ${filter.status === k ? 'catchip-active' : ''}" style="--cc:${s.color}" onclick="setNoteFilter('${k}')">${escapeHtml(s.label)} <span class="cc-count">${counts[k]}</span></button>`).join('')}
      </div>
      ${notes.length ? notes.map((n) => noteCard(n, q)).join('') : emptyState()}
    </div>
    <button class="fab" onclick="newNote()" aria-label="Neuer Fall">${ICO.plus}</button>`;

  if (opts.keepFocus) {
    const inp = document.getElementById('noteSearch');
    if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
  }
}

function emptyState() {
  return `<div class="empty">${ICO.note}<p>Noch keine Fälle notiert.</p><p class="muted small">Lege einen neuen Fall an, wenn dir jemand ein Problem bringt – so findest du alles wieder, wenn die Person später nochmal kommt.</p></div>`;
}

function noteCard(n, q) {
  const s = STATUS[n.status || 'open'];
  const ev = getEvent(n.event || 'all');
  const guide = n.guideId ? getGuide(n.guideId) : null;
  const meta = [];
  if (n.chip) meta.push(`Chip ${escapeHtml(n.chip)}`);
  if (n.ticket) meta.push(`Ticket ${escapeHtml(n.ticket)}`);
  return `
    <div class="note-card" onclick="openNote('${n.id}')">
      <div class="nc-top">
        <span class="status-badge" style="--sc:${s.color}">${escapeHtml(s.label)}</span>
        ${ev.selectable ? `<span class="ev-badge" style="background:${ev.color}">${escapeHtml(ev.short)}</span>` : ''}
        <span class="nc-time">${fmtTime(n.updated)}</span>
      </div>
      <div class="nc-title">${highlight(escapeHtml(n.title || '(ohne Titel)'), q)}</div>
      ${n.body ? `<div class="nc-body">${highlight(escapeHtml(n.body), q)}</div>` : ''}
      ${meta.length ? `<div class="nc-meta">${meta.join(' · ')}</div>` : ''}
      ${guide ? `<div class="nc-link">${ICO.link} ${escapeHtml(guide.title)}</div>` : ''}
    </div>`;
}

// ---- Editor ---------------------------------------------------------------
function editorHtml(n) {
  const guide = n.guideId ? getGuide(n.guideId) : null;
  return `
    <form id="noteForm" onsubmit="return false">
      <label class="fld">
        <span>Titel / Kurzbeschreibung</span>
        <input name="title" type="text" value="${escapeHtml(n.title || '')}" placeholder="z. B. Guthaben fehlt nach Online-Top-Up" required>
      </label>
      <label class="fld">
        <span>Status</span>
        <select name="status">
          ${Object.entries(STATUS).map(([k, s]) => `<option value="${k}" ${(n.status || 'open') === k ? 'selected' : ''}>${escapeHtml(s.label)}</option>`).join('')}
        </select>
      </label>
      <div class="fld-row">
        <label class="fld"><span>Chipnummer</span><input name="chip" type="text" value="${escapeHtml(n.chip || '')}" placeholder="14-stellig" inputmode="text"></label>
        <label class="fld"><span>Ticket-/Barcode</span><input name="ticket" type="text" value="${escapeHtml(n.ticket || '')}" placeholder="optional"></label>
      </div>
      <label class="fld">
        <span>Notiz / Verlauf</span>
        <textarea name="body" rows="6" placeholder="Was ist passiert? Was wurde unternommen? Was ist noch offen?">${escapeHtml(n.body || '')}</textarea>
      </label>
      ${guide ? `<div class="nc-link" style="margin-bottom:12px">${ICO.link} verknüpft mit: ${escapeHtml(guide.title)}</div>` : ''}
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" onclick="closeNoteModal()">Abbrechen</button>
        <button type="button" class="btn btn-primary" onclick="saveNoteForm('${n.id}')">Speichern</button>
      </div>
    </form>`;
}

export function newNote() {
  const n = { id: uid(), status: 'open', event: state.activeEvent, created: Date.now(), updated: Date.now() };
  openModal('Neuer Fall', editorHtml(n));
}

export function newNoteFromGuide(guideId) {
  const g = getGuide(guideId);
  const n = {
    id: uid(), status: 'open', event: state.activeEvent,
    guideId, title: g ? g.title : '', body: g ? `Bezug: ${g.problem}\n\n` : '',
    created: Date.now(), updated: Date.now()
  };
  openModal('Neuer Fall', editorHtml(n));
}

export function editNote(id) {
  const n = state.notes.find((x) => x.id === id);
  if (!n) return;
  openModal('Fall bearbeiten', editorHtml(n));
}

export function openNote(id) {
  const n = state.notes.find((x) => x.id === id);
  if (!n) return;
  const s = STATUS[n.status || 'open'];
  const guide = n.guideId ? getGuide(n.guideId) : null;
  const meta = [];
  if (n.chip) meta.push(`<b>Chip:</b> ${escapeHtml(n.chip)}`);
  if (n.ticket) meta.push(`<b>Ticket:</b> ${escapeHtml(n.ticket)}`);
  openModal(n.title || 'Fall', `
    <div class="note-view">
      <span class="status-badge" style="--sc:${s.color}">${escapeHtml(s.label)}</span>
      ${meta.length ? `<p class="muted small" style="margin:10px 0">${meta.join(' &nbsp;·&nbsp; ')}</p>` : ''}
      ${n.body ? `<p style="white-space:pre-wrap;line-height:1.55;margin:8px 0">${escapeHtml(n.body)}</p>` : '<p class="muted small">Keine Notiz hinterlegt.</p>'}
      ${guide ? `<button class="nc-link link-btn" onclick="goToGuide('${guide.id}')">${ICO.link} Anleitung öffnen: ${escapeHtml(guide.title)}</button>` : ''}
      <div class="muted small" style="margin-top:12px">Aktualisiert: ${fmtTime(n.updated)} · Angelegt: ${fmtTime(n.created)}</div>
      <div class="modal-actions" style="margin-top:18px">
        <button class="btn btn-danger" onclick="deleteNote('${n.id}')">${ICO.trash} Löschen</button>
        <button class="btn btn-primary" onclick="editNote('${n.id}')">${ICO.edit} Bearbeiten</button>
      </div>
    </div>`);
}

export function saveNoteForm(id) {
  const form = document.getElementById('noteForm');
  if (!form) return;
  const fd = new FormData(form);
  const title = (fd.get('title') || '').toString().trim();
  if (!title) { toast('Bitte einen Titel eingeben', 'err'); return; }
  let n = state.notes.find((x) => x.id === id);
  const isNew = !n;
  if (isNew) {
    n = { id, created: Date.now(), event: state.activeEvent };
    state.notes.push(n);
  }
  n.title = title;
  n.status = (fd.get('status') || 'open').toString();
  n.chip = (fd.get('chip') || '').toString().trim();
  n.ticket = (fd.get('ticket') || '').toString().trim();
  n.body = (fd.get('body') || '').toString();
  n.updated = Date.now();
  // guideId bleibt erhalten (war bereits im Objekt, falls vorhanden)
  save();
  closeModal();
  renderNotes();
  toast(isNew ? 'Fall angelegt' : 'Gespeichert', 'ok');
}

export async function deleteNote(id) {
  const ok = await confirmDialog('Diesen Fall wirklich löschen?', { okLabel: 'Löschen', danger: true });
  if (!ok) return;
  const i = state.notes.findIndex((x) => x.id === id);
  if (i >= 0) {
    state.notes.splice(i, 1);
    save();
  }
  closeModal();
  renderNotes();
  toast('Gelöscht');
}

export function closeNoteModal() { closeModal(); }
export function goToGuide(id) {
  closeModal();
  showScreen('guides');
  // openGuide ist global registriert
  if (window.openGuide) window.openGuide(id);
}

Object.assign(window, {
  setNoteFilter, setNoteSearch, newNote, newNoteFromGuide,
  editNote, openNote, saveNoteForm, deleteNote, closeNoteModal, goToGuide
});
