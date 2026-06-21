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

/** Attribute bag exposed by Linky/MyElectricalData sensors (open by design). */
export type LinkyAttributes = Record<string, any>;

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
