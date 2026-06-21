// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { makeHass, renderTpl } from "./setup";
import { renderSmartInsights } from "../../src/renderers/smart-insights";

const NOW = new Date(2026, 4, 15); // 15 May 2026, Friday

describe("renderSmartInsights", () => {
  it("predicts the month from current_month + the injected clock", () => {
    const attrs = {
      current_month: 100, // (100 / 15) * 31 = 206.67 -> "207"
      daily: ["7", "7", "7", "7", "7", "7", "7"],
      dailyweek_cost: "1,1,1,1,1,1,1", // weekCost Mon..yesterday = 4 -> (4/7)*30 = "17"
      current_week_evolution: -5,
      monthly_evolution: 3,
      yearly_evolution: -2,
    };
    const el = renderTpl(renderSmartInsights(makeHass(), { entity: "sensor.x" }, attrs, NOW));
    expect(el.textContent).toContain("207 kWh");
    expect(el.textContent).toContain("17€");
    expect(el.textContent).not.toContain("0€");
    expect(el.textContent).not.toMatch(/NaN/);
    // localized trend labels + icons still render
    expect(el.textContent).toMatch(/Prédiction mensuelle/);
    expect(el.innerHTML).toContain("mdi:trending-down"); // weekly -5
    expect(el.innerHTML).toContain("mdi:trending-up"); // monthly +3
  });

  it("falls back to the daily kWh series (not dailyweek dates) when current_month is absent", () => {
    const attrs = {
      // no current_month
      daily: ["7", "7", "7", "7", "7", "7", "7"], // calculateWeekTotal = 28 -> (28/7)*30 = "120"
      dailyweek: ["99/99", "99/99", "99/99", "99/99", "99/99", "99/99", "99/99"], // garbage dates: MUST be ignored
      dailyweek_cost: "1,1,1,1,1,1,1",
    };
    const el = renderTpl(renderSmartInsights(makeHass(), { entity: "sensor.x" }, attrs, NOW));
    expect(el.textContent).toContain("120 kWh"); // proves it reads `daily`, not `dailyweek`
  });

  it("handles missing arrays gracefully (no crash, no NaN)", () => {
    const el = renderTpl(renderSmartInsights(makeHass(), { entity: "sensor.x" }, {}, NOW));
    expect(el.querySelector(".smart-insights")).toBeTruthy();
    expect(el.textContent).not.toMatch(/NaN/);
    expect(el.textContent).toContain("0 kWh");
  });
});
