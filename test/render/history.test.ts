// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { makeHass, renderTpl } from "./setup";
import { renderHistory } from "../../src/renderers/history";

const DATES = "2026-05-04,2026-05-05,2026-05-06,2026-05-07,2026-05-08,2026-05-09,2026-05-10";
const MPTIMES = Array(7).fill("2026-05-04T18:30:00").join(",");

function richAttrs(overrides = {}) {
  return {
    daily: ["10", "11", "12", "13", "14", "15", "16"],
    dailyweek: DATES,
    dailyweek_Tempo: "BLUE,WHITE,RED,BLUE,WHITE,RED,BLUE",
    dailyweek_cost: "1,2,3,4,5,6,7",
    dailyweek_costHC: "0.5,0.5,0.5,0.5,0.5,0.5,0.5",
    dailyweek_costHP: "0.5,0.5,0.5,0.5,0.5,0.5,0.5",
    dailyweek_HC: "1,1,1,1,1,1,1",
    dailyweek_HP: "2,2,2,2,2,2,2",
    dailyweek_MP: "3,3,3,3,3,3,3",
    dailyweek_MP_over: "false,false,true,false,false,false,false",
    dailyweek_MP_time: MPTIMES,
    unit_of_measurement: "kWh",
    ...overrides,
  };
}

const fullConfig = {
  showHistory: true,
  showWeekSummary: true,
  showTempoColor: true,
  showTitleLign: true,
  showDayPrice: true,
  showDayPriceHCHP: true,
  showDayHCHP: true,
  showDayMaxPower: true,
  showInTableUnit: true,
  showDayName: "long",
  nbJoursAffichage: "7",
  entity: "sensor.x",
};

function hassWith(attrs) {
  return makeHass({ states: { "sensor.x": { attributes: attrs } } });
}

describe("renderHistory guards", () => {
  it("returns undefined when history is disabled", () => {
    const el = renderTpl(renderHistory(makeHass(), { showHistory: false }, richAttrs()));
    expect(el.textContent.trim()).toBe("");
  });

  it("returns undefined when dailyweek is absent", () => {
    const el = renderTpl(renderHistory(makeHass(), { showHistory: true }, { daily: ["1"] }));
    expect(el.textContent.trim()).toBe("");
  });

  it("returns undefined when daily is absent but dailyweek is present", () => {
    const el = renderTpl(
      renderHistory(makeHass(), { showHistory: true }, { dailyweek: "2026-05-04,2026-05-05,2026-05-06" }),
    );
    expect(el.textContent.trim()).toBe("");
  });

  it("caps the number of days to nbJoursAffichage", () => {
    const attrs = richAttrs();
    const el = renderTpl(renderHistory(hassWith(attrs), { ...fullConfig, nbJoursAffichage: "3" }, attrs));
    // 3 day cells + 1 title row
    expect(el.querySelectorAll(".week-history > .day").length).toBe(4);
  });
});

describe("renderHistory full render", () => {
  it("renders day cells, tempo colours, column titles and max-power", () => {
    const attrs = richAttrs();
    const el = renderTpl(renderHistory(hassWith(attrs), fullConfig, attrs));
    expect(el.querySelector(".week-history")).toBeTruthy();
    // Tempo day colour classes
    expect(el.querySelector(".tempoday-blue")).toBeTruthy();
    expect(el.querySelector(".tempoday-red")).toBeTruthy();
    // Localized column titles
    expect(el.textContent).toMatch(/Conso/);
    expect(el.textContent).toMatch(/Prix HC/);
    // Max-power over-limit day is rendered in the theme error colour + formatted time
    expect(el.innerHTML).toMatch(/color:\s*var\(--error-color, red\)/);
    expect(el.textContent).toMatch(/18:30/);
  });

  it("renders grey tempo days when tempo colouring is off", () => {
    const attrs = richAttrs();
    const el = renderTpl(renderHistory(hassWith(attrs), { ...fullConfig, showTempoColor: false }, attrs));
    expect(el.querySelector(".tempoday-grey")).toBeTruthy();
    expect(el.querySelector(".tempoday-blue")).toBeFalsy();
  });

  it("falls back to tempo entity auto-detection when no per-day colour is provided", () => {
    const attrs = richAttrs({ dailyweek_Tempo: undefined });
    const hass = makeHass({
      states: {
        "sensor.x": { attributes: attrs },
        "sensor.rte_tempo_today": { state: "BLUE", attributes: {} },
        "sensor.rte_tempo_tomorrow": { state: "RED", attributes: {} },
      },
    });
    // Auto-detection runs (past dates won't match today/tomorrow → grey), exercising findTempoEntities.
    const el = renderTpl(renderHistory(hass, fullConfig, attrs));
    expect(el.querySelector(".week-history")).toBeTruthy();
  });

  it("colours today and tomorrow from auto-detected tempo entities", () => {
    const pad = (n) => String(n).padStart(2, "0");
    const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    // dailyweek's first two entries are today & tomorrow; remaining days padded.
    const dates = [iso(today), iso(tomorrow), "2026-01-03", "2026-01-04", "2026-01-05", "2026-01-06", "2026-01-07"];
    const attrs = richAttrs({ dailyweek: dates.join(","), dailyweek_Tempo: undefined });
    const hass = makeHass({
      states: {
        "sensor.x": { attributes: attrs },
        "sensor.rte_tempo_today": { state: "BLUE", attributes: {} },
        "sensor.rte_tempo_tomorrow": { state: "RED", attributes: {} },
      },
    });
    const el = renderTpl(renderHistory(hass, fullConfig, attrs));
    expect(el.querySelector(".tempoday-blue")).toBeTruthy(); // today
    expect(el.querySelector(".tempoday-red")).toBeTruthy(); // tomorrow
  });

  it("hides the max-power time when showDayMaxPowerTime is false", () => {
    const attrs = richAttrs(); // dailyweek_MP "3,3,..."; MP_time 18:30
    const el = renderTpl(renderHistory(hassWith(attrs), { ...fullConfig, showDayMaxPowerTime: false }, attrs));
    expect(el.textContent).not.toMatch(/18:30/); // time hidden
    expect(el.textContent).toContain("3.00"); // max-power value still shown
  });

  it("respects the HA locale for weekday names (EN)", () => {
    const attrs = richAttrs();
    const enHass = makeHass({ locale: { language: "en" }, states: { "sensor.x": { attributes: attrs } } });
    const el = renderTpl(renderHistory(enHass, fullConfig, attrs));
    expect(el.textContent).toMatch(/Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/);
  });
});

describe("renderHistory cell fallbacks", () => {
  it("shows the no-data marker for a -1 price entry", () => {
    const attrs = richAttrs({ dailyweek_cost: "-1,-1,-1,-1,-1,-1,-1" });
    const el = renderTpl(renderHistory(hassWith(attrs), { ...fullConfig, showTitleLign: false }, attrs));
    expect(el.innerHTML).toContain("mdi:alert-outline");
    expect(el.innerHTML).toMatch(/Donnée indisponible/);
  });

  it("shows the pending marker for a zero day with no cost data", () => {
    const attrs = richAttrs({ daily: ["0", "0", "0", "0", "0", "0", "0"], dailyweek_cost: undefined });
    const el = renderTpl(
      renderHistory(hassWith(attrs), { showHistory: true, nbJoursAffichage: "7", entity: "sensor.x" }, attrs),
    );
    expect(el.querySelector(".cons-val.pending")).toBeTruthy();
    expect(el.innerHTML).toMatch(/en attente/);
  });

  it("shows an estimate for a zero day when a price and ratios are available", () => {
    const attrs = richAttrs({ daily: ["10", "0", "12", "13", "14", "15", "16"] });
    const el = renderTpl(
      renderHistory(hassWith(attrs), { showHistory: true, nbJoursAffichage: "7", entity: "sensor.x" }, attrs),
    );
    expect(el.querySelector(".cons-val.estimated")).toBeTruthy();
  });

  it("uses kWhPrice to compute the price column when showDayPrice is off", () => {
    const attrs = richAttrs(); // daily: ["10",..,"16"]
    const el = renderTpl(
      renderHistory(
        hassWith(attrs),
        { showHistory: true, nbJoursAffichage: "7", entity: "sensor.x", showDayPrice: false, kWhPrice: 0.2 },
        attrs,
      ),
    );
    // Real computed prices (kWh * 0.2), NOT the "– €" the old bug produced.
    expect(el.innerHTML).toContain("2.00 €"); // 10 kWh * 0.2
    expect(el.innerHTML).toContain("3.20 €"); // 16 kWh * 0.2
    expect(el.innerHTML).not.toContain("– €"); // regression guard
  });

  it("shows no-data in the kWhPrice column for a missing-kWh day", () => {
    const attrs = richAttrs({ daily: ["0", "11", "12", "13", "14", "15", "16"] });
    const el = renderTpl(
      renderHistory(
        hassWith(attrs),
        { showHistory: true, nbJoursAffichage: "7", entity: "sensor.x", showDayPrice: false, kWhPrice: 0.2 },
        attrs,
      ),
    );
    expect(el.innerHTML).toContain("mdi:alert-outline"); // no-data marker for the 0 day
  });

  it("falls back to no-data when an estimate cannot be computed (zero ratios)", () => {
    // Every day is zero → a valid price exists but no kWh/€ ratio can be built,
    // so the estimate is 0 and the cell shows the no-data marker.
    const attrs = richAttrs({ daily: ["0", "0", "0", "0", "0", "0", "0"] });
    const el = renderTpl(
      renderHistory(hassWith(attrs), { showHistory: true, nbJoursAffichage: "7", entity: "sensor.x" }, attrs),
    );
    expect(el.innerHTML).toContain("mdi:alert-outline");
  });

  it("shows no-data markers for -1 entries across HC/HP/max-power columns", () => {
    const attrs = richAttrs({
      dailyweek_costHC: "-1,-1,-1,-1,-1,-1,-1",
      dailyweek_costHP: "-1,-1,-1,-1,-1,-1,-1",
      dailyweek_HC: "-1,-1,-1,-1,-1,-1,-1",
      dailyweek_HP: "-1,-1,-1,-1,-1,-1,-1",
      dailyweek_MP: "-1,-1,-1,-1,-1,-1,-1",
    });
    const el = renderTpl(
      renderHistory(
        hassWith(attrs),
        {
          showHistory: true,
          nbJoursAffichage: "7",
          entity: "sensor.x",
          showDayPriceHCHP: true,
          showDayHCHP: true,
          showDayMaxPower: true,
        },
        attrs,
      ),
    );
    expect(el.querySelectorAll("ha-icon[icon='mdi:alert-outline']").length).toBeGreaterThan(1);
  });
});
