// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { makeHass, renderTpl } from "./setup";
import { renderVariations } from "../../src/renderers/variations";

const hass = makeHass();
const attrs = {
  yearly_evolution: 5,
  monthly_evolution: -3,
  current_month_evolution: 0,
  current_week_evolution: 2,
  yesterday_evolution: -1,
  peak_offpeak_percent: 60,
  current_year: 1234,
  current_year_last_year: 1100,
  last_month: 110,
  last_month_last_year: 105,
  current_month: 100,
  current_month_last_year: 95,
  last_week: 28,
  current_week: 30,
  day_2: 11,
  yesterday: 12,
};

const allOn = {
  showYearRatio: true,
  showMonthRatio: true,
  showCurrentMonthRatio: true,
  showWeekRatio: true,
  showYesterdayRatio: true,
  showPeakOffPeak: true,
};

describe("renderVariations", () => {
  it("renders one tile per enabled ratio (6 tiles)", () => {
    const el = renderTpl(renderVariations(hass, allOn, attrs));
    expect(el.querySelectorAll(".variations-linky").length).toBe(6);
  });

  it("renders no tiles when everything is disabled", () => {
    const el = renderTpl(renderVariations(hass, {}, attrs));
    expect(el.querySelector(".variations")).toBeTruthy();
    expect(el.querySelectorAll(".variations-linky").length).toBe(0);
  });

  it("localizes aria labels and tooltips (FR)", () => {
    const el = renderTpl(renderVariations(hass, allOn, attrs));
    expect(el.innerHTML).toMatch(/Évolution annuelle : 5 %/);
    expect(el.textContent).toMatch(/A-1 : 1100/);
    expect(el.textContent).toMatch(/Mois précédent A-1 : 105/);
    expect(el.textContent).toMatch(/Semaine dernière : 28/);
    expect(el.textContent).toMatch(/Avant-hier : 11/);
  });

  it("applies sign classes (positive/negative/neutral)", () => {
    const el = renderTpl(renderVariations(hass, allOn, attrs));
    expect(el.querySelector(".percentage-positive")).toBeTruthy(); // yearly +5
    expect(el.querySelector(".percentage-negative")).toBeTruthy(); // monthly -3
    expect(el.querySelector(".percentage-neutral")).toBeTruthy(); // current month 0
  });

  it("renders the localized peak/off-peak tile", () => {
    const el = renderTpl(renderVariations(hass, { showPeakOffPeak: true }, attrs));
    expect(el.textContent).toMatch(/60/);
    expect(el.textContent).toMatch(/% HP/);
  });

  it("respects the HA locale for the year tooltip (EN)", () => {
    const enHass = makeHass({ locale: { language: "en" } });
    const el = renderTpl(renderVariations(enHass, allOn, attrs));
    expect(el.innerHTML).toMatch(/Yearly trend: 5%/);
  });

  it.each([
    ["all positive", 5, "percentage-positive"],
    ["all negative", -5, "percentage-negative"],
    ["all zero", 0, "percentage-neutral"],
  ])("covers the %s sign/rotation branches of every tile", (_label, v, cls) => {
    const signed = {
      yearly_evolution: v,
      monthly_evolution: v,
      current_month_evolution: v,
      current_week_evolution: v,
      yesterday_evolution: v,
      peak_offpeak_percent: 60,
    };
    const el = renderTpl(renderVariations(hass, allOn, signed));
    expect(el.querySelectorAll(`.${cls}`).length).toBe(5);
  });
});
