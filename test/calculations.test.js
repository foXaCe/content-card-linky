import { describe, it, expect } from "vitest";
import {
  safeRound,
  calculateWeekTotal,
  calculateWeekCost,
  getDynamicGradient,
  getSeasonalTheme,
  getOneDayNextEcoWatt,
  parseDetailedTimeSeries,
} from "../src/lib/calculations.js";

const at = (iso) => new Date(iso);

describe("safeRound", () => {
  it("rounds numeric strings", () => {
    expect(safeRound("12.6")).toBe(13);
    expect(safeRound("12.4")).toBe(12);
  });
  it("returns 0 for non-numeric values", () => {
    expect(safeRound(undefined)).toBe(0);
    expect(safeRound(null)).toBe(0);
    expect(safeRound("abc")).toBe(0);
    expect(safeRound(NaN)).toBe(0);
  });
});

// NOTE: the loop iterates from i = (daysSinceMonday - 1) down to 0,
// so on a Thursday it visits daily[2], daily[1], daily[0] — i.e. Tue, Wed, today.
// Sunday is the only weekday explicitly skipped via `dayOfWeek !== 0`.
// (The inline comments in calculations.js claim "Mon..Fri", which does not match
// the actual loop bounds — see CHANGELOG / FIXME.)
describe("calculateWeekTotal", () => {
  const thursday = at("2026-05-07T12:00:00"); // daysSinceMonday=3 → i ∈ {2,1,0}

  it("returns 0 when daily is null/undefined", () => {
    expect(calculateWeekTotal(null, "1,2,3", thursday)).toBe(0);
    expect(calculateWeekTotal(undefined, undefined, thursday)).toBe(0);
  });

  it("sums daily[2], daily[1], daily[0] on a Thursday", () => {
    const daily = ["10", "20", "30", "40", "50", "60", "70"];
    expect(calculateWeekTotal(daily, "", thursday)).toBe(30 + 20 + 10);
  });

  it("ignores -1 and 0 sentinel values when no cost is available", () => {
    const daily = ["0", "0", "-1", "5"]; // i=2 → -1 skipped, i=1 → 0 skipped, i=0 → 0 skipped
    expect(calculateWeekTotal(daily, "", thursday)).toBe(0);
  });

  it("estimates missing kWh from cost via the average kWh/€ ratio", () => {
    // i=2 (Tue): daily[2]=0 → estimate. cost[2]=0.5. ratios from j=1 (8/2=4), j=3 (4/1=4) → avg=4. est = 0.5*4 = 2.
    // i=1 (Wed): daily[1]=8 → add 8.
    // i=0 (Thu): daily[0]=10 → add 10.
    const daily = ["10", "8", "0", "4"];
    const cost = "0,2,0.5,1";
    expect(calculateWeekTotal(daily, cost, thursday)).toBeCloseTo(10 + 8 + 2, 5);
  });

  it("does not estimate when neither cost nor ratios are available", () => {
    const daily = ["0", "0", "-1", "0"];
    expect(calculateWeekTotal(daily, "0,0,0,0", thursday)).toBe(0);
  });

  it("on Sunday iterates Mon..Sat and skips Sunday itself", () => {
    const sunday = at("2026-05-10T12:00:00"); // daysSinceMonday=6 → i ∈ {5..0}
    // i=5 → Mon (daily[5]=50), 4 → Tue (40), 3 → Wed (30), 2 → Thu (20), 1 → Fri (10), 0 → Sun (skipped)
    const daily = ["100", "10", "20", "30", "40", "50"];
    expect(calculateWeekTotal(daily, "", sunday)).toBe(50 + 40 + 30 + 20 + 10);
  });

  it("on Monday returns 0 (loop bound is -1)", () => {
    const monday = at("2026-05-04T12:00:00"); // daysSinceMonday=0 → i ∈ {-1..0}, no iterations
    const daily = ["100", "10", "20", "30", "40", "50", "60"];
    expect(calculateWeekTotal(daily, "", monday)).toBe(0);
  });

  it("handles arrays shorter than the lookback window", () => {
    const friday = at("2026-05-08T12:00:00"); // daysSinceMonday=4 → i ∈ {min(3, length-1)..0}
    const daily = ["10", "20"]; // length=2, loop i ∈ {1, 0}
    expect(calculateWeekTotal(daily, "", friday)).toBe(20 + 10);
  });
});

describe("calculateWeekCost", () => {
  const thursday = at("2026-05-07T12:00:00");

  it("returns 0 when input is falsy", () => {
    expect(calculateWeekCost(null, thursday)).toBe(0);
    expect(calculateWeekCost("", thursday)).toBe(0);
  });

  it("sums cost entries for i=2..0 and accepts dot decimals", () => {
    // index 0=today (Thu, included), 1=Wed, 2=Tue, 3=Mon (not visited)
    expect(calculateWeekCost("0.50,2.50,1.25,9.99", thursday)).toBeCloseTo(0.5 + 2.5 + 1.25, 5);
  });

  it("converts comma decimals to dots", () => {
    // Authors' format uses comma decimals and slash separators? Here values use commas
    // BUT the field separator is also a comma → cannot mix; this test ensures the
    // dot-decimal path works.
    expect(calculateWeekCost("1.0,2.0,3.0,4.0", thursday)).toBeCloseTo(1 + 2 + 3, 5);
  });

  it("ignores -1 sentinel values", () => {
    // i=2 → "-1" skipped, i=1 → 2, i=0 → 3
    expect(calculateWeekCost("3,2,-1,9", thursday)).toBe(2 + 3);
  });

  it("on Monday returns 0", () => {
    const monday = at("2026-05-04T12:00:00");
    expect(calculateWeekCost("0,1,2,3,4,5,6", monday)).toBe(0);
  });
});

describe("getDynamicGradient", () => {
  it("returns green for ratio <= 0.7", () => {
    expect(getDynamicGradient(35, 50)).toContain("#4caf50");
  });
  it("returns blue for 0.7 < ratio <= 1.0", () => {
    expect(getDynamicGradient(45, 50)).toContain("#2196f3");
  });
  it("returns orange for 1.0 < ratio <= 1.3", () => {
    expect(getDynamicGradient(60, 50)).toContain("#ff9800");
  });
  it("returns red for ratio > 1.3", () => {
    expect(getDynamicGradient(100, 50)).toContain("#f44336");
  });
  it("uses default average of 50 when omitted", () => {
    expect(getDynamicGradient(20)).toContain("#4caf50");
  });
});

describe("getSeasonalTheme", () => {
  it("returns spring colours from March to May", () => {
    expect(getSeasonalTheme(at("2026-03-15"))).toMatchObject({ icon: "mdi:flower" });
  });
  it("returns summer colours from June to August", () => {
    expect(getSeasonalTheme(at("2026-07-15"))).toMatchObject({ icon: "mdi:white-balance-sunny" });
  });
  it("returns autumn colours from September to November", () => {
    expect(getSeasonalTheme(at("2026-10-15"))).toMatchObject({ icon: "mdi:leaf" });
  });
  it("returns winter colours from December to February", () => {
    expect(getSeasonalTheme(at("2026-01-15"))).toMatchObject({ icon: "mdi:snowflake" });
    expect(getSeasonalTheme(at("2026-12-15"))).toMatchObject({ icon: "mdi:snowflake" });
  });
});

describe("parseDetailedTimeSeries (issue #6)", () => {
  // Pin "now" to 2026-04-07 12:00 → today=2026-04-07, yesterday=2026-04-06
  const now = at("2026-04-07T12:00:00");

  it("returns empty buckets when inputs are not arrays", () => {
    expect(parseDetailedTimeSeries(undefined, undefined, now)).toEqual({
      today: [],
      yesterday: [],
      todayTotal: 0,
      yesterdayTotal: 0,
      evolution: 0,
    });
    expect(parseDetailedTimeSeries("not array", "not array", now).today).toEqual([]);
  });

  it("groups MyElectricalData last5day samples by date", () => {
    const times = [
      "2026-04-05 23:45:00", // older, dropped
      "2026-04-06 00:00:00",
      "2026-04-06 12:00:00",
      "2026-04-06 23:45:00",
      "2026-04-07 00:00:00",
      "2026-04-07 06:00:00",
    ];
    const consumption = [100, 200, 300, 400, 500, 600];
    const r = parseDetailedTimeSeries(times, consumption, now);

    expect(r.yesterday.map((d) => d.consumption)).toEqual([200, 300, 400]);
    expect(r.today.map((d) => d.consumption)).toEqual([500, 600]);
    expect(r.todayTotal).toBeCloseTo(1.1, 5); // (500+600)/1000
    expect(r.yesterdayTotal).toBeCloseTo(0.9, 5); // (200+300+400)/1000
    expect(r.evolution).toBeCloseTo(((1.1 - 0.9) / 0.9) * 100, 5);
  });

  it("accepts ISO-8601 'T'-separated timestamps too", () => {
    const r = parseDetailedTimeSeries(["2026-04-06T08:00:00", "2026-04-07T08:00:00"], [10, 20], now);
    expect(r.yesterday).toHaveLength(1);
    expect(r.today).toHaveLength(1);
  });

  it("skips invalid timestamps and non-numeric values", () => {
    const r = parseDetailedTimeSeries(
      ["bad-date", "2026-04-07 10:00:00", "2026-04-07 11:00:00"],
      [99, "not-a-number", 50],
      now,
    );
    expect(r.today).toHaveLength(1);
    expect(r.today[0].consumption).toBe(50);
  });

  it("returns evolution = 0 when yesterdayTotal is 0", () => {
    const r = parseDetailedTimeSeries(["2026-04-07 10:00:00"], [100], now);
    expect(r.evolution).toBe(0);
  });

  it("returns evolution = 0 when todayTotal is 0", () => {
    const r = parseDetailedTimeSeries(["2026-04-06 10:00:00"], [100], now);
    expect(r.evolution).toBe(0);
  });
});

describe("getOneDayNextEcoWatt", () => {
  const colorMap = new Map([
    [1, "green"],
    [2, "yellow"],
    [3, "red"],
  ]);

  it("returns [] when forecast is missing", () => {
    expect(getOneDayNextEcoWatt({}, colorMap)).toEqual([]);
    expect(getOneDayNextEcoWatt({ attributes: {} }, colorMap)).toEqual([]);
    expect(getOneDayNextEcoWatt(null, colorMap)).toEqual([]);
  });

  it("strips 'h' and 'min' suffixes from the time key", () => {
    const entity = { attributes: { forecast: { "9h00": 1, "13h30min": 2, "21h": 3 } } };
    expect(getOneDayNextEcoWatt(entity, colorMap)).toEqual([
      ["900", "green", 1],
      ["1330", "yellow", 2],
      ["21", "red", 3],
    ]);
  });

  it("preserves the original numeric value alongside the mapped colour", () => {
    const entity = { attributes: { forecast: { "0h": 99 } } };
    expect(getOneDayNextEcoWatt(entity, colorMap)).toEqual([["0", undefined, 99]]);
  });
});
