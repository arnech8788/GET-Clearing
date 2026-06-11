// Dienstplan-Rubrik: Umschalter Schichten / Ansprechpersonen.
// Schichten: Tagesbrowser (Stationen/Schichten) + Namenssuche über alle Tage/Pläne.
// Ansprechpersonen: wichtige Telefonnummern (Leitung, Runner, Stationsleitungen).
// Schichttausche werden als Overrides (SHIFT_CHANGES) angewandt und markiert.
import { ICO, escapeHtml, highlight, toast } from './ui.js';
import { state, eventChipsHtml } from './main.js';
import { DIENSTPLAN_META, DIENSTPLAN_DAYS, DIENSTPLAN_CONTACTS, SHIFT_CHANGES } from './data/dienstplan.js';

let dp = { plan: null, day: null, query: '', mode: 'plan' };

function fmtPos(pos) {
  if (pos == null || pos === '') return '';
  return /^\d+$/.test(String(pos)) ? 'Platz ' + pos : pos;
}

// Plan-Gruppierung: Reihenfolge wie in den Daten, ein Reiter je Plan.
function planKey(d) { return d.plan || 'Sonstige'; }
function planShort(plan) {
  if (/bänd/i.test(plan)) return 'Bändchentausch';
  if (/clearing/i.test(plan)) return 'Clearing';
  return plan;
}
function getPlans() {
  const seen = [];
  for (const d of DIENSTPLAN_DAYS) { const p = planKey(d); if (!seen.includes(p)) seen.push(p); }
  return seen;
}
function daysOfPlan(plan) { return DIENSTPLAN_DAYS.filter((d) => planKey(d) === plan); }
// Tages-Kurzlabel (ohne Plan-Präfix), z. B. "Clearing · Mi" -> "Mi".
function dayShort(d) { return (d.short || '').split('·').pop().trim() || d.short; }

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

// ---- Kalender-Export (.ics) -----------------------------------------------
function pad(n) { return String(n).padStart(2, '0'); }
function escIcs(s) {
  return String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}
// Datum (Tag im Juni 2026) aus dem Label lesen.
function dayDate(day) {
  const m = (day.label || '').match(/(\d{1,2})\.\s*Juni\s*2026/);
  return m ? { y: 2026, mo: 6, d: parseInt(m[1], 10) } : null;
}

// Kalender-Button (nicht bei gestrichenen Schichten). Ohne Uhrzeit -> ganztägig.
function calBtn(dayId, r) {
  if (r.cancelled) return '';
  return `<button class="dp-cal" onclick="addShiftToCalendar('${dayId}',${r.nr})" title="In Kalender speichern" aria-label="In Kalender speichern">${ICO.calPlus}</button>`;
}

export function addShiftToCalendar(dayId, nr) {
  const day = DIENSTPLAN_DAYS.find((d) => d.id === dayId);
  if (!day) return;
  let raw = null, station = null;
  for (const s of day.stations) { const f = s.rows.find((x) => x.nr === nr); if (f) { raw = f; station = s; break; } }
  if (!raw) return;
  const r = applyOverride(dayId, raw);
  const date = dayDate(day);
  if (!date) { toast('Datum nicht erkannt', 'err'); return; }
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const fmtDate = (dt) => `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}`;

  const hasTime = !!(r.von && r.bis);
  let dtLines;
  let timeInfo;
  if (hasTime) {
    const [vh, vm] = r.von.split(':').map(Number);
    const [bh, bm] = r.bis.split(':').map(Number);
    const start = new Date(Date.UTC(date.y, date.mo - 1, date.d, vh, vm));
    const endBase = new Date(Date.UTC(date.y, date.mo - 1, date.d, bh, bm));
    if (bh * 60 + bm <= vh * 60 + vm) endBase.setUTCDate(endBase.getUTCDate() + 1); // über Mitternacht
    const f = (dt) => `${fmtDate(dt)}T${pad(dt.getUTCHours())}${pad(dt.getUTCMinutes())}00`;
    dtLines = [`DTSTART:${f(start)}`, `DTEND:${f(endBase)}`];
    timeInfo = `Zeit: ${r.von}–${r.bis}`;
  } else {
    // Ganztägig: DTEND ist der Folgetag (exklusiv)
    const start = new Date(Date.UTC(date.y, date.mo - 1, date.d));
    const end = new Date(start.getTime() + 86400000);
    dtLines = [`DTSTART;VALUE=DATE:${fmtDate(start)}`, `DTEND;VALUE=DATE:${fmtDate(end)}`];
    timeInfo = 'Zeit: ganztägig (keine Uhrzeit im Plan)';
  }

  const planLbl = planShort(day.plan);
  const loc = station.name + (station.kb ? ` (${station.kb})` : '');
  const summary = `${planLbl} – ${station.name}${r.pos ? ` (${fmtPos(r.pos)})` : ''}`;
  const descParts = [`${planLbl} · ${day.label}`, `Position: ${fmtPos(r.pos) || '–'}`, timeInfo];
  if (r.note) descParts.push(`Hinweis: ${r.note}`);
  if (r.changed && r.changeNote) descParts.push(`Änderung: ${r.changeNote}`);

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GET Clearing//Dienstplan//DE',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${dayId}-${nr}-${Date.now()}@get-clearing`,
    `DTSTAMP:${stamp}`,
    ...dtLines,
    `SUMMARY:${escIcs(summary)}`,
    `LOCATION:${escIcs(loc)}`,
    `DESCRIPTION:${escIcs(descParts.join('\n'))}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `schicht-${dayId}-${nr}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast(hasTime ? 'Kalender-Termin erstellt' : 'Ganztägiger Termin erstellt', 'ok');
}

export function setDpPlan(plan) {
  dp.plan = plan;
  const days = daysOfPlan(plan);
  dp.day = days[0] ? days[0].id : null;
  renderDienstplan();
}
export function setDpDay(id) { dp.day = id; renderDienstplan(); }
export function setDpSearch(q) { dp.query = q; renderDienstplan({ keepFocus: true }); }
export function setDpMode(m) { dp.mode = m; renderDienstplan(); }

export function renderDienstplan(opts = {}) {
  const el = document.getElementById('screen-dienstplan');
  if (!el) return;
  // Dienstplan gibt es nur für das Event, dem die Daten gehören (Rock am Ring).
  if (state.activeEvent !== DIENSTPLAN_META.event) {
    el.innerHTML = `
      <header class="topbar"><h1>Dienstplan</h1>${eventChipsHtml()}</header>
      <div class="pad">
        <div class="empty">${ICO.calendar}<p>Dienstplan ist nur für Rock am Ring – für Parookaville sind noch keine Einsatzpläne hinterlegt.</p></div>
      </div>`;
    return;
  }
  const q = dp.query.trim();
  const placeholder = dp.mode === 'plan'
    ? 'Name suchen (z. B. Arne Chudobba)…'
    : 'Ansprechpartner suchen (Name/Rolle)…';
  el.innerHTML = `
    <header class="topbar"><h1>Dienstplan</h1>${eventChipsHtml()}</header>
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
        ${calBtn(day.id, r)}
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
  const plans = getPlans();
  // Plan/Tag-Auswahl absichern
  if (!dp.plan || !plans.includes(dp.plan)) dp.plan = plans[0];
  let days = daysOfPlan(dp.plan);
  if (!dp.day || !days.some((d) => d.id === dp.day)) dp.day = days[0] ? days[0].id : null;
  const day = days.find((d) => d.id === dp.day) || days[0];

  const planChips = plans.length > 1
    ? `<div class="cat-chips">${plans.map((p) => `
        <button class="catchip ${p === dp.plan ? 'catchip-active' : ''}" onclick="setDpPlan('${escapeHtml(p)}')">${escapeHtml(planShort(p))}</button>`).join('')}</div>`
    : '';
  const dayChips = days.length > 1
    ? `<div class="cat-chips">${days.map((d) => `
        <button class="catchip ${d.id === day.id ? 'catchip-active' : ''}" onclick="setDpDay('${d.id}')">${escapeHtml(dayShort(d))}</button>`).join('')}</div>`
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
            ${calBtn(day.id, r)}
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
    ${planChips}
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

Object.assign(window, { setDpPlan, setDpDay, setDpSearch, setDpMode, addShiftToCalendar });
