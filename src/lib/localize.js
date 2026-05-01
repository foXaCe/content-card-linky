import en from "../translations/en.json";
import fr from "../translations/fr.json";

const TRANSLATIONS = { en, fr };
const DEFAULT_LANG = "en";

function pickLang(hass) {
  const raw = hass?.locale?.language || hass?.language || DEFAULT_LANG;
  const short = String(raw).toLowerCase().split("-")[0];
  return TRANSLATIONS[short] ? short : DEFAULT_LANG;
}

function lookup(dict, key) {
  return key.split(".").reduce((acc, part) => (acc && acc[part] != null ? acc[part] : undefined), dict);
}

export function localize(hass, key, replacements = {}) {
  const lang = pickLang(hass);
  const value = lookup(TRANSLATIONS[lang], key) ?? lookup(TRANSLATIONS[DEFAULT_LANG], key) ?? key;
  if (typeof value !== "string") return key;
  return value.replace(/\{(\w+)\}/g, (_, name) =>
    replacements[name] != null ? String(replacements[name]) : `{${name}}`,
  );
}
