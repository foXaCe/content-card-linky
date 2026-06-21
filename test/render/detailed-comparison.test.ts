// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { makeHass, renderTpl } from "./setup";
import { renderDetailedComparison } from "../../src/renderers/detailed-comparison";

const noop = () => {};
const unit = { unit_of_measurement: "kWh" };

function pad(n) {
  return String(n).padStart(2, "0");
}
function tsFmt(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}
function ddmm(d) {
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
}

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0);
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

describe("renderDetailedComparison", () => {
  it("renders nothing when disabled or without an entity", () => {
    expect(
      renderTpl(
        renderDetailedComparison(makeHass(), { showDetailedComparison: false }, unit, false, noop),
      ).textContent.trim(),
    ).toBe("");
    expect(
      renderTpl(
        renderDetailedComparison(makeHass(), { showDetailedComparison: true }, unit, false, noop),
      ).textContent.trim(),
    ).toBe("");
  });

  it("reports an unknown entity", () => {
    const el = renderTpl(
      renderDetailedComparison(
        makeHass(),
        { showDetailedComparison: true, detailedComparisonEntity: "sensor.missing" },
        unit,
        false,
        noop,
      ),
    );
    expect(el.textContent).toMatch(/sensor\.missing/);
    expect(el.textContent).toMatch(/introuvable/);
  });

  it("reports available attributes when neither format is present", () => {
    const hass = makeHass({ states: { "sensor.d": { attributes: { foo: 1, bar: 2 } } } });
    const el = renderTpl(
      renderDetailedComparison(
        hass,
        { showDetailedComparison: true, detailedComparisonEntity: "sensor.d" },
        unit,
        false,
        noop,
      ),
    );
    expect(el.textContent).toMatch(/Attributs disponibles/);
    expect(el.textContent).toMatch(/foo/);
  });

  it("renders the time-series comparison (modern last5day format)", () => {
    const hass = makeHass({
      states: {
        "sensor.d": {
          attributes: {
            unit_of_measurement: "kWh",
            time: [
              tsFmt(yesterday),
              tsFmt(new Date(yesterday.getTime() + 3600000)),
              tsFmt(today),
              tsFmt(new Date(today.getTime() + 3600000)),
            ],
            consumption: [200, 300, 400, 500],
          },
        },
      },
    });
    const el = renderTpl(
      renderDetailedComparison(
        hass,
        { showDetailedComparison: true, detailedComparisonEntity: "sensor.d" },
        unit,
        true,
        noop,
      ),
    );
    expect(el.textContent).toMatch(/Aujourd'hui vs Hier/);
    expect(el.textContent).toMatch(/Aujourd'hui/);
    expect(el.textContent).toMatch(/Hier/);
    expect(el.textContent).toMatch(/Évolution/);
    expect(el.textContent).toMatch(/Différence/);
    expect(el.querySelector(".comparison-charts")).toBeTruthy();
  });

  it("marks the trend as stable when today equals yesterday", () => {
    const hass = makeHass({
      states: {
        "sensor.d": {
          attributes: {
            unit_of_measurement: "kWh",
            time: [tsFmt(yesterday), tsFmt(today)],
            consumption: [400, 400],
          },
        },
      },
    });
    const el = renderTpl(
      renderDetailedComparison(
        hass,
        { showDetailedComparison: true, detailedComparisonEntity: "sensor.d" },
        unit,
        true,
        noop,
      ),
    );
    expect(el.querySelector(".stat-item.evolution.stable")).toBeTruthy();
  });

  it("renders the legacy Daily/Dailyweek comparison", () => {
    const hass = makeHass({
      states: {
        "sensor.d": {
          attributes: {
            Daily: "1000,2000",
            Dailyweek: `${ddmm(today)},${ddmm(yesterday)}`,
          },
        },
      },
    });
    const el = renderTpl(
      renderDetailedComparison(
        hass,
        { showDetailedComparison: true, detailedComparisonEntity: "sensor.d" },
        unit,
        true,
        noop,
      ),
    );
    expect(el.textContent).toMatch(/Aujourd'hui vs Hier/);
    expect(el.querySelector(".comparison-stats")).toBeTruthy();
  });
});
