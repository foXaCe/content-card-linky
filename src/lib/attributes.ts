// Shared helpers for reading Linky/MyElectricalData attribute values, which arrive
// as comma-separated strings indexed by a 1-based day number.

/**
 * Return the Nth (1-based) cell of a comma-separated attribute. Null-safe:
 * returns undefined when the attribute is null/undefined or the cell is absent.
 */
export function dayCell(attr: unknown, dayNumber: number): string | undefined {
  if (attr === null || attr === undefined) return undefined;
  return attr.toString().split(",")[dayNumber - 1];
}

/**
 * Parse a French-decimal numeric string ("1,50" → 1.5). Returns NaN for
 * non-numeric / null / undefined input (same as the inline parseFloat sites).
 */
export function parseFrenchNumber(value: unknown): number {
  return parseFloat(String(value ?? "").replace(",", "."));
}
