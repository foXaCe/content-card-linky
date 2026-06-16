import { LitElement, html } from "lit";
import { fireEvent } from "./lib/fire-event.js";
import { localize } from "./lib/localize.js";
import { ENTITY_CONFIG_KEYS, DEFAULT_CONFIG } from "./const.js";
import { styles } from "./styles.js";
import { renderTitle, renderHeader, renderProductionValue } from "./renderers/header.js";
import { renderVariations } from "./renderers/variations.js";
import { renderSmartInsights } from "./renderers/smart-insights.js";
import { renderHistory } from "./renderers/history.js";
import { renderMonthlyView, renderYearlyView } from "./renderers/temporal-views.js";
import { renderError, renderInformation, renderVersion } from "./renderers/messages.js";
import { renderEcoWatt } from "./renderers/ecowatt.js";
import { renderTempo } from "./renderers/tempo.js";
import { renderDetailedComparison } from "./renderers/detailed-comparison.js";

const CARD_VERSION = __CARD_VERSION__;

window.customCards = window.customCards || [];
window.customCards.push({
  type: "content-card-linky",
  name: "Carte Enedis",
  description:
    "Carte pour l'intégration MyElectricalData - Affichage moderne des données Linky avec évolutions colorées",
  preview: true,
  documentationURL: "https://github.com/MyElectricalData/content-card-linky",
  version: CARD_VERSION,
});

/* eslint-disable no-console */
console.info(
  `%c content-card-linky %c v${CARD_VERSION} `,
  "color: white; background: #4caf50; font-weight: 700;",
  "color: white; background: #1976d2; font-weight: 700;",
);
/* eslint-enable no-console */

function hasConfigOrEntityChanged(element, changedProps) {
  if (changedProps.has("config")) {
    return true;
  }

  const oldHass = changedProps.get("hass");
  if (!oldHass) {
    return true;
  }

  const cfg = element.config || {};
  for (const key of ENTITY_CONFIG_KEYS) {
    const id = cfg[key];
    if (id && oldHass.states[id] !== element.hass.states[id]) {
      return true;
    }
  }
  return false;
}

class ContentCardLinky extends LitElement {
  static get properties() {
    return {
      config: { attribute: false },
      hass: { attribute: false },
      _monthlyExpanded: { state: true },
      _yearlyExpanded: { state: true },
      _detailedExpanded: { state: true },
    };
  }

  constructor() {
    super();
    this._monthlyExpanded = false;
    this._yearlyExpanded = false;
    this._detailedExpanded = false;
  }

  static async getConfigElement() {
    await import("./content-card-linky-editor.js");
    return document.createElement("content-card-linky-editor");
  }

  static async getStubConfig(hass) {
    let entity = "sensor.linky_consumption";
    if (hass && hass.states) {
      const candidate = Object.keys(hass.states).find((id) => {
        if (!id.startsWith("sensor.")) return false;
        const attrs = hass.states[id].attributes || {};
        return (
          /linky/i.test(id) ||
          attrs.typeCompteur === "consommation" ||
          (attrs.daily !== undefined && attrs.dailyweek !== undefined)
        );
      });
      if (candidate) entity = candidate;
    }
    return {
      type: "custom:content-card-linky",
      entity,
      titleName: "LINKY",
      nbJoursAffichage: "7",
      showIcon: true,
      showHistory: true,
      showPrice: true,
      showDayPrice: true,
      showCurrentMonthRatio: true,
      showWeekRatio: true,
      showDayName: "long",
      showDayMaxPower: true,
      showTitleLign: true,
      showEcoWatt: true,
      showTempo: false,
      showMonthlyView: true,
      showYearlyView: true,
      showDetailedComparison: true,
      detailedComparisonEntity: "sensor.linky_consumption_last5day",
    };
  }

  render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this.config.entity];

    if (!stateObj) {
      return html`
        <ha-card>
          <div class="card">
            <div id="states">
              <div class="name">
                <ha-icon
                  id="icon"
                  icon="mdi:flash"
                  data-state="unavailable"
                  data-domain="connection"
                  style="color: var(--state-icon-unavailable-color)"
                ></ha-icon>
                <span style="margin-right:2em"
                  >${localize(this.hass, "card.data_unavailable", { entity: this.config.entity })}</span
                >
              </div>
            </div>
          </div>
        </ha-card>
      `;
    }

    const attributes = stateObj.attributes;
    const modeCompteur = attributes["typeCompteur"];

    if (modeCompteur === "consommation" || !modeCompteur) {
      return html` <ha-card id="card" @click="${() => this._showDetails(this.config.entity)}">
        ${renderTitle(this.config)}
        <div class="card">
          ${renderHeader(this.hass, this.config, attributes, stateObj)}
          ${renderVariations(this.hass, this.config, attributes)}
          ${this.config.showSmartInsights !== false
            ? renderSmartInsights(this.hass, this.config, attributes.dailyweek, attributes.dailyweek_cost)
            : html``}
          ${renderHistory(this.hass, this.config, attributes)}
          ${renderMonthlyView(this.config, attributes, this._monthlyExpanded, (e) => this.toggleMonthlyView(e))}
          ${renderYearlyView(this.config, attributes, this._yearlyExpanded, (e) => this.toggleYearlyView(e))}
          ${renderDetailedComparison(this.hass, this.config, attributes, this._detailedExpanded, (e) =>
            this.toggleDetailedComparison(e),
          )}
          ${renderEcoWatt(this.hass, this.config, attributes)} ${renderTempo(this.hass, this.config, attributes)}
          ${renderError(this.config, attributes.errorLastCall)}
          ${renderVersion(this.hass, attributes.versionUpdateAvailable, attributes.versionGit)}
          ${renderInformation(this.hass, this.config, attributes)}
        </div>
      </ha-card>`;
    }
    if (modeCompteur === "production") {
      return html` <ha-card>
        <div class="card">
          <div class="main-info">
            ${this.config.showIcon
              ? html` <div class="icon-block">
                  <span
                    class="linky-icon bigger"
                    style="background: none, url('/local/community/content-card-linky/icons/linky.svg') no-repeat; background-size: contain;"
                  ></span>
                </div>`
              : html``}
            <div class="cout-block">${renderProductionValue(stateObj.state, attributes)}</div>
          </div>
          ${renderError(this.config, attributes.errorLastCall)}
        </div>
      </ha-card>`;
    }
  }

  _showDetails(myEntity) {
    return fireEvent(this, "hass-more-info", { entityId: myEntity });
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }

    if (config.kWhPrice && isNaN(config.kWhPrice)) {
      throw new Error("kWhPrice should be a number");
    }

    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  updated(changedProps) {
    super.updated(changedProps);
    // Scroll to rightmost position after rendering
    const weekHistory = this.shadowRoot.querySelector(".week-history");
    if (weekHistory) {
      weekHistory.scrollLeft = weekHistory.scrollWidth - weekHistory.clientWidth;
    }
  }

  getCardSize() {
    const c = this.config || {};
    let size = 2; // header
    if (c.showHistory) size += 2;
    if (c.showSmartInsights !== false) size += 1;
    if (c.showMonthlyView) size += 1;
    if (c.showYearlyView) size += 1;
    if (c.showDetailedComparison) size += 1;
    if (c.showEcoWatt || c.showEcoWattJ12) size += 1;
    if (c.showTempo) size += 1;
    return size;
  }

  // HA 2024.7+ section view sizing
  getGridOptions() {
    const size = this.getCardSize();
    return {
      columns: 12,
      rows: Math.max(3, Math.min(size, 12)),
      min_columns: 6,
      min_rows: 3,
    };
  }

  // Legacy layout options (HA < 2024.7)
  getLayoutOptions() {
    const size = this.getCardSize();
    return {
      grid_columns: 4,
      grid_rows: Math.max(3, Math.min(size, 12)),
      grid_min_columns: 2,
      grid_min_rows: 3,
    };
  }

  toggleMonthlyView(e) {
    e.stopPropagation();
    e.preventDefault();
    this._monthlyExpanded = !this._monthlyExpanded;
  }

  toggleYearlyView(e) {
    e.stopPropagation();
    e.preventDefault();
    this._yearlyExpanded = !this._yearlyExpanded;
  }

  toggleDetailedComparison(e) {
    e.stopPropagation();
    e.preventDefault();
    this._detailedExpanded = !this._detailedExpanded;
  }

  static get styles() {
    return styles;
  }
}

customElements.define("content-card-linky", ContentCardLinky);
