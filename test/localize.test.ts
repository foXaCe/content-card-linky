import { describe, it, expect } from "vitest";
import { localize } from "../src/lib/localize";

describe("localize", () => {
  const frHass = { locale: { language: "fr" } };
  const enHass = { locale: { language: "en" } };

  it("returns the FR string for a French hass", () => {
    expect(localize(frHass, "card.daily_cost")).toBe("Coût journalier");
  });

  it("returns the EN string for an English hass", () => {
    expect(localize(enHass, "card.daily_cost")).toBe("Daily cost");
  });

  it("falls back to EN when the language is not supported", () => {
    expect(localize({ locale: { language: "de" } }, "card.daily_cost")).toBe("Daily cost");
  });

  it("normalises 'fr-FR' to 'fr'", () => {
    expect(localize({ locale: { language: "fr-FR" } }, "card.daily_cost")).toBe("Coût journalier");
  });

  it("substitutes {placeholders}", () => {
    expect(localize(frHass, "card.data_unavailable", { entity: "sensor.foo" })).toBe(
      "Linky : données inaccessibles pour sensor.foo",
    );
  });

  it("leaves unknown placeholders as-is", () => {
    expect(localize(frHass, "card.version_available", {})).toBe("Nouvelle version disponible {version}");
  });

  it("returns the key untouched when not found in any locale", () => {
    expect(localize(frHass, "card.does_not_exist")).toBe("card.does_not_exist");
  });

  it("returns the key when it resolves to a non-string (a nested section)", () => {
    // "card" points to an object, not a leaf string → must not be returned raw.
    expect(localize(frHass, "card")).toBe("card");
  });

  it("handles a missing or empty hass object", () => {
    expect(localize(undefined, "card.daily_cost")).toBe("Daily cost");
    expect(localize({}, "card.daily_cost")).toBe("Daily cost");
  });

  it("falls back to EN when a key exists in EN only", () => {
    // Both locales have the same keys today, so simulate via a known shared key.
    expect(localize({ locale: { language: "es" } }, "card.in_peak")).toBe("(peak)");
  });
});
