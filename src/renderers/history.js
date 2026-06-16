import { html } from "lit";
import { toFloat } from "../lib/format.js";
import { estimateMissingKwh } from "../lib/calculations.js";
import { TEMPO_VALUES } from "../const.js";
import { renderWeekSummary } from "./week-summary.js";

function renderNoData() {
  return html`
    <br /><span class="cons-val" title="Donnée indisponible"
      ><ha-icon id="icon" icon="mdi:alert-outline"></ha-icon
    ></span>
  `;
}

function renderPendingData() {
  return html`
    <br /><span class="cons-val pending" title="Données en attente de remontée"
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
        title="Tempo: ${finalColor} - Date: ${dayDate}"
        >${new Date(dayDate).toLocaleDateString("fr-FR", { weekday: config.showDayName })}</span
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
            <br /><span
              class="cons-val estimated"
              title="Estimation basée sur les jours précédents - Données kWh non disponibles"
              >${toFloat(estimatedKwh)} ${config.showInTableUnit ? html` ${unit_of_measurement}` : html``}</span
            >
          `;
        }
      } else if (!dayPrice || dayPrice === "-1") {
        // Ni prix ni kWh disponibles - données en attente
        return renderPendingData();
      }
    } else {
      // Pas de données de prix du tout - données en attente
      return renderPendingData();
    }
    return renderNoData();
  }
  return html`
    <br /><span class="cons-val"
      >${toFloat(day)} ${config.showInTableUnit ? html` ${unit_of_measurement}` : html``}</span
    >
  `;
}

function renderDayPrice(config, value, dayNumber) {
  if (config.showDayPrice) {
    const valeur = value.toString().split(",")[dayNumber - 1];
    if (valeur === "-1") {
      return renderNoData();
    }
    return html` <br /><span class="cons-val">${toFloat(valeur, 2)} €</span> `;
  }
  if (config.kWhPrice) {
    return html` <br /><span class="cons-val">${toFloat(value * config.kWhPrice, 2)} €</span> `;
  }
}

function renderDayPriceHCHP(config, value, dayNumber) {
  if (config.showDayPriceHCHP) {
    const valeur = value.toString().split(",")[dayNumber - 1];
    if (valeur === "-1") {
      return renderNoData();
    }
    return html` <br /><span class="cons-val">${toFloat(valeur, 2)} €</span> `;
  }
}

function renderDayHCHP(config, value, dayNumber, unit_of_measurement) {
  if (config.showDayHCHP) {
    const valeur = value.toString().split(",")[dayNumber - 1];
    if (valeur === "-1") {
      return renderNoData();
    }
    return html`
      <br /><span class="cons-val"
        >${toFloat(valeur, 2)} ${config.showInTableUnit ? html` ${unit_of_measurement}` : html``}</span
      >
    `;
  }
}

function renderDayMaxPower(config, value, dayNumber, overMP, MPtime) {
  if (config.showDayMaxPower) {
    const valeur = value.toString().split(",")[dayNumber - 1];
    const over = overMP.toString().split(",")[dayNumber - 1];
    if (valeur === "-1") {
      return renderNoData();
    }
    if (over === "true") {
      return html`
        <br /><span class="cons-val" style="color:red">${toFloat(valeur, 2)}</span> <br /><span
          class="cons-val"
          style="color:red"
          >${new Date(MPtime.toString().split(",")[dayNumber - 1]).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}</span
        >
      `;
    }
    return html`
      <br /><span class="cons-val">${toFloat(valeur, 2)}</span> <br /><span class="cons-val"
        >${new Date(MPtime.toString().split(",")[dayNumber - 1]).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })}</span
      >
    `;
  }
}

function renderDailyWeekTitre(maConfig, monTitre) {
  if (maConfig === true) {
    // Version mobile pour les titres longs
    const titresMobiles = {
      "Prix HC": "€ HC",
      "Prix HP": "€ HP",
    };
    const titreMobile = titresMobiles[monTitre] || monTitre;

    return html`<span class="titre-desktop">${monTitre}</span><span class="titre-mobile">${titreMobile}</span><br /> `;
  }
  return html``;
}

function renderTitreLigne(config) {
  if (config.showTitleLign === true) {
    return html`
      <div class="day">
        ${renderDailyWeekTitre(true, "")} ${renderDailyWeekTitre(true, "Conso")}
        ${renderDailyWeekTitre(config.showDayPrice, "Prix")} ${renderDailyWeekTitre(config.showDayPriceHCHP, "Prix HC")}
        ${renderDailyWeekTitre(config.showDayPriceHCHP, "Prix HP")} ${renderDailyWeekTitre(config.showDayHCHP, "HC")}
        ${renderDailyWeekTitre(config.showDayHCHP, "HP")} ${renderDailyWeekTitre(config.showDayMaxPower, "MP")}
        ${renderDailyWeekTitre(config.showDayMaxPowerTime, "MPtime")}
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
      ${renderDayPrice(config, attributes.dailyweek_cost, dayNumber)}
      ${renderDayPriceHCHP(config, attributes.dailyweek_costHC, dayNumber)}
      ${renderDayPriceHCHP(config, attributes.dailyweek_costHP, dayNumber)}
      ${renderDayHCHP(config, attributes.dailyweek_HC, dayNumber, unit_of_measurement)}
      ${renderDayHCHP(config, attributes.dailyweek_HP, dayNumber, unit_of_measurement)}
      ${renderDayMaxPower(
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
      ${renderTitreLigne(config)}
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
