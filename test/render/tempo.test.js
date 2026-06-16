// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { makeHass, renderTpl } from "./setup.js";
import { renderTempo } from "../../src/renderers/tempo.js";

const MED = { serviceEnedis: "myElectricalData" };
const tempoConfig = {
  showTempo: true,
  tempoEntityInfo: "sensor.info",
  tempoEntityJ0: "sensor.j0",
  tempoEntityJ1: "sensor.j1",
};

function tempoHass() {
  return makeHass({
    states: {
      "sensor.j0": { state: "BLUE", attributes: { date: "2026-05-04" } },
      "sensor.j1": { state: "RED", attributes: { date: "2026-05-05" } },
      "sensor.info": { state: "ok", attributes: { days_red: 5, days_white: 10, days_blue: 300 } },
    },
  });
}

describe("renderTempo", () => {
  it("renders nothing when serviceEnedis is undefined", () => {
    expect(renderTpl(renderTempo(makeHass(), tempoConfig, {})).textContent.trim()).toBe("");
  });

  it("warns when the service is not MyElectricalData", () => {
    const el = renderTpl(renderTempo(makeHass(), tempoConfig, { serviceEnedis: "enedisGateway" }));
    expect(el.textContent).toMatch(/uniquement disponible avec MyElectricalData/);
  });

  it("renders nothing when showTempo is false", () => {
    expect(renderTpl(renderTempo(tempoHass(), { ...tempoConfig, showTempo: false }, MED)).textContent.trim()).toBe("");
  });

  it("warns when the J0/J1 sensors are unavailable", () => {
    const el = renderTpl(renderTempo(makeHass(), tempoConfig, MED));
    expect(el.textContent).toMatch(/J0 et\/ou J1/);
  });

  it("warns when the info sensor is unavailable", () => {
    const hass = makeHass({
      states: {
        "sensor.j0": { state: "BLUE", attributes: { date: "2026-05-04" } },
        "sensor.j1": { state: "RED", attributes: { date: "2026-05-05" } },
      },
    });
    const el = renderTpl(renderTempo(hass, tempoConfig, MED));
    expect(el.textContent).toMatch(/info/);
  });

  it("renders the tempo tables with colours and remaining days", () => {
    const el = renderTpl(renderTempo(tempoHass(), tempoConfig, MED));
    expect(el.querySelector(".tempo-color")).toBeTruthy();
    expect(el.querySelector(".tempo-blue")).toBeTruthy();
    expect(el.textContent).toContain("300");
    expect(el.textContent).toContain("5");
  });
});
