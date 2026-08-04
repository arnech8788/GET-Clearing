// Tab „Line-Up": Timetable je Festival mit Tagesauswahl, zwei Ansichten
// (Bühnen-Liste / Raster) und Favoriten pro Set.
// - Bühnen: durchsuchbare Liste, gruppiert nach Bühne (nur gewählter Tag).
// - Raster: Bühnen × Zeit nebeneinander (quer scrollbar) → man sieht, was
//   gleichzeitig läuft. Tippen auf einen Act merkt ihn (Favorit).
// Favoriten liegen in state.lineupFavorites (persistiert via save()).
import { ICO, escapeHtml, highlight } from './ui.js';
import { state, save, eventChipsHtml } from './main.js';
import { LINEUP } from './data/lineup.js';

let lv = { query: '', favOnly: false, day: null, mode: 'stage' };

function setId(ev, day, floor, s) { return [ev, day, floor, s.von, s.artist].join('|'); }
function isFav(id) { return (state.lineupFavorites || []).includes(id); }

// Minuten seit Tagesbeginn; frühe Morgenstunden (< 10 Uhr) zählen als Folgetag.
function toMin(t) { const m = /^(\d{1,2}):(\d{2})$/.exec(t || ''); if (!m) return null; let h = +m[1]; if (h < 10) h += 24; return h * 60 + (+m[2]); }
function fmtHour(min) { return String(Math.floor(min / 60) % 24).padStart(2, '0') + ':00'; }

export function setLineupSearch(q) { lv.query = q; renderLineup({ keepFocus: true }); }
export function toggleLineupFavOnly() { lv.favOnly = !lv.favOnly; renderLineup(); }
export function setLineupDay(d) { lv.day = decodeURIComponent(d); renderLineup(); }
export function setLineupMode(m) { lv.mode = m; renderLineup(); }
export function toggleLineupFav(token) {
  const id = decodeURIComponent(token);
  if (!Array.isArray(state.lineupFavorites)) state.lineupFavorites = [];
  const i = state.lineupFavorites.indexOf(id);
  if (i >= 0) state.lineupFavorites.splice(i, 1);
  else state.lineupFavorites.push(id);
  save();
  renderLineup({ keepFocus: lv.mode === 'stage' });
}

function activeDay(days) {
  if (!lv.day || !days.some((d) => d.day === lv.day)) lv.day = days[0] && days[0].day;
  return days.find((d) => d.day === lv.day) || days[0];
}

// ---- Bühnen-Liste ----------------------------------------------------------
function setRow(ev, day, floor, s, q) {
  const id = setId(ev, day, floor, s);
  const fav = isFav(id);
  const time = s.von ? `${escapeHtml(s.von)}–${escapeHtml(s.bis)}` : escapeHtml(s.note || '—');
  const extra = (s.note && s.von) ? ` <span class="lu-note">${escapeHtml(s.note)}</span>` : '';
  return `
    <div class="lu-set">
      <span class="lu-time">${time}</span>
      <span class="lu-artist">${highlight(escapeHtml(s.artist), q)}${extra}</span>
      <button class="lu-star ${fav ? 'on' : ''}" onclick="toggleLineupFav('${encodeURIComponent(id)}')" aria-label="Favorit">${ICO.star}</button>
    </div>`;
}

function renderStageList(ev, day, q, ql) {
  let out = '';
  for (const f of day.floors) {
    const sets = f.sets.filter((s) => {
      if (lv.favOnly && !isFav(setId(ev, day.day, f.floor, s))) return false;
      if (ql && !s.artist.toLowerCase().includes(ql)) return false;
      return true;
    });
    if (!sets.length) continue;
    out += `<div class="lu-floor" style="--cc:${f.color}">${escapeHtml(f.floor)}</div>` +
      sets.map((s) => setRow(ev, day.day, f.floor, s, q)).join('');
  }
  if (!out) out = `<div class="empty">${ICO.search}<p>${lv.favOnly ? 'Noch keine Favoriten an diesem Tag.' : `Nichts gefunden${q ? ` für „${escapeHtml(q)}"` : ''}.`}</p></div>`;
  return out;
}

// ---- Raster ----------------------------------------------------------------
const PXMIN = 2.4;
function renderGrid(ev, day) {
  const timed = [];
  for (const f of day.floors) for (const s of f.sets) { const a = toMin(s.von), b = toMin(s.bis); if (a != null && b != null) timed.push(a, b); }
  if (!timed.length) return `<div class="empty">${ICO.info}<p>Keine Uhrzeiten für die Rasteransicht.</p></div>`;
  const start = Math.min(...timed), end = Math.max(...timed);
  const trackW = Math.round((end - start) * PXMIN);

  let ticks = '';
  for (let t = Math.ceil(start / 60) * 60; t <= end; t += 60) {
    ticks += `<span class="lu-tick" style="left:${Math.round((t - start) * PXMIN)}px">${fmtHour(t)}</span>`;
  }

  let rows = '';
  for (const f of day.floors) {
    let blocks = '';
    for (const s of f.sets) {
      const a = toMin(s.von), b = toMin(s.bis);
      if (a == null || b == null) continue;
      const left = Math.round((a - start) * PXMIN);
      const w = Math.max(42, Math.round((b - a) * PXMIN));
      const id = setId(ev, day.day, f.floor, s);
      const fav = isFav(id);
      blocks += `<button class="lu-block ${fav ? 'on' : ''}" style="left:${left}px;width:${w}px;background:${f.color}"
        title="${escapeHtml(`${s.von}–${s.bis} · ${s.artist} · ${f.floor}`)}"
        onclick="toggleLineupFav('${encodeURIComponent(id)}')">
        <span class="lu-block-t">${escapeHtml(s.von)}</span><span class="lu-block-a">${escapeHtml(s.artist)}</span>${fav ? `<span class="lu-block-star">${ICO.star}</span>` : ''}</button>`;
    }
    rows += `<div class="lu-row"><div class="lu-rowlabel" style="color:${f.color}">${escapeHtml(f.floor)}</div><div class="lu-track" style="width:${trackW}px">${blocks}</div></div>`;
  }

  return `
    <div class="lu-grid-wrap">
      <div class="lu-grid">
        <div class="lu-row lu-head"><div class="lu-rowlabel lu-corner">Zeit</div><div class="lu-track" style="width:${trackW}px">${ticks}</div></div>
        ${rows}
      </div>
    </div>
    <div class="muted small" style="margin-top:8px">Quer scrollen ↔ – so siehst du, was gleichzeitig läuft. Tippe einen Act, um ihn zu merken (★).</div>`;
}

// ---- Screen ----------------------------------------------------------------
export function renderLineup(opts = {}) {
  const el = document.getElementById('screen-lineup');
  if (!el) return;
  const ev = state.activeEvent;
  const data = LINEUP[ev];

  if (!data) {
    el.innerHTML = `
      <header class="topbar"><h1>Line-Up</h1>${eventChipsHtml()}</header>
      <div class="pad"><div class="empty">${ICO.calendar}<p>Für dieses Festival ist kein Line-Up hinterlegt.</p></div></div>`;
    return;
  }

  const day = activeDay(data.days);
  const q = lv.query.trim();
  const ql = q.toLowerCase();
  const favCount = (state.lineupFavorites || []).length;

  const dayChips = data.days.length > 1
    ? `<div class="cat-chips">${data.days.map((d) => `
        <button class="catchip ${d.day === day.day ? 'catchip-active' : ''}" onclick="setLineupDay('${encodeURIComponent(d.day)}')">${escapeHtml(d.day)}</button>`).join('')}</div>`
    : '';

  const controls = lv.mode === 'stage'
    ? `<div class="search-wrap">${ICO.search}
         <input id="luSearch" type="search" placeholder="Act suchen…" value="${escapeHtml(lv.query)}" oninput="setLineupSearch(this.value)" autocomplete="off"></div>
       <div class="cat-chips">
         <button class="catchip ${lv.favOnly ? 'catchip-active' : ''}" style="--cc:var(--accent)" onclick="toggleLineupFavOnly()">★ Nur Favoriten <span class="cc-count">${favCount}</span></button>
       </div>`
    : '';

  const bodyInner = lv.mode === 'stage' ? renderStageList(ev, day, q, ql) : renderGrid(ev, day);

  el.innerHTML = `
    <header class="topbar"><h1>Line-Up</h1>${eventChipsHtml()}</header>
    <div class="pad">
      <div class="muted small" style="margin-bottom:8px">${escapeHtml(data.title)}</div>
      ${data.imageSrc ? `<a class="lu-graphic" href="${escapeHtml(data.imageSrc)}" target="_blank" rel="noopener">${ICO.info} Grafik in voller Auflösung öffnen</a>` : ''}
      <div class="tabbar">
        <button class="tab ${lv.mode === 'stage' ? 'tab-active' : ''}" onclick="setLineupMode('stage')">Bühnen</button>
        <button class="tab ${lv.mode === 'grid' ? 'tab-active' : ''}" onclick="setLineupMode('grid')">Raster</button>
      </div>
      ${dayChips}
      ${controls}
      ${bodyInner}
    </div>`;

  if (opts.keepFocus) {
    const inp = document.getElementById('luSearch');
    if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
  }
}

Object.assign(window, { setLineupSearch, toggleLineupFavOnly, toggleLineupFav, setLineupDay, setLineupMode });
