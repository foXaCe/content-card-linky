# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
