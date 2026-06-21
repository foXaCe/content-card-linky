import { html } from "lit";
import { localize } from "../lib/localize";
import { toFloat } from "../lib/format";
import { estimateMissingKwh } from "../lib/calculations";
import type { HomeAssistant, ContentCardLinkyConfig, LinkyAttributes, HassEntity, TemplateResult } from "../types";

/**
 * Optional centered card title.
 */
export function renderTitle(config: ContentCardLinkyConfig): TemplateResult | undefined {
  if (config.showTitle === true) {
    return html` <div class="card">
      <div class="main-title">
        <span>${config.titleName}</span>
      </div>
    </div>`;
  }
  return undefined;
}

/**
 * Linky logo block (consumption header).
 */
export function renderIcon(config: ContentCardLinkyConfig): TemplateResult {
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
 */
export function renderPrice(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  attributes: LinkyAttributes,
): TemplateResult {
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
 */
export function renderHeader(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  attributes: LinkyAttributes,
  stateObj: HassEntity,
): TemplateResult | undefined {
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
  return undefined;
}

/**
 * Production-mode value with estimation/pending fallbacks.
 */
export function renderProductionValue(
  hass: HomeAssistant,
  state: string | null | undefined,
  attributes: LinkyAttributes,
): TemplateResult {
  const value = parseFloat(state as string);

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
          <span class="cout pending" title="${localize(hass, "card.production.pending")}">
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
