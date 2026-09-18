import { Dashboard, Incident, RootCause, Corrective } from "../views.js";

const IDS = ["dash", "incident", "cause", "capa"];

/**
 * @param {string} html
 */
function disarm(html) {
  return html
    .replace(/\sdata-action="[^"]*"/g, ' data-action="none"')
    .replace(/<button /g, '<button tabindex="-1" ')
    .replace(/<input /g, '<input tabindex="-1" ');
}

/**
 * @param {string} id
 * @param {readonly string[]} stars
 * @param {string} body
 * @param {string} [focus]
 */
function frame(id, stars, body, focus = "") {
  const active = stars.includes(id) ? "qi-active" : "qi-idle";
  const focusClass = focus && stars.includes(id) ? ` qi-focus-${focus}` : "";
  return `<div class="qi-device qi-pc qi-${id} ${active}${focusClass}" data-device="${id}">
    <div class="qi-device-bar">Quality Incident Console <span>DEMO</span></div>
    <div class="qi-pc-body"><div class="qi-scale">${disarm(body)}</div></div>
  </div>`;
}

/**
 * @param {{ stars: readonly string[]; focus?: string }} opts
 */
export function renderScreens({ stars, focus = "" }) {
  const causeFocus = focus === "graph" || focus === "evidence" ? focus : "";
  const capaFocus = focus === "plan" || focus === "report" ? focus : "";
  return [
    frame("dash", stars, Dashboard()),
    frame("incident", stars, Incident()),
    frame("cause", stars, RootCause(), causeFocus),
    frame("capa", stars, Corrective(), capaFocus),
  ].join("");
}

export { IDS };
