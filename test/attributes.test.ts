import { describe, it, expect } from "vitest";
import { dayCell, parseFrenchNumber } from "../src/lib/attributes";

describe("dayCell", () => {
  it("returns the 1-based Nth cell", () => {
    expect(dayCell("a,b,c", 1)).toBe("a");
    expect(dayCell("a,b,c", 3)).toBe("c");
  });
  it("returns undefined for null/undefined attrs and out-of-range cells", () => {
    expect(dayCell(undefined, 1)).toBeUndefined();
    expect(dayCell(null, 1)).toBeUndefined();
    expect(dayCell("a,b", 5)).toBeUndefined();
  });
  it("stringifies non-string attrs", () => {
    expect(dayCell(["x", "y"], 2)).toBe("y"); // Array.toString() => "x,y"
  });
});

describe("parseFrenchNumber", () => {
  it("parses French decimals", () => {
    expect(parseFrenchNumber("1,50")).toBeCloseTo(1.5);
    expect(parseFrenchNumber("12.34")).toBeCloseTo(12.34);
  });
  it("returns NaN for non-numeric / nullish", () => {
    expect(Number.isNaN(parseFrenchNumber("abc"))).toBe(true);
    expect(Number.isNaN(parseFrenchNumber(undefined))).toBe(true);
    expect(Number.isNaN(parseFrenchNumber(null))).toBe(true);
  });
});
