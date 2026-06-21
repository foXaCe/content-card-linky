import { LitElement, html, type PropertyValues, type PropertyDeclarations, type CSSResult } from "lit";
import { fireEvent } from "./lib/fire-event";
import { localize } from "./lib/localize";
import { ENTITY_CONFIG_KEYS, DEFAULT_CONFIG } from "./const";
import { styles } from "./styles";
import { renderTitle, renderHeader } from "./renderers/header";
import { renderVariations } from "./renderers/variations";
import { renderSmartInsights } from "./renderers/smart-insights";
import { renderHistory } from "./renderers/history";
import { renderMonthlyView, renderYearlyView } from "./renderers/temporal-views";
import { renderError, renderInformation, renderVersion } from "./renderers/messages";
import { renderEcoWatt } from "./renderers/ecowatt";
import { renderTempo } from "./renderers/tempo";
import { renderDetailedComparison } from "./renderers/detailed-comparison";
import type { HomeAssistant, ContentCardLinkyConfig } from "./types";

const CARD_VERSION = __CARD_VERSION__;

window.customCards = window.customCards || [];
window.customCards.push({
  type: "content-card-linky",
  name: "Carte Enedis",
  description:
    "Carte pour l'intégration MyElectricalData - Affichage moderne des données Linky avec évolutions colorées",
  preview: true,
  documentationURL: "https://github.com/foXaCe/content-card-linky",
  version: CARD_VERSION,
  // HA 2026.6+ : suggest this card automatically in the card picker for
  // Linky / MyElectricalData consumption sensors.
  getEntitySuggestion: (hass: HomeAssistant, entityId: string) => {
    const state = hass.states[entityId];
    if (!state) return null;
    const attrs = state.attributes || {};
    const looksLikeLinky =
      /linky/i.test(entityId) ||
      attrs.typeCompteur === "consommation" ||
      (attrs.daily !== undefined && attrs.dailyweek !== undefined);
    if (looksLikeLinky) {
      return { config: { type: "custom:content-card-linky", entity: entityId } };
    }
    return null;
  },
});

/* eslint-disable no-console */
console.info(
  `%c content-card-linky %c v${CARD_VERSION} `,
  "color: white; background: #4caf50; font-weight: 700;",
  "color: white; background: #1976d2; font-weight: 700;",
);
/* eslint-enable no-console */

/**
 * Validate a user configuration, throwing a descriptive error on the first
 * problem. Centralises the card's config contract so it can be unit-tested in
 * isolation and reused by `setConfig`.
 */
export function assertConfig(config: ContentCardLinkyConfig): void {
  if (!config || !config.entity) {
    throw new Error("You need to define an entity");
  }
  if (config.kWhPrice !== undefined && config.kWhPrice !== null && isNaN(Number(config.kWhPrice))) {
    throw new Error("kWhPrice should be a number");
  }
}

function hasConfigOrEntityChanged(element: ContentCardLinky, changedProps: PropertyValues): boolean {
  if (changedProps.has("config")) {
    return true;
  }

  const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
  if (!oldHass) {
    return true;
  }

  const cfg = (element.config || {}) as Record<string, unknown>;
  const newHass = element.hass;
  for (const key of ENTITY_CONFIG_KEYS) {
    const id = cfg[key];
    if (typeof id === "string" && oldHass.states[id] !== newHass?.states[id]) {
      return true;
    }
  }
  return false;
}

export class ContentCardLinky extends LitElement {
  config?: ContentCardLinkyConfig;
  hass?: HomeAssistant;
  private _monthlyExpanded: boolean;
  private _yearlyExpanded: boolean;
  private _detailedExpanded: boolean;

  static override get properties(): PropertyDeclarations {
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

  static async getConfigElement(): Promise<HTMLElement> {
    await import("./content-card-linky-editor.js");
    return document.createElement("content-card-linky-editor");
  }

  static async getStubConfig(hass?: HomeAssistant): Promise<ContentCardLinkyConfig> {
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

  override render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const config = this.config;
    const hass = this.hass;
    // Reflect the appearance choice on the host for the CSS opt-out variant.
    this.dataset.appearance = config.appearance ?? "premium";
    const stateObj = hass.states[config.entity];

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
                  >${localize(hass, "card.data_unavailable", { entity: config.entity })}</span
                >
              </div>
            </div>
          </div>
        </ha-card>
      `;
    }

    const attributes = stateObj.attributes;
    const modeCompteur = attributes["typeCompteur"];

    if (modeCompteur === "consommation" || modeCompteur === "production" || !modeCompteur) {
      return html` <ha-card id="card" @click="${() => this._showDetails(config.entity)}">
        ${renderTitle(config)}
        <div class="card">
          ${renderHeader(hass, config, attributes, stateObj)} ${renderVariations(hass, config, attributes)}
          ${config.showSmartInsights !== false ? renderSmartInsights(hass, config, attributes) : html``}
          ${renderHistory(hass, config, attributes)}
          ${renderMonthlyView(hass, config, attributes, this._monthlyExpanded, (e) => this.toggleMonthlyView(e))}
          ${renderYearlyView(hass, config, attributes, this._yearlyExpanded, (e) => this.toggleYearlyView(e))}
          ${renderDetailedComparison(hass, config, attributes, this._detailedExpanded, (e) =>
            this.toggleDetailedComparison(e),
          )}
          ${renderEcoWatt(hass, config, attributes)} ${renderTempo(hass, config, attributes)}
          ${renderError(config, attributes.errorLastCall)}
          ${renderVersion(hass, attributes.versionUpdateAvailable, attributes.versionGit)}
          ${renderInformation(hass, config, attributes)}
        </div>
      </ha-card>`;
    }
    return html``;
  }

  _showDetails(myEntity: string) {
    return fireEvent(this, "hass-more-info", { entityId: myEntity });
  }

  setConfig(config: ContentCardLinkyConfig): void {
    assertConfig(config);
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  override shouldUpdate(changedProps: PropertyValues): boolean {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    // Scroll to rightmost position after rendering
    const weekHistory = this.shadowRoot?.querySelector(".week-history");
    if (weekHistory) {
      weekHistory.scrollLeft = weekHistory.scrollWidth - weekHistory.clientWidth;
    }
  }

  getCardSize(): number {
    const c: Partial<ContentCardLinkyConfig> = this.config || {};
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

  toggleMonthlyView(e: Event): void {
    e.stopPropagation();
    e.preventDefault();
    this._monthlyExpanded = !this._monthlyExpanded;
  }

  toggleYearlyView(e: Event): void {
    e.stopPropagation();
    e.preventDefault();
    this._yearlyExpanded = !this._yearlyExpanded;
  }

  toggleDetailedComparison(e: Event): void {
    e.stopPropagation();
    e.preventDefault();
    this._detailedExpanded = !this._detailedExpanded;
  }

  static override get styles(): CSSResult {
    return styles;
  }
}

customElements.define("content-card-linky", ContentCardLinky);
