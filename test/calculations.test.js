import { describe, it, expect } from "vitest";
import {
  safeRound,
  calculateWeekTotal,
  calculateWeekCost,
  getDynamicGradient,
  getSeasonalTheme,
  getOneDayNextEcoWatt,
  parseDetailedTimeSeries,
  estimateMissingKwh,
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

// daily[0] = today (in progress, excluded from totals).
// daily[1] = yesterday, daily[2] = day before, etc.
// On Thursday (daysSinceMonday=3), loop visits i ∈ {3, 2, 1} → Mon, Tue, Wed.
describe("calculateWeekTotal", () => {
  const thursday = at("2026-05-07T12:00:00"); // i ∈ {3, 2, 1}

  it("returns 0 when daily is null/undefined", () => {
    expect(calculateWeekTotal(null, "1,2,3", thursday)).toBe(0);
    expect(calculateWeekTotal(undefined, undefined, thursday)).toBe(0);
  });

  it("sums daily[3..1] on a Thursday (Mon, Tue, Wed) and excludes today", () => {
    const daily = ["999", "20", "30", "40", "50", "60", "70"]; // today=999, yesterday=20, ...
    expect(calculateWeekTotal(daily, "", thursday)).toBe(40 + 30 + 20);
  });

  it("ignores -1 and 0 sentinel values when no cost is available", () => {
    const daily = ["999", "0", "-1", "5"]; // today=999 (excluded), Wed=0, Tue=-1, Mon=5
    expect(calculateWeekTotal(daily, "", thursday)).toBe(5);
  });

  it("estimates missing kWh from cost via the average kWh/€ ratio", () => {
    // today=daily[0]=999 (excluded). yesterday=Wed (8), day-before=Tue (0 → estimate), Mon (4).
    // ratios from non-i indices where kWh AND cost > 0: j=0 (999/0 invalid), j=1 (8/2=4), j=3 (4/1=4) → avg 4
    // Tue cost=0.5 → est = 0.5*4 = 2
    const daily = ["999", "8", "0", "4"];
    const cost = "0,2,0.5,1";
    expect(calculateWeekTotal(daily, cost, thursday)).toBeCloseTo(4 + 2 + 8, 5);
  });

  it("does not estimate when neither cost nor ratios are available", () => {
    const daily = ["999", "0", "-1", "0"];
    expect(calculateWeekTotal(daily, "0,0,0,0", thursday)).toBe(0);
  });

  it("skips estimation when a day has a price but no other day yields a ratio", () => {
    // Every day's kWh is invalid (-1), so no kWh/€ ratio can be built even
    // though the costs are valid → estimation is skipped for all days.
    const daily = ["-1", "-1", "-1", "-1"];
    expect(calculateWeekTotal(daily, "1,2,3,4", thursday)).toBe(0);
  });

  it("falls through when an invalid day has no usable cost entry", () => {
    // Invalid kWh + falsy dailyweek_cost → the cost branch is short-circuited.
    const daily = ["999", "-1", "5", "8"];
    expect(calculateWeekTotal(daily, "", thursday)).toBe(5 + 8);
  });

  it("on Sunday iterates Mon..Sat (whole work week) and excludes Sunday", () => {
    const sunday = at("2026-05-10T12:00:00"); // daysSinceMonday=6 → i ∈ {6..1}
    // today=daily[0]=Sun (excluded), Sat=10, Fri=20, Thu=30, Wed=40, Tue=50, Mon=60
    const daily = ["999", "10", "20", "30", "40", "50", "60"];
    expect(calculateWeekTotal(daily, "", sunday)).toBe(60 + 50 + 40 + 30 + 20 + 10);
  });

  it("on Monday returns 0 (no completed weekdays yet)", () => {
    const monday = at("2026-05-04T12:00:00"); // daysSinceMonday=0 → loop empty
    const daily = ["100", "10", "20", "30", "40", "50", "60"];
    expect(calculateWeekTotal(daily, "", monday)).toBe(0);
  });

  it("on Tuesday sums only Monday", () => {
    const tuesday = at("2026-05-05T12:00:00"); // daysSinceMonday=1 → i ∈ {1}
    const daily = ["999", "42"];
    expect(calculateWeekTotal(daily, "", tuesday)).toBe(42);
  });

  it("handles arrays shorter than the lookback window", () => {
    const friday = at("2026-05-08T12:00:00"); // daysSinceMonday=4 → wants i ∈ {4..1}
    // Only 3 days available → i ∈ {min(4, 2)..1} = {2, 1}
    const daily = ["999", "10", "20"]; // today excluded, Thu=10, Wed=20
    expect(calculateWeekTotal(daily, "", friday)).toBe(20 + 10);
  });
});

describe("calculateWeekCost", () => {
  const thursday = at("2026-05-07T12:00:00");

  it("returns 0 when input is falsy", () => {
    expect(calculateWeekCost(null, thursday)).toBe(0);
    expect(calculateWeekCost("", thursday)).toBe(0);
  });

  it("sums Monday through yesterday and accepts dot decimals", () => {
    // today=999.99 (excluded), Wed=0.50, Tue=2.50, Mon=1.25
    expect(calculateWeekCost("999.99,0.50,2.50,1.25", thursday)).toBeCloseTo(1.25 + 2.5 + 0.5, 5);
  });

  it("ignores -1 sentinel values", () => {
    // today=999 (excluded), Wed=2, Tue=-1 (skip), Mon=3
    expect(calculateWeekCost("999,2,-1,3", thursday)).toBe(2 + 3);
  });

  it("on Monday returns 0", () => {
    const monday = at("2026-05-04T12:00:00");
    expect(calculateWeekCost("0,1,2,3,4,5,6", monday)).toBe(0);
  });

  it("on Tuesday returns just Monday", () => {
    const tuesday = at("2026-05-05T12:00:00");
    expect(calculateWeekCost("999,4.20", tuesday)).toBeCloseTo(4.2, 5);
  });
});

describe("estimateMissingKwh", () => {
  it("returns 0 when daily or cost is missing", () => {
    expect(estimateMissingKwh(null, 1, "1,2")).toBe(0);
    expect(estimateMissingKwh(["1"], 1, null)).toBe(0);
  });

  it("returns 0 when the target day has no positive price", () => {
    expect(estimateMissingKwh(["10", "20"], 1, "0,2")).toBe(0);
    expect(estimateMissingKwh(["10", "20"], 1, "-1,2")).toBe(0);
  });

  it("estimates kWh from the average kWh/€ ratio of valid days", () => {
    // daily=[10,20], cost="1,2" → ratios 10/1=10, 20/2=10 → avg 10
    // target day 1 price=1 → 1 * 10 = 10
    expect(estimateMissingKwh(["10", "20"], 1, "1,2")).toBeCloseTo(10, 5);
  });

  it("accepts comma decimals in the cost string", () => {
    // daily=[4], cost="2,5" (=2.5) → ratio 4/2.5=1.6 → 2.5*1.6=4
    expect(estimateMissingKwh(["4"], 1, "2,5")).toBeCloseTo(4, 5);
  });

  it("returns 0 when no valid ratio can be built", () => {
    expect(estimateMissingKwh(["-1", "-1"], 1, "1,2")).toBe(0);
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

  it("skips null/undefined timestamps", () => {
    const r = parseDetailedTimeSeries([null, undefined, "2026-04-07 10:00:00"], [11, 22, 33], now);
    expect(r.today).toHaveLength(1);
    expect(r.today[0].consumption).toBe(33);
  });

  it("accepts numeric epoch timestamps (non-string raw values)", () => {
    const todayEpoch = at("2026-04-07T08:00:00").getTime();
    const yesterdayEpoch = at("2026-04-06T08:00:00").getTime();
    const r = parseDetailedTimeSeries([yesterdayEpoch, todayEpoch], [400, 600], now);
    expect(r.today.map((d) => d.consumption)).toEqual([600]);
    expect(r.yesterday.map((d) => d.consumption)).toEqual([400]);
    expect(r.todayTotal).toBeCloseTo(0.6, 5);
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
