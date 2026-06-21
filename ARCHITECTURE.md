# Architecture

`content-card-linky` is a [Lit](https://lit.dev/) custom card for Home
Assistant that renders Linky / MyElectricalData consumption data. It is built
with Rollup into two ES bundles under `dist/` (the card and its lazily-loaded
visual editor).

## Module layout

```
src/
├── content-card-linky.ts        # The <content-card-linky> element: lifecycle,
│                                 #   setConfig, render() orchestration only.
├── content-card-linky-editor.ts # The <content-card-linky-editor> (ha-form schema).
├── const.ts                     # ENTITY_CONFIG_KEYS, TEMPO_VALUES, DEFAULT_CONFIG.
├── styles.ts                    # The full CSS (exported `styles` css template).
├── lib/
│   ├── calculations.ts          # Pure data helpers (week totals, gradients,
│   │                            #   seasonal theme, time-series parsing,
│   │                            #   estimateMissingKwh, EcoWatt parsing).
│   ├── format.ts                # toFloat() + localeOf() (locale resolution).
│   ├── a11y.ts                  # onActivate() — Enter/Space keyboard helper.
│   ├── fire-event.ts            # DOM CustomEvent helper.
│   └── localize.ts              # Translation lookup (en/fr) with placeholders.
├── translations/
│   ├── en.json                  # Source of truth.
│   └── fr.json                  # Full parity, vouvoiement.
└── renderers/                   # One module per visual section. Pure functions
    │                            #   `(hass, config, attributes, …) => TemplateResult`.
    ├── header.ts                # Title, icon, consumption/HC-HP header, price,
    │                            #   production-mode value.
    ├── variations.ts            # Evolution % tiles (year/month/week/day, HP%).
    ├── smart-insights.ts        # Monthly forecast + trend tiles.
    ├── week-summary.ts          # "Current week" running total card.
    ├── history.ts               # Per-day history table + cell renderers + tempo
    │                            #   colour resolution.
    ├── temporal-views.ts        # Collapsible monthly & yearly comparisons.
    ├── messages.ts              # Error / migration / version notices.
    ├── ecowatt.ts               # EcoWatt forecast rows.
    ├── tempo.ts                 # Tempo day colours + remaining days.
    └── detailed-comparison.ts   # "Today vs yesterday" charts (modern + legacy).
```

## Data flow

```
Home Assistant
   │  hass.states[config.entity].attributes  (daily, dailyweek, *_evolution, …)
   ▼
content-card-linky.ts  render()
   │  passes (hass, config, attributes) to each renderer
   ▼
renderers/*.ts  → lit-html TemplateResult
   │  pure helpers from lib/* (calculations, format) and localize()
   ▼
Shadow DOM (styled by styles.ts)
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

1. Create `src/renderers/<section>.ts` exporting
   `renderSection(hass, config, attributes, …)` returning a `TemplateResult`
   (return `html``` to render nothing when its `config.show*` flag is off).
2. Import it in `content-card-linky.ts` and call it inside `render()`.
3. Add any new `show*` default to `DEFAULT_CONFIG` in `const.ts` and the
   corresponding field/selector to the editor schema in
   `content-card-linky-editor.ts`.
4. Add a `test/render/<section>.test.ts` using `renderTpl()` from
   `test/render/setup.ts`.

### Add a translated string

1. Add the key under `card.*` in **both** `translations/en.json` (source of
   truth) and `translations/fr.json` (vouvoiement).
2. Use `localize(hass, "card.<path>", { placeholder })` in the renderer.
3. Never hardcode user-facing text; never rename public config keys (they are a
   stability contract with users' YAML — like entity `unique_id`s).

### Add a date/time-formatted value

Use `localeOf(hass)` from `lib/format.ts` as the locale argument to
`toLocaleDateString` / `toLocaleTimeString` so the value follows the HA
frontend language. If a renderer branches on the current date, accept an
optional `now = new Date()` parameter (as `renderWeekSummary`/`renderHistory`
do) so tests can inject a fixed clock.

### Add a clickable (non-native) control

For a `<div>`/`<span>` that acts as a button, add `role="button"`,
`tabindex="0"`, `aria-expanded` (if it toggles), and
`@keydown=${onActivate(handler)}` (from `lib/a11y.ts`) alongside `@click`, so
keyboard users can activate it with Enter/Space.

## Build & test

- `npm run build` → `dist/content-card-linky.js` + `dist/content-card-linky-editor.js`
  (the editor is an external lazy chunk; `dist/icons/linky.svg` is shipped for
  the `/local/community/content-card-linky/icons/linky.svg` reference).
- `npm test` / `npm run test:coverage` → Vitest + happy-dom. Coverage spans all
  of `src/` (excluding the pure-CSS `styles.ts`).
- `dist/` is committed and CI-verified to be in sync with `src/`.
