import { css } from "lit";

// All styles for the Linky content card. Extracted verbatim from the
// component so the card class stays focused on behaviour.
export const styles = css`
  .card {
    margin: auto;
    padding: 1.5em 1em 1em 1em;
    position: relative;
    cursor: pointer;
    background: var(--ha-card-background, var(--card-background-color, var(--primary-background-color)));
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(--ha-card-box-shadow, 0 4px 8px 0 rgba(0, 0, 0, 0.1));
    transition: all 0.3s ease;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: var(--ha-card-box-shadow, 0 8px 16px 0 rgba(0, 0, 0, 0.15));
  }

  /* Desktop - masquer les titres mobiles */
  .titre-mobile {
    display: none;
  }
  .titre-desktop {
    display: inline;
  }

  @media (max-width: 768px) {
    .card {
      padding: 2em 1em 1em 1em;
    }
    .main-title {
      font-size: 1.8em;
    }
    .conso-hp,
    .conso-hc {
      font-size: 1.8em;
    }
    /* Titres colonnes plus petits sur tablette */
    .day {
      font-size: 0.9em;
    }
    /* Afficher titres mobiles sur tablette */
    .titre-mobile {
      display: inline;
    }
    .titre-desktop {
      display: none;
    }
    /* Réduire la taille des textes de pourcentage */
    .year,
    .previous-month,
    .current-month {
      font-size: 0.7em !important;
    }
    .variations-linky {
      font-size: 0.9em;
    }
    .percentage-value {
      font-size: 1em;
    }
  }

  @media (max-width: 480px) {
    .card {
      padding: 2.2em 0.8em 1em 0.8em;
    }
    .main-title {
      font-size: 1.6em;
    }
    .conso-hp,
    .conso-hc {
      font-size: 1.6em;
    }
    /* Titres colonnes encore plus petits sur mobile */
    .day {
      font-size: 0.8em;
      line-height: 1.6;
    }
    /* S'assurer que les titres mobiles sont affichés */
    .titre-mobile {
      display: inline;
    }
    .titre-desktop {
      display: none;
    }
    /* Ajuster les textes de pourcentage sur mobile */
    .year,
    .previous-month,
    .current-month {
      font-size: 0.75em !important;
      white-space: nowrap;
    }
    .variations-linky {
      font-size: 0.8em;
    }
    .percentage-value {
      font-size: 0.9em;
    }
    /* Forcer le nowrap pour éviter les retours à la ligne */
    .tooltip {
      white-space: nowrap;
    }
  }

  ha-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .main-title {
    margin: auto;
    text-align: center;
    font-weight: 200;
    font-size: 2em;
    justify-content: space-between;
  }
  .main-info {
    display: flex;
    overflow: visible;
    align-items: center;
    justify-content: space-between;
    min-height: 75px;
    padding: 1em;
    background: linear-gradient(135deg, var(--primary-color, #1976d2), var(--accent-color, #03dac6));
    border-radius: 12px;
    margin-bottom: 1em;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .ha-icon {
    margin-right: 5px;
    color: var(--state-icon-color);
  }

  .cout {
    font-weight: 300;
    font-size: clamp(2.5em, 5vw, 3.5em);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .cout.estimated {
    color: #ff6b6b !important;
    font-style: italic !important;
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

  .cout-unit {
    font-weight: 300;
    font-size: 1.2em;
    display: inline-block;
    white-space: nowrap;
  }

  .conso-hp,
  .conso-hc {
    font-weight: 200;
    font-size: 2em;
  }

  .conso-unit-hc,
  .conso-unit-hp {
    font-weight: 100;
    font-size: 1em;
    white-space: nowrap;
  }

  .more-unit {
    font-style: italic;
    font-size: 0.8em;
  }

  .variations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 0.5em;
    overflow: hidden;
    margin-bottom: 1em;
  }

  .variations-linky {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 300;
    margin: 0;
    overflow: hidden;
    text-align: center;
    background: var(--ha-card-background, var(--card-background-color, white));
    border-radius: 8px;
    padding: 0.5em;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  .variations-linky:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .percentage-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin-bottom: 2px;
  }

  .percentage-line ha-icon {
    transition: transform 0.3s ease;
  }

  .variations-linky:hover .percentage-line ha-icon {
    transform: scale(1.2);
  }

  .percentage-value {
    font-weight: 500;
    font-size: 1.1em;
  }

  .variations-linky .percentage-value.percentage-positive {
    color: var(--error-color, var(--red-color, #e74c3c));
  }

  .variations-linky .percentage-value.percentage-negative {
    color: var(--success-color, var(--green-color, #27ae60));
  }

  .variations-linky .percentage-value.percentage-neutral {
    color: var(--primary-text-color, var(--text-primary-color, #212121));
  }

  .unit {
    font-size: 0.8em;
  }

  .week-history {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    background: var(--ha-card-background, var(--card-background-color, white));
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-top: 0.5em;
    scroll-behavior: smooth;
  }

  .day {
    flex: auto;
    text-align: center;
    border-right: 0.1em solid var(--divider-color);
    line-height: 2;
    box-sizing: border-box;
    transition: all 0.2s ease;
    padding: 0.5em 0.2em;
  }

  .day:hover {
    background: var(--primary-color, #1976d2);
    color: white;
    transform: scale(1.02);
  }

  .dayname {
    font-weight: bold;
    text-transform: capitalize;
  }

  .week-history .day:last-child {
    border-right: none;
  }

  .cons-val {
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .cons-val.estimated {
    color: #ff6b6b !important;
    font-style: italic !important;
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
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }

  .year {
    font-size: 0.8em;
    font-style: italic;
    margin-left: 5px;
  }
  .previous-month {
    font-size: 0.8em;
    font-style: italic;
    margin-left: 5px;
  }
  .current-month {
    font-size: 0.8em;
    font-style: italic;
    margin-left: 5px;
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
  .tooltip .tooltiptext {
    visibility: hidden;
    background: var(--ha-card-background, var(--card-background-color, var(--primary-background-color)));
    box-shadow: var(--ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2));
    cursor: default;
    font-size: 14px;
    opacity: 1;
    pointer-events: none;
    position: absolute;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 12;
    transition: 0.15s ease all;
    padding: 5px;
    border: 1px solid var(--divider-color, var(--outline-color, #e0e0e0));
    border-radius: 3px;
  }
  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--divider-color, var(--outline-color, #555)) transparent transparent transparent;
  }
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  .flow-row {
    display: flex;
    flex-flow: row wrap;
  }
  /* One Hour Forecast */
  .oneHour {
    height: 1em;
  }
  .oneHour > li {
    background-color: var(--state-icon-color);
    border-right: 1px solid var(--lovelace-background, var(--primary-background-color));
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
  /* One Hour Labels */
  .ecowatt-00,
  .ecowatt-01,
  .ecowatt-02,
  .ecowatt-03,
  .ecowatt-04,
  .ecowatt-05,
  .ecowatt-06,
  .ecowatt-07 {
    flex: 2 1 0;
  }
  .ecowatt-08,
  .ecowatt-09,
  .ecowatt-10,
  .ecowatt-11,
  .ecowatt-12,
  .ecowatt-13,
  .ecowatt-14,
  .ecowatt-15 {
    flex: 2 1 0;
  }
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
  /* One Hour Header */
  .oneHourHeader {
    justify-content: space-between;
  }
  .oneHourHeader li:last-child {
    text-align: right;
  }
  .tempo-days {
    width: 100%;
    border-spacing: 2px;
  }
  .tempo-color {
    width: 100%;
    border-spacing: 2px;
  }
  .tempoborder-color {
    width: 100%;
    border-spacing: 2px;
  }
  .tempo-blue {
    color: white;
    text-align: center;
    background: var(--accent-color, var(--primary-color, #009dfa));
    border: 2px solid var(--divider-color);
    box-shadow: var(--ha-card-box-shadow, none);
    text-transform: capitalize;
  }
  .tempoday-blue {
    color: white !important;
    background: var(--accent-color, var(--primary-color, #009dfa)) !important;
    font-weight: bold;
    text-align: center;
    box-shadow: var(--ha-card-box-shadow, none);
    text-transform: capitalize;
    border-radius: 4px;
    padding: 2px 4px;
    margin: 1px;
  }
  .tempo-white {
    color: var(--text-primary-color, var(--primary-text-color, #002654));
    text-align: center;
    background: white;
    border: 2px solid var(--divider-color);
    box-shadow: var(--ha-card-box-shadow, none);
    text-transform: capitalize;
  }
  .tempoday-white {
    color: #002654 !important;
    background: white !important;
    border: 1px solid #ccc !important;
    font-weight: bold;
    text-align: center;
    text-transform: capitalize;
    border-radius: 4px;
    padding: 2px 4px;
    margin: 1px;
  }
  .tempoday-grey {
    color: white !important;
    background: grey !important;
    font-weight: bold;
    text-align: center;
    text-transform: capitalize;
    border-radius: 4px;
    padding: 2px 4px;
    margin: 1px;
  }
  .tempo-red {
    color: white;
    text-align: center;
    background: var(--error-color, var(--red-color, #ff2700));
    border: 2px solid var(--divider-color);
    box-shadow: var(--ha-card-box-shadow, none);
    text-transform: capitalize;
  }
  .tempoday-red {
    color: white !important;
    background: var(--error-color, var(--red-color, #ff2700)) !important;
    font-weight: bold;
    text-align: center;
    box-shadow: var(--ha-card-box-shadow, none);
    text-transform: capitalize;
    border-radius: 4px;
    padding: 2px 4px;
    margin: 1px;
  }
  .tempo-grey {
    color: var(--text-primary-color, var(--primary-text-color, #002654));
    text-align: center;
    background: grey;
    border: 2px solid var(--divider-color);
    box-shadow: var(--ha-card-box-shadow, none);
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
    text-transform: capitalize;
  }

  /* Week Summary Card */
  .week-summary-card {
    background: linear-gradient(135deg, var(--primary-color, #1976d2) 0%, var(--accent-color, #03dac6) 100%);
    border-radius: 12px;
    padding: 1em;
    margin-bottom: 1em;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }

  .week-summary-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  .week-summary-header {
    display: flex;
    align-items: center;
    gap: 0.5em;
    margin-bottom: 0.5em;
  }

  .week-summary-icon {
    font-size: 1.2em;
    opacity: 0.9;
  }

  .week-summary-title {
    font-weight: 500;
    font-size: 1.1em;
  }

  .week-summary-period {
    font-size: 0.9em;
    opacity: 0.8;
    margin-left: auto;
  }

  .week-summary-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
  }

  .week-summary-main {
    display: flex;
    align-items: baseline;
    gap: 0.3em;
  }

  .week-summary-value {
    font-size: 2.5em;
    font-weight: 300;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .week-summary-unit {
    font-size: 1.2em;
    opacity: 0.9;
  }

  .week-summary-cost {
    display: flex;
    align-items: baseline;
    gap: 0.2em;
    text-align: center;
  }

  .week-summary-cost-value {
    font-size: 1.8em;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    white-space: nowrap;
  }

  .week-summary-cost-unit {
    font-size: 1.2em;
    opacity: 0.9;
    white-space: nowrap;
  }

  /* Smart Insights */
  .smart-insights {
    margin-top: 1em;
  }

  .insight-row {
    display: flex;
    gap: 1.5em;
    flex-wrap: wrap;
  }

  .insight-item {
    display: flex;
    align-items: center;
    gap: 0.5em;
    flex: 1;
    min-width: 140px;
  }

  .insight-icon {
    font-size: 1.1em;
    opacity: 0.9;
  }

  .insight-content {
    display: flex;
    flex-direction: column;
  }

  .insight-label {
    font-size: 0.7em;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .insight-value {
    font-size: 0.9em;
    font-weight: 500;
    margin-top: 2px;
  }

  /* Responsive improvements */
  @media (max-width: 768px) {
    .variations {
      grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
      gap: 0.3em;
    }

    .week-summary-value {
      font-size: 2em;
    }

    .week-summary-cost-value {
      font-size: 1.5em;
    }

    .week-summary-header {
      flex-wrap: wrap;
    }

    .week-summary-period {
      margin-left: 0;
      order: 3;
      flex: 100%;
    }

    .week-summary-content {
      gap: 0.5em;
    }
  }

  @media (max-width: 480px) {
    .variations {
      grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
      gap: 0.2em;
    }

    .week-summary-card {
      padding: 0.8em;
    }

    .week-summary-value {
      font-size: 1.8em;
    }

    .week-summary-cost-value {
      font-size: 1.3em;
    }

    .week-summary-content {
      flex-direction: row !important;
      justify-content: space-between !important;
      align-items: center !important;
      gap: 0.5em;
    }

    .week-summary-cost {
      margin-top: 0.2em;
    }
  }

  /* Dark mode improvements */
  @media (prefers-color-scheme: dark) {
    .week-summary-card {
      background: linear-gradient(135deg, var(--primary-color, #2196f3) 0%, var(--accent-color, #00bcd4) 100%);
    }

    .variations-linky {
      background: var(--ha-card-background, var(--card-background-color, #1e1e1e));
      border: 1px solid var(--divider-color, #333);
    }

    .week-history {
      background: var(--ha-card-background, var(--card-background-color, #1e1e1e));
      border: 1px solid var(--divider-color, #333);
    }

    .day:hover {
      background: var(--primary-color, #2196f3);
    }
  }

  /* Container queries for better responsive design */
  @container (max-width: 400px) {
    .variations {
      grid-template-columns: 1fr;
      gap: 0.2em;
    }

    .week-summary-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.2em;
    }

    .week-summary-period {
      margin-left: 0;
    }
  }

  /* Enhanced animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .week-summary-card,
  .variations-linky,
  .week-history {
    animation: fadeInUp 0.3s ease-out;
  }

  .variations-linky:nth-child(2) {
    animation-delay: 0.1s;
  }
  .variations-linky:nth-child(3) {
    animation-delay: 0.2s;
  }
  .variations-linky:nth-child(4) {
    animation-delay: 0.3s;
  }
  .variations-linky:nth-child(5) {
    animation-delay: 0.4s;
  }

  /* Focus states for accessibility */
  .variations-linky:focus,
  .day:focus {
    outline: 2px solid var(--accent-color, #03dac6);
    outline-offset: 2px;
  }

  /* Wrapper for tempo day styling */
  .tempo-day-wrapper {
    display: inline-block;
    width: 100%;
  }

  /* Force tempo colors to override any conflicting styles */
  .tempo-day-wrapper .tempoday-blue,
  .tempo-day-wrapper .tempoday-white,
  .tempo-day-wrapper .tempoday-red,
  .tempo-day-wrapper .tempoday-grey {
    all: unset;
    display: inline-block !important;
    text-align: center !important;
    font-weight: bold !important;
    text-transform: capitalize !important;
    border-radius: 4px !important;
    padding: 2px 4px !important;
    margin: 1px !important;
    box-sizing: border-box !important;
  }

  .tempo-day-wrapper .tempoday-blue {
    color: white !important;
    background: #009dfa !important;
  }

  .tempo-day-wrapper .tempoday-white {
    color: #002654 !important;
    background: white !important;
    border: 1px solid #ccc !important;
  }

  .tempo-day-wrapper .tempoday-red {
    color: white !important;
    background: #ff2700 !important;
  }

  .tempo-day-wrapper .tempoday-grey {
    color: white !important;
    background: #666 !important;
  }

  /* Collapsible sections styles */
  .collapsible-section {
    margin-top: 1em;
    border-radius: 12px;
    background: var(--ha-card-background, var(--card-background-color, white));
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .collapsible-header {
    padding: 0.6em 1em;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5em;
    background: var(--primary-color, #1976d2);
    color: white;
    transition: background-color 0.2s ease;
    user-select: none;
    min-height: auto;
  }

  .collapsible-header:hover {
    background: var(--primary-color-light, #2196f3);
  }

  .collapsible-header ha-icon {
    transition: transform 0.3s ease;
  }

  .section-title {
    font-weight: bold;
    font-size: 1em;
    flex-grow: 1;
  }

  .section-summary {
    font-size: 0.8em;
    opacity: 0.9;
  }

  .collapsible-content {
    overflow: hidden;
    transition:
      max-height 0.3s ease-out,
      padding 0.3s ease-out;
  }

  .collapsible-content.collapsed {
    max-height: 0;
    padding: 0 1em;
  }

  .collapsible-content.expanded {
    max-height: 1000px;
    padding: 1em;
  }

  .month-history,
  .year-history {
    display: grid;
    gap: 0.5em;
  }

  .month-item,
  .year-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1em;
    padding: 0.5em;
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
    align-items: center;
  }

  .month-name,
  .year-name {
    font-weight: bold;
    color: var(--primary-text-color, #333);
  }

  .month-value,
  .year-value {
    text-align: center;
    font-size: 1.1em;
    color: var(--accent-color, #03dac6);
  }

  .month-cost,
  .year-cost {
    text-align: right;
    font-weight: bold;
    color: var(--primary-color, #1976d2);
  }

  .month-evolution,
  .year-evolution {
    text-align: right;
    font-size: 0.9em;
  }

  .evolution-percent {
    font-weight: bold;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.85em;
  }

  .evolution-percent.positive {
    color: #d32f2f;
    background-color: rgba(211, 47, 47, 0.1);
  }

  .evolution-percent.negative {
    color: #388e3c;
    background-color: rgba(56, 142, 60, 0.1);
  }

  @media (max-width: 768px) {
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

    .collapsible-header {
      padding: 0.5em 0.8em;
      font-size: 0.9em;
    }

    .section-title {
      font-size: 0.9em;
    }

    .section-summary {
      font-size: 0.75em;
    }
  }

  @media (prefers-color-scheme: dark) {
    .collapsible-section {
      background: var(--ha-card-background, var(--card-background-color, #1e1e1e));
      border: 1px solid var(--divider-color, #333);
    }

    .month-item,
    .year-item {
      background: var(--secondary-background-color, #2e2e2e);
    }
  }

  /* Detailed comparison styles */
  .detailed-comparison {
    padding: 1em 0;
  }

  .comparison-charts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    margin-bottom: 1em;
  }

  .chart-day {
    text-align: center;
  }

  .chart-day h4 {
    margin: 0 0 0.5em 0;
    font-size: 0.9em;
    color: var(--primary-text-color, #333);
  }

  .mini-chart {
    height: 60px;
    margin-bottom: 0.5em;
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
    padding: 0.5em;
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
  }

  .day-stats .total {
    font-weight: bold;
    color: var(--primary-color, #1976d2);
  }

  .day-stats .peak {
    color: var(--accent-color, #03dac6);
  }

  .comparison-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    padding-top: 1em;
    border-top: 1px solid var(--divider-color, #ddd);
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.5em;
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
  }

  .stat-item ha-icon {
    width: 20px;
    height: 20px;
  }

  .stat-item .label {
    flex-grow: 1;
    font-size: 0.9em;
    color: var(--secondary-text-color, #666);
  }

  .stat-item .value {
    font-weight: bold;
    font-size: 1em;
  }

  .stat-item.evolution.increase {
    border-left: 4px solid #f44336;
  }

  .stat-item.evolution.increase .value {
    color: #f44336;
  }

  .stat-item.evolution.decrease {
    border-left: 4px solid #4caf50;
  }

  .stat-item.evolution.decrease .value {
    color: #4caf50;
  }

  .stat-item.evolution.stable {
    border-left: 4px solid #9e9e9e;
  }

  .stat-item.evolution.stable .value {
    color: #9e9e9e;
  }

  @media (max-width: 768px) {
    .comparison-charts {
      grid-template-columns: 1fr;
      gap: 0.5em;
    }

    .comparison-stats {
      grid-template-columns: 1fr;
      gap: 0.5em;
    }
  }

  @media (prefers-color-scheme: dark) {
    .mini-chart {
      background: var(--secondary-background-color, #2e2e2e);
    }

    .stat-item {
      background: var(--secondary-background-color, #2e2e2e);
    }
  }
`;
