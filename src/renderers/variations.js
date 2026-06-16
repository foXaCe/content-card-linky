import { html } from "lit";
import { safeRound } from "../lib/calculations.js";
import { localeOf } from "../lib/format.js";

function previousYear(hass) {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.toLocaleDateString(localeOf(hass), { year: "numeric" });
}

function previousMonth(hass) {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  d.setFullYear(d.getFullYear() - 1);
  return d.toLocaleDateString(localeOf(hass), { month: "long", year: "numeric" });
}

function currentMonth(hass) {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.toLocaleDateString(localeOf(hass), { month: "long", year: "numeric" });
}

function weekBefore() {
  return "semaine";
}

function dayBeforeYesterday() {
  return "avant-hier";
}

/** Grid of consumption-evolution percentage tiles. */
export function renderVariations(hass, config, attributes) {
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
              aria-label="Évolution annuelle: ${safeRound(attributes.yearly_evolution)}%"
              role="text"
              >${safeRound(attributes.yearly_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
            <span class="year">vs ${previousYear(hass)}</span>
            <span class="tooltiptext"
              >A-1 : ${attributes.current_year_last_year}<br />A : ${attributes.current_year}</span
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
              aria-label="Évolution mensuelle: ${safeRound(attributes.monthly_evolution)}%"
              role="text"
              >${safeRound(attributes.monthly_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
            <span class="previous-month">vs ${previousMonth(hass)}</span>
            <span class="tooltiptext"
              >Mois Precedent A-1 : ${attributes.last_month_last_year}<br />Mois Precedent :
              ${attributes.last_month}</span
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
              aria-label="Évolution du mois courant: ${safeRound(attributes.current_month_evolution)}%"
              role="text"
              >${safeRound(attributes.current_month_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
            <span class="current-month">vs ${currentMonth(hass)}</span>
            <span class="tooltiptext"
              >Mois A-1 : ${attributes.current_month_last_year}<br />Mois : ${attributes.current_month}</span
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
              aria-label="Évolution hebdomadaire: ${safeRound(attributes.current_week_evolution)}%"
              role="text"
              >${safeRound(attributes.current_week_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
            <span class="previous-month">vs ${weekBefore()}</span>
            <span class="tooltiptext"
              >Semaine dernière : ${attributes.last_week}<br />Semaine courante : ${attributes.current_week}</span
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
              aria-label="Évolution quotidienne: ${safeRound(attributes.yesterday_evolution)}%"
              role="text"
              >${safeRound(attributes.yesterday_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
            <span class="previous-month">vs ${dayBeforeYesterday()}</span>
            <span class="tooltiptext">Avant-hier : ${attributes.day_2}<br />Hier : ${attributes.yesterday}</span>
          </div>
        </span>`
      : html``}
    ${config.showPeakOffPeak
      ? html` <span class="variations-linky">
          <span class="ha-icon">
            <ha-icon icon="mdi:flash"></ha-icon>
          </span>
          ${safeRound(attributes.peak_offpeak_percent)}<span class="unit"> % HP</span>
        </span>`
      : html``}
  </div>`;
}
