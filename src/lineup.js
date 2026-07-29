// Tab „Line-Up": durchsuchbares Timetable mit Favoriten pro Set.
// Zeigt das Line-Up des aktiven Festivals (LINEUP[activeEvent]); Festivals ohne
// Line-Up bekommen einen Platzhalter. Favoriten liegen in state.lineupFavorites
// (persistiert via save()).
import { ICO, escapeHtml, highlight } from './ui.js';
import { state, save, eventChipsHtml } from './main.js';
import { LINEUP } from './data/lineup.js';

let lv = { query: '', favOnly: false };

function setId(ev, day, floor, s) { return [ev, day, floor, s.von, s.artist].join('|'); }
function isFav(id) { return (state.lineupFavorites || []).includes(id); }

export function setLineupSearch(q) { lv.query = q; renderLineup({ keepFocus: true }); }
export function toggleLineupFavOnly() { lv.favOnly = !lv.favOnly; renderLineup(); }
export function toggleLineupFav(token) {
  const id = decodeURIComponent(token);
  if (!Array.isArray(state.lineupFavorites)) state.lineupFavorites = [];
  const i = state.lineupFavorites.indexOf(id);
  if (i >= 0) state.lineupFavorites.splice(i, 1);
  else state.lineupFavorites.push(id);
  save();
  renderLineup({ keepFocus: true });
}

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

export function renderLineup(opts = {}) {
  const el = document.getElementById('screen-lineup');
  if (!el) return;
  const ev = state.activeEvent;
  const data = LINEUP[ev];
  const q = lv.query.trim();
  const ql = q.toLowerCase();
  const favCount = (state.lineupFavorites || []).length;

  if (!data) {
    el.innerHTML = `
      <header class="topbar"><h1>Line-Up</h1>${eventChipsHtml()}</header>
      <div class="pad"><div class="empty">${ICO.calendar}<p>Für dieses Festival ist kein Line-Up hinterlegt.</p></div></div>`;
    return;
  }

  let list = '';
  for (const d of data.days) {
    let dayHtml = '';
    for (const f of d.floors) {
      const sets = f.sets.filter((s) => {
        if (lv.favOnly && !isFav(setId(ev, d.day, f.floor, s))) return false;
        if (ql && !s.artist.toLowerCase().includes(ql)) return false;
        return true;
      });
      if (!sets.length) continue;
      dayHtml += `<div class="lu-floor" style="--cc:${f.color}">${escapeHtml(f.floor)}</div>` +
        sets.map((s) => setRow(ev, d.day, f.floor, s, q)).join('');
    }
    if (dayHtml) list += `<div class="lu-day">${escapeHtml(d.day)}</div>` + dayHtml;
  }
  if (!list) {
    list = `<div class="empty">${ICO.search}<p>${lv.favOnly ? 'Noch keine Favoriten markiert.' : `Nichts gefunden${q ? ` für „${escapeHtml(q)}"` : ''}.`}</p></div>`;
  }

  el.innerHTML = `
    <header class="topbar"><h1>Line-Up</h1>${eventChipsHtml()}</header>
    <div class="pad">
      <div class="muted small" style="margin-bottom:8px">${escapeHtml(data.title)}</div>
      ${data.imageSrc ? `<a class="lu-graphic" href="${escapeHtml(data.imageSrc)}" target="_blank" rel="noopener">${ICO.info} Grafik in voller Auflösung öffnen</a>` : ''}
      <div class="search-wrap">
        ${ICO.search}
        <input id="luSearch" type="search" placeholder="Act suchen (z. B. Fatboy Slim)…"
               value="${escapeHtml(lv.query)}" oninput="setLineupSearch(this.value)" autocomplete="off">
      </div>
      <div class="cat-chips">
        <button class="catchip ${lv.favOnly ? 'catchip-active' : ''}" style="--cc:var(--accent)" onclick="toggleLineupFavOnly()">★ Nur Favoriten <span class="cc-count">${favCount}</span></button>
      </div>
      ${list}
      <div class="muted small" style="margin-top:14px">Timetable-Änderungen vorbehalten. Tippe den Stern, um dir einen Act zu merken.</div>
    </div>`;

  if (opts.keepFocus) {
    const inp = document.getElementById('luSearch');
    if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
  }
}

Object.assign(window, { setLineupSearch, toggleLineupFavOnly, toggleLineupFav });
