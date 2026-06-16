import { html } from "lit";
import { localize } from "../lib/localize.js";

/**
 * Smart insights row: monthly prediction + week/month/year trend tiles.
 * Reads the live evolution figures straight from the main entity.
 */
export function renderSmartInsights(hass, config, weekTotal, weekCost) {
  // Utiliser les données réelles de l'entité si disponibles
  const entity = hass.states[config.entity];
  const attributes = entity ? entity.attributes : {};

  // Calculer weekTotal à partir des données reçues
  const calculatedWeekTotal =
    weekTotal && Array.isArray(weekTotal) ? weekTotal.reduce((sum, day) => sum + parseFloat(day || 0), 0) : 0;
  const calculatedWeekCost =
    weekCost && Array.isArray(weekCost) ? weekCost.reduce((sum, day) => sum + parseFloat(day || 0), 0) : 0;

  // Prédiction mensuelle basée sur la tendance actuelle
  const currentMonth = parseFloat((attributes["current_month"] || 0).toString().replace(",", "."));

  const monthlyPrediction =
    currentMonth > 0
      ? (currentMonth / new Date().getDate()) *
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
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
  const weekTrendColor = isGoodWeekTrend ? "#4caf50" : "#f44336";

  const monthTrendIcon = isGoodMonthTrend ? "mdi:trending-down" : "mdi:trending-up";
  const monthTrendColor = isGoodMonthTrend ? "#4caf50" : "#f44336";

  const yearTrendIcon = isGoodYearTrend ? "mdi:trending-down" : "mdi:trending-up";
  const yearTrendColor = isGoodYearTrend ? "#4caf50" : "#f44336";

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
          <ha-icon icon="${weekTrendIcon}" class="insight-icon" style="color: ${weekTrendColor}"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">${localize(hass, "card.insights.vs_last_week")}</div>
            <div class="insight-value" style="color: ${weekTrendColor}">
              ${weekEvolution > 0 ? "+" : ""}${weekEvolution}%
            </div>
          </div>
        </div>
      </div>

      <div class="insight-row">
        <div class="insight-item">
          <ha-icon icon="${monthTrendIcon}" class="insight-icon" style="color: ${monthTrendColor}"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">${localize(hass, "card.insights.vs_last_month")}</div>
            <div class="insight-value" style="color: ${monthTrendColor}">
              ${monthlyEvolution > 0 ? "+" : ""}${monthlyEvolution}%
            </div>
          </div>
        </div>

        <div class="insight-item">
          <ha-icon icon="${yearTrendIcon}" class="insight-icon" style="color: ${yearTrendColor}"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">${localize(hass, "card.insights.vs_last_year")}</div>
            <div class="insight-value" style="color: ${yearTrendColor}">
              ${yearlyEvolution > 0 ? "+" : ""}${yearlyEvolution}%
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
