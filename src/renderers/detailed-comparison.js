import { html } from "lit";
import { parseDetailedTimeSeries } from "../lib/calculations.js";
import { localize } from "../lib/localize.js";
import { onActivate } from "../lib/a11y.js";

// Legacy "Daily" + "Dailyweek" string parser (kept for backwards compatibility
// with the older MyElectricalData format).
function parseLegacyDetailedData({ Daily, Dailyweek }, now = new Date()) {
  const dailyConsumptions = Daily.split(",").map((v) => parseFloat(v.trim().replace(",", ".")));
  const dailyWeekDates = Dailyweek.split(",").map((dateStr) => {
    const [day, month] = dateStr.trim().split("/");
    return new Date(now.getFullYear(), parseInt(month, 10) - 1, parseInt(day, 10));
  });

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  const todayData = [];
  const yesterdayData = [];
  dailyWeekDates.forEach((date, index) => {
    const consumption = dailyConsumptions[index] || 0;
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (dateOnly.getTime() === today.getTime()) todayData.push({ time: date, consumption });
    else if (dateOnly.getTime() === yesterday.getTime()) yesterdayData.push({ time: date, consumption });
  });

  const todayTotal = todayData.reduce((s, x) => s + x.consumption, 0) / 1000;
  const yesterdayTotal = yesterdayData.reduce((s, x) => s + x.consumption, 0) / 1000;
  return {
    today: todayData,
    yesterday: yesterdayData,
    todayTotal,
    yesterdayTotal,
    evolution: todayTotal > 0 && yesterdayTotal !== 0 ? ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100 : 0,
  };
}

function renderMiniChart(data, maxValue, color) {
  if (!data || data.length <= 1 || maxValue === 0) {
    return html`<svg viewBox="0 0 100 50" class="consumption-chart"></svg>`;
  }
  const points = data
    .map((item, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (item.consumption / maxValue) * 100;
      return `${x},${y}`;
    })
    .join(" ");
  return html`
    <svg viewBox="0 0 100 50" class="consumption-chart">
      <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2" />
    </svg>
  `;
}

function renderComparisonCharts(hass, data, unit) {
  const maxConsumption = Math.max(...data.today.map((d) => d.consumption), ...data.yesterday.map((d) => d.consumption));
  return html`
    <div class="comparison-charts">
      <div class="chart-day">
        <h4>${localize(hass, "card.comparison.today")}</h4>
        <div class="mini-chart">${renderMiniChart(data.today, maxConsumption, "#2196f3")}</div>
        <div class="day-stats">
          <span class="total">${data.todayTotal.toFixed(1)} ${unit}</span>
          <span class="peak"
            >${localize(hass, "card.comparison.peak", {
              value: Math.max(...data.today.map((d) => d.consumption)),
            })}</span
          >
        </div>
      </div>
      <div class="chart-day">
        <h4>${localize(hass, "card.comparison.yesterday")}</h4>
        <div class="mini-chart">${renderMiniChart(data.yesterday, maxConsumption, "#666")}</div>
        <div class="day-stats">
          <span class="total">${data.yesterdayTotal.toFixed(1)} ${unit}</span>
          <span class="peak"
            >${localize(hass, "card.comparison.peak", {
              value: Math.max(...data.yesterday.map((d) => d.consumption)),
            })}</span
          >
        </div>
      </div>
    </div>
  `;
}

function renderComparisonStats(hass, data) {
  const evolution = data.evolution;
  const evolutionClass = evolution > 0 ? "increase" : evolution < 0 ? "decrease" : "stable";
  const evolutionIcon =
    evolution > 0 ? "mdi:trending-up" : evolution < 0 ? "mdi:trending-down" : "mdi:trending-neutral";
  return html`
    <div class="comparison-stats">
      <div class="stat-item evolution ${evolutionClass}">
        <ha-icon icon="${evolutionIcon}"></ha-icon>
        <span class="label">${localize(hass, "card.comparison.evolution")}</span>
        <span class="value">${Math.abs(evolution).toFixed(1)}%</span>
      </div>
      <div class="stat-item difference">
        <ha-icon icon="mdi:calculator"></ha-icon>
        <span class="label">${localize(hass, "card.comparison.difference")}</span>
        <span class="value">${Math.abs(data.todayTotal - data.yesterdayTotal).toFixed(2)} kWh</span>
      </div>
    </div>
  `;
}

/**
 * "Today vs yesterday" detailed comparison (modern time-series or legacy format).
 * @param {object} hass - Home Assistant object
 * @param {object} config - card configuration
 * @param {object} attributes - main entity attributes (for the unit)
 * @param {boolean} expanded - whether the section is expanded
 * @param {(event: Event) => void} onToggle - toggle handler from the host
 * @returns {import("lit").TemplateResult}
 */
export function renderDetailedComparison(hass, config, attributes, expanded, onToggle) {
  if (!config.showDetailedComparison) return html``;
  if (!config.detailedComparisonEntity) return html``;

  const detailedEntity = hass.states[config.detailedComparisonEntity];
  if (!detailedEntity) {
    return html`
      <div class="collapsible-section">
        <div class="collapsible-header">
          <span class="section-title">${localize(hass, "card.comparison.title")}</span>
          <span class="section-summary"
            >${localize(hass, "card.comparison.entity_not_found", { entity: config.detailedComparisonEntity })}</span
          >
        </div>
      </div>
    `;
  }

  const attrs = detailedEntity.attributes;
  let comparisonData;

  if (Array.isArray(attrs.time) && Array.isArray(attrs.consumption)) {
    comparisonData = parseDetailedTimeSeries(attrs.time, attrs.consumption);
  } else if (attrs.Daily && attrs.Dailyweek) {
    comparisonData = parseLegacyDetailedData({ Daily: attrs.Daily, Dailyweek: attrs.Dailyweek });
  } else {
    const availableAttrs = Object.keys(attrs).join(", ");
    return html`
      <div class="collapsible-section">
        <div class="collapsible-header">
          <span class="section-title">${localize(hass, "card.comparison.title")}</span>
          <span class="section-summary"
            >${localize(hass, "card.comparison.available_attrs", { attrs: availableAttrs })}</span
          >
        </div>
      </div>
    `;
  }

  return html`
    <div class="collapsible-section">
      <div
        class="collapsible-header"
        role="button"
        tabindex="0"
        aria-expanded="${expanded}"
        @click="${onToggle}"
        @keydown="${onActivate(onToggle)}"
      >
        <ha-icon icon="${expanded ? "mdi:chevron-up" : "mdi:chevron-down"}"></ha-icon>
        <span class="section-title">${localize(hass, "card.comparison.title")}</span>
        <span class="section-summary">
          ${comparisonData.todayTotal.toFixed(1)} vs ${comparisonData.yesterdayTotal.toFixed(1)} kWh
        </span>
      </div>
      <div class="collapsible-content ${expanded ? "expanded" : "collapsed"}">
        <div class="detailed-comparison">
          ${renderComparisonCharts(hass, comparisonData, attributes.unit_of_measurement)}
          ${renderComparisonStats(hass, comparisonData)}
        </div>
      </div>
    </div>
  `;
}
