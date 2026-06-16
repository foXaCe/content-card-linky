// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { makeHass, makeLinkyEntity, renderTpl } from "./setup.js";
import { renderSmartInsights } from "../../src/renderers/smart-insights.js";

describe("renderSmartInsights", () => {
  it("renders prediction + localized trend labels from the entity", () => {
    const hass = makeHass({
      states: {
        "sensor.x": makeLinkyEntity({
          current_month: 100,
          current_week_evolution: -5,
          monthly_evolution: 3,
          yearly_evolution: -2,
        }),
      },
    });
    const el = renderTpl(renderSmartInsights(hass, { entity: "sensor.x" }, ["1", "2"], ["0.5", "0.6"]));
    expect(el.textContent).toMatch(/Prédiction mensuelle/);
    expect(el.textContent).toMatch(/vs semaine dernière/);
    expect(el.textContent).toMatch(/vs mois dernier/);
    expect(el.textContent).toMatch(/vs année dernière/);
    // A good (negative) weekly trend uses the trending-down icon, a bad one trending-up
    expect(el.innerHTML).toContain("mdi:trending-down"); // weekly -5
    expect(el.innerHTML).toContain("mdi:trending-up"); // monthly +3
  });

  it("predicts from weekly totals when the entity has no current_month", () => {
    const hass = makeHass({ states: {} }); // entity absent → attributes default to {}
    const el = renderTpl(
      renderSmartInsights(hass, { entity: "sensor.missing" }, ["7", "7", "7", "7", "7", "7", "7"], ["1"]),
    );
    expect(el.querySelector(".smart-insights")).toBeTruthy();
    // 49 kWh over 7 days → (49/7)*30 = 210
    expect(el.textContent).toMatch(/210/);
  });

  it("handles missing week arrays gracefully", () => {
    const hass = makeHass({ states: {} });
    const el = renderTpl(renderSmartInsights(hass, { entity: "sensor.missing" }, undefined, undefined));
    expect(el.querySelector(".smart-insights")).toBeTruthy();
  });
});
