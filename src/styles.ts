import { css } from "lit";

// All styles for the Linky content card. Premium Apple-HIG-inspired refresh:
// every colour is derived from the active Home Assistant theme via
// `color-mix(in oklab, …)`, depth comes from multi-layer shadows, motion uses
// spring easing, and the card adapts to its own width through container
// queries. Tempo (blue/white/red) and EcoWatt (green/yellow/red) keep literal
// colours on purpose — they are semantic data signals, not decoration.
export const styles = css`
  :host {
    display: block;
    container-type: inline-size;

    /* Spacing — geometric scale */
    --p-space-1: 4px;
    --p-space-2: 8px;
    --p-space-3: 12px;
    --p-space-4: 16px;
    --p-space-5: 20px;
    --p-space-6: 24px;
    --p-space-8: 32px;

    /* Radius — Apple-rounded */
    --p-radius-xs: 8px;
    --p-radius-sm: 10px;
    --p-radius-md: 14px;
    --p-radius-lg: 18px;
    --p-radius-xl: 24px;
    --p-radius-full: 9999px;

    /* Typography — system stack (no web fonts) */
    --p-font:
      -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, "Helvetica Neue", sans-serif;
    --p-letter-tight: -0.022em;
    --p-letter-normal: -0.011em;

    /* Colours — all derived from the active HA theme */
    --p-fg-1: var(--primary-text-color, #1c1c1e);
    --p-fg-2: var(--secondary-text-color, #6b6b70);
    --p-fg-3: var(--disabled-text-color, #9b9ba1);
    --p-accent: var(--primary-color, #1976d2);
    --p-surface: var(--ha-card-background, var(--card-background-color, #fff));
    --p-surface-1: color-mix(in oklab, var(--p-surface) 96%, var(--p-fg-1));
    --p-surface-2: color-mix(in oklab, var(--p-surface) 92%, var(--p-fg-1));
    --p-divider: color-mix(in oklab, var(--p-fg-1) 12%, transparent);
    --p-success: var(--success-color, var(--green-color, #2e9e5b));
    --p-error: var(--error-color, var(--red-color, #e5484d));
    --p-warning: var(--warning-color, #f5a623);
    --p-accent-wash: color-mix(in oklab, var(--p-accent) 12%, var(--p-surface));
    --p-accent-wash-2: color-mix(in oklab, var(--p-accent) 5%, var(--p-surface));

    /* Multi-layer shadows (theme-adaptive tint) */
    --p-elev-1:
      0 1px 2px color-mix(in oklab, var(--p-fg-1) 6%, transparent),
      0 1px 3px color-mix(in oklab, var(--p-fg-1) 5%, transparent);
    --p-elev-2:
      0 2px 6px color-mix(in oklab, var(--p-fg-1) 8%, transparent),
      0 8px 24px color-mix(in oklab, var(--p-fg-1) 7%, transparent);
    --p-elev-pressed: inset 0 1px 2px color-mix(in oklab, var(--p-fg-1) 10%, transparent);

    /* Motion — spring physics */
    --p-motion-fast: 150ms cubic-bezier(0.32, 0.72, 0, 1);
    --p-motion-normal: 240ms cubic-bezier(0.32, 0.72, 0, 1);
    --p-motion-spring: 480ms cubic-bezier(0.22, 1.2, 0.36, 1);

    /* Liquid Glass */
    --p-blur-glass: saturate(160%) blur(18px);
    --p-glass-border: 1px solid color-mix(in oklab, var(--p-fg-1) 10%, transparent);
  }

  ha-card {
    --ha-card-border-radius: var(--p-radius-xl);
    overflow: hidden;
    isolation: isolate;
  }

  .card {
    margin: auto;
    padding: var(--p-space-5) var(--p-space-4) var(--p-space-4);
    position: relative;
    cursor: pointer;
    background: transparent;
    color: var(--p-fg-1);
    font-family: var(--p-font);
  }

  ha-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* ── Title ───────────────────────────────────────────────────────── */
  .main-title {
    margin: auto;
    text-align: center;
    font-weight: 600;
    font-size: 1.6em;
    letter-spacing: var(--p-letter-tight);
    color: var(--p-fg-1);
  }

  /* ── Hero (consumption header) — subtle accent wash + glass edge ──── */
  .main-info {
    display: flex;
    overflow: visible;
    align-items: center;
    justify-content: space-between;
    gap: var(--p-space-4);
    min-height: 72px;
    padding: var(--p-space-5);
    background: linear-gradient(135deg, var(--p-accent-wash), var(--p-accent-wash-2));
    border: var(--p-glass-border);
    border-radius: var(--p-radius-lg);
    margin-bottom: var(--p-space-4);
    color: var(--p-fg-1);
    box-shadow: var(--p-elev-1);
  }

  .icon-block {
    display: flex;
    align-items: center;
  }

  .ha-icon {
    margin-right: 5px;
    color: var(--p-accent);
  }

  .cout {
    font-weight: 600;
    font-size: clamp(2.2em, 5vw, 3.2em);
    letter-spacing: var(--p-letter-tight);
    font-variant-numeric: tabular-nums;
    color: var(--p-fg-1);
  }

  .cout.estimated {
    color: var(--p-warning);
    font-style: italic;
    position: relative;
  }

  .cout.estimated::before {
    content: "~";
    font-weight: bold;
    margin-right: 2px;
  }

  .cout.estimated::after {
    content: "est.";
    font-size: 0.3em;
    opacity: 0.8;
    margin-left: 4px;
    font-weight: normal;
    position: absolute;
    top: 0.2em;
  }

  .cout.pending {
    color: var(--p-warning);
    font-style: italic;
  }

  .cout-unit {
    font-weight: 400;
    font-size: 1.1em;
    display: inline-block;
    white-space: nowrap;
    color: var(--p-fg-2);
  }

  .conso-hp,
  .conso-hc {
    font-weight: 600;
    font-size: 1.9em;
    letter-spacing: var(--p-letter-tight);
    font-variant-numeric: tabular-nums;
  }

  .conso-unit-hc,
  .conso-unit-hp {
    font-weight: 400;
    font-size: 1em;
    white-space: nowrap;
    color: var(--p-fg-2);
  }

  .more-unit {
    font-style: italic;
    font-size: 0.8em;
  }

  /* ── Variation tiles ─────────────────────────────────────────────── */
  .variations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: var(--p-space-2);
    overflow: hidden;
    margin-bottom: var(--p-space-4);
  }

  .variations-linky {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 500;
    margin: 0;
    overflow: hidden;
    text-align: center;
    background: var(--p-surface-1);
    border: 1px solid var(--p-divider);
    border-radius: var(--p-radius-md);
    padding: var(--p-space-2);
    box-shadow: var(--p-elev-1);
    transition:
      transform var(--p-motion-normal),
      box-shadow var(--p-motion-normal);
  }

  .variations-linky:hover {
    transform: translateY(-2px);
    box-shadow: var(--p-elev-2);
  }

  .percentage-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin-bottom: 2px;
  }

  .percentage-line ha-icon {
    transition: transform var(--p-motion-fast);
  }

  .variations-linky:hover .percentage-line ha-icon {
    transform: scale(1.15);
  }

  .percentage-value {
    font-weight: 600;
    font-size: 1.1em;
    font-variant-numeric: tabular-nums;
  }

  .variations-linky .percentage-value.percentage-positive {
    color: var(--p-error);
  }

  .variations-linky .percentage-value.percentage-negative {
    color: var(--p-success);
  }

  .variations-linky .percentage-value.percentage-neutral {
    color: var(--p-fg-1);
  }

  .unit {
    font-size: 0.8em;
    color: var(--p-fg-2);
  }

  /* ── Weekly history table ────────────────────────────────────────── */
  .week-history {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    background: var(--p-surface-1);
    border: 1px solid var(--p-divider);
    border-radius: var(--p-radius-lg);
    box-shadow: var(--p-elev-1);
    margin-top: var(--p-space-2);
    scroll-behavior: smooth;
  }

  .day {
    flex: auto;
    text-align: center;
    border-right: 1px solid var(--p-divider);
    line-height: 2;
    box-sizing: border-box;
    transition:
      background var(--p-motion-fast),
      color var(--p-motion-fast);
    padding: var(--p-space-2);
  }

  .day:hover {
    background: var(--p-accent-wash);
  }

  .dayname {
    font-weight: 600;
    text-transform: capitalize;
  }

  .week-history .day:last-child {
    border-right: none;
  }

  .cons-val {
    font-weight: 600;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .cons-val.estimated {
    color: var(--p-warning);
    font-style: italic;
    position: relative;
  }

  .cons-val.estimated::before {
    content: "~";
    font-weight: bold;
    margin-right: 2px;
  }

  .cons-val.estimated::after {
    content: "est.";
    font-size: 0.7em;
    opacity: 0.8;
    margin-left: 2px;
    font-weight: normal;
  }

  .cons-val.pending {
    color: var(--p-warning);
    animation: pulse 1.8s cubic-bezier(0.32, 0.72, 0, 1) infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.55;
    }
    100% {
      opacity: 1;
    }
  }

  .year,
  .previous-month,
  .current-month {
    font-size: 0.8em;
    font-style: italic;
    margin-left: 5px;
    color: var(--p-fg-2);
  }

  .linky-icon.bigger {
    width: 6em;
    height: 5em;
    display: inline-block;
  }

  .error {
    font-size: 0.8em;
    font-weight: bold;
    margin-left: 5px;
  }

  /* ── Tooltips ────────────────────────────────────────────────────── */
  .tooltip .tooltiptext {
    visibility: hidden;
    background: var(--p-surface);
    box-shadow: var(--p-elev-2);
    cursor: default;
    font-size: 14px;
    opacity: 1;
    pointer-events: none;
    position: absolute;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 12;
    transition: opacity var(--p-motion-fast);
    padding: var(--p-space-2);
    border: 1px solid var(--p-divider);
    border-radius: var(--p-radius-sm);
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--p-divider) transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  /* ── EcoWatt forecast bars (semantic colours) ────────────────────── */
  .flow-row {
    display: flex;
    flex-flow: row wrap;
  }
  .oneHour {
    height: 1em;
  }
  .oneHour > li {
    background-color: var(--p-fg-3);
    border-right: 1px solid var(--p-surface);
  }
  .oneHour > li:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .oneHour > li:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 0;
  }
  .ecowatt-00,
  .ecowatt-01,
  .ecowatt-02,
  .ecowatt-03,
  .ecowatt-04,
  .ecowatt-05,
  .ecowatt-06,
  .ecowatt-07,
  .ecowatt-08,
  .ecowatt-09,
  .ecowatt-10,
  .ecowatt-11,
  .ecowatt-12,
  .ecowatt-13,
  .ecowatt-14,
  .ecowatt-15,
  .ecowatt-16,
  .ecowatt-17,
  .ecowatt-18,
  .ecowatt-19,
  .ecowatt-20,
  .ecowatt-21,
  .ecowatt-22,
  .ecowatt-23 {
    flex: 2 1 0;
  }

  .oneHourLabel > li:first-child {
    flex: 0.7 1 0;
  }
  .oneHourLabel > li {
    flex: 1 1 0;
    text-align: left;
  }
  .oneHourHeader {
    justify-content: space-between;
  }
  .oneHourHeader li:last-child {
    text-align: right;
  }

  /* ── Tempo (semantic EDF blue / white / red) ─────────────────────── */
  .tempo-days,
  .tempo-color,
  .tempoborder-color {
    width: 100%;
    border-spacing: 4px;
  }
  .tempo-blue,
  .tempo-white,
  .tempo-red,
  .tempo-grey {
    text-align: center;
    text-transform: capitalize;
    border-radius: var(--p-radius-sm);
    font-variant-numeric: tabular-nums;
  }
  .tempo-blue {
    color: #fff;
    background: #2274d6;
  }
  .tempo-white {
    color: #1a2a4a;
    background: #f4f6fb;
    border: 1px solid var(--p-divider);
  }
  .tempo-red {
    color: #fff;
    background: #e5342b;
  }
  .tempo-grey {
    color: #1a2a4a;
    background-image: linear-gradient(
      45deg,
      #d6d6d6 25%,
      #dedede 25%,
      #dedede 50%,
      #d6d6d6 50%,
      #d6d6d6 75%,
      #dedede 75%,
      #dedede 100%
    );
    background-size: 28.28px 28.28px;
  }

  /* Wrapper for per-day tempo chips */
  .tempo-day-wrapper {
    display: inline-block;
    width: 100%;
  }
  .tempo-day-wrapper .tempoday-blue,
  .tempo-day-wrapper .tempoday-white,
  .tempo-day-wrapper .tempoday-red,
  .tempo-day-wrapper .tempoday-grey {
    all: unset;
    display: inline-block;
    text-align: center;
    font-weight: 600;
    text-transform: capitalize;
    border-radius: var(--p-radius-xs);
    padding: 2px 6px;
    margin: 1px;
    box-sizing: border-box;
  }
  .tempo-day-wrapper .tempoday-blue {
    color: #fff;
    background: #2274d6;
  }
  .tempo-day-wrapper .tempoday-white {
    color: #1a2a4a;
    background: #f4f6fb;
    border: 1px solid var(--p-divider);
  }
  .tempo-day-wrapper .tempoday-red {
    color: #fff;
    background: #e5342b;
  }
  .tempo-day-wrapper .tempoday-grey {
    color: #fff;
    background: #7d7d83;
  }

  /* ── Week summary hero — glass + seasonal accent ─────────────────── */
  .week-summary-card {
    position: relative;
    background: linear-gradient(135deg, var(--p-accent-wash), var(--p-accent-wash-2));
    border: var(--p-glass-border);
    border-radius: var(--p-radius-lg);
    padding: var(--p-space-4);
    margin-bottom: var(--p-space-4);
    color: var(--p-fg-1);
    box-shadow: var(--p-elev-1);
    backdrop-filter: var(--p-blur-glass);
    -webkit-backdrop-filter: var(--p-blur-glass);
    transition:
      transform var(--p-motion-normal),
      box-shadow var(--p-motion-normal);
  }

  .week-summary-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--p-elev-2);
  }

  .week-summary-header {
    display: flex;
    align-items: center;
    gap: var(--p-space-2);
    margin-bottom: var(--p-space-2);
  }

  .week-summary-icon {
    font-size: 1.2em;
    color: var(--p-accent);
  }

  .week-summary-title {
    font-weight: 600;
    font-size: 1.05em;
    letter-spacing: var(--p-letter-normal);
  }

  .week-summary-period {
    font-size: 0.85em;
    color: var(--p-fg-2);
    margin-left: auto;
  }

  .week-summary-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--p-space-4);
  }

  .week-summary-main {
    display: flex;
    align-items: baseline;
    gap: var(--p-space-1);
  }

  .week-summary-value {
    font-size: 2.4em;
    font-weight: 600;
    letter-spacing: var(--p-letter-tight);
    font-variant-numeric: tabular-nums;
  }

  .week-summary-unit {
    font-size: 1.1em;
    color: var(--p-fg-2);
  }

  .week-summary-cost {
    display: flex;
    align-items: baseline;
    gap: var(--p-space-1);
    text-align: center;
  }

  .week-summary-cost-value {
    font-size: 1.7em;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .week-summary-cost-unit {
    font-size: 1.1em;
    color: var(--p-fg-2);
    white-space: nowrap;
  }

  /* ── Smart insights ──────────────────────────────────────────────── */
  .smart-insights {
    margin-top: var(--p-space-4);
  }

  .insight-row {
    display: flex;
    gap: var(--p-space-6);
    flex-wrap: wrap;
  }

  .insight-item {
    display: flex;
    align-items: center;
    gap: var(--p-space-2);
    flex: 1;
    min-width: 140px;
  }

  .insight-icon {
    font-size: 1.1em;
    color: var(--p-accent);
  }

  .insight-icon.trend-good {
    color: var(--p-success);
  }
  .insight-icon.trend-bad {
    color: var(--p-error);
  }

  .insight-content {
    display: flex;
    flex-direction: column;
  }

  .insight-label {
    font-size: 0.7em;
    color: var(--p-fg-2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .insight-value {
    font-size: 0.9em;
    font-weight: 600;
    margin-top: 2px;
    font-variant-numeric: tabular-nums;
  }

  .insight-value.trend-good {
    color: var(--p-success);
  }
  .insight-value.trend-bad {
    color: var(--p-error);
  }

  /* ── Collapsible sections ────────────────────────────────────────── */
  .collapsible-section {
    margin-top: var(--p-space-4);
    border-radius: var(--p-radius-lg);
    background: var(--p-surface-1);
    border: 1px solid var(--p-divider);
    box-shadow: var(--p-elev-1);
    overflow: hidden;
  }

  .collapsible-header {
    padding: var(--p-space-3) var(--p-space-4);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--p-space-2);
    background: var(--p-accent-wash);
    color: var(--p-fg-1);
    transition: background var(--p-motion-fast);
    user-select: none;
  }

  .collapsible-header:hover {
    background: color-mix(in oklab, var(--p-accent) 18%, var(--p-surface));
  }

  .collapsible-header ha-icon {
    transition: transform var(--p-motion-normal);
    color: var(--p-accent);
  }

  .section-title {
    font-weight: 600;
    font-size: 1em;
    flex-grow: 1;
    letter-spacing: var(--p-letter-normal);
  }

  .section-summary {
    font-size: 0.8em;
    color: var(--p-fg-2);
    font-variant-numeric: tabular-nums;
  }

  .collapsible-content {
    overflow: hidden;
    transition:
      max-height var(--p-motion-normal),
      padding var(--p-motion-normal);
  }

  .collapsible-content.collapsed {
    max-height: 0;
    padding: 0 var(--p-space-4);
  }

  .collapsible-content.expanded {
    max-height: 1000px;
    padding: var(--p-space-4);
  }

  .month-history,
  .year-history {
    display: grid;
    gap: var(--p-space-2);
  }

  .month-item,
  .year-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--p-space-4);
    padding: var(--p-space-2);
    background: var(--p-surface-2);
    border-radius: var(--p-radius-sm);
    align-items: center;
  }

  .month-name,
  .year-name {
    font-weight: 600;
    color: var(--p-fg-1);
  }

  .month-value,
  .year-value {
    text-align: center;
    font-size: 1.1em;
    color: var(--p-fg-1);
    font-variant-numeric: tabular-nums;
  }

  .month-cost,
  .year-cost {
    text-align: right;
    font-weight: 600;
    color: var(--p-accent);
  }

  .month-evolution,
  .year-evolution {
    text-align: right;
    font-size: 0.9em;
  }

  .evolution-percent {
    font-weight: 600;
    padding: 0.2em 0.5em;
    border-radius: var(--p-radius-xs);
    font-size: 0.85em;
    font-variant-numeric: tabular-nums;
  }

  .evolution-percent.positive {
    color: var(--p-error);
    background-color: color-mix(in oklab, var(--p-error) 12%, transparent);
  }

  .evolution-percent.negative {
    color: var(--p-success);
    background-color: color-mix(in oklab, var(--p-success) 12%, transparent);
  }

  /* ── Detailed comparison ─────────────────────────────────────────── */
  .detailed-comparison {
    padding: var(--p-space-4) 0;
  }

  .comparison-charts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--p-space-4);
    margin-bottom: var(--p-space-4);
  }

  .chart-day {
    text-align: center;
  }

  .chart-day h4 {
    margin: 0 0 var(--p-space-2) 0;
    font-size: 0.9em;
    color: var(--p-fg-2);
    font-weight: 600;
  }

  .mini-chart {
    height: 60px;
    margin-bottom: var(--p-space-2);
    background: var(--p-surface-2);
    border-radius: var(--p-radius-sm);
    padding: var(--p-space-2);
  }

  .consumption-chart {
    width: 100%;
    height: 100%;
  }

  .day-stats {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    font-size: 0.8em;
    font-variant-numeric: tabular-nums;
  }

  .day-stats .total {
    font-weight: 600;
    color: var(--p-fg-1);
  }

  .day-stats .peak {
    color: var(--p-fg-2);
  }

  .comparison-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--p-space-4);
    padding-top: var(--p-space-4);
    border-top: 1px solid var(--p-divider);
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: var(--p-space-2);
    padding: var(--p-space-2);
    background: var(--p-surface-2);
    border-radius: var(--p-radius-sm);
  }

  .stat-item ha-icon {
    width: 20px;
    height: 20px;
  }

  .stat-item .label {
    flex-grow: 1;
    font-size: 0.9em;
    color: var(--p-fg-2);
  }

  .stat-item .value {
    font-weight: 600;
    font-size: 1em;
    font-variant-numeric: tabular-nums;
  }

  .stat-item.evolution.increase {
    border-left: 3px solid var(--p-error);
  }
  .stat-item.evolution.increase .value {
    color: var(--p-error);
  }
  .stat-item.evolution.decrease {
    border-left: 3px solid var(--p-success);
  }
  .stat-item.evolution.decrease .value {
    color: var(--p-success);
  }
  .stat-item.evolution.stable {
    border-left: 3px solid var(--p-fg-3);
  }
  .stat-item.evolution.stable .value {
    color: var(--p-fg-2);
  }

  /* ── Messages ────────────────────────────────────────────────────── */
  .error-msg,
  .information-msg {
    display: flex;
    align-items: center;
    gap: var(--p-space-2);
    margin-top: var(--p-space-3);
    padding: var(--p-space-2) var(--p-space-3);
    border-radius: var(--p-radius-sm);
    background: color-mix(in oklab, var(--p-error) 8%, transparent);
    color: var(--p-error);
    font-size: 0.9em;
  }

  #states .name {
    display: flex;
    align-items: center;
    gap: var(--p-space-2);
    color: var(--p-fg-2);
  }

  /* ── Skeleton (loading) ──────────────────────────────────────────── */
  .skeleton {
    background: linear-gradient(
      100deg,
      color-mix(in oklab, var(--p-fg-1) 6%, transparent) 30%,
      color-mix(in oklab, var(--p-fg-1) 12%, transparent) 50%,
      color-mix(in oklab, var(--p-fg-1) 6%, transparent) 70%
    );
    background-size: 200% 100%;
    animation: shimmer 1.4s linear infinite;
    border-radius: var(--p-radius-sm);
  }
  @keyframes shimmer {
    to {
      background-position: -200% 0;
    }
  }

  /* ── Focus states (accessibility) ────────────────────────────────── */
  .variations-linky:focus-visible,
  .day:focus-visible,
  .collapsible-header:focus-visible {
    outline: 2px solid var(--p-accent);
    outline-offset: 3px;
    border-radius: var(--p-radius-sm);
  }

  /* ── Responsive (container queries — the card knows its own width) ── */
  .titre-mobile {
    display: none;
  }
  .titre-desktop {
    display: inline;
  }

  @container (max-width: 480px) {
    .titre-mobile {
      display: inline;
    }
    .titre-desktop {
      display: none;
    }
    .main-title {
      font-size: 1.4em;
    }
    .conso-hp,
    .conso-hc {
      font-size: 1.6em;
    }
    .day {
      font-size: 0.85em;
    }
    .year,
    .previous-month,
    .current-month {
      font-size: 0.72em;
      white-space: nowrap;
    }
    .variations {
      grid-template-columns: repeat(auto-fit, minmax(56px, 1fr));
      gap: var(--p-space-1);
    }
    .variations-linky {
      font-size: 0.85em;
    }
    .week-summary-value {
      font-size: 1.9em;
    }
    .week-summary-cost-value {
      font-size: 1.4em;
    }
    .comparison-charts,
    .comparison-stats {
      grid-template-columns: 1fr;
      gap: var(--p-space-2);
    }
    .month-item,
    .year-item {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 0.3em;
    }
    .month-value,
    .year-value,
    .month-cost,
    .year-cost {
      text-align: center;
    }
  }

  @container (min-width: 481px) and (max-width: 768px) {
    .day {
      font-size: 0.9em;
    }
    .variations {
      grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
    }
  }

  /* ── Appearance: minimal (opt-out of glass + animation) ──────────── */
  :host([data-appearance="minimal"]) .week-summary-card {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: var(--p-surface-1);
  }
  :host([data-appearance="minimal"]) .main-info {
    background: var(--p-surface-1);
  }
  :host([data-appearance="minimal"]) .cons-val.pending,
  :host([data-appearance="minimal"]) .skeleton {
    animation: none;
  }

  /* ── Reduced motion ──────────────────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    :host {
      --p-motion-fast: 1ms;
      --p-motion-normal: 1ms;
      --p-motion-spring: 1ms;
    }
    .cons-val.pending,
    .skeleton {
      animation: none;
    }
    * {
      scroll-behavior: auto !important;
    }
  }
`;
