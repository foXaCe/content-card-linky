// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { makeHass, renderTpl } from "./setup.js";
import { renderError, renderInformation, renderVersion } from "../../src/renderers/messages.js";

const hass = makeHass();

describe("renderError", () => {
  it("renders the error banner when enabled and a message is present", () => {
    const el = renderTpl(renderError({ showError: true }, "boom"));
    expect(el.querySelector(".error-msg")).toBeTruthy();
    expect(el.textContent).toContain("boom");
  });

  it("renders nothing when the message is empty", () => {
    const el = renderTpl(renderError({ showError: true }, ""));
    expect(el.textContent.trim()).toBe("");
  });

  it("renders nothing when disabled", () => {
    const el = renderTpl(renderError({ showError: false }, "boom"));
    expect(el.textContent.trim()).toBe("");
  });
});

describe("renderInformation", () => {
  it("renders nothing when disabled", () => {
    const el = renderTpl(renderInformation(hass, { showInformation: false }, { serviceEnedis: "enedisGateway" }));
    expect(el.textContent.trim()).toBe("");
  });

  it("renders nothing when serviceEnedis is undefined", () => {
    const el = renderTpl(renderInformation(hass, {}, {}));
    expect(el.textContent.trim()).toBe("");
  });

  it("renders the migration notice for a non-MED service", () => {
    const el = renderTpl(renderInformation(hass, {}, { serviceEnedis: "enedisGateway" }));
    expect(el.querySelector(".information-msg")).toBeTruthy();
    expect(el.textContent).toMatch(/migrer sur MyElectricalData/);
  });

  it("renders nothing for the MED service", () => {
    const el = renderTpl(renderInformation(hass, {}, { serviceEnedis: "myElectricalData" }));
    expect(el.textContent.trim()).toBe("");
  });
});

describe("renderVersion", () => {
  it("renders the update notice when an update is available", () => {
    const el = renderTpl(renderVersion(hass, true, "9.9.9"));
    expect(el.textContent).toMatch(/Nouvelle version disponible 9\.9\.9/);
  });

  it("renders nothing when up to date", () => {
    const el = renderTpl(renderVersion(hass, false, "9.9.9"));
    expect(el.textContent.trim()).toBe("");
  });
});
