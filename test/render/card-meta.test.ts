// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { makeHass, makeLinkyEntity } from "./setup";

describe("assertConfig", () => {
  it("throws without an entity", async () => {
    const { assertConfig } = await import("../../src/content-card-linky");
    expect(() => assertConfig({} as any)).toThrow(/entity/i);
  });

  it("throws on a non-numeric kWhPrice", async () => {
    const { assertConfig } = await import("../../src/content-card-linky");
    expect(() => assertConfig({ entity: "sensor.x", kWhPrice: "abc" as any })).toThrow(/kWhPrice/);
  });

  it("accepts a valid config (including price 0 and a numeric string)", async () => {
    const { assertConfig } = await import("../../src/content-card-linky");
    expect(() => assertConfig({ entity: "sensor.x" })).not.toThrow();
    expect(() => assertConfig({ entity: "sensor.x", kWhPrice: 0 })).not.toThrow();
    expect(() => assertConfig({ entity: "sensor.x", kWhPrice: 0.15 })).not.toThrow();
  });
});

describe("getEntitySuggestion (card picker, HA 2026.6+)", () => {
  async function getSuggestion() {
    await import("../../src/content-card-linky");
    const entry = ((window as any).customCards || []).find((c: any) => c.type === "content-card-linky");
    return entry?.getEntitySuggestion;
  }

  it("suggests the card for a Linky-named sensor", async () => {
    const getEntitySuggestion = await getSuggestion();
    const hass = makeHass({ states: { "sensor.my_linky": makeLinkyEntity() } });
    const res = getEntitySuggestion!(hass, "sensor.my_linky");
    expect(res).not.toBeNull();
    expect(res!.config).toMatchObject({ type: "custom:content-card-linky", entity: "sensor.my_linky" });
  });

  it("suggests the card for a consommation typeCompteur sensor", async () => {
    const getEntitySuggestion = await getSuggestion();
    const hass = makeHass({ states: { "sensor.elec": makeLinkyEntity({ typeCompteur: "consommation" }) } });
    expect(getEntitySuggestion!(hass, "sensor.elec")).not.toBeNull();
  });

  it("returns null for an unrelated entity", async () => {
    const getEntitySuggestion = await getSuggestion();
    const hass = makeHass({ states: { "sensor.weather": { state: "5", attributes: {} } } });
    expect(getEntitySuggestion!(hass, "sensor.weather")).toBeNull();
  });

  it("returns null for a missing entity", async () => {
    const getEntitySuggestion = await getSuggestion();
    expect(getEntitySuggestion!(makeHass({ states: {} }), "sensor.nope")).toBeNull();
  });
});
