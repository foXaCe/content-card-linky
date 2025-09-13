const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;


window.customCards = window.customCards || [];
window.customCards.push({
  type: "content-card-linky",
  name: "Carte Enedis",
  description: "Carte pour l'intégration MyElectricalData - Affichage moderne des données Linky avec évolutions colorées",
  preview: true,
  documentationURL: "https://github.com/MyElectricalData/content-card-linky",
  version: "2.0.0"
});
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

const ecoWattForecastValues = new Map([
  ["Pas de valeur", "green"],
  [1, "green"],
  [2, "yellow"],
  [3, "red"],
]);

const tempoValues = new Map([
  ["unknown", "grey"],
  ["Inconnu", "grey"],
  ["BLUE", "blue"],
  ["WHITE", "white"],
  ["RED", "red"],
]);


function hasConfigOrEntityChanged(element, changedProps) {
  if (changedProps.has("config")) {
    return true;
  }

  const oldHass = changedProps.get("hass");
  if (oldHass) {
    return (
      oldHass.states[element.config.entity] !==
        element.hass.states[element.config.entity]
    );
  }

  return true;
}

class ContentCardLinky extends LitElement {
  static get properties() {
    return {
      config: { attribute: false },
      hass: { attribute: false },
      _config: { state: true }
    };
  }

  static async getConfigElement() {
    await import("./content-card-linky-editor.js");
    return document.createElement("content-card-linky-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:content-card-linky",
      entity: "sensor.linky_consumption",
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
      showTitleLine: true,
      showEcoWatt: true,
      showTempo: false
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
                <ha-icon id="icon" icon="mdi:flash" data-state="unavailable" data-domain="connection" style="color: var(--state-icon-unavailable-color)"></ha-icon>
                <span style="margin-right:2em">Linky : donnees inaccessible pour ${this.config.entity}</span>
              </div>
            </div>
          </div>
        </ha-card> 
      `
    }

    const attributes = stateObj.attributes;
    const modeCompteur = attributes["typeCompteur"];
    
    if (stateObj) {
        if (( modeCompteur === "consommation" ) || ( !modeCompteur )){
          return html`
            <ha-card id="card">
              ${this.addEventListener('click', event => { this._showDetails(this.config.entity); })}
              ${this.renderTitle(this.config)}
              <div class="card">
				  ${this.renderHeader(attributes, this.config, stateObj)}
                <div class="variations">
                  ${this.config.showYearRatio 
                    ? html `
                    <span class="variations-linky">
                      <div class="percentage-line">
                        <span class="ha-icon">
                          <ha-icon icon="mdi:arrow-right" style="display: inline-block; transform: rotate(${(attributes.yearly_evolution < 0) ? '45' : ((attributes.yearly_evolution == 0) ? "0" : "-45")}deg)">
                         </ha-icon>
                        </span>
                        <span class="percentage-value ${attributes.yearly_evolution > 0 ? 'percentage-positive' : attributes.yearly_evolution < 0 ? 'percentage-negative' : 'percentage-neutral'}" 
                              aria-label="Évolution annuelle: ${Math.round(attributes.yearly_evolution)}%"
                              role="text">${Math.round(attributes.yearly_evolution)}<span class="unit"> %</span></span>
                      </div>
                      <div class="tooltip">
                        <span class="year">vs ${this.previousYear()}</span>
                        <span class="tooltiptext">A-1 : ${attributes.current_year_last_year}<br>A : ${attributes.current_year}</span>
                      </div>
                    </span>`
                    : html ``
                   }
                  ${this.config.showMonthRatio 
                    ? html `
                    <span class="variations-linky">
                      <div class="percentage-line">
                        <span class="ha-icon">
                          <ha-icon icon="mdi:arrow-right" style="display: inline-block; transform: rotate(${(attributes.monthly_evolution < 0) ? '45' : ((attributes.monthly_evolution == 0) ? "0" : "-45")}deg)">
                         </ha-icon>
                        </span>
                        <span class="percentage-value ${attributes.monthly_evolution > 0 ? 'percentage-positive' : attributes.monthly_evolution < 0 ? 'percentage-negative' : 'percentage-neutral'}"
                              aria-label="Évolution mensuelle: ${Math.round(attributes.monthly_evolution)}%"
                              role="text">${Math.round(attributes.monthly_evolution)}<span class="unit"> %</span></span>
                      </div>
                      <div class="tooltip">
                        <span class="previous-month">vs ${this.previousMonth()}</span>
                        <span class="tooltiptext">Mois Precedent A-1 : ${attributes.last_month_last_year}<br>Mois Precedent : ${attributes.last_month}</span>
                      </div>
                    </span>`
                    : html ``
                   }
                  ${this.config.showCurrentMonthRatio 
                    ? html `
                    <span class="variations-linky">
                      <div class="percentage-line">
                        <span class="ha-icon">
                          <ha-icon icon="mdi:arrow-right" style="display: inline-block; transform: rotate(${(attributes.current_month_evolution < 0) ? '45' : ((attributes.current_month_evolution == 0) ? "0" : "-45")}deg)">
                         </ha-icon>
                        </span>
                        <span class="percentage-value ${attributes.current_month_evolution > 0 ? 'percentage-positive' : attributes.current_month_evolution < 0 ? 'percentage-negative' : 'percentage-neutral'}"
                              aria-label="Évolution du mois courant: ${Math.round(attributes.current_month_evolution)}%"
                              role="text">${Math.round(attributes.current_month_evolution)}<span class="unit"> %</span></span>
                      </div>
                      <div class="tooltip">
                        <span class="current-month">vs ${this.currentMonth()}</span>
                        <span class="tooltiptext">Mois  A-1 : ${attributes.current_month_last_year}<br>Mois  : ${attributes.current_month}</span>
                      </div>
                    </span>`
                    : html ``
                   }
                  ${this.config.showWeekRatio 
                    ? html `
                    <span class="variations-linky">
                      <div class="percentage-line">
                        <span class="ha-icon">
                          <ha-icon icon="mdi:arrow-right" style="display: inline-block; transform: rotate(${(attributes.current_week_evolution < 0) ? '45' : ((attributes.current_week_evolution == 0) ? "0" : "-45")}deg)">
                          </ha-icon>
                        </span>
                        <span class="percentage-value ${attributes.current_week_evolution > 0 ? 'percentage-positive' : attributes.current_week_evolution < 0 ? 'percentage-negative' : 'percentage-neutral'}"
                              aria-label="Évolution hebdomadaire: ${Math.round(attributes.current_week_evolution)}%"
                              role="text">${Math.round(attributes.current_week_evolution)}<span class="unit"> %</span></span>
                      </div>
                      <div class="tooltip">
                        <span class="previous-month">vs ${this.weekBefore()}</span>
                        <span class="tooltiptext">Semaine dernière : ${attributes.last_week}<br>Semaine courante : ${attributes.current_week}</span>
                      </div>
                    </span>`
                    : html ``
                   }
                  ${this.config.showYesterdayRatio
                    ? html `
                    <span class="variations-linky">
                      <div class="percentage-line">
                        <span class="ha-icon">
                          <ha-icon icon="mdi:arrow-right" style="display: inline-block; transform: rotate(${(attributes.yesterday_evolution < 0) ? '45' : ((attributes.yesterday_evolution == 0) ? "0" : "-45")}deg)">
                         </ha-icon>
                        </span>
                        <span class="percentage-value ${attributes.yesterday_evolution > 0 ? 'percentage-positive' : attributes.yesterday_evolution < 0 ? 'percentage-negative' : 'percentage-neutral'}"
                              aria-label="Évolution quotidienne: ${Math.round(attributes.yesterday_evolution)}%"
                              role="text">${Math.round(attributes.yesterday_evolution)}<span class="unit"> %</span></span>
                      </div>
                      <div class="tooltip">
                        <span class="previous-month">vs ${this.dayBeforeYesterday()}</span>
                        <span class="tooltiptext">Avant-hier : ${attributes.day_2}<br>Hier : ${attributes.yesterday}</span>
                      </div>
                    </span>`
                    : html ``
                   }
                  ${this.config.showPeakOffPeak 
                    ? html `
                      <span class="variations-linky">
                        <span class="ha-icon">
                          <ha-icon icon="mdi:flash"></ha-icon>
                        </span>
                        ${Math.round(attributes.peak_offpeak_percent)}<span class="unit"> % HP</span>
                      </span>`
                    : html ``
                   }

                </div>
                ${this.config.showSmartInsights !== false
                  ? this.renderSmartInsights(attributes.daily, 0, 0)
                  : html``
                }
                ${this.renderHistory(attributes.daily, attributes.unit_of_measurement, attributes.dailyweek, attributes.dailyweek_cost, attributes.dailyweek_costHC, attributes.dailyweek_costHP, attributes.dailyweek_HC, attributes.dailyweek_HP, attributes.dailyweek_MP, attributes.dailyweek_MP_over, attributes.dailyweek_MP_time, attributes.dailyweek_Tempo, this.config)}
                ${this.renderEcoWatt(attributes, this.config)}
				${this.renderTempo(attributes, this.config)}
                ${this.renderError(attributes.errorLastCall, this.config)}
                ${this.renderVersion(attributes.versionUpdateAvailable, attributes.versionGit)}
                ${this.renderInformation(attributes, this.config)}
              </div>
            </ha-card>`
        }
        if ( modeCompteur === "production" ){
          return html`
            <ha-card>
              <div class="card">
                <div class="main-info">
                  ${this.config.showIcon
                    ? html`
                      <div class="icon-block">
                      <span class="linky-icon bigger" style="background: none, url('/local/community/content-card-linky/icons/linky.svg') no-repeat; background-size: contain;"></span>
                      </div>`
                    : html `` 
                  }
                  <div class="cout-block">
                    <span class="cout">${this.toFloat(stateObj.state)}</span>
                    <span class="cout-unit">${attributes.unit_of_measurement}</span>
                  </div>
                </div>
                ${this.renderError(attributes.errorLastCall, this.config)}
              </div>
            </ha-card>`
        }
    }
  }
  _showDetails(myEntity) {
    const event = new Event('hass-more-info', {
      bubbles: true,
      cancelable: false,
      composed: true
    });
    event.detail = {
      entityId: myEntity
    };
    this.dispatchEvent(event);
    return event;
  }
  renderTitle(config) {
    if (this.config.showTitle === true) {
      return html
        `
          <div class="card">
          <div class="main-title">
          <span>${this.config.titleName}</span>
          </div>
          </div>` 
       }
  }
  renderHeader(attributes, config, stateObj) {
    if (this.config.showHeader === true) {
	  if( config.showPeakOffPeak ) {
        return html`
		  <div class="main-info">
		  ${this.renderIcon(attributes, config)}
		  <div class="hp-hc-block">
			<span class="conso-hc">${this.toFloat(attributes.yesterday_HC)}</span><span class="conso-unit-hc"> ${attributes.unit_of_measurement} <span class="more-unit">(en HC)</span></span><br />
			<span class="conso-hp">${this.toFloat(attributes.yesterday_HP)}</span><span class="conso-unit-hp"> ${attributes.unit_of_measurement} <span class="more-unit">(en HP)</span></span>
		  </div>
		  ${this.renderPrice(attributes, config)}
          </div>`
	  }
	  else{
        return html`
		  <div class="main-info">
		  ${this.renderIcon(attributes, config)}
		  <div class="cout-block">
			<span class="cout">${this.toFloat(stateObj.state)}</span>
			<span class="cout-unit">${attributes.unit_of_measurement}</span>
		  </div>
		  ${this.renderPrice(attributes, config)}
          </div>`
      }
    }
  }
  renderIcon(attributes, config) {
    if ( this.config.showIcon ){
  	  return html `
		<div class="icon-block">
			<span class="linky-icon bigger" style="background: none, url('/local/community/content-card-linky/icons/linky.svg') no-repeat; background-size: contain;"></span>
		</div>`
	  }
    else{
	  return html ``
	}
  }
  renderPrice(attributes, config) {
    if ( this.config.showPrice ){
  	  return html `
		<div class="cout-block">
		  <span class="cout" title="Coût journalier">${this.toFloat(attributes.daily_cost, 2)}</span><span class="cout-unit"> €</span>
		</div>`
	  }
    else{
	  return html ``
	}
  }
  renderError(errorMsg, config) {
    if (this.config.showError === true) {
       if ( errorMsg != "" ){
          return html
            `
              <div class="error-msg" style="color: red">
                <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
                ${errorMsg}
              </div>
            `
       }
    }
  }
  renderInformation(attributes, config) {
    if (attributes.serviceEnedis === undefined ) {
		return html ``
	}
	else{
		if ( attributes.serviceEnedis !== "myElectricalData" ){
		  return html `
              <div class="information-msg" style="color: red">
              <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
			  Merci de migrer sur myElectricalData.<br>
			  EnedisGateway sera desactivé courant 2023.
			  </div>
			  `
		}
    }
  }
  renderVersion(versionUpdateAvailable, versionGit) {
    if ( versionUpdateAvailable === true ){
          return html
            `
              <div class="information-msg" style="color: red">
                <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
                Nouvelle version disponible ${versionGit}
              </div>
            `
    }
    else{
       return html ``
    }
  }

  calculateWeekTotal(daily, dailyweek) {
    if (!daily) return 0;

    const today = new Date();
    const daysSinceMonday = today.getDay() === 0 ? 6 : today.getDay() - 1;

    let weekTotal = 0;

    // Dans daily[], index 0 = aujourd'hui, index 1 = hier, etc.
    // Pour calculer lundi à aujourd'hui, on va de l'index daysSinceMonday à l'index 0


    // Parcourir de lundi à vendredi (exclure dimanche, aujourd'hui n'existe pas encore)
    // Si on est samedi (daysSinceMonday=5), prendre index 4,3,2,1,0 (lundi à vendredi)
    for (let i = Math.min(daysSinceMonday-1, daily.length-1); i >= 0; i--) { // De lundi (daysSinceMonday-1) à vendredi (0)
      if (i < daily.length) {
        // Calculer quel jour de la semaine correspond à cet index
        const dayDate = new Date();
        dayDate.setDate(dayDate.getDate() - i);
        const dayOfWeek = dayDate.getDay(); // 0=dimanche, 1=lundi, etc.

        const consumption = parseFloat(daily[i]);

        // Ne prendre que lundi à vendredi (pas dimanche)
        if (dayOfWeek !== 0 && !isNaN(consumption) && consumption !== -1) {
          weekTotal += consumption;
        }
      }
    }

    return weekTotal;
  }

  calculateWeekCost(dailyweek_cost, dailyweek) {
    if (!dailyweek_cost) return 0;

    const today = new Date();
    const daysSinceMonday = today.getDay() === 0 ? 6 : today.getDay() - 1;

    const dailyCostArray = dailyweek_cost.toString().split(",");
    let weekCost = 0;

    // Même logique que calculateWeekTotal : de lundi à vendredi (exclure dimanche)
    for (let i = Math.min(daysSinceMonday-1, dailyCostArray.length-1); i >= 0; i--) {
      if (i < dailyCostArray.length) {
        // Calculer quel jour correspond à cet index
        const dayDate = new Date();
        dayDate.setDate(dayDate.getDate() - i);
        const dayOfWeek = dayDate.getDay(); // 0=dimanche, 1=lundi, etc.

        const cost = parseFloat(dailyCostArray[i].replace(',', '.'));

        // Ne prendre que lundi à vendredi (pas dimanche)
        if (dayOfWeek !== 0 && !isNaN(cost) && cost !== -1) {
          weekCost += cost;
        }
      }
    }
    return weekCost;
  }

  getDynamicGradient(consumption, averageConsumption = 50) {
    const ratio = consumption / averageConsumption;

    if (ratio <= 0.7) {
      // Très économique - Vert
      return 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)';
    } else if (ratio <= 1.0) {
      // Normal - Bleu
      return 'linear-gradient(135deg, #2196f3 0%, #03dac6 100%)';
    } else if (ratio <= 1.3) {
      // Élevé - Orange
      return 'linear-gradient(135deg, #ff9800 0%, #ffc107 100%)';
    } else {
      // Très élevé - Rouge
      return 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)';
    }
  }

  getSeasonalTheme() {
    const month = new Date().getMonth();

    if (month >= 2 && month <= 4) {
      // Printemps - Vert tendre
      return { primary: '#66bb6a', accent: '#81c784', icon: 'mdi:flower' };
    } else if (month >= 5 && month <= 7) {
      // Été - Bleu océan
      return { primary: '#42a5f5', accent: '#29b6f6', icon: 'mdi:white-balance-sunny' };
    } else if (month >= 8 && month <= 10) {
      // Automne - Orange/Marron
      return { primary: '#ff7043', accent: '#ffab40', icon: 'mdi:leaf' };
    } else {
      // Hiver - Bleu froid
      return { primary: '#5c6bc0', accent: '#7986cb', icon: 'mdi:snowflake' };
    }
  }

  renderWeekSummary(daily, unit_of_measurement, dailyweek, dailyweek_cost, config) {
    if (!this.config.showWeekSummary && this.config.showWeekSummary !== undefined) {
      return html``;
    }

    const weekTotal = this.calculateWeekTotal(daily, dailyweek);
    const weekCost = this.calculateWeekCost(dailyweek_cost, dailyweek);
    const today = new Date();
    const mondayThisWeek = new Date(today);
    mondayThisWeek.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1));

    console.log('DEBUG: Totaux calculés', {
      weekTotal,
      weekCost
    });

    // Calcul de la moyenne pour gradient dynamique
    const avgWeekly = daily.slice(0, 7).reduce((sum, day) => sum + parseFloat(day || 0), 0) / 7 * 5;
    const dynamicGradient = this.getDynamicGradient(weekTotal, avgWeekly);
    const seasonalTheme = this.getSeasonalTheme();


    return html`
      <div class="week-summary-card" style="background: ${dynamicGradient}">
        <div class="week-summary-header">
          <ha-icon icon="${seasonalTheme.icon}" class="week-summary-icon"></ha-icon>
          <span class="week-summary-title">Semaine en cours</span>
          <span class="week-summary-period">depuis ${mondayThisWeek.toLocaleDateString('fr-FR', {day: 'numeric', month: 'short'})}</span>
        </div>
        <div class="week-summary-content">
          <div class="week-summary-main">
            <span class="week-summary-value">${this.toFloat(weekTotal, 1)}</span>
            <span class="week-summary-unit">${unit_of_measurement}</span>
          </div>
          ${weekCost > 0 ? html`
            <div class="week-summary-cost">
              <span class="week-summary-cost-value">${weekCost.toFixed(2).replace(/\.00$/, '')}</span>
              <span class="week-summary-cost-unit">€</span>
            </div>
          ` : html``}
        </div>
      </div>
    `;
  }

  renderSmartInsights(daily, weekTotal, weekCost) {
    // Utiliser les données réelles de l'entité si disponibles
    const entity = this.hass.states[this.config.entity];
    const attributes = entity ? entity.attributes : {};

    // Prédiction mensuelle basée sur la tendance actuelle
    const currentMonth = attributes['Current month'] || 0;
    const monthlyPrediction = attributes['Current month'] ?
      (currentMonth / new Date().getDate()) * new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() :
      (weekTotal / 5) * 30;
    const monthlyCostPrediction = (weekCost / 5) * 30;

    // Utiliser les évolutions directes de l'entité (parser les virgules françaises)
    console.log('DEBUG Smart Insights - Weekly evolution raw:', attributes['Weekly evolution']);
    console.log('DEBUG Smart Insights - Monthly evolution raw:', attributes['Monthly evolution']);
    console.log('DEBUG Smart Insights - Yearly evolution raw:', attributes['Yearly evolution']);

    const weekEvolution = parseFloat((attributes['Weekly evolution'] || '0').toString().replace(',', '.'));
    const monthlyEvolution = parseFloat((attributes['Monthly evolution'] || '0').toString().replace(',', '.'));
    const yearlyEvolution = parseFloat((attributes['Yearly evolution'] || '0').toString().replace(',', '.'));

    console.log('DEBUG Smart Insights - Week parsed:', weekEvolution);
    console.log('DEBUG Smart Insights - Month parsed:', monthlyEvolution);
    console.log('DEBUG Smart Insights - Year parsed:', yearlyEvolution);

    // Insights intelligents avec données réelles
    const isGoodWeekTrend = weekEvolution < 0;
    const isGoodMonthTrend = monthlyEvolution < 0;
    const isGoodYearTrend = yearlyEvolution < 0;

    const weekTrendIcon = isGoodWeekTrend ? 'mdi:trending-down' : 'mdi:trending-up';
    const weekTrendColor = isGoodWeekTrend ? '#4caf50' : '#f44336';

    const monthTrendIcon = isGoodMonthTrend ? 'mdi:trending-down' : 'mdi:trending-up';
    const monthTrendColor = isGoodMonthTrend ? '#4caf50' : '#f44336';

    const yearTrendIcon = isGoodYearTrend ? 'mdi:trending-down' : 'mdi:trending-up';
    const yearTrendColor = isGoodYearTrend ? '#4caf50' : '#f44336';

    return html`
      <div class="smart-insights">
        <div class="insight-row">
          <div class="insight-item">
            <ha-icon icon="mdi:calendar-month" class="insight-icon"></ha-icon>
            <div class="insight-content">
              <div class="insight-label">Prédiction mensuelle</div>
              <div class="insight-value">${monthlyPrediction.toFixed(0)} kWh • ${monthlyCostPrediction.toFixed(0)}€</div>
            </div>
          </div>

          <div class="insight-item">
            <ha-icon icon="${weekTrendIcon}" class="insight-icon" style="color: ${weekTrendColor}"></ha-icon>
            <div class="insight-content">
              <div class="insight-label">vs semaine dernière</div>
              <div class="insight-value" style="color: ${weekTrendColor}">
                ${weekEvolution > 0 ? '+' : ''}${weekEvolution}%
              </div>
            </div>
          </div>
        </div>

        <div class="insight-row">
          <div class="insight-item">
            <ha-icon icon="${monthTrendIcon}" class="insight-icon" style="color: ${monthTrendColor}"></ha-icon>
            <div class="insight-content">
              <div class="insight-label">vs mois dernier</div>
              <div class="insight-value" style="color: ${monthTrendColor}">
                ${monthlyEvolution > 0 ? '+' : ''}${monthlyEvolution}%
              </div>
            </div>
          </div>

          <div class="insight-item">
            <ha-icon icon="${yearTrendIcon}" class="insight-icon" style="color: ${yearTrendColor}"></ha-icon>
            <div class="insight-content">
              <div class="insight-label">vs année dernière</div>
              <div class="insight-value" style="color: ${yearTrendColor}">
                ${yearlyEvolution > 0 ? '+' : ''}${yearlyEvolution}%
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderHistory(daily, unit_of_measurement, dailyweek, dailyweek_cost, dailyweek_costHC, dailyweek_costHP, dailyweek_HC, dailyweek_HP, dailyweek_MP, dailyweek_MP_over, dailyweek_MP_time, dailyweek_Tempo, config) {
    if (this.config.showHistory === true) {
      if ( dailyweek != undefined){
        var nbJours = dailyweek.toString().split(",").length ;
        if ( config.nbJoursAffichage <= nbJours ) { nbJours = config.nbJoursAffichage }
        return html
          `
            ${this.renderWeekSummary(daily, unit_of_measurement, dailyweek, dailyweek_cost, config)}
            <div class="week-history">
            ${this.renderTitreLigne(config)}
            ${daily.slice(-nbJours).map((day, index) => {
              const dayIndex = daily.length - nbJours + index + 1;
              return this.renderDay(day, dayIndex, unit_of_measurement, dailyweek, dailyweek_cost, dailyweek_costHC, dailyweek_costHP,
                dailyweek_HC, dailyweek_HP, dailyweek_MP, dailyweek_MP_over, dailyweek_MP_time, dailyweek_Tempo, config);
            }).reverse()}
            </div>
          `
        }
    }
  }

  renderDay(day, dayNumber, unit_of_measurement, dailyweek, dailyweek_cost, dailyweek_costHC, dailyweek_costHP, dailyweek_HC, dailyweek_HP, dailyweek_MP, dailyweek_MP_over, dailyweek_MP_time, dailyweek_Tempo, config) {
    return html
      `
        <div class="day">
          ${this.renderDailyWeek(dailyweek, dailyweek_Tempo, dayNumber, config)}
          ${this.renderDailyValue(day, dayNumber, unit_of_measurement, config)}
          ${this.renderDayPrice(dailyweek_cost, dayNumber, config)}
          ${this.renderDayPriceHCHP(dailyweek_costHC, dayNumber, config)}
          ${this.renderDayPriceHCHP(dailyweek_costHP, dayNumber, config)}
          ${this.renderDayHCHP(dailyweek_HC, dayNumber, unit_of_measurement, config)}
          ${this.renderDayHCHP(dailyweek_HP, dayNumber, unit_of_measurement, config)}
		  ${this.renderDayMaxPower(dailyweek_MP, dayNumber, dailyweek_MP_over, dailyweek_MP_time, config)}
        </div>
      `
  }
  renderDailyWeekTitre( maConfig, monTitre ){
    if (maConfig === true) {
       // Version mobile pour les titres longs
       const titresMobiles = {
         "Prix HC": "€ HC", 
         "Prix HP": "€ HP"
       };
       const titreMobile = titresMobiles[monTitre] || monTitre;
       
       return html
       `<span class="titre-desktop">${monTitre}</span><span class="titre-mobile">${titreMobile}</span><br>
       `
      }
    else{
       return html
       `
       `
    }
  }
  renderTitreLigne(config) {
    if (this.config.showTitleLign === true) {
       return html
       `
        <div class="day">
          ${this.renderDailyWeekTitre(true, "")}
          ${this.renderDailyWeekTitre(true, "Conso")}
          ${this.renderDailyWeekTitre(this.config.showDayPrice, "Prix")}
          ${this.renderDailyWeekTitre(this.config.showDayPriceHCHP, "Prix HC")}
          ${this.renderDailyWeekTitre(this.config.showDayPriceHCHP, "Prix HP")}
          ${this.renderDailyWeekTitre(this.config.showDayHCHP, "HC")}
          ${this.renderDailyWeekTitre(this.config.showDayHCHP, "HP")}
		  ${this.renderDailyWeekTitre(this.config.showDayMaxPower, "MP")}
		  ${this.renderDailyWeekTitre(this.config.showDayMaxPowerTime, "MPtime")}
        </div>
        `
    }
  }
  r_enderTitreLigne(config) {
    if (this.config.showTitleLign === true) {
        return html
        `
            <div class="day">
        <br><span class="cons-val">Conso.</span>
        ${this.config.showDayPrice 
        ? html `
        <br><span class="cons-val">Prix</span>`
        : html ``
        }
        ${this.config.showDayPriceHCHP
        ? html `
        <br><span class="cons-val">Prix HC</span>`
        : html ``
        }
        ${this.config.showDayPriceHCHP 
        ? html `
        <br><span class="cons-val">Prix HP</span>`
        : html ``
        }
        ${this.config.showDayHCHP 
        ? html `
        <br><span class="cons-val">HC</span>`
        : html ``
        }
        ${this.config.showDayHCHP 
        ? html `
        <br><span class="cons-val">HP</span>`
        : html ``
        }
	${this.config.showDayMaxPower 
        ? html `
	<br><span class="cons-val">MP</span>`
        : html ``
        }
	${this.config.showDayMaxPower 
        ? html `
	<br><span class="cons-val">MPtime</span>`
        : html ``
        }
            </div>
        `;
      }
  }
  findTempoEntities() {
    // Recherche intelligente des entités tempo disponibles
    const tempoPatterns = [
      'sensor.rte_tempo_today',
      'sensor.edf_tempo_today',
      'sensor.tempo_today',
      'sensor.rte_tempo_tomorrow',
      'sensor.edf_tempo_tomorrow',
      'sensor.tempo_tomorrow'
    ];

    const availableEntities = {};

    for (const pattern of tempoPatterns) {
      if (this.hass.states[pattern]) {
        const entity = this.hass.states[pattern];
        if (entity.state && tempoValues.has(entity.state)) {
          if (pattern.includes('today')) {
            availableEntities.today = pattern;
          } else if (pattern.includes('tomorrow')) {
            availableEntities.tomorrow = pattern;
          }
        }
      }
    }

    // Si une entité est configurée, l'utiliser en priorité
    if (this.config.tempoEntity && this.hass.states[this.config.tempoEntity]) {
      const entity = this.hass.states[this.config.tempoEntity];
      if (entity.state && tempoValues.has(entity.state)) {
        availableEntities.today = this.config.tempoEntity;
      }
    }

    return availableEntities;
  }

  getTempoColorForDay(valueC, dayNumber, dayDate) {
    // Récupération depuis les données Tempo transmises (format original)
    if (valueC && valueC.toString() !== "undefined") {
      const valeurColor = valueC.toString().split(",")[dayNumber-1];
      if (valeurColor && valeurColor !== "-1") {
        return valeurColor.toLowerCase();
      }
    }

    // Utiliser la détection automatique d'entités tempo
    const tempoEntities = this.findTempoEntities();

    if (dayDate && Object.keys(tempoEntities).length > 0) {
      const targetDate = new Date(dayDate);
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      // Vérifier si c'est aujourd'hui
      if (targetDate.toDateString() === today.toDateString() && tempoEntities.today) {
        const tempoEntity = this.hass.states[tempoEntities.today];
        if (tempoEntity && tempoEntity.state && tempoValues.has(tempoEntity.state)) {
          console.log(`Tempo détecté pour aujourd'hui: ${tempoEntity.state} depuis ${tempoEntities.today}`);
          return tempoValues.get(tempoEntity.state);
        }
      }

      // Vérifier si c'est demain
      if (targetDate.toDateString() === tomorrow.toDateString() && tempoEntities.tomorrow) {
        const tempoEntity = this.hass.states[tempoEntities.tomorrow];
        if (tempoEntity && tempoEntity.state && tempoValues.has(tempoEntity.state)) {
          console.log(`Tempo détecté pour demain: ${tempoEntity.state} depuis ${tempoEntities.tomorrow}`);
          return tempoValues.get(tempoEntity.state);
        }
      }
    }

    return "grey"; // Couleur par défaut si pas de données
  }

  renderDailyWeek(value, valueC, dayNumber, config) {
    const dayDate = value.toString().split(",")[dayNumber-1];
    let finalColor = "grey";

    if (config.showTempoColor) {
      finalColor = this.getTempoColorForDay(valueC, dayNumber, dayDate);
      // Debug log détaillé
      console.log(`=== DEBUG TEMPO ===`);
      console.log(`Jour ${dayNumber}, date: ${dayDate}`);
      console.log(`Entités tempo trouvées:`, this.findTempoEntities());
      console.log(`Couleur finale: ${finalColor}`);
      console.log(`Classe CSS: tempoday-${finalColor}`);
    }

    return html
    `
    <span class="tempo-day-wrapper">
      <span class="tempoday-${finalColor}" style="display: inline-block;" title="Tempo: ${finalColor} - Date: ${dayDate}">${new Date(dayDate).toLocaleDateString('fr-FR', {weekday: config.showDayName})}</span>
    </span>
    `;
  }
  renderNoData(){
     return html
          `
             <br><span class="cons-val" title="Donnée indisponible"><ha-icon id="icon" icon="mdi:alert-outline"></ha-icon></span>
           ` ;
  }
  renderDailyValue(day, dayNumber, unit_of_measurement, config) {
    if ( day === -1 ){
        return this.renderNoData();
    }
    else{
        return html
        `
        <br><span class="cons-val">${this.toFloat(day)} 
                  ${this.config.showInTableUnit 
                    ? html `
                      ${unit_of_measurement}`
                    : html ``
                   }</span>
       `;
    }
  }
  renderDayPrice(value, dayNumber, config) {
    if (config.kWhPrice) {
      return html
      `
        <br><span class="cons-val">${this.toFloat(value * config.kWhPrice, 2)} €</span>
      `;
    }
    if (config.showDayPrice) {
       const valeur = value.toString().split(",")[dayNumber-1] ;
       if ( valeur === "-1" ){
          return this.renderNoData();
       }
       else{
          return html
          `
             <br><span class="cons-val">${this.toFloat(valeur)} €</span>
           `;
       }
    }
  }
  renderDayPriceHCHP(value, dayNumber, config) {
    if (config.showDayPriceHCHP) {
       const valeur = value.toString().split(",")[dayNumber-1] ;
       if ( valeur === "-1" ){
          return this.renderNoData();
       }
       else{
          return html
          `
             <br><span class="cons-val">${this.toFloat(valeur, 2)} €</span>
          `;
       }
    }
  }
  renderDayHCHP(value, dayNumber, unit_of_measurement, config) {
    if (config.showDayHCHP) {
       const valeur = value.toString().split(",")[dayNumber-1] ;
       if ( valeur === "-1" ){
          return this.renderNoData();
       }
       else{
          return html
          `
             <br><span class="cons-val">${this.toFloat(valeur, 2)} 
           ${this.config.showInTableUnit 
                   ? html `
                     ${unit_of_measurement}`
                   : html ``
                  }</span>
          `;
        }
    }
  }
  renderDayMaxPower(value, dayNumber, overMP, MPtime, config) {
    if (config.showDayMaxPower) {
       const valeur = value.toString().split(",")[dayNumber-1] ;
       const over = overMP.toString().split(",")[dayNumber-1];
       if ( valeur === "-1" ){
          return this.renderNoData();
       }
       else{
		   if ( over === "true") {
		    return html
			`
				<br><span class="cons-val" style="color:red">${this.toFloat(valeur, 2)}</span>
				<br><span class="cons-val" style="color:red">${new Date(MPtime.toString().split(",")[dayNumber-1]).toLocaleTimeString('fr-FR', { hour: "2-digit", minute: "2-digit" }) }</span>
			`;
		   }
		   else {
			return html
			`
				<br><span class="cons-val">${this.toFloat(valeur, 2)}</span>
				<br><span class="cons-val">${new Date(MPtime.toString().split(",")[dayNumber-1]).toLocaleTimeString('fr-FR', { hour: "2-digit", minute: "2-digit" }) }</span>
			`;
		   }
	   }
    }
  }  
  
    renderDayMaxPowerTime(value, dayNumber, overMP, config) {
    if (config.showDayMaxPower) {
       const valeur = value.toString.split(",")[dayNumber-1] ;
       const over = overMP.toString().split(",")[dayNumber-1];
       if ( valeur === "-1" ){
          return this.renderNoData();
       }
       else{
		   if ( over === "true") {
		    return html
			`
				<br><span class="cons-val" style="color:red">${this.toFloat(valeur, 2)}</span>
			`;
		   }
		   else {
			return html
			`
				<br><span class="cons-val">${this.toFloat(valeur, 2)}</span>
			`;
		   }
	   }
    }
  } 
  
  getOneDayForecastTime(ecoWattForecast) {
	let ecoWattForecastDate = new Date(ecoWattForecast.attributes["date"]);
    return [ecoWattForecastDate];
  }
  
  getOneDayNextEcoWattText(ecoWattForecastEntity) {
	let forecastDate = new Date(ecoWattForecastEntity.attributes["date"]);
    for (let [time, value] of Object.entries(
      ecoWattForecastEntity.attributes["forecast"]
    )) {
      if ( time != undefined && ecoWattForecastValues.get(value) !== "green" ) {
		let timeStr = time.replace(/([345])5/g, "$10");
		return html `Actuellement: ${ecoWattForecastValues.get(value)}`;
      } else
	  {
		  return html `Ecowatt ${ forecastDate.toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric'}) }`;
	  }
    }
    return ""
  }
  
  getOneDayNextEcoWatt(ecoWattForecastEntity) {
    let ecoWattForecastList = [];
    for (let [time, value] of Object.entries(
      ecoWattForecastEntity.attributes["forecast"]
    )) {
      if (time != undefined) {
        time = time.replace("h", "").trim();
        time = time.replace("min", "").trim();
        ecoWattForecastList.push([time, ecoWattForecastValues.get(value), value]);
      }
    }

    return ecoWattForecastList;
  }
  
  renderEcoWatt(attributes, config) {
	if (attributes.serviceEnedis === undefined ){
	  return html ``;
	}
	if ( attributes.serviceEnedis !== "myElectricalData" ){
	  return html `EcoWatt : uniquement disponible avec myElectricData`;
	}
	
	let sensorName = this.config.ewEntity;
    const ecoWattForecast = this.hass.states[sensorName];	
	let sensorNameJ1 = this.config.ewEntityJ1;
    const ecoWattForecastJ1 = this.hass.states[sensorNameJ1];
	let sensorNameJ2 = this.config.ewEntityJ2;
    const ecoWattForecastJ2 = this.hass.states[sensorNameJ2];

    return html` 
	<table style="width:100%">
		${this.config.showEcoWatt 
		? html`
		<tr style="line-height:80%">
		<td style="width:5%">J+0</td>
		<td style="width:95%">
			<ul class="flow-row oneHour">
			${html`
			${this.getOneDayNextEcoWatt(ecoWattForecast).map(
			(forecast) => html`
			<li class="ecowatt-${forecast[0]}" style="background: ${forecast[1]}" title="${forecast[1]} - ${forecast[0]}" ></li>`
			)}
			`}
			</ul>	
		</td>
		</tr>`
		: html ``}
		${this.config.showEcoWattJ12
		? html`
		<tr style="line-height:80%">
		<td style="width:5%">J+1</td>
		<td style="width:95%">
			<ul class="flow-row oneHour">
			${html`
			${this.getOneDayNextEcoWatt(ecoWattForecastJ1).map(
			(forecast) => html`
			<li class="ecowatt-${forecast[0]}" style="background: ${forecast[1]}" title="${forecast[1]} - ${forecast[0]}" ></li>`
			)}
			`}
			</ul>	
		</td>
		</tr>
		<tr style="line-height:80%">
		<td style="width:5%">J+2</td>
		<td style="width:95%">
			<ul class="flow-row oneHour">
			${html`
			${this.getOneDayNextEcoWatt(ecoWattForecastJ2).map(
			(forecast) => html`
			<li class="ecowatt-${forecast[0]}" style="background: ${forecast[1]}" title="${forecast[1]} - ${forecast[0]}" ></li>`
			)}
			`}
			</ul>	
		</td>
		</tr>
		<tr style="line-height:80%">
		<td style="width:5%"> </td>
		<td style="width:95%">
			<ul class="flow-row oneHourLabel">
			${html`
			${this.getOneDayNextEcoWatt(ecoWattForecastJ2).map(
			(forecast) => html`
			<li title="${forecast[0]}">${(forecast[0]%2==1) ? forecast[0] : ''}</li>`
			)}
			`}
			</ul>
		</td>
		</tr>
		`
		: html``}
		`;   
  }
  
  getTempoDateValue(tempoEntity) {
	let tempoDate = new Date(tempoEntity.attributes["date"]);
	let tempoValue = tempoEntity.state;
    return [tempoDate, tempoValues.get(tempoValue), tempoValue];
  } 
  
  getTempoRemainingDays(tempoEntity) {
	let tempoRemainingRed = tempoEntity.attributes["days_red"];
	let tempoRemainingWhite = tempoEntity.attributes["days_white"];
	let tempoRemainingBlue = tempoEntity.attributes["days_blue"];
    return [tempoRemainingRed, tempoRemainingWhite, tempoRemainingBlue];
  } 
  
  renderTempo(attributes, config) {
	if (attributes.serviceEnedis === undefined ){
	  return html ``;
	}
	if ( attributes.serviceEnedis !== "myElectricalData" ){
	  return html `EcoWatt : uniquement disponible avec myElectricData`;
	}
	if (this.config.showTempo === false ){
	  return html ``;
	}
	let sensorName = this.config.tempoEntityInfo;
    const tempoInfo = this.hass.states[sensorName];
	let sensorNameJ0 = this.config.tempoEntityJ0;
    const tempoJ0 = this.hass.states[sensorNameJ0];
	let sensorNameJ1 = this.config.tempoEntityJ1;
    const tempoJ1 = this.hass.states[sensorNameJ1];

    if (!tempoJ0 || tempoJ0.length === 0 || !tempoJ1 || tempoJ1.length === 0) {
      return html `Tempo: sensor(s) J0 et/ou J1 indisponible ou incorrecte`;
    }
	if (!tempoInfo || tempoInfo.length === 0) {
      return html `Tempo: sensor 'info' indisponible ou incorrecte`;
    }

    let [dateJ0, valueJ0, stateJ0] = this.getTempoDateValue(tempoJ0);
	let [dateJ1, valueJ1, stateJ1] = this.getTempoDateValue(tempoJ1);
	let [remainingRed, remainingWhite, remainingBlue] = this.getTempoRemainingDays(tempoInfo);

    return html`
	  <table class="tempo-color">
	  <tr>
		<td class="tempo-${valueJ0}" style="width:50%">${ (new Date(dateJ0)).toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric'})}</td>
		<td class="tempo-${valueJ1}" style="width:50%">${ (new Date(dateJ1)).toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric'})}</td>
	  </tr>
	  </table>
	  <table class="tempo-days">
	  <tr>
	  	<td class="tempo-blue" style="width:33.33%">${remainingBlue}</td>
		<td class="tempo-white" style="width:33.33%">${remainingWhite}</td>
		<td class="tempo-red" style="width:33.33%">${remainingRed}</td>
	  </tr>
	  </table>
		
    `
 
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }

    if (config.kWhPrice && isNaN(config.kWhPrice)) {
      throw new Error('kWhPrice should be a number')
    }
    
    const defaultConfig = {
      showHistory: true,
      showHeader: true,
      showPeakOffPeak: true,
      showIcon: false,
      showInTableUnit: false,
      showDayPrice: false,
      showDayPriceHCHP: false,
	  showDayMaxPower: false,
      showDayHCHP: false,
      showDayName: "long",
      showError: true,
	  shoInformation: true,
      showPrice: true,
      showTitle: false,
      showCurrentMonthRatio: true,
      showMonthRatio: true,
      showWeekRatio: false,
      showYesterdayRatio: false,
      showTitleLign: false,
      showEcoWatt: false,
	  showEcoWattJ12: false,
	  showTempo: false,
	  showTempoColor: true,
      showWeekSummary: true,
      tempoEntity: "sensor.rte_tempo_today",
      titleName: "LINKY",
      nbJoursAffichage: "7",
      kWhPrice: undefined,
    }

    this.config = {
      ...defaultConfig,
      ...config
    };
  }

  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  // @TODO: This requires more intelligent logic
  getCardSize() {
    return 3;
  }
 
  toFloat(value, decimals = 1) {
    return Number.parseFloat(value).toFixed(decimals);
  }
  
  previousYear() {
    var d = new Date();
    d.setFullYear(d.getFullYear()-1 );
    
    return d.toLocaleDateString('fr-FR', {year: "numeric"});
  } 
  
  previousMonth() {
    var d = new Date();
    d.setMonth(d.getMonth()-1) ;
    d.setFullYear(d.getFullYear()-1 );
    
    return d.toLocaleDateString('fr-FR', {month: "long", year: "numeric"});
  } 
  currentMonth() {
    var d = new Date();
    d.setFullYear(d.getFullYear()-1 );
    
    return d.toLocaleDateString('fr-FR', {month: "long", year: "numeric"});
  } 
  weekBefore() {
    return "semaine";
  } 
  dayBeforeYesterday() {
    return "avant-hier";
  } 


  static get styles() {
    return css`
      .card {
        margin: auto;
        padding: 1.5em 1em 1em 1em;
        position: relative;
        cursor: pointer;
        background: var(--ha-card-background, var(--card-background-color, var(--primary-background-color)));
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, 0 4px 8px 0 rgba(0,0,0,0.1));
        transition: all 0.3s ease;
      }

      .card:hover {
        transform: translateY(-2px);
        box-shadow: var(--ha-card-box-shadow, 0 8px 16px 0 rgba(0,0,0,0.15));
      }
      
      /* Desktop - masquer les titres mobiles */
      .titre-mobile {
        display: none;
      }
      .titre-desktop {
        display: inline;
      }
      
      @media (max-width: 768px) {
        .card {
          padding: 2em 1em 1em 1em;
        }
        .main-title {
          font-size: 1.8em;
        }
        .conso-hp, .conso-hc {
          font-size: 1.8em;
        }
        /* Titres colonnes plus petits sur tablette */
        .day {
          font-size: 0.9em;
        }
        /* Afficher titres mobiles sur tablette */
        .titre-mobile {
          display: inline;
        }
        .titre-desktop {
          display: none;
        }
        /* Réduire la taille des textes de pourcentage */
        .year, .previous-month, .current-month {
          font-size: 0.7em !important;
        }
        .variations-linky {
          font-size: 0.9em;
        }
        .percentage-value {
          font-size: 1em;
        }
      }
      
      @media (max-width: 480px) {
        .card {
          padding: 2.2em 0.8em 1em 0.8em;
        }
        .main-title {
          font-size: 1.6em;
        }
        .conso-hp, .conso-hc {
          font-size: 1.6em;
        }
        /* Titres colonnes encore plus petits sur mobile */
        .day {
          font-size: 0.8em;
          line-height: 1.6;
        }
        /* S'assurer que les titres mobiles sont affichés */
        .titre-mobile {
          display: inline;
        }
        .titre-desktop {
          display: none;
        }
        /* Ajuster les textes de pourcentage sur mobile */
        .year, .previous-month, .current-month {
          font-size: 0.75em !important;
          white-space: nowrap;
        }
        .variations-linky {
          font-size: 0.8em;
        }
        .percentage-value {
          font-size: 0.9em;
        }
        /* Forcer le nowrap pour éviter les retours à la ligne */
        .tooltip {
          white-space: nowrap;
        }
      }
	  
      ha-card ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .main-title {
        margin: auto;
        text-align: center;
        font-weight: 200;
        font-size: 2em;
        justify-content: space-between;
      }
      .main-info {
        display: flex;
        overflow: visible;
        align-items: center;
        justify-content: space-between;
        min-height: 75px;
        padding: 1em;
        background: linear-gradient(135deg, var(--primary-color, #1976d2), var(--accent-color, #03dac6));
        border-radius: 12px;
        margin-bottom: 1em;
        color: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
    
      .ha-icon {
        margin-right: 5px;
        color: var(--state-icon-color);
      }
      
      .cout-block {
      }
  
      .cout {
        font-weight: 300;
        font-size: clamp(2.5em, 5vw, 3.5em);
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      }
    
      .cout-unit {
        font-weight: 300;
        font-size: 1.2em;
        display: inline-block;
        white-space: nowrap;
      }
    
      .conso-hp, .conso-hc {
        font-weight: 200;
        font-size: 2em;
      }
    
      .conso-unit-hc, .conso-unit-hp {
        font-weight: 100;
        font-size: 1em;
        white-space: nowrap;
      }
      
      .more-unit {
        font-style: italic;
        font-size: 0.8em;
      }
    
      .variations {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
        gap: 0.5em;
        overflow: hidden;
        margin-bottom: 1em;
      }

      .variations-linky {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 300;
        margin: 0;
        overflow: hidden;
        text-align: center;
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: 8px;
        padding: 0.5em;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: all 0.2s ease;
      }

      .variations-linky:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      }
      
      .percentage-line {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        margin-bottom: 2px;
      }

      .percentage-line ha-icon {
        transition: transform 0.3s ease;
      }

      .variations-linky:hover .percentage-line ha-icon {
        transform: scale(1.2);
      }
      
      .percentage-value {
        font-weight: 500;
        font-size: 1.1em;
      }
      
      .variations-linky .percentage-value.percentage-positive {
        color: var(--error-color, var(--red-color, #e74c3c));
      }
      
      .variations-linky .percentage-value.percentage-negative {
        color: var(--success-color, var(--green-color, #27ae60));
      }
      
      .variations-linky .percentage-value.percentage-neutral {
        color: var(--primary-text-color, var(--text-primary-color, #212121));
      }
    
      .unit {
        font-size: .8em;
      }
    
      .week-history {
        display: flex;
        overflow: hidden;
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        margin-top: 0.5em;
      }
    
      .day {
        flex: auto;
        text-align: center;
        border-right: .1em solid var(--divider-color);
        line-height: 2;
        box-sizing: border-box;
        transition: all 0.2s ease;
        padding: 0.5em 0.2em;
      }

      .day:hover {
        background: var(--primary-color, #1976d2);
        color: white;
        transform: scale(1.02);
      }
    
      .dayname {
        font-weight: bold;
        text-transform: capitalize;
      }
  
      .week-history .day:last-child {
        border-right: none;
      }
    
      .cons-val {
        font-weight: 500;
        white-space: nowrap;
        transition: all 0.2s ease;
      }
      
      .year {
        font-size: 0.8em;
        font-style: italic;
        margin-left: 5px;
      }
      .previous-month {
        font-size: 0.8em;
        font-style: italic;
        margin-left: 5px;
      }
      .current-month {
        font-size: 0.8em;
        font-style: italic;
        margin-left: 5px;
      }
      .icon-block {
      }
      .linky-icon.bigger {
        width: 6em;
        height: 5em;
        display: inline-block;
      }
      .error {
        font-size: 0.8em;
        font-style: bold;
        margin-left: 5px;
      }
      .tooltip .tooltiptext {
        visibility: hidden;
        background: var(--ha-card-background, var(--card-background-color, var(--primary-background-color)));
        box-shadow: var(--ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2));
        cursor: default;
        font-size: 14px;    
        opacity: 1;
        pointer-events: none;
        position: absolute;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 12;
        transition: 0.15s ease all;
        padding: 5px;
        border: 1px solid var(--divider-color, var(--outline-color, #e0e0e0));
        border-radius: 3px;
      }
      .tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: var(--divider-color, var(--outline-color, #555)) transparent transparent transparent;
      }
      .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
      }
	  
      .flow-row {
        display: flex;
        flex-flow: row wrap;
      }
      /* One Hour Forecast */
      .oneHour {
        height: 1em;
      }
      .oneHour > li {
        background-color: var(--state-icon-color);
        border-right: 1px solid var(--lovelace-background, var(--primary-background-color));
      }
      .oneHour > li:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      .oneHour > li:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border: 0;
      }
	  /* One Hour Labels */
      .ecowatt-00, .ecowatt-01, .ecowatt-02, .ecowatt-03, .ecowatt-04, .ecowatt-05, .ecowatt-06, .ecowatt-07{
        flex: 2 1 0;
      }
      .ecowatt-08, .ecowatt-09, .ecowatt-10, .ecowatt-11, .ecowatt-12, .ecowatt-13, .ecowatt-14, .ecowatt-15 {
        flex: 2 1 0;
      }
      .ecowatt-16, .ecowatt-17, .ecowatt-18, .ecowatt-19, .ecowatt-20, .ecowatt-21, .ecowatt-22, .ecowatt-23 {
        flex: 2 1 0;
      }
	  
      .oneHourLabel > li:first-child {
        flex: 0.70 1 0;
      }
      .oneHourLabel > li {
        flex: 1 1 0;
        text-align: left;
      }
      /* One Hour Header */
      .oneHourHeader {
        justify-content: space-between;
      }
      .oneHourHeader li:last-child {
        text-align: right;
      }
      .tempo-days {
       	width:100%;
	border-spacing: 2px;
      }
      .tempo-color {
        width:100%;
	border-spacing: 2px;
      }
	  .tempoborder-color {
        width:100%;
	border-spacing: 2px;
      }
      .tempo-blue {
        color: white;
	text-align: center;
        background: var(--accent-color, var(--primary-color, #009dfa));
    	border: 2px solid var(--divider-color);
    	box-shadow: var(--ha-card-box-shadow,none);
	text-transform: capitalize;
      }
	  .tempoday-blue {
        color: white !important;
        background: var(--accent-color, var(--primary-color, #009dfa)) !important;
		font-weight: bold;
	text-align: center;
    	box-shadow: var(--ha-card-box-shadow,none);
	text-transform: capitalize;
        border-radius: 4px;
        padding: 2px 4px;
        margin: 1px;
      }
      .tempo-white {
        color: var(--text-primary-color, var(--primary-text-color, #002654));
	text-align: center;
        background: white;
    	border: 2px solid var(--divider-color);
    	box-shadow: var(--ha-card-box-shadow,none);
	text-transform: capitalize;
      }
	  .tempoday-white {
        color: #002654 !important;
        background: white !important;
        border: 1px solid #ccc !important;
		font-weight: bold;
	text-align: center;
	text-transform: capitalize;
        border-radius: 4px;
        padding: 2px 4px;
        margin: 1px;
      }
	  .tempoday-grey {
        color: white !important;
        background: grey !important;
		font-weight: bold;
	text-align: center;
	text-transform: capitalize;
        border-radius: 4px;
        padding: 2px 4px;
        margin: 1px;
      }	  
      .tempo-red {
        color: white;
	text-align: center;
        background: var(--error-color, var(--red-color, #ff2700));
    	border: 2px solid var(--divider-color);
    	box-shadow: var(--ha-card-box-shadow,none);
     	text-transform: capitalize;
      }
	  .tempoday-red {
        color: white !important;
        background: var(--error-color, var(--red-color, #ff2700)) !important;
		font-weight: bold;
	text-align: center;
    	box-shadow: var(--ha-card-box-shadow,none);
	text-transform: capitalize;
        border-radius: 4px;
        padding: 2px 4px;
        margin: 1px;
      }
      .tempo-grey {
        color: var(--text-primary-color, var(--primary-text-color, #002654));
	text-align: center;
        background: grey;
	border: 2px solid var(--divider-color);
	box-shadow: var(--ha-card-box-shadow,none);
	background-image: linear-gradient(45deg, #d6d6d6 25%, #dedede 25%, #dedede 50%, #d6d6d6 50%, #d6d6d6 75%, #dedede 75%, #dedede 100%);
	background-size: 28.28px 28.28px;
	text-transform: capitalize;
      }

      /* Week Summary Card */
      .week-summary-card {
        background: linear-gradient(135deg, var(--primary-color, #1976d2) 0%, var(--accent-color, #03dac6) 100%);
        border-radius: 12px;
        padding: 1em;
        margin-bottom: 1em;
        color: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
      }

      .week-summary-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
      }

      .week-summary-header {
        display: flex;
        align-items: center;
        gap: 0.5em;
        margin-bottom: 0.5em;
      }

      .week-summary-icon {
        font-size: 1.2em;
        opacity: 0.9;
      }

      .week-summary-title {
        font-weight: 500;
        font-size: 1.1em;
      }

      .week-summary-period {
        font-size: 0.9em;
        opacity: 0.8;
        margin-left: auto;
      }

      .week-summary-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1em;
      }

      .week-summary-main {
        display: flex;
        align-items: baseline;
        gap: 0.3em;
      }

      .week-summary-value {
        font-size: 2.5em;
        font-weight: 300;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      }

      .week-summary-unit {
        font-size: 1.2em;
        opacity: 0.9;
      }

      .week-summary-cost {
        display: flex;
        align-items: baseline;
        gap: 0.2em;
        text-align: center;
      }

      .week-summary-cost-value {
        font-size: 1.8em;
        font-weight: 500;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        white-space: nowrap;
      }

      .week-summary-cost-unit {
        font-size: 1.2em;
        opacity: 0.9;
        white-space: nowrap;
      }

      /* Smart Insights */
      .smart-insights {
        margin-top: 1em;
      }

      .insight-row {
        display: flex;
        gap: 1.5em;
        flex-wrap: wrap;
      }

      .insight-item {
        display: flex;
        align-items: center;
        gap: 0.5em;
        flex: 1;
        min-width: 140px;
      }

      .insight-icon {
        font-size: 1.1em;
        opacity: 0.9;
      }

      .insight-content {
        display: flex;
        flex-direction: column;
      }

      .insight-label {
        font-size: 0.7em;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .insight-value {
        font-size: 0.9em;
        font-weight: 500;
        margin-top: 2px;
      }

      /* Responsive improvements */
      @media (max-width: 768px) {
        .variations {
          grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
          gap: 0.3em;
        }

        .week-summary-value {
          font-size: 2em;
        }

        .week-summary-cost-value {
          font-size: 1.5em;
        }

        .week-summary-header {
          flex-wrap: wrap;
        }

        .week-summary-period {
          margin-left: 0;
          order: 3;
          flex: 100%;
        }

        .week-summary-content {
          gap: 0.5em;
        }
      }

      @media (max-width: 480px) {
        .variations {
          grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
          gap: 0.2em;
        }

        .week-summary-card {
          padding: 0.8em;
        }

        .week-summary-value {
          font-size: 1.8em;
        }

        .week-summary-cost-value {
          font-size: 1.3em;
        }

        .week-summary-content {
          flex-direction: row !important;
          justify-content: space-between !important;
          align-items: center !important;
          gap: 0.5em;
        }

        .week-summary-cost {
          margin-top: 0.2em;
        }
      }

      /* Dark mode improvements */
      @media (prefers-color-scheme: dark) {
        .week-summary-card {
          background: linear-gradient(135deg, var(--primary-color, #2196f3) 0%, var(--accent-color, #00bcd4) 100%);
        }

        .variations-linky {
          background: var(--ha-card-background, var(--card-background-color, #1e1e1e));
          border: 1px solid var(--divider-color, #333);
        }

        .week-history {
          background: var(--ha-card-background, var(--card-background-color, #1e1e1e));
          border: 1px solid var(--divider-color, #333);
        }

        .day:hover {
          background: var(--primary-color, #2196f3);
        }
      }

      /* Container queries for better responsive design */
      @container (max-width: 400px) {
        .variations {
          grid-template-columns: 1fr;
          gap: 0.2em;
        }

        .week-summary-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.2em;
        }

        .week-summary-period {
          margin-left: 0;
        }
      }

      /* Enhanced animations */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .week-summary-card,
      .variations-linky,
      .week-history {
        animation: fadeInUp 0.3s ease-out;
      }

      .variations-linky:nth-child(2) { animation-delay: 0.1s; }
      .variations-linky:nth-child(3) { animation-delay: 0.2s; }
      .variations-linky:nth-child(4) { animation-delay: 0.3s; }
      .variations-linky:nth-child(5) { animation-delay: 0.4s; }

      /* Focus states for accessibility */
      .variations-linky:focus,
      .day:focus {
        outline: 2px solid var(--accent-color, #03dac6);
        outline-offset: 2px;
      }

      /* Wrapper for tempo day styling */
      .tempo-day-wrapper {
        display: inline-block;
        width: 100%;
      }

      /* Force tempo colors to override any conflicting styles */
      .tempo-day-wrapper .tempoday-blue,
      .tempo-day-wrapper .tempoday-white,
      .tempo-day-wrapper .tempoday-red,
      .tempo-day-wrapper .tempoday-grey {
        all: unset;
        display: inline-block !important;
        text-align: center !important;
        font-weight: bold !important;
        text-transform: capitalize !important;
        border-radius: 4px !important;
        padding: 2px 4px !important;
        margin: 1px !important;
        box-sizing: border-box !important;
      }

      .tempo-day-wrapper .tempoday-blue {
        color: white !important;
        background: #009dfa !important;
      }

      .tempo-day-wrapper .tempoday-white {
        color: #002654 !important;
        background: white !important;
        border: 1px solid #ccc !important;
      }

      .tempo-day-wrapper .tempoday-red {
        color: white !important;
        background: #ff2700 !important;
      }

      .tempo-day-wrapper .tempoday-grey {
        color: white !important;
        background: #666 !important;
      }
      `;
  }
}
customElements.define('content-card-linky', ContentCardLinky);
