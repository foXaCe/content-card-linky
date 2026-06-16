// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { makeHass, makeLinkyEntity, mountCard } from "./setup.js";

beforeEach(() => {
  document.body.innerHTML = "";
});

const baseConfig = {
  type: "custom:content-card-linky",
  entity: "sensor.linky_consumption",
  titleName: "LINKY",
};

describe("content-card-linky render", () => {
  it("registers as a custom element", async () => {
    await import("../../src/content-card-linky.js");
    expect(customElements.get("content-card-linky")).toBeDefined();
  });

  it("getCardSize is dynamic and grows with enabled sections", async () => {
    const hass = makeHass({ states: { [baseConfig.entity]: makeLinkyEntity() } });
    const minimal = await mountCard(
      {
        ...baseConfig,
        showHistory: false,
        showSmartInsights: false,
        showMonthlyView: false,
        showYearlyView: false,
        showDetailedComparison: false,
        showEcoWatt: false,
        showEcoWattJ12: false,
        showTempo: false,
      },
      hass,
    );
    const full = await mountCard(
      {
        ...baseConfig,
        showHistory: true,
        showSmartInsights: true,
        showMonthlyView: true,
        showYearlyView: true,
        showDetailedComparison: true,
      },
      hass,
    );
    expect(minimal.getCardSize()).toBeGreaterThanOrEqual(2);
    expect(full.getCardSize()).toBeGreaterThan(minimal.getCardSize());
  });

  it("getGridOptions and getLayoutOptions return sensible bounds", async () => {
    const hass = makeHass({ states: { [baseConfig.entity]: makeLinkyEntity() } });
    const card = await mountCard(baseConfig, hass);
    const grid = card.getGridOptions();
    expect(grid.columns).toBe(12);
    expect(grid.min_columns).toBeLessThanOrEqual(grid.columns);
    expect(grid.rows).toBeGreaterThanOrEqual(grid.min_rows);

    const layout = card.getLayoutOptions();
    expect(layout.grid_columns).toBeGreaterThanOrEqual(layout.grid_min_columns);
    expect(layout.grid_rows).toBeGreaterThanOrEqual(layout.grid_min_rows);
  });

  it("renders the localized 'data unavailable' message when entity is missing", async () => {
    const hass = makeHass({ states: {} }); // no states → entity introuvable
    const card = await mountCard(baseConfig, hass);
    const text = card.shadowRoot.textContent;
    expect(text).toMatch(/Linky\s*:\s*données inaccessibles/);
    expect(text).toContain("sensor.linky_consumption");
  });

  it("orchestrates every section when fully configured (post-split smoke test)", async () => {
    const hass = makeHass({ states: { [baseConfig.entity]: makeLinkyEntity() } });
    const card = await mountCard(
      {
        ...baseConfig,
        showHistory: true,
        showWeekSummary: true,
        showSmartInsights: true,
        showMonthlyView: true,
        showYearlyView: true,
        showCurrentMonthRatio: true,
        showPeakOffPeak: true,
      },
      hass,
    );
    const root = card.shadowRoot;
    const text = root.textContent;

    // Variations grid (renderers/variations.js)
    expect(root.querySelector(".variations")).toBeTruthy();
    // Week summary card (renderers/week-summary.js)
    expect(root.querySelector(".week-summary-card")).toBeTruthy();
    expect(text).toMatch(/Semaine en cours/);
    // History table with at least one day cell (renderers/history.js)
    expect(root.querySelectorAll(".week-history .day").length).toBeGreaterThan(0);
    // Smart insights (renderers/smart-insights.js)
    expect(text).toMatch(/Prédiction mensuelle/);
    // Collapsible temporal views (renderers/temporal-views.js)
    expect(text).toMatch(/Mensuel/);
    expect(text).toMatch(/Annuel/);
  });

  it("renders the production layout for a production meter", async () => {
    const hass = makeHass({
      states: {
        [baseConfig.entity]: makeLinkyEntity({ typeCompteur: "production" }),
      },
    });
    const card = await mountCard({ ...baseConfig, showIcon: true }, hass);
    const root = card.shadowRoot;
    // Production branch shows the main value, no week-history table
    expect(root.querySelector(".main-info")).toBeTruthy();
    expect(root.querySelector(".week-history")).toBeFalsy();
  });

  it("renders the consumption header for a normal entity", async () => {
    const hass = makeHass({ states: { [baseConfig.entity]: makeLinkyEntity() } });
    const card = await mountCard(baseConfig, hass);
    const text = card.shadowRoot.textContent;
    // Default config: showPeakOffPeak=true, showHeader=true
    // → header shows yesterday HC/HP values
    expect(text).toContain("5"); // yesterday_HC
    expect(text).toContain("6"); // yesterday_HP
    expect(text).toMatch(/en HC/);
    expect(text).toMatch(/en HP/);
  });

  it("respects locale fallback (English)", async () => {
    const hass = makeHass({
      locale: { language: "en" },
      states: {},
    });
    const card = await mountCard(baseConfig, hass);
    const text = card.shadowRoot.textContent;
    expect(text).toMatch(/Linky:\s*data unavailable/);
  });

  it("getStubConfig auto-detects a Linky-like sensor", async () => {
    await import("../../src/content-card-linky.js");
    const Card = customElements.get("content-card-linky");
    const hass = makeHass({
      states: {
        "sensor.weather": { attributes: {} },
        "sensor.linky_42_consumption": { attributes: { typeCompteur: "consommation" } },
      },
    });
    const stub = await Card.getStubConfig(hass);
    expect(stub.entity).toBe("sensor.linky_42_consumption");
  });

  it("getStubConfig falls back when no candidate exists", async () => {
    await import("../../src/content-card-linky.js");
    const Card = customElements.get("content-card-linky");
    const stub = await Card.getStubConfig(makeHass({ states: {} }));
    expect(stub.entity).toBe("sensor.linky_consumption");
  });

  it("setConfig throws without an entity", async () => {
    await import("../../src/content-card-linky.js");
    const Card = customElements.get("content-card-linky");
    const card = new Card();
    expect(() => card.setConfig({})).toThrow(/entity/i);
  });

  it("setConfig validates kWhPrice and merges defaults", async () => {
    await import("../../src/content-card-linky.js");
    const Card = customElements.get("content-card-linky");
    const card = new Card();
    expect(() => card.setConfig({ entity: "sensor.x", kWhPrice: "abc" })).toThrow(/kWhPrice/);
    card.setConfig({ entity: "sensor.x", kWhPrice: 0.15 });
    expect(card.config.kWhPrice).toBe(0.15);
    expect(card.config.showHistory).toBe(true); // default merged in
  });

  it("toggle handlers flip their expansion state and stop event propagation", async () => {
    const hass = makeHass({ states: { [baseConfig.entity]: makeLinkyEntity() } });
    const card = await mountCard(baseConfig, hass);
    let stopped = 0;
    const ev = () => ({ stopPropagation: () => stopped++, preventDefault: () => {} });
    expect(card._monthlyExpanded).toBe(false);
    card.toggleMonthlyView(ev());
    expect(card._monthlyExpanded).toBe(true);
    card.toggleYearlyView(ev());
    expect(card._yearlyExpanded).toBe(true);
    card.toggleDetailedComparison(ev());
    expect(card._detailedExpanded).toBe(true);
    expect(stopped).toBe(3);
  });

  it("renders an empty template before hass is available", async () => {
    await import("../../src/content-card-linky.js");
    const Card = customElements.get("content-card-linky");
    const card = new Card();
    card.setConfig(baseConfig);
    const el = document.createElement("div");
    const { render } = await import("lit");
    render(card.render(), el);
    expect(el.textContent.trim()).toBe("");
  });

  it("renders the consumption layout when typeCompteur is absent", async () => {
    const entity = makeLinkyEntity();
    delete entity.attributes.typeCompteur;
    const hass = makeHass({ states: { [baseConfig.entity]: entity } });
    const card = await mountCard(baseConfig, hass);
    expect(card.shadowRoot.querySelector("ha-card")).toBeTruthy();
  });

  it("renders the production layout without the icon when showIcon is off", async () => {
    const hass = makeHass({
      states: { [baseConfig.entity]: makeLinkyEntity({ typeCompteur: "production" }) },
    });
    const card = await mountCard({ ...baseConfig, showIcon: false }, hass);
    expect(card.shadowRoot.querySelector(".main-info")).toBeTruthy();
    expect(card.shadowRoot.querySelector(".linky-icon")).toBeFalsy();
  });

  it("renders nothing for an unknown meter type", async () => {
    const hass = makeHass({
      states: { [baseConfig.entity]: makeLinkyEntity({ typeCompteur: "autre" }) },
    });
    const card = await mountCard(baseConfig, hass);
    expect(card.shadowRoot.querySelector("ha-card")).toBeFalsy();
  });

  it("expands the monthly/yearly sections when their headers are clicked", async () => {
    const hass = makeHass({ states: { [baseConfig.entity]: makeLinkyEntity() } });
    const card = await mountCard({ ...baseConfig, showMonthlyView: true, showYearlyView: true }, hass);
    const headers = card.shadowRoot.querySelectorAll(".collapsible-header");
    expect(headers.length).toBeGreaterThanOrEqual(2);
    headers[0].click();
    await card.updateComplete;
    expect(card._monthlyExpanded).toBe(true);
    headers[1].click();
    await card.updateComplete;
    expect(card._yearlyExpanded).toBe(true);
  });

  it("omits smart insights when disabled", async () => {
    const hass = makeHass({ states: { [baseConfig.entity]: makeLinkyEntity() } });
    const card = await mountCard({ ...baseConfig, showSmartInsights: false }, hass);
    expect(card.shadowRoot.querySelector(".smart-insights")).toBeFalsy();
  });

  it("shouldUpdate fires on config or watched-entity changes only", async () => {
    await import("../../src/content-card-linky.js");
    const Card = customElements.get("content-card-linky");
    const card = new Card();
    card.setConfig(baseConfig);

    // config changed → always re-render
    expect(card.shouldUpdate(new Map([["config", {}]]))).toBe(true);
    // no previous hass → re-render
    card.hass = makeHass({ states: { [baseConfig.entity]: makeLinkyEntity() } });
    expect(card.shouldUpdate(new Map([["hass", undefined]]))).toBe(true);

    // watched entity changed between old and new hass → re-render
    const oldHass = makeHass({ states: { [baseConfig.entity]: makeLinkyEntity() } });
    expect(card.shouldUpdate(new Map([["hass", oldHass]]))).toBe(true);

    // identical state object → skip
    const same = makeLinkyEntity();
    card.hass = makeHass({ states: { [baseConfig.entity]: same } });
    const old2 = makeHass({ states: { [baseConfig.entity]: same } });
    expect(card.shouldUpdate(new Map([["hass", old2]]))).toBe(false);
  });

  it("getConfigElement lazily loads the editor element", async () => {
    await import("../../src/content-card-linky.js");
    const Card = customElements.get("content-card-linky");
    const editor = await Card.getConfigElement();
    expect(editor.tagName.toLowerCase()).toBe("content-card-linky-editor");
  });

  it("fires hass-more-info when the card is clicked", async () => {
    const hass = makeHass({ states: { [baseConfig.entity]: makeLinkyEntity() } });
    const card = await mountCard(baseConfig, hass);
    let detail;
    card.addEventListener("hass-more-info", (e) => {
      detail = e.detail;
    });
    card.shadowRoot.querySelector("ha-card").click();
    expect(detail.entityId).toBe(baseConfig.entity);
  });

  it("renders the legacy detailed-comparison fallback when both formats are missing", async () => {
    const hass = makeHass({
      states: {
        [baseConfig.entity]: makeLinkyEntity(),
        "sensor.linky_consumption_last5day": {
          state: "ok",
          attributes: { unit_of_measurement: "kWh", friendly_name: "last5day" },
        },
      },
    });
    const card = await mountCard(
      { ...baseConfig, showDetailedComparison: true, detailedComparisonEntity: "sensor.linky_consumption_last5day" },
      hass,
    );
    const text = card.shadowRoot.textContent;
    expect(text).toMatch(/Attributs disponibles/);
  });

  it("renders the time-series detailed comparison when last5day exposes time/consumption", async () => {
    // Build samples for "today" and "yesterday" relative to the test runtime.
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0);
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const fmt = (d) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(
        d.getHours(),
      ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:00`;

    const hass = makeHass({
      states: {
        [baseConfig.entity]: makeLinkyEntity(),
        "sensor.linky_consumption_last5day": {
          state: "ok",
          attributes: {
            unit_of_measurement: "kWh",
            time: [fmt(yesterday), fmt(today)],
            consumption: [200, 300],
          },
        },
      },
    });
    const card = await mountCard(
      { ...baseConfig, showDetailedComparison: true, detailedComparisonEntity: "sensor.linky_consumption_last5day" },
      hass,
    );
    const text = card.shadowRoot.textContent;
    expect(text).toMatch(/Aujourd'hui vs Hier/);
    expect(text).not.toMatch(/Attributs disponibles/);
  });
});
