// To add a language: (1) create src/translations/<lang>.json with full key parity
// against en.json, (2) import it below, (3) add it to the TRANSLATIONS map.
import en from "../translations/en.json";
import fr from "../translations/fr.json";
import type { HomeAssistant } from "../types";

type TranslationDict = Record<string, unknown>;

const TRANSLATIONS: Record<string, TranslationDict> = { en, fr };
const DEFAULT_LANG = "en";

function pickLang(hass?: HomeAssistant): string {
  const raw = hass?.locale?.language || hass?.language || DEFAULT_LANG;
  const short = String(raw).toLowerCase().split("-")[0];
  return TRANSLATIONS[short] ? short : DEFAULT_LANG;
}

function lookup(dict: TranslationDict, key: string): unknown {
  return key.split(".").reduce<any>((acc, part) => (acc && acc[part] != null ? acc[part] : undefined), dict);
}

export function localize(
  hass: HomeAssistant | undefined,
  key: string,
  replacements: Record<string, unknown> = {},
): string {
  const lang = pickLang(hass);
  const value = lookup(TRANSLATIONS[lang], key) ?? lookup(TRANSLATIONS[DEFAULT_LANG], key) ?? key;
  if (typeof value !== "string") return key;
  return value.replace(/\{(\w+)\}/g, (_match, name: string) =>
    replacements[name] != null ? String(replacements[name]) : `{${name}}`,
  );
}
