// Referenz: Ticket-Scan-Matrix, Camping-Kategorien, Bändchenfarben, Kontakte, Infos.
import { ICO, escapeHtml, openModal, closeModal, toast, confirmDialog } from './ui.js';
import { state, save, eventChipsHtml } from './main.js';
import { getEvent, scopeIncludes } from './data/events.js';
import { SCAN_MATRIX, CATEGORY_OVERVIEW, WRISTBAND_COLORS } from './data/tickets.js';
import { SHIPPED_CONTACTS, QUICK_INFO } from './data/contacts.js';
import { EVENT_MAPS } from './data/maps.js';

let tab = 'tickets';

export function setRefTab(t) {
  tab = t;
  renderReference();
}

export function renderReference() {
  const el = document.getElementById('screen-reference');
  if (!el) return;
  el.innerHTML = `
    <header class="topbar"><h1>Referenz</h1>${eventChipsHtml()}</header>
    <div class="pad">
      <div class="tabbar">
        <button class="tab ${tab === 'tickets' ? 'tab-active' : ''}" onclick="setRefTab('tickets')">Tickets &amp; Bändchen</button>
        <button class="tab ${tab === 'contacts' ? 'tab-active' : ''}" onclick="setRefTab('contacts')">Kontakte</button>
        <button class="tab ${tab === 'info' ? 'tab-active' : ''}" onclick="setRefTab('info')">Infos</button>
      </div>
      ${tab === 'tickets' ? renderTickets() : tab === 'contacts' ? renderContacts() : renderInfo()}
    </div>`;
}

// ---- Tickets --------------------------------------------------------------
function renderTickets() {
  if (state.activeEvent !== 'rar') {
    return `<div class="empty">${ICO.info}<p>Ticket- &amp; Bändchen-Referenz ist aktuell nur für Rock am Ring hinterlegt.</p></div>`;
  }
  return `
    <div class="muted small" style="margin-bottom:8px">Rock am Ring · Camping-Kategorien Stand 2026. Die Scan-Matrix (Tage/KB) basiert auf dem 2025-Stand – für 2026 ggf. mit der Stationsleitung abgleichen.</div>

    <div class="card">
      <div class="card-title">Bändchenfarben (Schnellblick)</div>
      <div class="color-grid">
        ${WRISTBAND_COLORS.map((w) => `
          <div class="color-row">
            <span class="color-dot" style="background:${w.hex}"></span>
            <span class="color-meaning">${escapeHtml(w.meaning)}<small>${escapeHtml(w.color)}${w.chip ? ' · mit Cashless-Chip' : ' · ohne Chip'}</small></span>
          </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-title">Ticket-Scan-Matrix</div>
      <div class="muted small" style="margin-bottom:10px">Welcher Ticket-Typ ist an welchen Tagen / Stationen scanbar? (KB = Kassenbereich)</div>
      ${SCAN_MATRIX.map((grp) => `
        <div class="matrix-group">${escapeHtml(grp.group)}</div>
        <div class="matrix">
          ${grp.rows.map((r) => `
            <div class="matrix-row">
              <div class="m-type">${escapeHtml(r.type)}</div>
              <div class="m-days">${escapeHtml(r.days)}</div>
              <div class="m-where">${escapeHtml(r.where)}</div>
            </div>`).join('')}
        </div>`).join('')}
    </div>

    <div class="card">
      <div class="card-title">Camping-Kategorien &amp; benötigte Tickets</div>
      ${CATEGORY_OVERVIEW.map((c) => `
        <div class="cat-overview">
          <div class="co-name">${escapeHtml(c.cat)}</div>
          <div class="co-line"><span>Ticket</span>${escapeHtml(c.ticket)}</div>
          ${c.add && c.add !== '—' ? `<div class="co-line"><span>Zusatz</span>${escapeHtml(c.add)}</div>` : ''}
          <div class="co-line"><span>Berechtigung</span>${escapeHtml(c.right)}</div>
        </div>`).join('')}
    </div>`;
}

// ---- Kontakte -------------------------------------------------------------
function renderContacts() {
  const shipped = SHIPPED_CONTACTS.filter((g) => scopeIncludes(state.activeEvent, g.event));
  const own = state.contacts || [];
  return `
    <div class="callout callout-note" style="margin-bottom:14px">${ICO.info}<div>Mitgelieferte Nummern sind offizielle Festival-Hotlines. Private Team-Nummern bitte als <b>eigene Kontakte</b> anlegen – diese bleiben nur auf diesem Gerät.</div></div>

    ${shipped.map((grp) => `
      <div class="card">
        <div class="card-title ${grp.important ? 'title-warn' : ''}">${escapeHtml(grp.group)}</div>
        ${grp.entries.map((e) => contactRow(e)).join('')}
      </div>`).join('')}

    <div class="card">
      <div class="card-title">Eigene Kontakte (lokal)</div>
      ${own.length ? own.map((c) => ownContactRow(c)).join('') : '<div class="muted small">Noch keine eigenen Kontakte.</div>'}
      <button class="btn btn-ghost full" style="margin-top:12px" onclick="addOwnContact()">${ICO.plus} Kontakt hinzufügen</button>
    </div>`;
}

function contactRow(e) {
  let action = '';
  if (e.tel) action = `<a class="contact-act" href="tel:${escapeHtml(e.tel)}">${ICO.phone}</a>`;
  else if (e.url) action = `<a class="contact-act" href="${escapeHtml(e.url)}" target="_blank" rel="noopener">${ICO.link}</a>`;
  else if (e.mail) action = `<a class="contact-act" href="mailto:${escapeHtml(e.mail)}">${ICO.link}</a>`;
  return `
    <div class="contact-row">
      <div class="contact-meta"><b>${escapeHtml(e.name)}</b><small>${escapeHtml(e.value)}</small></div>
      ${action}
    </div>`;
}

function ownContactRow(c) {
  return `
    <div class="contact-row">
      <div class="contact-meta"><b>${escapeHtml(c.name)}</b><small>${escapeHtml(c.role || '')}${c.role ? ' · ' : ''}${escapeHtml(c.value)}</small></div>
      <div class="contact-actions">
        ${c.value ? `<a class="contact-act" href="tel:${escapeHtml(c.value.replace(/\s/g, ''))}">${ICO.phone}</a>` : ''}
        <button class="contact-act danger" onclick="deleteOwnContact('${c.id}')">${ICO.trash}</button>
      </div>
    </div>`;
}

export function addOwnContact() {
  openModal('Kontakt hinzufügen', `
    <form id="contactForm" onsubmit="return false">
      <label class="fld"><span>Name</span><input name="name" type="text" placeholder="z. B. Teamlead Station B3" required></label>
      <label class="fld"><span>Rolle / Station (optional)</span><input name="role" type="text" placeholder="z. B. Stationsleitung"></label>
      <label class="fld"><span>Telefonnummer</span><input name="value" type="tel" placeholder="+49 …"></label>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" onclick="closeRefModal()">Abbrechen</button>
        <button type="button" class="btn btn-primary" onclick="saveOwnContact()">Speichern</button>
      </div>
    </form>`);
}

export function saveOwnContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const fd = new FormData(form);
  const name = (fd.get('name') || '').toString().trim();
  if (!name) { toast('Bitte einen Namen eingeben', 'err'); return; }
  state.contacts.push({
    id: 'c' + Date.now().toString(36),
    name,
    role: (fd.get('role') || '').toString().trim(),
    value: (fd.get('value') || '').toString().trim()
  });
  save();
  closeModal();
  renderReference();
  toast('Kontakt gespeichert', 'ok');
}

export async function deleteOwnContact(id) {
  const ok = await confirmDialog('Kontakt löschen?', { okLabel: 'Löschen', danger: true });
  if (!ok) return;
  const i = state.contacts.findIndex((c) => c.id === id);
  if (i >= 0) { state.contacts.splice(i, 1); save(); }
  renderReference();
}

// ---- Infos ----------------------------------------------------------------
function renderInfo() {
  const maps = EVENT_MAPS[state.activeEvent] || [];
  const infos = QUICK_INFO.filter((i) => scopeIncludes(state.activeEvent, i.event));
  if (!maps.length && !infos.length) return '<div class="empty">' + ICO.info + '<p>Keine Infos für diesen Bereich.</p></div>';
  let html = '';
  if (maps.length) {
    html += `
      <div class="card">
        <div class="card-title">Geländekarten</div>
        <p class="muted small" style="margin:0 0 6px">Zum Vergrößern auf eine Karte tippen (öffnet in voller Auflösung).</p>
        ${maps.map((m) => `
          <figure class="blk-fig">
            <a href="${escapeHtml(m.src)}" target="_blank" rel="noopener"><img class="blk-img" src="${escapeHtml(m.src)}" alt="${escapeHtml(m.title)}" loading="lazy"></a>
            <figcaption class="blk-cap">${escapeHtml(m.title)}</figcaption>
          </figure>`).join('')}
      </div>`;
  }
  html += infos.map((i) => `
    <div class="card">
      <div class="card-title">${escapeHtml(i.title)}</div>
      <p class="blk-p" style="margin:0">${escapeHtml(i.text)}</p>
    </div>`).join('');
  return html;
}

export function closeRefModal() { closeModal(); }

Object.assign(window, { setRefTab, addOwnContact, saveOwnContact, deleteOwnContact, closeRefModal });
