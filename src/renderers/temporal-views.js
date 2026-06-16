import { html } from "lit";
import { toFloat } from "../lib/format.js";

/** Collapsible monthly comparison (current vs previous month, with A-1). */
export function renderMonthlyView(config, attributes, expanded, onToggle) {
  if (!config.showMonthlyView) return html``;

  // Pour l'instant, on affiche les données de base disponibles
  const currentMonth = attributes.current_month || "N/A";
  const lastMonth = attributes.last_month || "N/A";
  const currentMonthLastYear = attributes.current_month_last_year || "N/A";
  const lastMonthLastYear = attributes.last_month_last_year || "N/A";

  const monthData = [
    {
      name: "Mois actuel",
      value: currentMonth,
      year: new Date().getFullYear(),
      evolution:
        currentMonthLastYear !== "N/A" && currentMonth !== "N/A"
          ? (
              ((parseFloat(currentMonth) - parseFloat(currentMonthLastYear)) / parseFloat(currentMonthLastYear)) *
              100
            ).toFixed(1)
          : null,
    },
    {
      name: "Mois précédent",
      value: lastMonth,
      year: new Date().getFullYear(),
      evolution:
        lastMonthLastYear !== "N/A" && lastMonth !== "N/A"
          ? (((parseFloat(lastMonth) - parseFloat(lastMonthLastYear)) / parseFloat(lastMonthLastYear)) * 100).toFixed(1)
          : null,
    },
    {
      name: "Mois actuel A-1",
      value: currentMonthLastYear,
      year: new Date().getFullYear() - 1,
      evolution: null,
    },
    {
      name: "Mois préc. A-1",
      value: lastMonthLastYear,
      year: new Date().getFullYear() - 1,
      evolution: null,
    },
  ].filter((item) => item.value !== "N/A");

  return html`
    <div class="collapsible-section">
      <div class="collapsible-header" @click="${onToggle}">
        <ha-icon icon="${expanded ? "mdi:chevron-up" : "mdi:chevron-down"}"></ha-icon>
        <span class="section-title">Mensuel</span>
        <span class="section-summary"> ${monthData.length > 0 ? `${monthData.length} mois` : "Aucune donnée"} </span>
      </div>
      <div class="collapsible-content ${expanded ? "expanded" : "collapsed"}">
        <div class="month-history">
          ${monthData.map(
            (item) => html`
              <div class="month-item">
                <div class="month-name">${item.name} (${item.year})</div>
                <div class="month-value">${toFloat(item.value)} ${attributes.unit_of_measurement}</div>
                <div class="month-evolution">
                  ${item.evolution !== null
                    ? html`
                        <span class="evolution-percent ${parseFloat(item.evolution) >= 0 ? "positive" : "negative"}">
                          ${parseFloat(item.evolution) >= 0 ? "+" : ""}${item.evolution}%
                        </span>
                      `
                    : "-"}
                </div>
              </div>
            `,
          )}
        </div>
      </div>
    </div>
  `;
}

/** Collapsible yearly comparison (current year vs A-1). */
export function renderYearlyView(config, attributes, expanded, onToggle) {
  if (!config.showYearlyView) return html``;

  // Utilise les données annuelles disponibles
  const currentYear = attributes.current_year || "N/A";
  const currentYearLastYear = attributes.current_year_last_year || "N/A";

  const yearData = [
    {
      name: new Date().getFullYear(),
      value: currentYear,
      evolution:
        currentYearLastYear !== "N/A" && currentYear !== "N/A"
          ? (
              ((parseFloat(currentYear) - parseFloat(currentYearLastYear)) / parseFloat(currentYearLastYear)) *
              100
            ).toFixed(1)
          : null,
    },
    {
      name: new Date().getFullYear() - 1,
      value: currentYearLastYear,
      evolution: null,
    },
  ].filter((item) => item.value !== "N/A");

  return html`
    <div class="collapsible-section">
      <div class="collapsible-header" @click="${onToggle}">
        <ha-icon icon="${expanded ? "mdi:chevron-up" : "mdi:chevron-down"}"></ha-icon>
        <span class="section-title">Annuel</span>
        <span class="section-summary"> ${yearData.length > 0 ? `${yearData.length} ans` : "Aucune donnée"} </span>
      </div>
      <div class="collapsible-content ${expanded ? "expanded" : "collapsed"}">
        <div class="year-history">
          ${yearData.map(
            (item) => html`
              <div class="year-item">
                <div class="year-name">${item.name}</div>
                <div class="year-value">${toFloat(item.value)} ${attributes.unit_of_measurement}</div>
                <div class="year-evolution">
                  ${item.evolution !== null
                    ? html`
                        <span class="evolution-percent ${parseFloat(item.evolution) >= 0 ? "positive" : "negative"}">
                          ${parseFloat(item.evolution) >= 0 ? "+" : ""}${item.evolution}%
                        </span>
                      `
                    : "-"}
                </div>
              </div>
            `,
          )}
        </div>
      </div>
    </div>
  `;
}
