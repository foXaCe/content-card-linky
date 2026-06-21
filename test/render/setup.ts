import { render } from "lit";

// Stub Home Assistant custom elements that the card uses but happy-dom
// has no idea about. We register them as inert HTMLElements so the card's
// render() doesn't blow up when Lit tries to upgrade them.
const STUBS = ["ha-card", "ha-icon", "ha-form", "ha-textfield", "ha-switch", "ha-entity-picker"];

for (const tag of STUBS) {
  if (!customElements.get(tag)) {
    customElements.define(
      tag,
      class extends HTMLElement {
        connectedCallback() {
          // expose `icon` / `value` so DOM queries can read them back
          if (this.hasAttribute("icon")) this.setAttribute("data-icon", this.getAttribute("icon"));
        }
      },
    );
  }
}

export function makeHass(overrides = {}) {
  return {
    locale: { language: "fr" },
    states: {},
    ...overrides,
  };
}

export function makeLinkyEntity(attrs = {}) {
  return {
    state: "12.5",
    attributes: {
      typeCompteur: "consommation",
      unit_of_measurement: "kWh",
      daily: ["10", "11", "12", "13", "14", "15", "16"],
      dailyweek: ["2026-05-07", "2026-05-06", "2026-05-05", "2026-05-04", "2026-05-03", "2026-05-02", "2026-05-01"],
      dailyweek_cost: "1.50,1.40,1.30,1.20,1.10,1.00,0.90",
      yesterday_HC: "5",
      yesterday_HP: "6",
      daily_cost: "1.50",
      yearly_evolution: 5,
      monthly_evolution: -3,
      current_month_evolution: 1,
      current_week_evolution: 0,
      yesterday_evolution: 2,
      peak_offpeak_percent: 60,
      current_year: 1234,
      current_year_last_year: 1100,
      current_month: 100,
      current_month_last_year: 95,
      last_month: 110,
      last_month_last_year: 105,
      current_week: 30,
      last_week: 28,
      yesterday: 12,
      day_2: 11,
      errorLastCall: "",
      ...attrs,
    },
  };
}

export async function mountCard(config, hass) {
  await import("../../src/content-card-linky");
  const Card = customElements.get("content-card-linky");
  const el = new Card();
  el.setConfig(config);
  el.hass = hass;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

/**
 * Render a renderer's TemplateResult into a detached container so individual
 * renderer modules can be unit-tested in isolation (without mounting the card).
 * Returns the container element; read `.textContent` or query it.
 */
export function renderTpl(templateResult) {
  const container = document.createElement("div");
  render(templateResult, container);
  return container;
}
