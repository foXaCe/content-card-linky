import { html } from "lit";
import { localize } from "../lib/localize";
import { toFloat } from "../lib/format";
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
