// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { makeHass, renderTpl } from "./setup";
import { renderTitle, renderIcon, renderPrice, renderHeader, renderProductionValue } from "../../src/renderers/header";

const hass = makeHass();
const attrs = {
  unit_of_measurement: "kWh",
  yesterday_HC: "5",
  yesterday_HP: "6",
  daily_cost: "1.50",
};

describe("renderTitle", () => {
  it("renders the title when enabled", () => {
    const el = renderTpl(renderTitle({ showTitle: true, titleName: "MON LINKY" }));
    expect(el.textContent).toContain("MON LINKY");
  });
  it("renders nothing when disabled", () => {
    const el = renderTpl(renderTitle({ showTitle: false, titleName: "X" }));
    expect(el.textContent.trim()).toBe("");
  });
});

describe("renderIcon", () => {
  it("renders the icon block when enabled", () => {
    const el = renderTpl(renderIcon({ showIcon: true }));
    expect(el.querySelector(".linky-icon")).toBeTruthy();
  });
  it("renders nothing when disabled", () => {
    const el = renderTpl(renderIcon({ showIcon: false }));
    expect(el.querySelector(".linky-icon")).toBeFalsy();
  });
});

describe("renderPrice", () => {
  it("renders the daily cost when enabled", () => {
    const el = renderTpl(renderPrice(hass, { showPrice: true }, attrs));
    expect(el.textContent).toContain("1.50");
    expect(el.textContent).toContain("€");
  });
  it("renders nothing when disabled", () => {
    const el = renderTpl(renderPrice(hass, { showPrice: false }, attrs));
    expect(el.textContent.trim()).toBe("");
  });
});

describe("renderHeader", () => {
  it("shows HC/HP split when showPeakOffPeak is on", () => {
    const el = renderTpl(
      renderHeader(hass, { showHeader: true, showPeakOffPeak: true, showPrice: true }, attrs, { state: "12.5" }),
    );
    expect(el.textContent).toContain("5");
    expect(el.textContent).toContain("6");
    expect(el.textContent).toMatch(/en HC/);
    expect(el.textContent).toMatch(/en HP/);
  });

  it("shows the single main value when showPeakOffPeak is off", () => {
    const el = renderTpl(
      renderHeader(hass, { showHeader: true, showPeakOffPeak: false, showPrice: false }, attrs, { state: "12.5" }),
    );
    expect(el.textContent).toContain("12.5");
    expect(el.textContent).not.toMatch(/en HC/);
  });

  it("renders nothing when the header is disabled", () => {
    const el = renderTpl(renderHeader(hass, { showHeader: false }, attrs, { state: "12.5" }));
    expect(el.textContent.trim()).toBe("");
  });
});

describe("renderProductionValue", () => {
  it("renders a valid production value", () => {
    const el = renderTpl(renderProductionValue(hass, "8.4", { unit_of_measurement: "kWh" }));
    expect(el.textContent).toContain("8.4");
    expect(el.textContent).toContain("kWh");
  });

  it("renders an estimate when value is missing but a price exists", () => {
    const el = renderTpl(
      renderProductionValue(hass, "0", {
        unit_of_measurement: "kWh",
        daily: ["10", "20"],
        dailyweek_cost: "1,2",
      }),
    );
    expect(el.querySelector(".cout.estimated")).toBeTruthy();
  });

  it("renders the pending state when neither value nor price is available", () => {
    const el = renderTpl(
      renderProductionValue(hass, "0", {
        unit_of_measurement: "kWh",
        daily: ["0"],
        dailyweek_cost: "-1",
      }),
    );
    expect(el.querySelector(".cout.pending")).toBeTruthy();
  });

  it("renders the pending state when there is no price data at all", () => {
    const el = renderTpl(renderProductionValue(hass, "0", { unit_of_measurement: "kWh" }));
    expect(el.querySelector(".cout.pending")).toBeTruthy();
  });

  it("falls through to the plain value when a price exists but the estimate is zero", () => {
    // recentPrice > 0 but every day is zero → estimate 0 → no estimated/pending branch taken.
    const el = renderTpl(
      renderProductionValue(hass, "0", {
        unit_of_measurement: "kWh",
        daily: ["0", "0"],
        dailyweek_cost: "1,2",
      }),
    );
    expect(el.querySelector(".cout.estimated")).toBeFalsy();
    expect(el.querySelector(".cout.pending")).toBeFalsy();
    expect(el.textContent).toContain("kWh");
  });
});
