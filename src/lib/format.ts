import type { HomeAssistant } from "../types";

/**
 * Format a value as a fixed-decimal number, falling back to an en-dash
 * when the value is not numeric.
 *
 * @param value - the raw value to format
 * @param decimals - number of decimal places
 * @returns the formatted number, or "–" when not a number
 */
export function toFloat(value: unknown, decimals = 1): string {
  const n = Number.parseFloat(value as string);
  return isNaN(n) ? "–" : n.toFixed(decimals);
}

/**
 * Resolve the BCP-47 locale to use for date/time formatting, derived from the
 * Home Assistant frontend language. Falls back to English (matches localize's
 * DEFAULT_LANG so text and dates share the same no-locale default).
 *
 * @param hass - the Home Assistant object
 * @returns a locale tag, e.g. "en", "fr-FR", "de"
 */
export function localeOf(hass?: HomeAssistant): string {
  return hass?.locale?.language || "en";
}
