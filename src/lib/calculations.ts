import type { HassEntity } from "../types";

/** A single time-stamped consumption sample (Watts). */
export interface ConsumptionPoint {
  time: Date;
  consumption: number;
}

/** "Today vs yesterday" parsed comparison payload. */
export interface ComparisonData {
  today: ConsumptionPoint[];
  yesterday: ConsumptionPoint[];
  todayTotal: number;
  yesterdayTotal: number;
  evolution: number;
}

/** A seasonal accent + icon hint. */
export interface SeasonalTheme {
  primary: string;
  accent: string;
  icon: string;
}

export function safeRound(val: unknown): number {
  const n = Number(val);
  return isNaN(n) ? 0 : Math.round(n);
}

// Monday=0, ..., Saturday=5, Sunday=6
function daysSinceMondayFor(date: Date): number {
  const d = date.getDay();
  return d === 0 ? 6 : d - 1;
}

/**
 * Sum the kWh consumed from Monday up to (and including) yesterday.
 * `daily[0]` is today, `daily[1]` is yesterday, etc., so the loop visits
 * indices `[daysSinceMonday .. 1]`. Today (`daily[0]`) is excluded because
 * it is still in progress. On Monday, the loop is empty (no completed
 * weekdays yet) and the function returns 0.
 *
 * If kWh is missing for a day but its cost is known, estimate kWh via the
 * average kWh/cost ratio of the available days.
 */
export function calculateWeekTotal(
  daily: readonly (string | number)[] | undefined,
  dailyweek_cost: unknown,
  now: Date = new Date(),
): number {
  if (!daily) return 0;

  const daysSinceMonday = daysSinceMondayFor(now);
  let weekTotal = 0;

  for (let i = Math.min(daysSinceMonday, daily.length - 1); i >= 1; i--) {
    const consumption = parseFloat(String(daily[i]));
    if (!isNaN(consumption) && consumption !== -1 && consumption !== 0) {
      weekTotal += consumption;
      continue;
    }

    if (!dailyweek_cost) continue;

    const dailyCostArray = dailyweek_cost.toString().split(",");
    const dayPrice = parseFloat(dailyCostArray[i]?.replace(",", "."));
    if (isNaN(dayPrice) || dayPrice <= 0) continue;

    const validRatios: number[] = [];
    for (let j = 0; j < Math.min(daily.length, dailyCostArray.length, 7); j++) {
      if (j === i) continue;
      const kwh = parseFloat(String(daily[j]));
      const cost = parseFloat(dailyCostArray[j]?.replace(",", "."));
      if (!isNaN(kwh) && !isNaN(cost) && kwh > 0 && cost > 0 && kwh !== -1 && cost !== -1) {
        validRatios.push(kwh / cost);
      }
    }
    if (validRatios.length === 0) continue;

    const avgRatio = validRatios.reduce((sum, r) => sum + r, 0) / validRatios.length;
    const estimatedKwh = dayPrice * avgRatio;
    if (estimatedKwh > 0) weekTotal += estimatedKwh;
  }

  return weekTotal;
}

/**
 * Sum the cost (€) from Monday up to (and including) yesterday.
 * Same indexing convention as calculateWeekTotal — today (`daily[0]`) is
 * excluded.
 */
export function calculateWeekCost(dailyweek_cost: unknown, now: Date = new Date()): number {
  if (!dailyweek_cost) return 0;

  const daysSinceMonday = daysSinceMondayFor(now);
  const dailyCostArray = dailyweek_cost.toString().split(",");
  let weekCost = 0;

  for (let i = Math.min(daysSinceMonday, dailyCostArray.length - 1); i >= 1; i--) {
    const cost = parseFloat(dailyCostArray[i].replace(",", "."));
    if (!isNaN(cost) && cost !== -1) weekCost += cost;
  }
  return weekCost;
}

/**
 * Estimate a day's kWh from its known cost, using the average kWh/€ ratio of
 * the (up to 7) available days. Returns 0 when no estimate can be derived.
 *
 * `dayNumber` is 1-based: it indexes `dailyweek_cost[dayNumber - 1]`.
 */
export function estimateMissingKwh(
  daily: readonly (string | number)[] | undefined,
  dayNumber: number,
  dailyweek_cost: unknown,
): number {
  if (!daily || !dailyweek_cost) return 0;

  const dailyCostArray = dailyweek_cost.toString().split(",");
  const currentDayPrice = parseFloat(dailyCostArray[dayNumber - 1]?.replace(",", "."));

  if (isNaN(currentDayPrice) || currentDayPrice <= 0) return 0;

  // Calculer la moyenne des ratios kWh/€ des 7 derniers jours disponibles
  const validRatios: number[] = [];

  for (let i = 0; i < Math.min(daily.length, dailyCostArray.length, 7); i++) {
    const kwh = parseFloat(String(daily[i]));
    const cost = parseFloat(dailyCostArray[i]?.replace(",", "."));

    if (!isNaN(kwh) && !isNaN(cost) && kwh > 0 && cost > 0 && kwh !== -1 && cost !== -1) {
      validRatios.push(kwh / cost);
    }
  }

  if (validRatios.length === 0) return 0;

  const avgRatio = validRatios.reduce((sum, ratio) => sum + ratio, 0) / validRatios.length;
  return currentDayPrice * avgRatio;
}

export function getDynamicGradient(consumption: number, averageConsumption = 50): string {
  const ratio = consumption / averageConsumption;
  if (ratio <= 0.7) return "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)";
  if (ratio <= 1.0) return "linear-gradient(135deg, #2196f3 0%, #03dac6 100%)";
  if (ratio <= 1.3) return "linear-gradient(135deg, #ff9800 0%, #ffc107 100%)";
  return "linear-gradient(135deg, #f44336 0%, #e91e63 100%)";
}

export function getSeasonalTheme(now: Date = new Date()): SeasonalTheme {
  const month = now.getMonth();
  if (month >= 2 && month <= 4) return { primary: "#66bb6a", accent: "#81c784", icon: "mdi:flower" };
  if (month >= 5 && month <= 7) return { primary: "#42a5f5", accent: "#29b6f6", icon: "mdi:white-balance-sunny" };
  if (month >= 8 && month <= 10) return { primary: "#ff7043", accent: "#ffab40", icon: "mdi:leaf" };
  return { primary: "#5c6bc0", accent: "#7986cb", icon: "mdi:snowflake" };
}

/**
 * Parse the modern `last5day` time-series attributes (`time[]` + `consumption[]`)
 * into the {today, yesterday, todayTotal, yesterdayTotal, evolution} shape
 * expected by renderComparisonCharts.
 *
 * Timestamps are accepted in "YYYY-MM-DD HH:mm:ss" or ISO-8601 form.
 * Consumption values are interpreted as Watts (totals are divided by 1000
 * to match the legacy parser's behaviour).
 */
export function parseDetailedTimeSeries(times: any, values: any, now: Date = new Date()): ComparisonData {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  const todayData: ConsumptionPoint[] = [];
  const yesterdayData: ConsumptionPoint[] = [];

  if (!Array.isArray(times) || !Array.isArray(values)) {
    return { today: todayData, yesterday: yesterdayData, todayTotal: 0, yesterdayTotal: 0, evolution: 0 };
  }

  for (let i = 0; i < times.length; i++) {
    const raw = times[i];
    if (raw == null) continue;
    // "2026-04-06 23:45:00" → "2026-04-06T23:45:00"
    const isoish = typeof raw === "string" ? raw.replace(" ", "T") : raw;
    const t = new Date(isoish);
    if (isNaN(t.getTime())) continue;

    const consumption = parseFloat(values[i]);
    if (isNaN(consumption)) continue;

    const dateOnly = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    if (dateOnly.getTime() === today.getTime()) {
      todayData.push({ time: t, consumption });
    } else if (dateOnly.getTime() === yesterday.getTime()) {
      yesterdayData.push({ time: t, consumption });
    }
  }

  const todayTotal = todayData.reduce((s, x) => s + x.consumption, 0) / 1000;
  const yesterdayTotal = yesterdayData.reduce((s, x) => s + x.consumption, 0) / 1000;
  const evolution = todayTotal > 0 && yesterdayTotal !== 0 ? ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100 : 0;

  return { today: todayData, yesterday: yesterdayData, todayTotal, yesterdayTotal, evolution };
}

/**
 * Parse the EcoWatt `forecast` attribute into [time, color, value] tuples.
 * `colorMap` should be a Map(value → color).
 */
export function getOneDayNextEcoWatt(
  ecoWattForecastEntity: HassEntity | undefined,
  colorMap: Map<unknown, string>,
): Array<[string, string | undefined, unknown]> {
  const out: Array<[string, string | undefined, unknown]> = [];
  const forecast = ecoWattForecastEntity?.attributes?.forecast;
  if (!forecast) return out;

  for (const [rawTime, value] of Object.entries(forecast)) {
    if (rawTime === undefined) continue;
    const time = rawTime.replace("h", "").replace("min", "").trim();
    out.push([time, colorMap.get(value), value]);
  }
  return out;
}
