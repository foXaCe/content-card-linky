// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { makeHass, renderTpl } from "./setup";
import { renderWeekSummary } from "../../src/renderers/week-summary";

const hass = makeHass();
const attrs = {
  daily: ["10", "11", "12", "13", "14", "15", "16"],
  unit_of_measurement: "kWh",
  dailyweek_cost: "1.50,1.40,1.30,1.20,1.10,1.00,0.90",
};

describe("renderWeekSummary", () => {
  it("renders the summary card with title and unit when enabled", () => {
    const el = renderTpl(renderWeekSummary(hass, { showWeekSummary: true }, attrs));
    expect(el.querySelector(".week-summary-card")).toBeTruthy();
    expect(el.textContent).toMatch(/Semaine en cours/);
    expect(el.textContent).toContain("kWh");
  });

  it("renders by default when showWeekSummary is undefined", () => {
    const el = renderTpl(renderWeekSummary(hass, {}, attrs));
    expect(el.querySelector(".week-summary-card")).toBeTruthy();
  });

  it("renders nothing when explicitly disabled", () => {
    const el = renderTpl(renderWeekSummary(hass, { showWeekSummary: false }, attrs));
    expect(el.textContent.trim()).toBe("");
  });

  it("shows the cost block on a Thursday (Mon..Wed cost > 0) — fixed clock", () => {
    const thursday = new Date("2026-05-07T12:00:00");
    const a = { ...attrs, dailyweek_cost: "999,1,2,3,4,5,6" };
    const el = renderTpl(renderWeekSummary(hass, { showWeekSummary: true }, a, thursday));
    expect(el.querySelector(".week-summary-cost")).toBeTruthy();
  });

  it("omits the cost block on a Monday (no completed weekdays) — fixed clock", () => {
    const monday = new Date("2026-05-04T12:00:00");
    const a = { ...attrs, dailyweek_cost: "999,1,2,3,4,5,6" };
    const el = renderTpl(renderWeekSummary(hass, { showWeekSummary: true }, a, monday));
    expect(el.querySelector(".week-summary-cost")).toBeFalsy();
  });
});
