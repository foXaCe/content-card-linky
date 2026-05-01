import { html } from "lit";
import { getOneDayNextEcoWatt } from "../lib/calculations.js";

const ECOWATT_COLORS = new Map([
  ["Pas de valeur", "green"],
  [1, "green"],
  [2, "yellow"],
  [3, "red"],
]);

function renderRow(label, entity) {
  return html`
    <tr style="line-height:80%">
      <td style="width:5%">${label}</td>
      <td style="width:95%">
        <ul class="flow-row oneHour">
          ${getOneDayNextEcoWatt(entity, ECOWATT_COLORS).map(
            (forecast) =>
              html`<li
                class="ecowatt-${forecast[0]}"
                style="background: ${forecast[1]}"
                title="${forecast[1]} - ${forecast[0]}"
              ></li>`,
          )}
        </ul>
      </td>
    </tr>
  `;
}

export function renderEcoWatt(hass, config, attributes) {
  if (attributes.serviceEnedis === undefined) return html``;
  if (attributes.serviceEnedis !== "myElectricalData") {
    return html`EcoWatt : uniquement disponible avec myElectricData`;
  }

  const ew = config.ewEntity ? hass.states[config.ewEntity] : undefined;
  const ewJ1 = config.ewEntityJ1 ? hass.states[config.ewEntityJ1] : undefined;
  const ewJ2 = config.ewEntityJ2 ? hass.states[config.ewEntityJ2] : undefined;

  if (config.showEcoWatt && !ew) {
    return html`<div class="error-msg">EcoWatt : entité J+0 non configurée ou introuvable</div>`;
  }
  if (config.showEcoWattJ12 && (!ewJ1 || !ewJ2)) {
    return html`<div class="error-msg">EcoWatt : entité(s) J+1/J+2 non configurée(s) ou introuvable(s)</div>`;
  }

  return html`
    <table style="width:100%">
      ${config.showEcoWatt ? renderRow("J+0", ew) : html``}
      ${config.showEcoWattJ12
        ? html`
            ${renderRow("J+1", ewJ1)} ${renderRow("J+2", ewJ2)}
            <tr style="line-height:80%">
              <td style="width:5%"></td>
              <td style="width:95%">
                <ul class="flow-row oneHourLabel">
                  ${getOneDayNextEcoWatt(ewJ2, ECOWATT_COLORS).map(
                    (forecast) => html`<li title="${forecast[0]}">${forecast[0] % 2 === 1 ? forecast[0] : ""}</li>`,
                  )}
                </ul>
              </td>
            </tr>
          `
        : html``}
    </table>
  `;
}
