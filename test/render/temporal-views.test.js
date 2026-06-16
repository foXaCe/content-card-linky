// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { makeHass, renderTpl } from "./setup.js";
import { renderMonthlyView, renderYearlyView } from "../../src/renderers/temporal-views.js";

const hass = makeHass();
const noop = () => {};

describe("renderMonthlyView", () => {
  it("renders nothing when disabled", () => {
    const el = renderTpl(renderMonthlyView(hass, { showMonthlyView: false }, {}, false, noop));
    expect(el.textContent.trim()).toBe("");
  });

  it("renders localized month rows with an evolution badge", () => {
    const attrs = {
      unit_of_measurement: "kWh",
      current_month: "100",
      last_month: "110",
      current_month_last_year: "80",
      last_month_last_year: "100",
    };
    const el = renderTpl(renderMonthlyView(hass, { showMonthlyView: true }, attrs, true, noop));
    expect(el.textContent).toMatch(/Mensuel/);
    expect(el.textContent).toMatch(/Mois actuel/);
    expect(el.textContent).toMatch(/4 mois/);
    // current month 100 vs 80 a year ago → +25.0%
    expect(el.querySelector(".evolution-percent.positive")).toBeTruthy();
  });

  it("shows the no-data summary when no values are present", () => {
    const el = renderTpl(
      renderMonthlyView(hass, { showMonthlyView: true }, { unit_of_measurement: "kWh" }, false, noop),
    );
    expect(el.textContent).toMatch(/Aucune donnée/);
  });

  it("exposes the collapsible header as a keyboard-accessible button", () => {
    let toggled = 0;
    const onToggle = () => toggled++;
    const el = renderTpl(renderMonthlyView(hass, { showMonthlyView: true }, { current_month: "1" }, false, onToggle));
    const header = el.querySelector(".collapsible-header");
    expect(header.getAttribute("role")).toBe("button");
    expect(header.getAttribute("tabindex")).toBe("0");
    expect(header.getAttribute("aria-expanded")).toBe("false");
    header.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    header.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" })); // ignored
    expect(toggled).toBe(1);
  });

  it("collapses/expands via the expanded flag", () => {
    const collapsed = renderTpl(
      renderMonthlyView(hass, { showMonthlyView: true }, { current_month: "1" }, false, noop),
    );
    expect(collapsed.querySelector(".collapsible-content.collapsed")).toBeTruthy();
    const expanded = renderTpl(renderMonthlyView(hass, { showMonthlyView: true }, { current_month: "1" }, true, noop));
    expect(expanded.querySelector(".collapsible-content.expanded")).toBeTruthy();
  });
});

describe("renderYearlyView", () => {
  it("renders nothing when disabled", () => {
    const el = renderTpl(renderYearlyView(hass, { showYearlyView: false }, {}, false, noop));
    expect(el.textContent.trim()).toBe("");
  });

  it("renders localized year rows with a negative evolution badge", () => {
    const attrs = {
      unit_of_measurement: "kWh",
      current_year: "900",
      current_year_last_year: "1000",
    };
    const el = renderTpl(renderYearlyView(hass, { showYearlyView: true }, attrs, true, noop));
    expect(el.textContent).toMatch(/Annuel/);
    expect(el.textContent).toMatch(/2 ans/);
    expect(el.querySelector(".evolution-percent.negative")).toBeTruthy(); // 900 vs 1000 → -10%
  });

  it("shows the no-data summary when empty", () => {
    const el = renderTpl(renderYearlyView(hass, { showYearlyView: true }, { unit_of_measurement: "kWh" }, false, noop));
    expect(el.textContent).toMatch(/Aucune donnée/);
  });
});
