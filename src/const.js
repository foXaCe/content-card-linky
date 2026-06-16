// Shared constants for the Linky content card.
// No magic strings should live outside this module.

/**
 * Config keys that point to a Home Assistant entity. Used by the card's
 * `shouldUpdate` to decide whether a state change is relevant to a re-render.
 */
export const ENTITY_CONFIG_KEYS = [
  "entity",
  "ewEntity",
  "ewEntityJ1",
  "ewEntityJ2",
  "tempoEntity",
  "tempoEntityInfo",
  "tempoEntityJ0",
  "tempoEntityJ1",
  "detailedComparisonEntity",
];

/** Maps a raw Tempo state to its colour class suffix. */
export const TEMPO_VALUES = new Map([
  ["unknown", "grey"],
  ["Inconnu", "grey"],
  ["BLUE", "blue"],
  ["WHITE", "white"],
  ["RED", "red"],
]);

/** Default Tempo "today" sensor used by the auto-detection heuristic. */
export const DEFAULT_TEMPO_ENTITY = "sensor.rte_tempo_today";

/** Default entity for the "today vs yesterday" detailed comparison section. */
export const DEFAULT_DETAILED_COMPARISON_ENTITY = "sensor.linky_consumption_last5day";

/** Default card configuration, merged with the user config in `setConfig`. */
export const DEFAULT_CONFIG = {
  showHistory: true,
  showHeader: true,
  showPeakOffPeak: true,
  showIcon: false,
  showInTableUnit: false,
  showDayPrice: false,
  showDayPriceHCHP: false,
  showDayMaxPower: false,
  showDayHCHP: false,
  showDayName: "long",
  showError: true,
  showInformation: true,
  showPrice: true,
  showTitle: false,
  showSmartInsights: true,
  showYearRatio: false,
  showCurrentMonthRatio: true,
  showMonthRatio: true,
  showWeekRatio: false,
  showYesterdayRatio: false,
  showTitleLign: false,
  showEcoWatt: false,
  showEcoWattJ12: false,
  showTempo: false,
  showTempoColor: true,
  showWeekSummary: true,
  showMonthlyView: true,
  showYearlyView: true,
  showDetailedComparison: true,
  detailedComparisonEntity: DEFAULT_DETAILED_COMPARISON_ENTITY,
  tempoEntity: DEFAULT_TEMPO_ENTITY,
  titleName: "LINKY",
  nbJoursAffichage: "7",
  kWhPrice: undefined,
};
