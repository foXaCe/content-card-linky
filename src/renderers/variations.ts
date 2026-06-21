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
      ? html` <span class="variations-linky">
          <div class="percentage-line">
            <span class="ha-icon">
              <ha-icon
                icon="mdi:arrow-right"
                style="display: inline-block; transform: rotate(${attributes.yearly_evolution < 0
                  ? "45"
                  : attributes.yearly_evolution === 0
                    ? "0"
                    : "-45"}deg)"
              >
              </ha-icon>
            </span>
            <span
              class="percentage-value ${attributes.yearly_evolution > 0
                ? "percentage-positive"
                : attributes.yearly_evolution < 0
                  ? "percentage-negative"
                  : "percentage-neutral"}"
              aria-label="${localize(hass, "card.aria.yearly_trend", {
                value: safeRound(attributes.yearly_evolution),
              })}"
              role="text"
              >${safeRound(attributes.yearly_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
            <span class="year">${localize(hass, "card.previous_year", { year: previousYear(hass) })}</span>
            <span class="tooltiptext"
              >${localize(hass, "card.tooltip.year_prev", { value: attributes.current_year_last_year })}<br />${localize(
                hass,
                "card.tooltip.year",
                { value: attributes.current_year },
              )}</span
            >
          </div>
        </span>`
      : html``}
    ${config.showMonthRatio
      ? html` <span class="variations-linky">
          <div class="percentage-line">
            <span class="ha-icon">
              <ha-icon
                icon="mdi:arrow-right"
                style="display: inline-block; transform: rotate(${attributes.monthly_evolution < 0
                  ? "45"
                  : attributes.monthly_evolution === 0
                    ? "0"
                    : "-45"}deg)"
              >
              </ha-icon>
            </span>
            <span
              class="percentage-value ${attributes.monthly_evolution > 0
                ? "percentage-positive"
                : attributes.monthly_evolution < 0
                  ? "percentage-negative"
                  : "percentage-neutral"}"
              aria-label="${localize(hass, "card.aria.monthly_trend", {
                value: safeRound(attributes.monthly_evolution),
              })}"
              role="text"
              >${safeRound(attributes.monthly_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
            <span class="previous-month">${localize(hass, "card.previous_month", { month: previousMonth(hass) })}</span>
            <span class="tooltiptext"
              >${localize(hass, "card.tooltip.prev_month_prev_year", {
                value: attributes.last_month_last_year,
              })}<br />${localize(hass, "card.tooltip.prev_month", { value: attributes.last_month })}</span
            >
          </div>
        </span>`
      : html``}
    ${config.showCurrentMonthRatio
      ? html` <span class="variations-linky">
          <div class="percentage-line">
            <span class="ha-icon">
              <ha-icon
                icon="mdi:arrow-right"
                style="display: inline-block; transform: rotate(${attributes.current_month_evolution < 0
                  ? "45"
                  : attributes.current_month_evolution === 0
                    ? "0"
                    : "-45"}deg)"
              >
              </ha-icon>
            </span>
            <span
              class="percentage-value ${attributes.current_month_evolution > 0
                ? "percentage-positive"
                : attributes.current_month_evolution < 0
                  ? "percentage-negative"
                  : "percentage-neutral"}"
              aria-label="${localize(hass, "card.aria.current_month_trend", {
                value: safeRound(attributes.current_month_evolution),
              })}"
              role="text"
              >${safeRound(attributes.current_month_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
            <span class="current-month">${localize(hass, "card.current_month", { month: currentMonth(hass) })}</span>
            <span class="tooltiptext"
              >${localize(hass, "card.tooltip.month_prev_year", {
                value: attributes.current_month_last_year,
              })}<br />${localize(hass, "card.tooltip.month", { value: attributes.current_month })}</span
            >
          </div>
        </span>`
      : html``}
    ${config.showWeekRatio
      ? html` <span class="variations-linky">
          <div class="percentage-line">
            <span class="ha-icon">
              <ha-icon
                icon="mdi:arrow-right"
                style="display: inline-block; transform: rotate(${attributes.current_week_evolution < 0
                  ? "45"
                  : attributes.current_week_evolution === 0
                    ? "0"
                    : "-45"}deg)"
              >
              </ha-icon>
            </span>
            <span
              class="percentage-value ${attributes.current_week_evolution > 0
                ? "percentage-positive"
                : attributes.current_week_evolution < 0
                  ? "percentage-negative"
                  : "percentage-neutral"}"
              aria-label="${localize(hass, "card.aria.weekly_trend", {
                value: safeRound(attributes.current_week_evolution),
              })}"
              role="text"
              >${safeRound(attributes.current_week_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
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
          </div>
        </span>`
      : html``}
    ${config.showYesterdayRatio
      ? html` <span class="variations-linky">
          <div class="percentage-line">
            <span class="ha-icon">
              <ha-icon
                icon="mdi:arrow-right"
                style="display: inline-block; transform: rotate(${attributes.yesterday_evolution < 0
                  ? "45"
                  : attributes.yesterday_evolution === 0
                    ? "0"
                    : "-45"}deg)"
              >
              </ha-icon>
            </span>
            <span
              class="percentage-value ${attributes.yesterday_evolution > 0
                ? "percentage-positive"
                : attributes.yesterday_evolution < 0
                  ? "percentage-negative"
                  : "percentage-neutral"}"
              aria-label="${localize(hass, "card.aria.daily_trend", {
                value: safeRound(attributes.yesterday_evolution),
              })}"
              role="text"
              >${safeRound(attributes.yesterday_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
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
          </div>
        </span>`
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
