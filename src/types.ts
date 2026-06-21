// Shared type definitions for the Linky content card.
//
// These are intentionally minimal: rather than depend on a (frequently stale)
// `custom-card-helpers` package, we declare only the slice of the Home
// Assistant surface the card actually touches. The Linky/MyElectricalData
// sensors expose dozens of loosely-typed attributes (CSV strings, arrays,
// numbers), so the attribute bag stays deliberately open.

import type { TemplateResult } from "lit";

export type { TemplateResult };

/** A single Home Assistant entity state object (only the parts the card reads). */
export interface HassEntity {
  entity_id?: string;
  state: string;
  attributes: LinkyAttributes;
  last_changed?: string;
  last_updated?: string;
}

/** Frontend locale info (subset used for date/number formatting). */
export interface HassLocale {
  language: string;
  number_format?: string;
  time_format?: string;
}

/** Minimal Home Assistant object — only the surface the card actually uses. */
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  locale?: HassLocale;
  language?: string;
}

/** A Linky attribute that arrives as a comma-string OR a list (varies by MED version/path). */
export type LinkyCsv = string | ReadonlyArray<string | number>;
/** A numeric attribute that arrives as a number or a (possibly French-decimal) string. */
export type LinkyNum = number | string;

/**
 * Attribute bag exposed by Linky/MyElectricalData sensors. Honestly typed: many
 * values are polymorphic across MED versions, so the runtime narrowing lives in
 * the `lib/*` helpers (toFloat/dayCell/parseFrenchNumber/calculations), which
 * accept `unknown`. The index signature covers the long tail of attributes the
 * card does not read directly.
 */
export interface LinkyAttributes {
  typeCompteur?: string;
  serviceEnedis?: string;
  unit_of_measurement?: string;

  daily?: ReadonlyArray<LinkyNum>;
  dailyweek?: LinkyCsv;
  dailyweek_Tempo?: LinkyCsv;
  dailyweek_cost?: LinkyCsv;
  dailyweek_costHC?: LinkyCsv;
  dailyweek_costHP?: LinkyCsv;
  dailyweek_HC?: LinkyCsv;
  dailyweek_HP?: LinkyCsv;
  dailyweek_MP?: LinkyCsv;
  dailyweek_MP_over?: LinkyCsv;
  dailyweek_MP_time?: LinkyCsv;

  daily_cost?: LinkyNum;
  yesterday?: LinkyNum;
  yesterday_HC?: LinkyNum;
  yesterday_HP?: LinkyNum;
  day_2?: LinkyNum;
  peak_offpeak_percent?: LinkyNum;

  current_month?: LinkyNum;
  current_month_evolution?: LinkyNum;
  current_month_last_year?: LinkyNum;
  current_week?: LinkyNum;
  current_week_evolution?: LinkyNum;
  current_year?: LinkyNum;
  current_year_last_year?: LinkyNum;
  last_month?: LinkyNum;
  last_month_last_year?: LinkyNum;
  last_week?: LinkyNum;
  monthly_evolution?: LinkyNum;
  yearly_evolution?: LinkyNum;
  yesterday_evolution?: LinkyNum;

  errorLastCall?: string;
  versionUpdateAvailable?: boolean;
  versionGit?: string;

  forecast?: Record<string, unknown>;

  // Attributes read off Tempo / EcoWatt / detailed-comparison entities (they share this bag)
  date?: string;
  days_red?: LinkyNum;
  days_white?: LinkyNum;
  days_blue?: LinkyNum;
  time?: ReadonlyArray<string>;
  consumption?: ReadonlyArray<LinkyNum>;
  Daily?: string;
  Dailyweek?: string;

  [key: string]: unknown;
}

/** Day-name display width accepted by `Intl.DateTimeFormat`'s `weekday` option. */
export type DayNameStyle = "long" | "short" | "narrow";

/** User-facing card configuration (the YAML the user writes). */
export interface ContentCardLinkyConfig {
  type?: string;
  entity: string;

  // General
  titleName?: string;
  nbJoursAffichage?: string | number;
  kWhPrice?: number;
  showDayName?: DayNameStyle;

  // Display toggles
  showHistory?: boolean;
  showHeader?: boolean;
  showPeakOffPeak?: boolean;
  showIcon?: boolean;
  showInTableUnit?: boolean;
  showDayPrice?: boolean;
  showDayPriceHCHP?: boolean;
  showDayMaxPower?: boolean;
  showDayMaxPowerTime?: boolean;
  showDayHCHP?: boolean;
  showError?: boolean;
  showInformation?: boolean;
  showPrice?: boolean;
  showTitle?: boolean;
  showSmartInsights?: boolean;
  showYearRatio?: boolean;
  showCurrentMonthRatio?: boolean;
  showMonthRatio?: boolean;
  showWeekRatio?: boolean;
  showYesterdayRatio?: boolean;
  showTitleLign?: boolean;
  showEcoWatt?: boolean;
  showEcoWattJ12?: boolean;
  showTempo?: boolean;
  showTempoColor?: boolean;
  showWeekSummary?: boolean;
  showMonthlyView?: boolean;
  showYearlyView?: boolean;
  showDetailedComparison?: boolean;

  // Appearance (premium UI opt-out)
  appearance?: "premium" | "minimal";

  // Linked entities
  detailedComparisonEntity?: string;
  ewEntity?: string;
  ewEntityJ1?: string;
  ewEntityJ2?: string;
  tempoEntity?: string;
  tempoEntityInfo?: string;
  tempoEntityJ0?: string;
  tempoEntityJ1?: string;
}

/** Descriptor pushed to `window.customCards` for the card picker. */
export interface CustomCardEntry {
  type: string;
  name: string;
  description?: string;
  preview?: boolean;
  documentationURL?: string;
  version?: string;
  getEntitySuggestion?: (
    hass: HomeAssistant,
    entityId: string,
  ) => { config: Record<string, unknown>; label?: string } | null;
}
