// Anleitungen: Browse-Liste (nach Kategorie), Detailansicht, Favoriten.
import { GUIDES, CATEGORIES, getGuide, getCategory } from './data/guides.js';
import { EVENTS, getEvent } from './data/events.js';
import { ICO, escapeHtml, highlight } from './ui.js';
import { state, isFavorite, toggleFavorite, currentScreen } from './main.js';

let view = { guideId: null, category: null, query: '' };

// Gilt die Guide für das aktuell gewählte Event?
function matchesEvent(g) {
  return g.events.includes('all') || g.events.includes(state.activeEvent);
}

function matchesQuery(g, q) {
  if (!q) return true;
  const hay = (g.title + ' ' + g.problem + ' ' + g.tags.join(' ')).toLowerCase();
  return q.toLowerCase().split(/\s+/).every((w) => hay.includes(w));
}

export function setGuideCategory(catId) {
  view.category = view.category === catId ? null : (catId || null);
  view.guideId = null;
  renderGuides();
}

export function setGuideSearch(q) {
  view.query = q;
  renderGuides({ keepFocus: true });
}

// Detail-State (wird von der zentralen Navigation in main.js gesteuert).
export function setDetailGuide(id) { view.guideId = id || null; }
export function getDetailGuide() { return view.guideId; }
export function isGuideDetail() { return !!view.guideId; }

export function renderGuides(opts = {}) {
  const el = document.getElementById('screen-guides');
  if (!el) return;
  if (view.guideId) {
    el.innerHTML = renderDetail(view.guideId);
    return;
  }
  el.innerHTML = renderList(opts);
  if (opts.keepFocus) {
    const inp = document.getElementById('guideSearch');
    if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
  }
}

function renderList() {
  const ev = getEvent(state.activeEvent);
  const q = view.query.trim();
  let guides = GUIDES.filter(matchesEvent).filter((g) => matchesQuery(g, q));
  if (view.category) guides = guides.filter((g) => g.cat === view.category);

  const favIds = state.favorites.filter((id) => {
    const g = getGuide(id);
    return g && matchesEvent(g);
  });

  // Kategorie-Chips (nur mit Treffern)
  const catsWithCount = CATEGORIES.map((c) => ({
    ...c,
    count: GUIDES.filter(matchesEvent).filter((g) => g.cat === c.id).length
  })).filter((c) => c.count > 0);

  const header = `
    <header class="topbar">
      <h1>Anleitungen</h1>
      <div class="event-chips" id="eventChipsInline">${EVENTS.filter((e) => e.selectable).map((e) => `
        <button class="chip ${state.activeEvent === e.id ? 'chip-active' : ''}" style="--chip:${e.color}" onclick="setActiveEvent('${e.id}')">${escapeHtml(e.short)}</button>`).join('')}</div>
    </header>
    <div class="pad">
      <div class="search-wrap">
        ${ICO.search}
        <input id="guideSearch" type="search" placeholder="Problem suchen… (z. B. Chip, Guthaben, Scanner rot)"
               value="${escapeHtml(view.query)}" oninput="setGuideSearch(this.value)" autocomplete="off">
      </div>
      <div class="cat-chips">
        <button class="catchip ${!view.category ? 'catchip-active' : ''}" onclick="setGuideCategory('')">Alle</button>
        ${catsWithCount.map((c) => `
          <button class="catchip ${view.category === c.id ? 'catchip-active' : ''}" style="--cc:${c.color}" onclick="setGuideCategory('${c.id}')">
            ${escapeHtml(c.name)} <span class="cc-count">${c.count}</span>
          </button>`).join('')}
      </div>`;

  if (!guides.length) {
    return header + `<div class="empty">${ICO.search}<p>Keine Anleitung gefunden${q ? ` für „${escapeHtml(q)}"` : ''}.</p><button class="btn btn-ghost btn-sm" onclick="setGuideSearch('')">Suche zurücksetzen</button></div></div>`;
  }

  // Favoriten oben (nur ohne aktive Filter/Suche)
  let favBlock = '';
  if (favIds.length && !q && !view.category) {
    favBlock = `<div class="section-label">${ICO.star} Favoriten</div>` +
      favIds.map((id) => guideCard(getGuide(id), q)).join('');
  }

  // Gruppiert nach Kategorie
  let body = '';
  if (view.category || q) {
    body = guides.map((g) => guideCard(g, q)).join('');
  } else {
    for (const c of catsWithCount) {
      const inCat = guides.filter((g) => g.cat === c.id);
      if (!inCat.length) continue;
      body += `<div class="section-label" style="--cc:${c.color}"><span class="ic">${ICO[c.icon] || ICO.book}</span>${escapeHtml(c.name)}</div>`;
      body += inCat.map((g) => guideCard(g, q)).join('');
    }
  }

  return header + favBlock + body + `</div>`;
}

function guideCard(g, q) {
  const cat = getCategory(g.cat);
  const evBadges = g.events.filter((e) => e !== 'all').map((eid) => {
    const e = getEvent(eid);
    return `<span class="ev-badge" style="background:${e.color}">${escapeHtml(e.short)}</span>`;
  }).join('');
  return `
    <button class="guide-card" onclick="openGuide('${g.id}')">
      <span class="gc-bar" style="background:${cat ? cat.color : 'var(--accent)'}"></span>
      <span class="gc-main">
        <span class="gc-title">${highlight(escapeHtml(g.title), q)}</span>
        <span class="gc-problem">${highlight(escapeHtml(g.problem), q)}</span>
      </span>
      <span class="gc-side">${evBadges}${isFavorite(g.id) ? `<span class="fav-on">${ICO.star}</span>` : ''}</span>
    </button>`;
}

// ---- Detail ---------------------------------------------------------------
function renderDetail(id) {
  const g = getGuide(id);
  if (!g) { return `<div class="pad"><button class="btn btn-ghost" onclick="showScreen('guides')">Zurück</button><p>Anleitung nicht gefunden.</p></div>`; }
  const cat = getCategory(g.cat);
  const fav = isFavorite(g.id);
  const evBadges = g.events.map((eid) => {
    const e = getEvent(eid);
    return `<span class="ev-badge" style="background:${e.color}">${escapeHtml(e.name)}</span>`;
  }).join('');

  return `
    <header class="topbar detail-bar">
      <button class="icon-btn" onclick="navBack()" aria-label="Zurück">${ICO.back}</button>
      <span class="detail-cat" style="color:${cat ? cat.color : ''}">${escapeHtml(cat ? cat.name : '')}</span>
      <button class="icon-btn ${fav ? 'fav-active' : ''}" onclick="favGuide('${g.id}')" aria-label="Favorit">${ICO.star}</button>
    </header>
    <div class="pad detail">
      <h1 class="detail-title">${escapeHtml(g.title)}</h1>
      <div class="ev-badges">${evBadges}</div>
      <div class="problem-box"><span class="pb-label">Problem</span>${escapeHtml(g.problem)}</div>
      ${g.body.map(renderBlock).join('')}
      <div class="source">Quelle: ${escapeHtml(g.source)}</div>
      <button class="btn btn-ghost full" onclick="newNoteFromGuide('${g.id}')">${ICO.note} Notiz zu diesem Fall anlegen</button>
    </div>`;
}

function renderBlock(b) {
  if (b.h) return `<h2 class="blk-h">${escapeHtml(b.h)}</h2>`;
  if (b.p) return `<p class="blk-p">${escapeHtml(b.p)}</p>`;
  if (b.ul) return `<ul class="blk-ul">${b.ul.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
  if (b.ol) return `<ol class="blk-ol">${b.ol.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ol>`;
  if (b.steps) return `<ol class="steps">${b.steps.map((s) => `
      <li class="step"><span class="step-t">${escapeHtml(s.t)}</span>${s.d ? `<span class="step-d">${escapeHtml(s.d)}</span>` : ''}</li>`).join('')}</ol>`;
  if (b.note) return `<div class="callout callout-note">${ICO.info}<div>${escapeHtml(b.note)}</div></div>`;
  if (b.warn) return `<div class="callout callout-warn">${ICO.warn}<div>${escapeHtml(b.warn)}</div></div>`;
  if (b.tip) return `<div class="callout callout-tip">${ICO.check}<div>${escapeHtml(b.tip)}</div></div>`;
  return '';
}

// onclick-Helfer (global registriert)
export function favGuide(id) {
  toggleFavorite(id);
  renderGuides();
}

Object.assign(window, { favGuide });
