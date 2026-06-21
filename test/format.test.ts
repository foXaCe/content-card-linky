import { describe, it, expect } from "vitest";
import { toFloat, localeOf } from "../src/lib/format";

describe("toFloat", () => {
  it("formats numeric strings with the default 1 decimal", () => {
    expect(toFloat("12.34")).toBe("12.3");
    expect(toFloat(5)).toBe("5.0");
  });

  it("honours the decimals argument", () => {
    expect(toFloat("1.005", 2)).toBe("1.00");
    expect(toFloat(2, 3)).toBe("2.000");
  });

  it("returns an en-dash for non-numeric values", () => {
    expect(toFloat("abc")).toBe("–");
    expect(toFloat(undefined)).toBe("–");
    expect(toFloat(null)).toBe("–");
    expect(toFloat(NaN)).toBe("–");
  });

  it("parses leading-numeric strings", () => {
    expect(toFloat("3.5 kWh")).toBe("3.5");
  });
});

describe("localeOf", () => {
  it("returns the HA frontend language when present", () => {
    expect(localeOf({ locale: { language: "en" } })).toBe("en");
    expect(localeOf({ locale: { language: "de-DE" } })).toBe("de-DE");
  });

  it("falls back to en when hass/locale is missing (matches localize's default)", () => {
    expect(localeOf(undefined)).toBe("en");
    expect(localeOf({})).toBe("en");
    expect(localeOf({ locale: {} })).toBe("en");
  });
});
