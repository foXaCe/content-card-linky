# Architecture

`content-card-linky` is a [Lit](https://lit.dev/) custom card for Home
Assistant that renders Linky / MyElectricalData consumption data. It is built
with Rollup into two ES bundles under `dist/` (the card and its lazily-loaded
visual editor).

## Module layout

```
src/
├── content-card-linky.js        # The <content-card-linky> element: lifecycle,
│                                 #   setConfig, render() orchestration only.
├── content-card-linky-editor.js # The <content-card-linky-editor> (ha-form schema).
├── const.js                     # ENTITY_CONFIG_KEYS, TEMPO_VALUES, DEFAULT_CONFIG.
├── styles.js                    # The full CSS (exported `styles` css template).
├── lib/
│   ├── calculations.js          # Pure data helpers (week totals, gradients,
│   │                            #   seasonal theme, time-series parsing,
│   │                            #   estimateMissingKwh, EcoWatt parsing).
│   ├── format.js                # toFloat() + localeOf() (locale resolution).
│   ├── a11y.js                  # onActivate() — Enter/Space keyboard helper.
│   ├── fire-event.js            # DOM CustomEvent helper.
│   └── localize.js              # Translation lookup (en/fr) with placeholders.
├── translations/
│   ├── en.json                  # Source of truth.
│   └── fr.json                  # Full parity, vouvoiement.
└── renderers/                   # One module per visual section. Pure functions
    │                            #   `(hass, config, attributes, …) => TemplateResult`.
    ├── header.js                # Title, icon, consumption/HC-HP header, price,
    │                            #   production-mode value.
    ├── variations.js            # Evolution % tiles (year/month/week/day, HP%).
    ├── smart-insights.js        # Monthly forecast + trend tiles.
    ├── week-summary.js          # "Current week" running total card.
    ├── history.js               # Per-day history table + cell renderers + tempo
    │                            #   colour resolution.
    ├── temporal-views.js        # Collapsible monthly & yearly comparisons.
    ├── messages.js              # Error / migration / version notices.
    ├── ecowatt.js               # EcoWatt forecast rows.
    ├── tempo.js                 # Tempo day colours + remaining days.
    └── detailed-comparison.js   # "Today vs yesterday" charts (modern + legacy).
```

## Data flow

```
Home Assistant
   │  hass.states[config.entity].attributes  (daily, dailyweek, *_evolution, …)
   ▼
content-card-linky.js  render()
   │  passes (hass, config, attributes) to each renderer
   ▼
renderers/*.js  → lit-html TemplateResult
   │  pure helpers from lib/* (calculations, format) and localize()
   ▼
Shadow DOM (styled by styles.js)
```

The card holds no fetched state of its own: Home Assistant pushes a fresh
`hass` object, `shouldUpdate` (via `hasConfigOrEntityChanged`) decides whether
any configured entity changed, and `render()` re-composes the renderers.

Renderers are **pure**: they receive everything they need as arguments and
return a `TemplateResult`. The only stateful bits live on the element:
`_monthlyExpanded`, `_yearlyExpanded`, `_detailedExpanded` (collapsible
sections), toggled by `toggle*` methods passed into the relevant renderers as
`onToggle` callbacks.

## Extension points

### Add a new section/renderer

1. Create `src/renderers/<section>.js` exporting
   `renderSection(hass, config, attributes, …)` returning a `TemplateResult`
   (return `html``` to render nothing when its `config.show*` flag is off).
2. Import it in `content-card-linky.js` and call it inside `render()`.
3. Add any new `show*` default to `DEFAULT_CONFIG` in `const.js` and the
   corresponding field/selector to the editor schema in
   `content-card-linky-editor.js`.
4. Add a `test/render/<section>.test.js` using `renderTpl()` from
   `test/render/setup.js`.

### Add a translated string

1. Add the key under `card.*` in **both** `translations/en.json` (source of
   truth) and `translations/fr.json` (vouvoiement).
2. Use `localize(hass, "card.<path>", { placeholder })` in the renderer.
3. Never hardcode user-facing text; never rename public config keys (they are a
   stability contract with users' YAML — like entity `unique_id`s).

### Add a date/time-formatted value

Use `localeOf(hass)` from `lib/format.js` as the locale argument to
`toLocaleDateString` / `toLocaleTimeString` so the value follows the HA
frontend language. If a renderer branches on the current date, accept an
optional `now = new Date()` parameter (as `renderWeekSummary`/`renderHistory`
do) so tests can inject a fixed clock.

### Add a clickable (non-native) control

For a `<div>`/`<span>` that acts as a button, add `role="button"`,
`tabindex="0"`, `aria-expanded` (if it toggles), and
`@keydown=${onActivate(handler)}` (from `lib/a11y.js`) alongside `@click`, so
keyboard users can activate it with Enter/Space.

## Build & test

- `npm run build` → `dist/content-card-linky.js` + `dist/content-card-linky-editor.js`
  (the editor is an external lazy chunk; `dist/icons/linky.svg` is shipped for
  the `/local/community/content-card-linky/icons/linky.svg` reference).
- `npm test` / `npm run test:coverage` → Vitest + happy-dom. Coverage spans all
  of `src/` (excluding the pure-CSS `styles.js`).
- `dist/` is committed and CI-verified to be in sync with `src/`.
