const fireEvent = (node, type, detail, options) => {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed,
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};

if (
  !customElements.get("ha-switch") &&
  customElements.get("paper-toggle-button")
) {
  customElements.define("ha-switch", customElements.get("paper-toggle-button"));
}

if (!customElements.get("ha-entity-picker")) {
  (customElements.get("hui-entities-card")).getConfigElement();
}

const LitElement = customElements.get("hui-masonry-view") ? Object.getPrototypeOf(customElements.get("hui-masonry-view")) : Object.getPrototypeOf(customElements.get("hui-view"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

const HELPERS = window.loadCardHelpers();

export class contentCardLinkyEditor extends LitElement {
  // Version 2024.1 - Interface modernisée
  setConfig(config) {
    this._config = { ...config };
  }

  static get properties() {
    return { hass: {}, _config: {} };
  }

  get _entity() {
    return (this._config && this._config.entity) || "";
  }
  
  get _ewEntity() {
    return (this._config && this._config.ewEntity) || "";
  }
  
  get _ewEntityJ1() {
    return (this._config && this._config.ewEntityJ1) || "";
  }

  get _ewEntityJ2() {
    return (this._config && this._config.ewEntityJ2) || "";
  }  
  
  get _tempoEntity() {
    return (this._config && this._config.tempoEntityInfo) || "";
  }

  get _tempoEntityInfo() {
    return this._config.tempoEntityInfo || "";
  }  
  
  get _tempoEntityJ0() {
    return (this._config && this._config.tempoEntityJ0) || "";
  }

  get _tempoEntityJ1() {
    return (this._config && this._config.tempoEntityJ1) || "";
  }    

  get _name() {
    return (this._config && this._config.name) || "";
  }

  get _showIcon() {
    return (this._config && this._config.showIcon) !== false;
  }

  get _showHeader() {
    return (this._config && this._config.showHeader) !== false;
  }

  get _showHistory() {
    return (this._config && this._config.showHistory) !== false;
  }
  
  get _showPeakOffPeak() {
    return (this._config && this._config.showPeakOffPeak) !== false;
  }
  
  get _showInTableUnit() {
    return (this._config && this._config.showInTableUnit) !== false;
  }
  
  get _showDayPrice() {
    return (this._config && this._config.showDayPrice) !== false;
  }
  
  get _showDayPriceHCHP() {
    return (this._config && this._config.showDayPriceHCHP) !== false;
  }

  get _showDayMaxPower() {
    return (this._config && this._config.showDayMaxPower) !== false;
  }
  
  get _showPrice() {
    return (this._config && this._config.showPrice) !== false;
  }
  
  get _showTitle() {
    return (this._config && this._config.showTitle) !== false;
  }
  
  get _showDayHCHP() {
    return (this._config && this._config.showDayHCHP) !== false;
  }
  
  get _showCurrentMonthRatio() {
    return (this._config && this._config.showCurrentMonthRatio) !== false;
  }
  
  get _showMonthRatio() {
    return (this._config && this._config.showMonthRatio) !== false;
  }
  
  get _showYearRatio() {
    return (this._config && this._config.showYearRatio) !== false;
  }
  
  get _showWeekRatio() {
    return (this._config && this._config.showWeekRatio) !== false;
  }
  
  get _showYesterdayRatio() {
    return (this._config && this._config.showYesterdayRatio) !== false;
  }
  get _showError() {
    return (this._config && this._config.showError) !== false;
  }
  get _showInformation() {
    return (this._config && this._config.showInformation) !== false;
  }
  get _showTitleLign() {
    return (this._config && this._config.showTitleLign) !== false;
  }
  get _showEcoWatt() {
    return (this._config && this._config.showEcoWatt) !== false;
  }
  get _showEcoWattJ12() {
    return (this._config && this._config.showEcoWattJ12) !== false;
  }
  get _showTempo() {
    return (this._config && this._config.showTempo) !== false;
  }
get _showTempoColor() {
    return (this._config && this._config.showTempoColor) !== false;
  }

  get _showSmartInsights() {
    return (this._config && this._config.showSmartInsights) !== false;
  }

  get _showMonthlyView() {
    return (this._config && this._config.showMonthlyView) !== false;
  }

  get _showYearlyView() {
    return (this._config && this._config.showYearlyView) !== false;
  }

  get _showDetailedComparison() {
    return (this._config && this._config.showDetailedComparison) !== false;
  }

  get _detailedComparisonEntity() {
    return (this._config && this._config.detailedComparisonEntity) || "sensor.linky_consumption_last5day";
  }

  get _title() {
    return (this._config && this._config.showTitle) !== false;
  }
  
  get _current() {
    return (this._config && this._config.current) !== false;
  }

  get _details() {
    return (this._config && this._config.details) !== false;
  }

  get _nbJoursAffichage() {
    return (this._config && this._config.nbJoursAffichage) || "7";
  }

  get _showDayName() {
    return (this._config && this._config.showDayName) || "long";
  }
  
  get _titleName() {
    return (this._config && this._config.titleName) || "LINKY";
  }

  get _kWhPrice() {
    return (this._config && this._config.kWhPrice) || "";
  }

  firstUpdated() {
    HELPERS.then(help => {
      if (help.importMoreInfoControl) {
        help.importMoreInfoControl("fan");
      }
    })
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="config-section">
          <h3 class="section-title">Configuration générale</h3>
          ${this.renderTextField("Titre de la carte", this._titleName, "titleName")}
          ${this.renderNumberField("Prix du kWh (€)", this._kWhPrice, "kWhPrice")}
          ${this.renderSelectField("Nombre de jours à afficher", "nbJoursAffichage", [
            {value: "1", label: "1 jour"}, {value: "2", label: "2 jours"}, {value: "3", label: "3 jours"},
            {value: "4", label: "4 jours"}, {value: "5", label: "5 jours"}, {value: "6", label: "6 jours"},
            {value: "7", label: "7 jours"}
          ], this._nbJoursAffichage)}
          ${this.renderSelectField("Format des jours", "showDayName", [
            {value: "long", label: "Complet (Lundi)"}, {value: "short", label: "Abrégé (Lun)"}, {value: "narrow", label: "Minimal (L)"}
          ], this._showDayName)}
        </div>

        <div class="config-section">
          <h3 class="section-title">Entités Linky</h3>
          ${this.renderSensorPicker("Entité principale Linky", this._entity, "entity")}
        </div>

        <div class="config-section">
          <h3 class="section-title">EcoWatt (RTE)</h3>
          ${this.renderSensorPicker("EcoWatt aujourd'hui", this._ewEntity, "ewEntity")}
          ${this.renderSensorPicker("EcoWatt J+1", this._ewEntityJ1, "ewEntityJ1")}
          ${this.renderSensorPicker("EcoWatt J+2", this._ewEntityJ2, "ewEntityJ2")}
        </div>

        <div class="config-section">
          <h3 class="section-title">Tempo (EDF)</h3>
          ${this.renderSensorPicker("Tempo informations", this._tempoEntityInfo, "tempoEntityInfo")}
          ${this.renderSensorPicker("Tempo aujourd'hui", this._tempoEntityJ0, "tempoEntityJ0")}
          ${this.renderSensorPicker("Tempo demain", this._tempoEntityJ1, "tempoEntityJ1")}
        </div>

        <div class="config-section">
          <h3 class="section-title">Affichage général</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher l'icône", this._showIcon, "showIcon")}
            ${this.renderSwitchOption("Afficher le titre", this._showTitle, "showTitle")}
            ${this.renderSwitchOption("Afficher l'en-tête", this._showHeader, "showHeader")}
            ${this.renderSwitchOption("Afficher les erreurs", this._showError, "showError")}
            ${this.renderSwitchOption("Afficher les informations", this._showInformation, "showInformation")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">Historique & Données</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher l'historique", this._showHistory, "showHistory")}
            ${this.renderSwitchOption("Afficher les unités", this._showInTableUnit, "showInTableUnit")}
            ${this.renderSwitchOption("Afficher les titres de ligne", this._showTitleLign, "showTitleLign")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">Prix & Coûts</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher les prix", this._showPrice, "showPrice")}
            ${this.renderSwitchOption("Afficher le prix par jour", this._showDayPrice, "showDayPrice")}
            ${this.renderSwitchOption("Afficher les prix HC/HP", this._showDayPriceHCHP, "showDayPriceHCHP")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">Heures Creuses/Pleines</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher le ratio HC/HP", this._showPeakOffPeak, "showPeakOffPeak")}
            ${this.renderSwitchOption("Afficher les jours HC/HP", this._showDayHCHP, "showDayHCHP")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">Puissance maximale</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher la puissance max quotidienne", this._showDayMaxPower, "showDayMaxPower")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">📊 Smart Insights & Évolutions</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher les insights intelligents", this._showSmartInsights, "showSmartInsights")}
            ${this.renderSwitchOption("Évolution annuelle", this._showYearRatio, "showYearRatio")}
            ${this.renderSwitchOption("Évolution mois courant", this._showCurrentMonthRatio, "showCurrentMonthRatio")}
            ${this.renderSwitchOption("Évolution mois précédent", this._showMonthRatio, "showMonthRatio")}
            ${this.renderSwitchOption("Évolution hebdomadaire", this._showWeekRatio, "showWeekRatio")}
            ${this.renderSwitchOption("Évolution quotidienne", this._showYesterdayRatio, "showYesterdayRatio")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">EcoWatt & Tempo</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher EcoWatt du jour", this._showEcoWatt, "showEcoWatt")}
            ${this.renderSwitchOption("Afficher EcoWatt J+1/J+2", this._showEcoWattJ12, "showEcoWattJ12")}
            ${this.renderSwitchOption("Afficher Tempo", this._showTempo, "showTempo")}
            ${this.renderSwitchOption("Couleurs Tempo du jour", this._showTempoColor, "showTempoColor")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">Vues temporelles</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Vue mensuelle (repliable)", this._showMonthlyView, "showMonthlyView")}
            ${this.renderSwitchOption("Vue annuelle (repliable)", this._showYearlyView, "showYearlyView")}
            ${this.renderSwitchOption("Comparaison Aujourd'hui vs Hier", this._showDetailedComparison, "showDetailedComparison")}
          </ul>
          ${this.renderSensorPicker("Entité données détaillées", this._detailedComparisonEntity, "detailedComparisonEntity")}
        </div>
      </div>
    `;
  }
   
  renderSensorPicker(label, entity, configAttr) {
    return this.renderPicker(label, entity, configAttr, "sensor");
  }

  renderPicker(label, entity, configAttr, domain) {
    return html`
              <ha-entity-picker
                label="${label}"
                .hass="${this.hass}"
                .value="${entity}"
                .configValue="${configAttr}"
                .includeDomains="${domain}"
                @change="${this._valueChanged}"
                allow-custom-entity
              ></ha-entity-picker>
            `
  }
  
  renderTextField(label, state, configAttr) {
    return this.renderField(label, state, configAttr, "text");
  }

  renderNumberField(label, state, configAttr) {
    return this.renderField(label, state, configAttr, "number");
  }

  renderField(label, state, configAttr, type) {
    return html`
      <ha-textfield
        label="${label}"
        .value="${state}"
        type="${type}"
        .configValue=${configAttr}
        @input=${this._valueChanged}
      ></ha-textfield>
    `;
  }  
  
  renderSwitchOption(label, state, configAttr) {
    return html`
      <li class="switch">
        <ha-switch
          .checked=${state}
          .configValue="${configAttr}"
          @change="${this._valueChanged}">
        </ha-switch>
        <span>${label}</span>
      </li>
    `
  }
  
  renderSelectField(label, config_key, options, value, default_value) {
	let selectOptions = [];
	for (let i = 0; i < options.length; i++) {
		let currentOption = options[i];
		selectOptions.push(html`<ha-list-item .value="${currentOption.value}">${currentOption.label}</ha-list-item>`);
	}

	return html`
		<ha-select
			label="${label}"
			.value=${value || default_value}
			.configValue=${config_key}                
			@change=${this._valueChanged}
			@closed=${(ev) => ev.stopPropagation()}
		>
			${selectOptions}
		</ha-select>
	`
	}  
  
  _valueChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === "") {
        delete this._config[target.configValue];
      } else {
        this._config = {
          ...this._config,
          [target.configValue]:
            target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    fireEvent(this, "config-changed", { config: this._config });
  }

  static get styles() {
    return css`
      .card-config {
        padding: 16px;
      }

      .config-section {
        margin-bottom: 24px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        padding-bottom: 16px;
      }

      .config-section:last-child {
        border-bottom: none;
        margin-bottom: 0;
      }

      .section-title {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      ha-textfield,
      ha-select,
      ha-entity-picker {
        display: block;
        margin-bottom: 16px;
        width: 100%;
      }

      .switches {
        margin: 8px 0 0 0;
        display: flex;
        flex-flow: row wrap;
        list-style: none;
        padding: 0;
        gap: 8px;
      }

      .switch {
        display: flex;
        align-items: center;
        width: calc(50% - 4px);
        min-height: 40px;
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 8px;
        padding: 8px 12px;
        transition: border-color 0.2s ease;
      }

      .switch:hover {
        border-color: var(--primary-color);
      }

      .switches span {
        padding: 0 12px;
        font-size: 13px;
        color: var(--primary-text-color);
        line-height: 1.4;
        flex: 1;
      }

      ha-switch {
        flex-shrink: 0;
      }

      @media (max-width: 600px) {
        .switch {
          width: 100%;
        }

        .switches {
          flex-direction: column;
        }
      }
    `;
  }
}

if (!customElements.get("content-card-linky-editor")) {
  customElements.define("content-card-linky-editor", contentCardLinkyEditor);
}
