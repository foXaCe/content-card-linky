import { html } from "lit";
import { TEMPO_VALUES } from "../const";
import { localeOf } from "../lib/format";
import { localize } from "../lib/localize";
import type { HomeAssistant, ContentCardLinkyConfig, LinkyAttributes, HassEntity, TemplateResult } from "../types";

function getTempoDateValue(tempoEntity: HassEntity): [Date, string | undefined, string] {
  const tempoDate = new Date(tempoEntity.attributes["date"]);
  const tempoValue = tempoEntity.state;
  return [tempoDate, TEMPO_VALUES.get(tempoValue), tempoValue];
}

function getTempoRemainingDays(tempoEntity: HassEntity): [any, any, any] {
  return [
    tempoEntity.attributes["days_red"],
    tempoEntity.attributes["days_white"],
    tempoEntity.attributes["days_blue"],
  ];
}

/**
 * Tempo day colours (today/tomorrow) and remaining blue/white/red days.
 */
export function renderTempo(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  attributes: LinkyAttributes,
): TemplateResult {
  if (attributes.serviceEnedis === undefined) return html``;
  if (attributes.serviceEnedis !== "myElectricalData") {
    return html`${localize(hass, "card.tempo.only_med")}`;
  }
  if (config.showTempo === false) return html``;

  const tempoInfo = hass.states[config.tempoEntityInfo as string];
  const tempoJ0 = hass.states[config.tempoEntityJ0 as string];
  const tempoJ1 = hass.states[config.tempoEntityJ1 as string];

  if (!tempoJ0 || !tempoJ0.state || !tempoJ1 || !tempoJ1.state) {
    return html`${localize(hass, "card.tempo.missing_j01")}`;
  }
  if (!tempoInfo || !tempoInfo.state) {
    return html`${localize(hass, "card.tempo.missing_info")}`;
  }

  const [dateJ0, valueJ0] = getTempoDateValue(tempoJ0);
  const [dateJ1, valueJ1] = getTempoDateValue(tempoJ1);
  const [remainingRed, remainingWhite, remainingBlue] = getTempoRemainingDays(tempoInfo);

  const fmt = (d: Date): string => new Date(d).toLocaleDateString(localeOf(hass), { weekday: "long", day: "numeric" });

  return html`
    <table class="tempo-color">
      <tr>
        <td class="tempo-${valueJ0}" style="width:50%">${fmt(dateJ0)}</td>
        <td class="tempo-${valueJ1}" style="width:50%">${fmt(dateJ1)}</td>
      </tr>
    </table>
    <table class="tempo-days">
      <tr>
        <td class="tempo-blue" style="width:33.33%">${remainingBlue}</td>
        <td class="tempo-white" style="width:33.33%">${remainingWhite}</td>
        <td class="tempo-red" style="width:33.33%">${remainingRed}</td>
      </tr>
    </table>
  `;
}
