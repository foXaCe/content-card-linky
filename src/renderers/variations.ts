import { html } from "lit";
import { safeRound } from "../lib/calculations";
import { localize } from "../lib/localize";
import { localeOf } from "../lib/format";
import type { HomeAssistant, ContentCardLinkyConfig, LinkyAttributes, TemplateResult } from "../types";

function previousYear(hass: HomeAssistant): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.toLocaleDateString(localeOf(hass), { year: "numeric" });
}

function previousMonth(hass: HomeAssistant): string {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  d.setFullYear(d.getFullYear() - 1);
  return d.toLocaleDateString(localeOf(hass), { month: "long", year: "numeric" });
}

function currentMonth(hass: HomeAssistant): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.toLocaleDateString(localeOf(hass), { month: "long", year: "numeric" });
}

function renderEvolutionTile(
  hass: HomeAssistant,
  evolution: any,
  ariaKey: string,
  tooltip: TemplateResult,
): TemplateResult {
  const rounded = safeRound(evolution);
  const rotation = evolution < 0 ? "45" : evolution === 0 ? "0" : "-45";
  const signClass =
    evolution > 0 ? "percentage-positive" : evolution < 0 ? "percentage-negative" : "percentage-neutral";
  return html` <span class="variations-linky">
    <div class="percentage-line">
      <span class="ha-icon">
        <ha-icon icon="mdi:arrow-right" style="display: inline-block; transform: rotate(${rotation}deg)"></ha-icon>
      </span>
      <span
        class="percentage-value ${signClass}"
        aria-label="${localize(hass, ariaKey, { value: rounded })}"
        role="text"
        >${rounded}<span class="unit"> %</span></span
      >
    </div>
    <div class="tooltip">${tooltip}</div>
  </span>`;
}

/**
 * Grid of consumption-evolution percentage tiles.
 */
export function renderVariations(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  attributes: LinkyAttributes,
): TemplateResult {
  return html` <div class="variations">
    ${config.showYearRatio
      ? renderEvolutionTile(
          hass,
          attributes.yearly_evolution,
          "card.aria.yearly_trend",
          html`
            <span class="year">${localize(hass, "card.previous_year", { year: previousYear(hass) })}</span>
            <span class="tooltiptext"
              >${localize(hass, "card.tooltip.year_prev", { value: attributes.current_year_last_year })}<br />${localize(
                hass,
                "card.tooltip.year",
                { value: attributes.current_year },
              )}</span
            >
          `,
        )
      : html``}
    ${config.showMonthRatio
      ? renderEvolutionTile(
          hass,
          attributes.monthly_evolution,
          "card.aria.monthly_trend",
          html`
            <span class="previous-month">${localize(hass, "card.previous_month", { month: previousMonth(hass) })}</span>
            <span class="tooltiptext"
              >${localize(hass, "card.tooltip.prev_month_prev_year", {
                value: attributes.last_month_last_year,
              })}<br />${localize(hass, "card.tooltip.prev_month", { value: attributes.last_month })}</span
            >
          `,
        )
      : html``}
    ${config.showCurrentMonthRatio
      ? renderEvolutionTile(
          hass,
          attributes.current_month_evolution,
          "card.aria.current_month_trend",
          html`
            <span class="current-month">${localize(hass, "card.current_month", { month: currentMonth(hass) })}</span>
            <span class="tooltiptext"
              >${localize(hass, "card.tooltip.month_prev_year", {
                value: attributes.current_month_last_year,
              })}<br />${localize(hass, "card.tooltip.month", { value: attributes.current_month })}</span
            >
          `,
        )
      : html``}
    ${config.showWeekRatio
      ? renderEvolutionTile(
          hass,
          attributes.current_week_evolution,
          "card.aria.weekly_trend",
          html`
            <span class="previous-month"
              >${localize(hass, "card.previous_week", { week: localize(hass, "card.week_noun") })}</span
            >
            <span class="tooltiptext"
              >${localize(hass, "card.tooltip.last_week", { value: attributes.last_week })}<br />${localize(
                hass,
                "card.tooltip.this_week",
                { value: attributes.current_week },
              )}</span
            >
          `,
        )
      : html``}
    ${config.showYesterdayRatio
      ? renderEvolutionTile(
          hass,
          attributes.yesterday_evolution,
          "card.aria.daily_trend",
          html`
            <span class="previous-month"
              >${localize(hass, "card.before_yesterday", { date: localize(hass, "card.day_before_noun") })}</span
            >
            <span class="tooltiptext"
              >${localize(hass, "card.tooltip.day_before_yesterday", { value: attributes.day_2 })}<br />${localize(
                hass,
                "card.tooltip.yesterday",
                { value: attributes.yesterday },
              )}</span
            >
          `,
        )
      : html``}
    ${config.showPeakOffPeak
      ? html` <span class="variations-linky">
          <span class="ha-icon">
            <ha-icon icon="mdi:flash"></ha-icon>
          </span>
          ${safeRound(attributes.peak_offpeak_percent)}<span class="unit"> ${localize(hass, "card.peak_pct")}</span>
        </span>`
      : html``}
  </div>`;
}
