/**
 * Format a value as a fixed-decimal number, falling back to an en-dash
 * when the value is not numeric.
 *
 * @param {*} value - the raw value to format
 * @param {number} [decimals=1] - number of decimal places
 * @returns {string} the formatted number, or "–" when not a number
 */
export function toFloat(value, decimals = 1) {
  const n = Number.parseFloat(value);
  return isNaN(n) ? "–" : n.toFixed(decimals);
}

/**
 * Resolve the BCP-47 locale to use for date/time formatting, derived from the
 * Home Assistant frontend language. Falls back to French (the card's origin).
 *
 * @param {object} [hass] - the Home Assistant object
 * @returns {string} a locale tag, e.g. "fr-FR", "en", "de"
 */
export function localeOf(hass) {
  return hass?.locale?.language || "fr-FR";
}
