import { html } from "lit";
import { toFloat, localeOf } from "../lib/format";
import { localize } from "../lib/localize";
import { estimateMissingKwh } from "../lib/calculations";
import { dayCell, parseFrenchNumber } from "../lib/attributes";
import { TEMPO_VALUES } from "../const";
import { renderWeekSummary } from "./week-summary";
import type { HomeAssistant, ContentCardLinkyConfig, LinkyAttributes, TemplateResult } from "../types";

function renderNoData(hass: HomeAssistant): TemplateResult {
  return html`
    <br /><span class="cons-val" title="${localize(hass, "card.history.data_unavailable")}"
      ><ha-icon id="icon" icon="mdi:alert-outline"></ha-icon
    ></span>
  `;
}

function renderPendingData(hass: HomeAssistant): TemplateResult {
  return html`
    <br /><span class="cons-val pending" title="${localize(hass, "card.history.data_pending")}"
      ><ha-icon id="icon" icon="mdi:clock-outline"></ha-icon
    ></span>
  `;
}

// Recherche intelligente des entités tempo disponibles.
function findTempoEntities(hass: HomeAssistant, config: ContentCardLinkyConfig): { today?: string; tomorrow?: string } {
  const tempoPatterns = [
    "sensor.rte_tempo_today",
    "sensor.edf_tempo_today",
    "sensor.tempo_today",
    "sensor.rte_tempo_tomorrow",
    "sensor.edf_tempo_tomorrow",
    "sensor.tempo_tomorrow",
  ];

  const availableEntities: { today?: string; tomorrow?: string } = {};

  for (const pattern of tempoPatterns) {
    if (hass.states[pattern]) {
      const entity = hass.states[pattern];
      if (entity.state && TEMPO_VALUES.has(entity.state)) {
        if (pattern.includes("today")) {
          availableEntities.today = pattern;
        } else if (pattern.includes("tomorrow")) {
          availableEntities.tomorrow = pattern;
        }
      }
    }
  }

  // Si une entité est configurée, l'utiliser en priorité
  if (config.tempoEntity && hass.states[config.tempoEntity]) {
    const entity = hass.states[config.tempoEntity];
    if (entity.state && TEMPO_VALUES.has(entity.state)) {
      availableEntities.today = config.tempoEntity;
    }
  }

  return availableEntities;
}

function getTempoColorForDay(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  valueC: any,
  dayNumber: number,
  dayDate: any,
  now: Date = new Date(),
): string {
  // Récupération depuis les données Tempo transmises (format original)
  if (valueC && valueC.toString() !== "undefined") {
    const valeurColor = dayCell(valueC, dayNumber);
    if (valeurColor && valeurColor !== "-1") {
      return valeurColor.toLowerCase();
    }
  }

  // Utiliser la détection automatique d'entités tempo
  const tempoEntities = findTempoEntities(hass, config);

  if (dayDate && Object.keys(tempoEntities).length > 0) {
    const targetDate = new Date(dayDate);
    const today = new Date(now);
    const tomorrow = new Date(now);
    tomorrow.setDate(today.getDate() + 1);

    // Vérifier si c'est aujourd'hui
    if (targetDate.toDateString() === today.toDateString() && tempoEntities.today) {
      const tempoEntity = hass.states[tempoEntities.today];
      if (tempoEntity && tempoEntity.state && TEMPO_VALUES.has(tempoEntity.state)) {
        return TEMPO_VALUES.get(tempoEntity.state)!;
      }
    }

    // Vérifier si c'est demain
    if (targetDate.toDateString() === tomorrow.toDateString() && tempoEntities.tomorrow) {
      const tempoEntity = hass.states[tempoEntities.tomorrow];
      if (tempoEntity && tempoEntity.state && TEMPO_VALUES.has(tempoEntity.state)) {
        return TEMPO_VALUES.get(tempoEntity.state)!;
      }
    }
  }

  return "grey"; // Couleur par défaut si pas de données
}

function renderDailyWeek(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  dailyweek: any,
  dailyweekTempo: any,
  dayNumber: number,
  now: Date,
): TemplateResult {
  const dayDate = dayCell(dailyweek, dayNumber);
  let finalColor = "grey";

  if (config.showTempoColor) {
    finalColor = getTempoColorForDay(hass, config, dailyweekTempo, dayNumber, dayDate, now);
  }

  return html`
    <span class="tempo-day-wrapper">
      <span
        class="tempoday-${finalColor}"
        style="display: inline-block;"
        title="${localize(hass, "card.history.tempo_day", { color: finalColor, date: dayDate })}"
        >${new Date(dayDate ?? "").toLocaleDateString(localeOf(hass), { weekday: config.showDayName })}</span
      >
    </span>
  `;
}

function renderDailyValue(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  day: any,
  dayNumber: number,
  unit_of_measurement: any,
  dailyweek_cost: any,
): TemplateResult {
  // Traiter les cas de données manquantes ou invalides
  if (day === -1 || day === 0 || day === "0" || day === null || day === undefined) {
    // Vérifier si on a un prix mais pas de kWh pour faire une estimation
    if (dailyweek_cost) {
      const dayPrice = dayCell(dailyweek_cost, dayNumber);

      if (dayPrice && dayPrice !== "-1" && parseFrenchNumber(dayPrice) > 0) {
        // On a un prix mais pas de kWh, faire une estimation
        const estimatedKwh = estimateMissingKwh(hass.states[config.entity].attributes.daily, dayNumber, dailyweek_cost);

        if (estimatedKwh > 0) {
          return html`
            <br /><span class="cons-val estimated" title="${localize(hass, "card.history.estimated")}"
              >${toFloat(estimatedKwh)} ${config.showInTableUnit ? html` ${unit_of_measurement}` : html``}</span
            >
          `;
        }
      } else if (!dayPrice || dayPrice === "-1") {
        // Ni prix ni kWh disponibles - données en attente
        return renderPendingData(hass);
      }
    } else {
      // Pas de données de prix du tout - données en attente
      return renderPendingData(hass);
    }
    return renderNoData(hass);
  }
  return html`
    <br /><span class="cons-val"
      >${toFloat(day)} ${config.showInTableUnit ? html` ${unit_of_measurement}` : html``}</span
    >
  `;
}

function renderDayPrice(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  value: any,
  dayNumber: number,
  dayKwh: any, // the day's kWh value (from renderDay's `day`); TODO plan 007 — replace with shared parse helper
): TemplateResult | undefined {
  if (config.showDayPrice) {
    const valeur = dayCell(value, dayNumber);
    if (valeur === "-1") {
      return renderNoData(hass);
    }
    return html` <br /><span class="cons-val">${toFloat(valeur, 2)} €</span> `;
  }
  if (config.kWhPrice) {
    const kwh = parseFloat(dayKwh);
    if (isNaN(kwh) || kwh <= 0) {
      return renderNoData(hass);
    }
    return html` <br /><span class="cons-val">${toFloat(kwh * config.kWhPrice, 2)} €</span> `;
  }
  return undefined;
}

function renderDayPriceHCHP(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  value: any,
  dayNumber: number,
): TemplateResult | undefined {
  if (config.showDayPriceHCHP) {
    const valeur = dayCell(value, dayNumber);
    if (valeur === "-1") {
      return renderNoData(hass);
    }
    return html` <br /><span class="cons-val">${toFloat(valeur, 2)} €</span> `;
  }
  return undefined;
}

function renderDayHCHP(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  value: any,
  dayNumber: number,
  unit_of_measurement: any,
): TemplateResult | undefined {
  if (config.showDayHCHP) {
    const valeur = dayCell(value, dayNumber);
    if (valeur === "-1") {
      return renderNoData(hass);
    }
    return html`
      <br /><span class="cons-val"
        >${toFloat(valeur, 2)} ${config.showInTableUnit ? html` ${unit_of_measurement}` : html``}</span
      >
    `;
  }
  return undefined;
}

function renderDayMaxPower(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  value: any,
  dayNumber: number,
  overMP: any,
  MPtime: any,
): TemplateResult | undefined {
  if (config.showDayMaxPower) {
    const valeur = dayCell(value, dayNumber);
    const over = dayCell(overMP, dayNumber);
    if (valeur === "-1") {
      return renderNoData(hass);
    }
    const time = new Date(dayCell(MPtime, dayNumber) ?? "").toLocaleTimeString(localeOf(hass), {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (over === "true") {
      return html`
        <br /><span class="cons-val" style="color: var(--error-color, red)">${toFloat(valeur, 2)}</span> <br /><span
          class="cons-val"
          style="color: var(--error-color, red)"
          >${time}</span
        >
      `;
    }
    return html`
      <br /><span class="cons-val">${toFloat(valeur, 2)}</span> <br /><span class="cons-val">${time}</span>
    `;
  }
  return undefined;
}

function renderDailyWeekTitre(show: boolean | undefined, desktop: unknown, mobile: unknown): TemplateResult {
  if (show === true) {
    return html`<span class="titre-desktop">${desktop}</span><span class="titre-mobile">${mobile}</span><br /> `;
  }
  return html``;
}

function renderTitreLigne(hass: HomeAssistant, config: ContentCardLinkyConfig): TemplateResult | undefined {
  if (config.showTitleLign === true) {
    const t = (key: string): string => localize(hass, `card.history.${key}`);
    return html`
      <div class="day">
        ${renderDailyWeekTitre(true, "", "")} ${renderDailyWeekTitre(true, t("col_consumption"), t("col_consumption"))}
        ${renderDailyWeekTitre(config.showDayPrice, t("col_price"), t("col_price"))}
        ${renderDailyWeekTitre(config.showDayPriceHCHP, t("col_price_offpeak"), t("col_price_offpeak_mobile"))}
        ${renderDailyWeekTitre(config.showDayPriceHCHP, t("col_price_peak"), t("col_price_peak_mobile"))}
        ${renderDailyWeekTitre(config.showDayHCHP, t("col_offpeak"), t("col_offpeak"))}
        ${renderDailyWeekTitre(config.showDayHCHP, t("col_peak"), t("col_peak"))}
        ${renderDailyWeekTitre(config.showDayMaxPower, t("col_max_power"), t("col_max_power"))}
        ${renderDailyWeekTitre(config.showDayMaxPowerTime, t("col_max_power_time"), t("col_max_power_time"))}
      </div>
    `;
  }
  return undefined;
}

function renderDay(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  day: any,
  dayNumber: number,
  attributes: LinkyAttributes,
  now: Date,
): TemplateResult {
  const { unit_of_measurement } = attributes;
  return html`
    <div class="day">
      ${renderDailyWeek(hass, config, attributes.dailyweek, attributes.dailyweek_Tempo, dayNumber, now)}
      ${renderDailyValue(hass, config, day, dayNumber, unit_of_measurement, attributes.dailyweek_cost)}
      ${renderDayPrice(hass, config, attributes.dailyweek_cost, dayNumber, day)}
      ${renderDayPriceHCHP(hass, config, attributes.dailyweek_costHC, dayNumber)}
      ${renderDayPriceHCHP(hass, config, attributes.dailyweek_costHP, dayNumber)}
      ${renderDayHCHP(hass, config, attributes.dailyweek_HC, dayNumber, unit_of_measurement)}
      ${renderDayHCHP(hass, config, attributes.dailyweek_HP, dayNumber, unit_of_measurement)}
      ${renderDayMaxPower(
        hass,
        config,
        attributes.dailyweek_MP,
        dayNumber,
        attributes.dailyweek_MP_over,
        attributes.dailyweek_MP_time,
      )}
    </div>
  `;
}

/**
 * Horizontally-scrolling per-day history table with a week summary on top.
 * @param now - injectable clock for deterministic tests
 */
export function renderHistory(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  attributes: LinkyAttributes,
  now: Date = new Date(),
): TemplateResult | undefined {
  if (config.showHistory !== true) {
    return undefined;
  }

  const { daily, dailyweek } = attributes;
  if (dailyweek === undefined) {
    return undefined;
  }
  if (!Array.isArray(daily)) {
    return undefined;
  }

  let nbJours = dailyweek.toString().split(",").length;
  if (Number(config.nbJoursAffichage) <= nbJours) {
    nbJours = Number(config.nbJoursAffichage);
  }

  return html`
    ${renderWeekSummary(hass, config, attributes, now)}
    <div class="week-history">
      ${renderTitreLigne(hass, config)}
      ${daily
        .slice(-nbJours)
        .map((day: any, index: number) => {
          const dayIndex = daily.length - nbJours + index + 1;
          return renderDay(hass, config, day, dayIndex, attributes, now);
        })
        .reverse()}
    </div>
  `;
}
