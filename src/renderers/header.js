import { html } from "lit";
import { localize } from "../lib/localize.js";
import { toFloat } from "../lib/format.js";
import { estimateMissingKwh } from "../lib/calculations.js";

/**
 * Optional centered card title.
 * @param {object} config - card configuration
 * @returns {import("lit").TemplateResult | undefined}
 */
export function renderTitle(config) {
  if (config.showTitle === true) {
    return html` <div class="card">
      <div class="main-title">
        <span>${config.titleName}</span>
      </div>
    </div>`;
  }
}

/**
 * Linky logo block (consumption header).
 * @param {object} config - card configuration
 * @returns {import("lit").TemplateResult}
 */
export function renderIcon(config) {
  if (config.showIcon) {
    return html` <div class="icon-block">
      <span
        class="linky-icon bigger"
        style="background: none, url('/local/community/content-card-linky/icons/linky.svg') no-repeat; background-size: contain;"
      ></span>
    </div>`;
  }
  return html``;
}

/**
 * Daily cost block on the right of the consumption header.
 * @param {object} hass - Home Assistant object
 * @param {object} config - card configuration
 * @param {object} attributes - main entity attributes
 * @returns {import("lit").TemplateResult}
 */
export function renderPrice(hass, config, attributes) {
  if (config.showPrice) {
    return html` <div class="cout-block">
      <span class="cout" title="${localize(hass, "card.daily_cost")}">${toFloat(attributes.daily_cost, 2)}</span
      ><span class="cout-unit"> €</span>
    </div>`;
  }
  return html``;
}

/**
 * Consumption header: icon + main value (or HC/HP split) + daily price.
 * @param {object} hass - Home Assistant object
 * @param {object} config - card configuration
 * @param {object} attributes - main entity attributes
 * @param {object} stateObj - the entity state object
 * @returns {import("lit").TemplateResult | undefined}
 */
export function renderHeader(hass, config, attributes, stateObj) {
  if (config.showHeader === true) {
    if (config.showPeakOffPeak) {
      return html` <div class="main-info">
        ${renderIcon(config)}
        <div class="hp-hc-block">
          <span class="conso-hc">${toFloat(attributes.yesterday_HC)}</span
          ><span class="conso-unit-hc">
            ${attributes.unit_of_measurement}
            <span class="more-unit">${localize(hass, "card.in_off_peak")}</span></span
          ><br />
          <span class="conso-hp">${toFloat(attributes.yesterday_HP)}</span
          ><span class="conso-unit-hp">
            ${attributes.unit_of_measurement}
            <span class="more-unit">${localize(hass, "card.in_peak")}</span></span
          >
        </div>
        ${renderPrice(hass, config, attributes)}
      </div>`;
    }
    return html` <div class="main-info">
      ${renderIcon(config)}
      <div class="cout-block">
        <span class="cout">${toFloat(stateObj.state)}</span>
        <span class="cout-unit">${attributes.unit_of_measurement}</span>
      </div>
      ${renderPrice(hass, config, attributes)}
    </div>`;
  }
}

/**
 * Production-mode value with estimation/pending fallbacks.
 * @param {object} hass - Home Assistant object
 * @param {string} state - the raw entity state
 * @param {object} attributes - main entity attributes
 * @returns {import("lit").TemplateResult}
 */
export function renderProductionValue(hass, state, attributes) {
  const value = parseFloat(state);

  // Traiter les cas de données manquantes ou invalides pour la production
  if (isNaN(value) || value === -1 || value === 0 || state === "0" || state === null || state === undefined) {
    // Vérifier si on a des prix pour faire une estimation
    if (attributes.dailyweek_cost && attributes.daily) {
      const costArray = attributes.dailyweek_cost.toString().split(",");
      const recentPrice = parseFloat(costArray[0]?.replace(",", "."));

      if (!isNaN(recentPrice) && recentPrice > 0) {
        // On a un prix, faire une estimation
        const estimatedProduction = estimateMissingKwh(attributes.daily, 1, attributes.dailyweek_cost);

        if (estimatedProduction > 0) {
          return html`
            <span class="cout estimated" title="${localize(hass, "card.production.estimate")}"
              >${toFloat(estimatedProduction)}</span
            >
            <span class="cout-unit">${attributes.unit_of_measurement}</span>
          `;
        }
      } else if (recentPrice === 0 || isNaN(recentPrice) || !costArray[0] || costArray[0] === "-1") {
        // Ni prix ni production - données en attente
        return html`
          <span
            class="cout pending"
            title="${localize(hass, "card.production.pending")}"
            style="color: #ff9800; font-style: italic;"
          >
            <ha-icon icon="mdi:clock-outline"></ha-icon>
          </span>
          <span class="cout-unit">${attributes.unit_of_measurement}</span>
        `;
      }
    } else {
      // Pas de données de prix - en attente
      return html`
        <span
          class="cout pending"
          title="${localize(hass, "card.production.pending")}"
          style="color: #ff9800; font-style: italic;"
        >
          <ha-icon icon="mdi:clock-outline"></ha-icon>
        </span>
        <span class="cout-unit">${attributes.unit_of_measurement}</span>
      `;
    }
  }

  return html`
    <span class="cout">${toFloat(state)}</span>
    <span class="cout-unit">${attributes.unit_of_measurement}</span>
  `;
}
