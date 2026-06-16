import { html } from "lit";
import { localize } from "../lib/localize.js";
import { toFloat, localeOf } from "../lib/format.js";
import { calculateWeekTotal, calculateWeekCost, getDynamicGradient, getSeasonalTheme } from "../lib/calculations.js";

/**
 * "Current week" summary card with a seasonal gradient and running total.
 * `now` is injectable for deterministic tests (defaults to the current time).
 */
export function renderWeekSummary(hass, config, attributes, now = new Date()) {
  if (!config.showWeekSummary && config.showWeekSummary !== undefined) {
    return html``;
  }

  const { daily, unit_of_measurement, dailyweek_cost } = attributes;

  const weekTotal = calculateWeekTotal(daily, dailyweek_cost, now);
  const weekCost = calculateWeekCost(dailyweek_cost, now);
  const mondayThisWeek = new Date(now);
  mondayThisWeek.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1));

  // Calcul de la moyenne pour gradient dynamique
  const avgWeekly = (daily.slice(0, 7).reduce((sum, day) => sum + parseFloat(day || 0), 0) / 7) * 5;
  const dynamicGradient = getDynamicGradient(weekTotal, avgWeekly);
  const seasonalTheme = getSeasonalTheme(now);

  return html`
    <div class="week-summary-card" style="background: ${dynamicGradient}">
      <div class="week-summary-header">
        <ha-icon icon="${seasonalTheme.icon}" class="week-summary-icon"></ha-icon>
        <span class="week-summary-title">${localize(hass, "card.current_week")}</span>
        <span class="week-summary-period"
          >${localize(hass, "card.since")}
          ${mondayThisWeek.toLocaleDateString(localeOf(hass), {
            day: "numeric",
            month: "short",
          })}</span
        >
      </div>
      <div class="week-summary-content">
        <div class="week-summary-main">
          <span class="week-summary-value">${toFloat(weekTotal, 1)}</span>
          <span class="week-summary-unit">${unit_of_measurement}</span>
        </div>
        ${weekCost > 0
          ? html`
              <div class="week-summary-cost">
                <span class="week-summary-cost-value">${weekCost.toFixed(2).replace(/\.00$/, "")}</span>
                <span class="week-summary-cost-unit">€</span>
              </div>
            `
          : html``}
      </div>
    </div>
  `;
}
