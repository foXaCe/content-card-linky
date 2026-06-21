// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { makeHass, renderTpl } from "./setup";
import { renderEcoWatt } from "../../src/renderers/ecowatt";

const forecastEntity = { attributes: { forecast: { "0h": 1, "1h": 2, "2h": 3 } } };

describe("renderEcoWatt", () => {
  it("renders nothing when serviceEnedis is undefined", () => {
    const el = renderTpl(renderEcoWatt(makeHass(), {}, {}));
    expect(el.textContent.trim()).toBe("");
  });

  it("warns when the service is not MyElectricalData", () => {
    const el = renderTpl(renderEcoWatt(makeHass(), {}, { serviceEnedis: "enedisGateway" }));
    expect(el.textContent).toMatch(/uniquement disponible avec MyElectricalData/);
  });

  it("warns when the today entity is missing", () => {
    const el = renderTpl(renderEcoWatt(makeHass(), { showEcoWatt: true }, { serviceEnedis: "myElectricalData" }));
    expect(el.textContent).toMatch(/entité J\+0 non configurée/);
  });

  it("warns when D+1/D+2 entities are missing", () => {
    const el = renderTpl(renderEcoWatt(makeHass(), { showEcoWattJ12: true }, { serviceEnedis: "myElectricalData" }));
    expect(el.textContent).toMatch(/J\+1\/J\+2/);
  });

  it("renders the today forecast row", () => {
    const hass = makeHass({ states: { "sensor.ew": forecastEntity } });
    const el = renderTpl(
      renderEcoWatt(hass, { showEcoWatt: true, ewEntity: "sensor.ew" }, { serviceEnedis: "myElectricalData" }),
    );
    expect(el.querySelectorAll(".oneHour li").length).toBe(3);
  });

  it("renders the D+1/D+2 forecast rows with the hour labels", () => {
    const hass = makeHass({
      states: { "sensor.j1": forecastEntity, "sensor.j2": forecastEntity },
    });
    const el = renderTpl(
      renderEcoWatt(
        hass,
        { showEcoWattJ12: true, ewEntityJ1: "sensor.j1", ewEntityJ2: "sensor.j2" },
        { serviceEnedis: "myElectricalData" },
      ),
    );
    expect(el.querySelectorAll(".oneHour").length).toBe(2);
    expect(el.querySelector(".oneHourLabel")).toBeTruthy();
  });
});
