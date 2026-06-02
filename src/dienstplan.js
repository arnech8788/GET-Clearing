// Dienstplan-Rubrik: Umschalter Schichten / Ansprechpersonen.
// Schichten: Tagesbrowser (Stationen/Schichten) + Namenssuche über alle Tage/Pläne.
// Ansprechpersonen: wichtige Telefonnummern (Leitung, Runner, Stationsleitungen).
// Schichttausche werden als Overrides (SHIFT_CHANGES) angewandt und markiert.
import { ICO, escapeHtml, highlight } from './ui.js';
import { DIENSTPLAN_META, DIENSTPLAN_DAYS, DIENSTPLAN_CONTACTS, SHIFT_CHANGES } from './data/dienstplan.js';

let dp = { day: DIENSTPLAN_DAYS[0] ? DIENSTPLAN_DAYS[0].id : null, query: '', mode: 'plan' };

function fmtPos(pos) {
  if (pos == null || pos === '') return '';
  return /^\d+$/.test(String(pos)) ? 'Platz ' + pos : pos;
}

function applyOverride(dayId, row) {
  const ch = SHIFT_CHANGES.find((c) => c.day === dayId && c.nr === row.nr);
  if (!ch) return { ...row, changed: false, cancelled: false };
  return {
    ...row,
    name: ch.name != null ? ch.name : row.name,
    von: ch.von != null ? ch.von : row.von,
    bis: ch.bis != null ? ch.bis : row.bis,
    pos: ch.pos != null ? ch.pos : row.pos,
    cancelled: !!ch.cancelled,
    changeNote: ch.note || '',
    origName: row.name,
    changed: true
  };
}

export function setDpDay(id) { dp.day = id; renderDienstplan(); }
export function setDpSearch(q) { dp.query = q; renderDienstplan({ keepFocus: true }); }
export function setDpMode(m) { dp.mode = m; renderDienstplan(); }

export function renderDienstplan(opts = {}) {
  const el = document.getElementById('screen-dienstplan');
  if (!el) return;
  const q = dp.query.trim();
  const placeholder = dp.mode === 'plan'
    ? 'Name suchen (z. B. Arne Chudobba)…'
    : 'Ansprechpartner suchen (Name/Rolle)…';
  el.innerHTML = `
    <header class="topbar"><h1>Dienstplan</h1></header>
    <div class="pad">
      <div class="muted small" style="margin-bottom:10px">${escapeHtml(DIENSTPLAN_META.title)}</div>
      <div class="tabbar">
        <button class="tab ${dp.mode === 'plan' ? 'tab-active' : ''}" onclick="setDpMode('plan')">Schichten</button>
        <button class="tab ${dp.mode === 'kontakte' ? 'tab-active' : ''}" onclick="setDpMode('kontakte')">Ansprechpersonen</button>
      </div>
      <div class="search-wrap">
        ${ICO.search}
        <input id="dpSearch" type="search" placeholder="${escapeHtml(placeholder)}"
               value="${escapeHtml(dp.query)}" oninput="setDpSearch(this.value)" autocomplete="off">
      </div>
      ${dp.mode === 'plan' ? (q ? renderResults(q) : renderBrowser()) : renderContacts(q)}
    </div>`;
  if (opts.keepFocus) {
    const inp = document.getElementById('dpSearch');
    if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
  }
}

// ---- Namenssuche (über alle Tage/Pläne) -----------------------------------
function renderResults(q) {
  const ql = q.toLowerCase();
  const groups = new Map();
  for (const day of DIENSTPLAN_DAYS) {
    for (const st of day.stations) {
      for (const raw of st.rows) {
        const r = applyOverride(day.id, raw);
        if (!r.name.toLowerCase().includes(ql)) continue;
        if (!groups.has(r.name)) groups.set(r.name, []);
        groups.get(r.name).push({ day, station: st, r });
      }
    }
  }
  if (!groups.size) {
    return `<div class="empty">${ICO.search}<p>Niemand gefunden für „${escapeHtml(q)}".</p>
      <button class="btn btn-ghost btn-sm" onclick="setDpSearch('')">Suche zurücksetzen</button></div>`;
  }
  const people = [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0], 'de'));
  return people.map(([name, shifts]) => `
    <div class="card">
      <div class="dp-person">${highlight(escapeHtml(name), q)}
        <span class="dp-count">${shifts.length} Schicht${shifts.length === 1 ? '' : 'en'}</span></div>
      ${shifts.map((s) => shiftLine(s.day, s.station, s.r)).join('')}
    </div>`).join('');
}

function shiftLine(day, station, r) {
  const time = r.von || r.bis ? `${escapeHtml(r.von)}–${escapeHtml(r.bis)}` : '—';
  return `
    <div class="dp-shift ${r.cancelled ? 'dp-cancelled' : ''}">
      <div class="dp-shift-main">
        <span class="dp-day">${escapeHtml(day.short)}</span>
        <span class="dp-loc">${escapeHtml(station.name)}${station.kb ? ' · ' + escapeHtml(station.kb) : ''}</span>
      </div>
      <div class="dp-shift-sub">
        <span class="dp-time">${time}</span>
        ${r.pos ? `<span class="dp-pos">${escapeHtml(fmtPos(r.pos))}</span>` : ''}
        ${r.changed ? `<span class="dp-badge">geändert</span>` : ''}
      </div>
      ${r.note ? `<div class="dp-note">${escapeHtml(r.note)}</div>` : ''}
      ${r.changed && r.changeNote ? `<div class="dp-note dp-change">↹ ${escapeHtml(r.changeNote)}${r.origName && r.origName !== r.name ? ` (vorher: ${escapeHtml(r.origName)})` : ''}</div>` : ''}
    </div>`;
}

// ---- Tagesbrowser ---------------------------------------------------------
function renderBrowser() {
  if (!DIENSTPLAN_DAYS.length) {
    return `<div class="empty">${ICO.calendar}<p>Noch keine Dienstpläne hinterlegt.</p></div>`;
  }
  const day = DIENSTPLAN_DAYS.find((d) => d.id === dp.day) || DIENSTPLAN_DAYS[0];
  const dayChips = DIENSTPLAN_DAYS.length > 1
    ? `<div class="cat-chips">${DIENSTPLAN_DAYS.map((d) => `
        <button class="catchip ${d.id === day.id ? 'catchip-active' : ''}" onclick="setDpDay('${d.id}')">${escapeHtml(d.short)}</button>`).join('')}</div>`
    : '';
  const total = day.stations.reduce((a, s) => a + s.rows.length, 0);
  const stations = day.stations.map((st) => {
    const rows = st.rows.map((raw) => {
      const r = applyOverride(day.id, raw);
      const time = r.von || r.bis ? `${escapeHtml(r.von)}–${escapeHtml(r.bis)}` : '—';
      return `
        <div class="dp-row ${r.cancelled ? 'dp-cancelled' : ''}">
          <div class="dp-row-name">${escapeHtml(r.name)}${r.changed ? ` <span class="dp-badge">geändert</span>` : ''}</div>
          <div class="dp-row-meta">
            ${r.pos ? `<span class="dp-pos">${escapeHtml(fmtPos(r.pos))}</span>` : ''}
            <span class="dp-time">${time}</span>
          </div>
          ${r.note ? `<div class="dp-note">${escapeHtml(r.note)}</div>` : ''}
          ${r.changed && r.changeNote ? `<div class="dp-note dp-change">↹ ${escapeHtml(r.changeNote)}${r.origName && r.origName !== r.name ? ` (vorher: ${escapeHtml(r.origName)})` : ''}</div>` : ''}
        </div>`;
    }).join('');
    return `
      <details class="dp-station">
        <summary><span class="dp-st-name">${escapeHtml(st.name)}${st.kb ? ` <span class="dp-kb">${escapeHtml(st.kb)}</span>` : ''}</span><span class="dp-st-count">${st.rows.length}</span></summary>
        <div class="dp-rows">${rows}</div>
      </details>`;
  }).join('');
  return `
    ${dayChips}
    <div class="dp-daytitle">${escapeHtml(day.label)} <span class="muted small">· ${total} Einträge</span></div>
    ${stations}
    <div class="muted small" style="margin-top:14px">Tipp: Oben nach einem Namen suchen, um alle Schichten einer Person (über alle Pläne) zu sehen.</div>`;
}

// ---- Ansprechpersonen -----------------------------------------------------
function renderContacts(q) {
  let list = DIENSTPLAN_CONTACTS || [];
  if (q) {
    const ql = q.toLowerCase();
    list = list.filter((c) => (c.name + ' ' + c.role).toLowerCase().includes(ql));
  }
  if (!list.length) {
    return `<div class="empty">${ICO.phone}<p>Keine Ansprechperson gefunden${q ? ` für „${escapeHtml(q)}"` : ''}.</p></div>`;
  }
  return `
    <div class="callout callout-note">${ICO.info}<div>Wichtige Telefonnummern (Leitung, Runner, Stationsleitungen). Bitte vertraulich behandeln.</div></div>
    <div class="card">
      ${list.map((c) => `
        <div class="contact-row">
          <div class="contact-meta"><b>${highlight(escapeHtml(c.name), q)}</b><small>${highlight(escapeHtml(c.role), q)} · ${escapeHtml(c.phone)}</small></div>
          <a class="contact-act" href="tel:${escapeHtml(c.tel)}" aria-label="Anrufen">${ICO.phone}</a>
        </div>`).join('')}
    </div>`;
}

Object.assign(window, { setDpDay, setDpSearch, setDpMode });
