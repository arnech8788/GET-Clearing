// Tab „Klangpiraten": festivalübergreifender Arbeitgeber-Bereich.
// Zeigt alle Guides mit events: ['klangpiraten'] (kategoriegruppiert, durchsuchbar),
// unabhängig vom oben gewählten Festival. Detail-/Notiz-Flow läuft über die
// gemeinsame Guides-Logik (openGuide).
import { ICO, escapeHtml } from './ui.js';
import { GUIDES, CATEGORIES } from './data/guides.js';
import { guideCard } from './guides.js';

let view = { query: '' };

function matches(g) { return g.events.includes('klangpiraten'); }

export function setKpSearch(q) { view.query = q; renderKlangpiraten({ keepFocus: true }); }

export function renderKlangpiraten(opts = {}) {
  const el = document.getElementById('screen-klangpiraten');
  if (!el) return;
  const hasAny = GUIDES.some(matches);
  const q = view.query.trim();

  let guides = GUIDES.filter(matches);
  if (q) {
    const ql = q.toLowerCase();
    guides = guides.filter((g) => (g.title + ' ' + g.problem + ' ' + g.tags.join(' ')).toLowerCase().includes(ql));
  }
  const cats = CATEGORIES
    .map((c) => ({ ...c, count: guides.filter((g) => g.cat === c.id).length }))
    .filter((c) => c.count > 0);

  let body;
  if (!hasAny) {
    body = `<div class="empty">${ICO.book}<p>Noch keine Klangpiraten-Infos hinterlegt.</p>
      <p class="muted small">Hier kommen festivalübergreifende Arbeitgeber-Infos rein (Abläufe, Ansprechpartner, allgemeine Crew-Hinweise) – schick die Unterlagen, dann lege ich sie an.</p></div>`;
  } else if (!guides.length) {
    body = `<div class="empty">${ICO.search}<p>Nichts gefunden${q ? ` für „${escapeHtml(q)}"` : ''}.</p>
      <button class="btn btn-ghost btn-sm" onclick="setKpSearch('')">Suche zurücksetzen</button></div>`;
  } else {
    body = cats.map((c) =>
      `<div class="section-label" style="--cc:${c.color}"><span class="ic">${ICO[c.icon] || ICO.book}</span>${escapeHtml(c.name)}</div>` +
      guides.filter((g) => g.cat === c.id).map((g) => guideCard(g, q)).join('')
    ).join('');
  }

  el.innerHTML = `
    <header class="topbar"><h1>Klangpiraten</h1></header>
    <div class="pad">
      <div class="muted small" style="margin-bottom:10px">Arbeitgeber · festivalübergreifende Crew-Infos</div>
      ${hasAny ? `<div class="search-wrap">${ICO.search}
        <input id="kpSearch" type="search" placeholder="Klangpiraten-Infos durchsuchen…"
               value="${escapeHtml(view.query)}" oninput="setKpSearch(this.value)" autocomplete="off"></div>` : ''}
      ${body}
    </div>`;

  if (opts.keepFocus) {
    const i = document.getElementById('kpSearch');
    if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); }
  }
}

Object.assign(window, { setKpSearch });
