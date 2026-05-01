# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.1] - 2026-05-01

### Fixed
- **Detailed comparison ("Aujourd'hui vs Hier")** now supports the modern
  MyElectricalData `last5day` time-series format (`time[]` + `consumption[]`).
  Previously the section displayed a `Attributs disponibles: time, consumption, ...`
  debug fallback when the entity used the new attribute shape. Closes #6.
- **"Semaine en cours" totals**: corrected an off-by-one in
  `calculateWeekTotal` / `calculateWeekCost`. The loop now sums Monday
  through yesterday (the original intent) instead of Tuesday through today.
  Visible effect: the weekly total will match what users expect — biggest
  shift on Saturdays, no shift on Mondays.

### Changed
- **Editor**: rewritten on top of `ha-form` schema (-45% code, ~530 → 292 lines).
  All 36 options preserved, with native HA selectors, dark-mode styling and
  fully localized labels (EN/FR).
- **Renderers extracted**: `renderEcoWatt`, `renderTempo` and
  `renderDetailedComparison` moved out of the 2900-line monolith into
  dedicated modules under `src/renderers/`. `content-card-linky.js` is now
  ~2500 lines (-15%). Behaviour preserved.
- **Pure calculation helpers** moved to `src/lib/calculations.js` so they
  can be tested without DOM (`safeRound`, week totals, gradient/season
  themes, EcoWatt parser, last5day time-series parser).

### Tests
- Added a Vitest harness with 54 tests:
  - 43 unit tests on the pure helpers in `src/lib/`.
  - 11 happy-dom render tests on the LitElement (custom element registration,
    `getCardSize` / `getGridOptions`, locale fallback, "data unavailable"
    state, async `getStubConfig`, detailed-comparison legacy and modern
    formats).
- CI now runs `npm test` before `npm run build`.

### Security
- Bumped `@rollup/plugin-terser` to `^1.0.0` (fixes the
  `serialize-javascript` advisory carried by 0.x).
- Bumped `vitest` to `^4.1.5` to pull `vite ^6.4.2` (fixes path-traversal
  and `esbuild` dev-server advisories — dev-only impact).
- Bumped `softprops/action-gh-release` to `v3` in the release workflow.

## [1.7.0] - 2026-05-01

### Added
- EN/FR translations via `hass.locale` (new `src/translations/{en,fr}.json` and `src/lib/localize.js`)
- Home Assistant 2024.7+ *section view* support: `getGridOptions()` and `getLayoutOptions()`
- `getStubConfig(hass)` is now async and auto-detects an available Linky sensor
- Console banner with the card version on load
- Card version is injected at build time from `package.json` (single source of truth)
- Modern build pipeline with Rollup (Lit 3 bundled, terser minification, version injection)
- Source layout reorganized: editable code now lives in `src/`, `dist/` is generated
- CI now builds and verifies `dist/` is in sync with `src/`
- Release workflow now builds before attaching artifacts

### Changed
- Replaced the brittle `Object.getPrototypeOf(customElements.get("ha-panel-lovelace"))` hack with a direct Lit import
- `shouldUpdate` now observes every configured entity (`ewEntity*`, `tempo*`, `detailedComparisonEntity`), not only the main one
- `getCardSize()` is now dynamic, based on enabled sections
- `fireEvent` factored into a shared helper (`src/lib/fire-event.js`)
- Hardcoded `color: red` replaced with `var(--error-color, red)` for theme compatibility
- Visible strings (HC/HP labels, "Semaine en cours", error/version banners) are now localized
- Locale-aware date formatting in the weekly summary (uses `hass.locale.language`)

### Fixed
- Card no longer fails to refresh when EcoWatt, Tempo or detailed-comparison entities change
- Version mismatch between `package.json` (1.6.2) and `customCards.push({ version: "1.6.1" })`

### Security
- Bumped `@rollup/plugin-terser` to `^1.0.0` (fixes `serialize-javascript` advisory carried by 0.x)

## [1.6.2] - 2026-03-19

### Fixed
- Daily total price showing "– €" when both `showDayPrice` and `showDayPriceHCHP` are enabled
- Price decimal precision (1 → 2 decimals) for consistency with HC/HP display

### Changed
- Pinned hacs/action to v22.5.0 in CI workflow
- Bumped minimatch from 3.1.2 to 3.1.5 (security)

## [1.6.0] - 2025-01-23

### Added
- Weekly summary card with kWh and cost totals
- Modern UI redesign with gradients and seasonal themes
- Smart insights with week vs previous week comparison
- Collapsible monthly and yearly views
- Detailed today vs yesterday comparison with evolution percentages
- Horizontal scroll for day columns with auto-scroll
- kWh estimation when price data is available but consumption missing
- Tempo day colors with configurable entity
- Preview support for Home Assistant card picker
- `showInformation` toggle option in editor
- `kWhPrice` field in configuration UI

### Changed
- Modernized configuration interface with French translations
- Improved theming and accessibility with better color variables
- Moved temporal views outside renderHistory for independence
- Improved production mode display with proper pending/error states
- Updated EnedisGateway deprecation message

### Fixed
- `toString.split()` missing parentheses in renderDayMaxPowerTime
- `showInformation` typo in default config
- Custom element registration to prevent redefinition errors
- HTML structure in renderSwitchOption
- Weekly total calculation to include kWh estimations
- Monthly prediction calculation with real data
- Evolution attribute names to match entity attributes
- Zero kWh consumption display issue
- Mobile display issues with header text clipping
- Tempo color detection with proper entity configuration
- Editor crash with null config checks

### Removed
- Dead code (`r_enderTitreLigne` function)
- Debug console.log statements
- Cache buster comments
