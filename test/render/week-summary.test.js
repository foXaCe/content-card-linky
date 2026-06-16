// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { makeHass, renderTpl } from "./setup.js";
import { renderWeekSummary } from "../../src/renderers/week-summary.js";

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
});
