import { html } from "lit";
import { toFloat, localeOf } from "../lib/format.js";
import { localize } from "../lib/localize.js";
import { estimateMissingKwh } from "../lib/calculations.js";
import { TEMPO_VALUES } from "../const.js";
import { renderWeekSummary } from "./week-summary.js";

function renderNoData(hass) {
  return html`
    <br /><span class="cons-val" title="${localize(hass, "card.history.data_unavailable")}"
      ><ha-icon id="icon" icon="mdi:alert-outline"></ha-icon
    ></span>
  `;
}

function renderPendingData(hass) {
  return html`
    <br /><span class="cons-val pending" title="${localize(hass, "card.history.data_pending")}"
      ><ha-icon id="icon" icon="mdi:clock-outline" style="color: #ff9800;"></ha-icon
    ></span>
  `;
}

// Recherche intelligente des entités tempo disponibles.
function findTempoEntities(hass, config) {
  const tempoPatterns = [
    "sensor.rte_tempo_today",
    "sensor.edf_tempo_today",
    "sensor.tempo_today",
    "sensor.rte_tempo_tomorrow",
    "sensor.edf_tempo_tomorrow",
    "sensor.tempo_tomorrow",
  ];

  const availableEntities = {};

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

function getTempoColorForDay(hass, config, valueC, dayNumber, dayDate) {
  // Récupération depuis les données Tempo transmises (format original)
  if (valueC && valueC.toString() !== "undefined") {
    const valeurColor = valueC.toString().split(",")[dayNumber - 1];
    if (valeurColor && valeurColor !== "-1") {
      return valeurColor.toLowerCase();
    }
  }

  // Utiliser la détection automatique d'entités tempo
  const tempoEntities = findTempoEntities(hass, config);

  if (dayDate && Object.keys(tempoEntities).length > 0) {
    const targetDate = new Date(dayDate);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // Vérifier si c'est aujourd'hui
    if (targetDate.toDateString() === today.toDateString() && tempoEntities.today) {
      const tempoEntity = hass.states[tempoEntities.today];
      if (tempoEntity && tempoEntity.state && TEMPO_VALUES.has(tempoEntity.state)) {
        return TEMPO_VALUES.get(tempoEntity.state);
      }
    }

    // Vérifier si c'est demain
    if (targetDate.toDateString() === tomorrow.toDateString() && tempoEntities.tomorrow) {
      const tempoEntity = hass.states[tempoEntities.tomorrow];
      if (tempoEntity && tempoEntity.state && TEMPO_VALUES.has(tempoEntity.state)) {
        return TEMPO_VALUES.get(tempoEntity.state);
      }
    }
  }

  return "grey"; // Couleur par défaut si pas de données
}

function renderDailyWeek(hass, config, dailyweek, dailyweekTempo, dayNumber) {
  const dayDate = dailyweek.toString().split(",")[dayNumber - 1];
  let finalColor = "grey";

  if (config.showTempoColor) {
    finalColor = getTempoColorForDay(hass, config, dailyweekTempo, dayNumber, dayDate);
  }

  return html`
    <span class="tempo-day-wrapper">
      <span
        class="tempoday-${finalColor}"
        style="display: inline-block;"
        title="${localize(hass, "card.history.tempo_day", { color: finalColor, date: dayDate })}"
        >${new Date(dayDate).toLocaleDateString(localeOf(hass), { weekday: config.showDayName })}</span
      >
    </span>
  `;
}

function renderDailyValue(hass, config, day, dayNumber, unit_of_measurement, dailyweek_cost) {
  // Traiter les cas de données manquantes ou invalides
  if (day === -1 || day === 0 || day === "0" || day === null || day === undefined) {
    // Vérifier si on a un prix mais pas de kWh pour faire une estimation
    if (dailyweek_cost) {
      const dailyCostArray = dailyweek_cost.toString().split(",");
      const dayPrice = dailyCostArray[dayNumber - 1];

      if (dayPrice && dayPrice !== "-1" && parseFloat(dayPrice.replace(",", ".")) > 0) {
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

function renderDayPrice(hass, config, value, dayNumber) {
  if (config.showDayPrice) {
    const valeur = value.toString().split(",")[dayNumber - 1];
    if (valeur === "-1") {
      return renderNoData(hass);
    }
    return html` <br /><span class="cons-val">${toFloat(valeur, 2)} €</span> `;
  }
  if (config.kWhPrice) {
    return html` <br /><span class="cons-val">${toFloat(value * config.kWhPrice, 2)} €</span> `;
  }
}

function renderDayPriceHCHP(hass, config, value, dayNumber) {
  if (config.showDayPriceHCHP) {
    const valeur = value.toString().split(",")[dayNumber - 1];
    if (valeur === "-1") {
      return renderNoData(hass);
    }
    return html` <br /><span class="cons-val">${toFloat(valeur, 2)} €</span> `;
  }
}

function renderDayHCHP(hass, config, value, dayNumber, unit_of_measurement) {
  if (config.showDayHCHP) {
    const valeur = value.toString().split(",")[dayNumber - 1];
    if (valeur === "-1") {
      return renderNoData(hass);
    }
    return html`
      <br /><span class="cons-val"
        >${toFloat(valeur, 2)} ${config.showInTableUnit ? html` ${unit_of_measurement}` : html``}</span
      >
    `;
  }
}

function renderDayMaxPower(hass, config, value, dayNumber, overMP, MPtime) {
  if (config.showDayMaxPower) {
    const valeur = value.toString().split(",")[dayNumber - 1];
    const over = overMP.toString().split(",")[dayNumber - 1];
    if (valeur === "-1") {
      return renderNoData(hass);
    }
    const time = new Date(MPtime.toString().split(",")[dayNumber - 1]).toLocaleTimeString(localeOf(hass), {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (over === "true") {
      return html`
        <br /><span class="cons-val" style="color:red">${toFloat(valeur, 2)}</span> <br /><span
          class="cons-val"
          style="color:red"
          >${time}</span
        >
      `;
    }
    return html`
      <br /><span class="cons-val">${toFloat(valeur, 2)}</span> <br /><span class="cons-val">${time}</span>
    `;
  }
}

function renderDailyWeekTitre(show, desktop, mobile) {
  if (show === true) {
    return html`<span class="titre-desktop">${desktop}</span><span class="titre-mobile">${mobile}</span><br /> `;
  }
  return html``;
}

function renderTitreLigne(hass, config) {
  if (config.showTitleLign === true) {
    const t = (key) => localize(hass, `card.history.${key}`);
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
}

function renderDay(hass, config, day, dayNumber, attributes) {
  const { unit_of_measurement } = attributes;
  return html`
    <div class="day">
      ${renderDailyWeek(hass, config, attributes.dailyweek, attributes.dailyweek_Tempo, dayNumber)}
      ${renderDailyValue(hass, config, day, dayNumber, unit_of_measurement, attributes.dailyweek_cost)}
      ${renderDayPrice(hass, config, attributes.dailyweek_cost, dayNumber)}
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

/** Horizontally-scrolling per-day history table with a week summary on top. */
export function renderHistory(hass, config, attributes) {
  if (config.showHistory !== true) {
    return undefined;
  }

  const { daily, dailyweek } = attributes;
  if (dailyweek === undefined) {
    return undefined;
  }

  let nbJours = dailyweek.toString().split(",").length;
  if (config.nbJoursAffichage <= nbJours) {
    nbJours = config.nbJoursAffichage;
  }

  return html`
    ${renderWeekSummary(hass, config, attributes)}
    <div class="week-history">
      ${renderTitreLigne(hass, config)}
      ${daily
        .slice(-nbJours)
        .map((day, index) => {
          const dayIndex = daily.length - nbJours + index + 1;
          return renderDay(hass, config, day, dayIndex, attributes);
        })
        .reverse()}
    </div>
  `;
}
