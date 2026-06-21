import { html } from "lit";
import { localize } from "../lib/localize";
import { calculateWeekTotal, calculateWeekCost } from "../lib/calculations";
import type { HomeAssistant, ContentCardLinkyConfig, TemplateResult, LinkyAttributes } from "../types";

/**
 * Smart insights row: monthly prediction + week/month/year trend tiles.
 * Reads the live evolution figures straight from the main entity.
 *
 * @param attributes - the main entity's attribute bag
 * @param now - injectable clock for deterministic tests
 */
export function renderSmartInsights(
  hass: HomeAssistant,
  _config: ContentCardLinkyConfig,
  attributes: LinkyAttributes,
  now: Date = new Date(),
): TemplateResult {
  const calculatedWeekTotal = calculateWeekTotal(attributes.daily, attributes.dailyweek_cost, now);
  const calculatedWeekCost = calculateWeekCost(attributes.dailyweek_cost, now);

  // Prédiction mensuelle basée sur la tendance actuelle
  const currentMonth = parseFloat((attributes["current_month"] || 0).toString().replace(",", "."));

  const monthlyPrediction =
    currentMonth > 0
      ? (currentMonth / now.getDate()) * new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
      : calculatedWeekTotal > 0
        ? (calculatedWeekTotal / 7) * 30
        : 0;
  const monthlyCostPrediction = calculatedWeekCost > 0 ? (calculatedWeekCost / 7) * 30 : 0;

  // Utiliser les évolutions directes de l'entité
  const weekEvolution = parseFloat((attributes["current_week_evolution"] || 0).toString().replace(",", "."));
  const monthlyEvolution = parseFloat((attributes["monthly_evolution"] || 0).toString().replace(",", "."));
  const yearlyEvolution = parseFloat((attributes["yearly_evolution"] || 0).toString().replace(",", "."));

  // Insights intelligents avec données réelles
  const isGoodWeekTrend = weekEvolution < 0;
  const isGoodMonthTrend = monthlyEvolution < 0;
  const isGoodYearTrend = yearlyEvolution < 0;

  const weekTrendIcon = isGoodWeekTrend ? "mdi:trending-down" : "mdi:trending-up";
  const weekTrendClass = isGoodWeekTrend ? "trend-good" : "trend-bad";

  const monthTrendIcon = isGoodMonthTrend ? "mdi:trending-down" : "mdi:trending-up";
  const monthTrendClass = isGoodMonthTrend ? "trend-good" : "trend-bad";

  const yearTrendIcon = isGoodYearTrend ? "mdi:trending-down" : "mdi:trending-up";
  const yearTrendClass = isGoodYearTrend ? "trend-good" : "trend-bad";

  return html`
    <div class="smart-insights">
      <div class="insight-row">
        <div class="insight-item">
          <ha-icon icon="mdi:calendar-month" class="insight-icon"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">${localize(hass, "card.insights.monthly_prediction")}</div>
            <div class="insight-value">${monthlyPrediction.toFixed(0)} kWh • ${monthlyCostPrediction.toFixed(0)}€</div>
          </div>
        </div>

        <div class="insight-item">
          <ha-icon icon="${weekTrendIcon}" class="insight-icon ${weekTrendClass}"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">${localize(hass, "card.insights.vs_last_week")}</div>
            <div class="insight-value ${weekTrendClass}">${weekEvolution > 0 ? "+" : ""}${weekEvolution}%</div>
          </div>
        </div>
      </div>

      <div class="insight-row">
        <div class="insight-item">
          <ha-icon icon="${monthTrendIcon}" class="insight-icon ${monthTrendClass}"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">${localize(hass, "card.insights.vs_last_month")}</div>
            <div class="insight-value ${monthTrendClass}">${monthlyEvolution > 0 ? "+" : ""}${monthlyEvolution}%</div>
          </div>
        </div>

        <div class="insight-item">
          <ha-icon icon="${yearTrendIcon}" class="insight-icon ${yearTrendClass}"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">${localize(hass, "card.insights.vs_last_year")}</div>
            <div class="insight-value ${yearTrendClass}">${yearlyEvolution > 0 ? "+" : ""}${yearlyEvolution}%</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
