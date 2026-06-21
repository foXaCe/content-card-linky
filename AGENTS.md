# AGENTS.md

Guidance for AI agents and new contributors working in this repo. Human-facing
detail lives in `ARCHITECTURE.md` and `CONTRIBUTING.md`; this file is the
quick, load-bearing summary.

## What this is

A Lit 3 + TypeScript custom dashboard card for Home Assistant
(`content-card-linky`) that renders French Linky / MyElectricalData
electricity-meter data. Purely presentational — no fetching, no persistence.

## Golden rules

- **Never edit `dist/` by hand.** Edit `src/`, then `npm run build`, then commit
  the regenerated `dist/` together with your `src/` change. CI fails if `dist/`
  is out of sync.
- **Never rename a public config key** (anything under `ContentCardLinkyConfig`
  in `src/types.ts` that a user sets in YAML). They are a stability contract.
- **Never hardcode user-facing text.** Use `localize(hass, "card.<path>", {...})`
  and add the key to BOTH `src/translations/en.json` and `src/translations/fr.json`.
- **Do not auto-commit, push, or open PRs, and never add an AI co-author
  trailer.** The repo owner controls all git actions.

## Verify loop (must pass before considering work done)

| Step | Command |
|---|---|
| Typecheck | `npm run typecheck` |
| Lint | `npm run lint` |
| Format | `npm run format:check` (fix with `npm run format`) |
| Test + coverage | `npm run test:coverage` (thresholds 95/90/95/95) |
| Build | `npm run build` |
| dist in sync | `git status --porcelain dist/` → empty |

CI runs all of the above on Node 20 and 22.

## Architecture in one breath

`content-card-linky.ts` (the element: setConfig, shouldUpdate, render
orchestration) composes pure renderers from `src/renderers/*` — each a function
`(hass, config, attributes, now?) => TemplateResult` that returns `html\`\`` when
its `show*` flag is off. Shared helpers live in `src/lib/` (`calculations`,
`format`, `localize`, `a11y`, `fire-event`). The visual editor is
`content-card-linky-editor.ts` (lazy-loaded ha-form). All CSS is one template in
`styles.ts`.

## Conventions

- Date/time formatting: use `localeOf(hass)` from `src/lib/format.ts` as the
  locale, so output follows the HA frontend language.
- Date-dependent renderers accept an injectable `now = new Date()` so tests can
  pin a clock (see `renderWeekSummary`, `renderHistory`).
- Tests: Vitest + happy-dom under `test/`; render tests use `renderTpl()` from
  `test/render/setup.ts`. New renderer ⇒ new `test/render/<section>.test.ts`.
- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
- Dependencies are managed by Renovate (not Dependabot).

See `ARCHITECTURE.md` for the full module map and extension-point recipes.
