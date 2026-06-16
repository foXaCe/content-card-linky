import { LitElement, html, css } from "lit";
import { fireEvent } from "./lib/fire-event.js";
import { localize } from "./lib/localize.js";

const SENSOR = { entity: { domain: "sensor" } };
const BOOL = { boolean: {} };

const SCHEMA = [
  {
    type: "expandable",
    title: "section.general",
    expanded: true,
    schema: [
      {
        type: "grid",
        schema: [
          { name: "titleName", selector: { text: {} } },
          { name: "kWhPrice", selector: { number: { min: 0, step: 0.0001, mode: "box" } } },
          {
            name: "nbJoursAffichage",
            selector: {
              select: {
                mode: "dropdown",
                options: ["1", "2", "3", "4", "5", "6", "7"].map((v) => ({ value: v, label: `${v}` })),
              },
            },
          },
          {
            name: "showDayName",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "long", label: "__day_name.long" },
                  { value: "short", label: "__day_name.short" },
                  { value: "narrow", label: "__day_name.narrow" },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: "expandable",
    title: "section.linky",
    expanded: true,
    schema: [{ name: "entity", required: true, selector: SENSOR }],
  },
  {
    type: "expandable",
    title: "section.ecowatt",
    schema: [
      {
        type: "grid",
        schema: [
          { name: "ewEntity", selector: SENSOR },
          { name: "ewEntityJ1", selector: SENSOR },
          { name: "ewEntityJ2", selector: SENSOR },
        ],
      },
    ],
  },
  {
    type: "expandable",
    title: "section.tempo",
    schema: [
      {
        type: "grid",
        schema: [
          { name: "tempoEntityInfo", selector: SENSOR },
          { name: "tempoEntityJ0", selector: SENSOR },
          { name: "tempoEntityJ1", selector: SENSOR },
          { name: "tempoEntity", selector: SENSOR },
        ],
      },
    ],
  },
  {
    type: "expandable",
    title: "section.display",
    schema: [
      {
        type: "grid",
        schema: [
          { name: "showIcon", selector: BOOL },
          { name: "showTitle", selector: BOOL },
          { name: "showHeader", selector: BOOL },
          { name: "showError", selector: BOOL },
          { name: "showInformation", selector: BOOL },
        ],
      },
    ],
  },
  {
    type: "expandable",
    title: "section.history",
    schema: [
      {
        type: "grid",
        schema: [
          { name: "showHistory", selector: BOOL },
          { name: "showWeekSummary", selector: BOOL },
          { name: "showInTableUnit", selector: BOOL },
          { name: "showTitleLign", selector: BOOL },
        ],
      },
    ],
  },
  {
    type: "expandable",
    title: "section.price",
    schema: [
      {
        type: "grid",
        schema: [
          { name: "showPrice", selector: BOOL },
          { name: "showDayPrice", selector: BOOL },
          { name: "showDayPriceHCHP", selector: BOOL },
        ],
      },
    ],
  },
  {
    type: "expandable",
    title: "section.peak_offpeak",
    schema: [
      {
        type: "grid",
        schema: [
          { name: "showPeakOffPeak", selector: BOOL },
          { name: "showDayHCHP", selector: BOOL },
        ],
      },
    ],
  },
  {
    type: "expandable",
    title: "section.max_power",
    schema: [{ name: "showDayMaxPower", selector: BOOL }],
  },
  {
    type: "expandable",
    title: "section.insights",
    schema: [
      {
        type: "grid",
        schema: [
          { name: "showSmartInsights", selector: BOOL },
          { name: "showYearRatio", selector: BOOL },
          { name: "showCurrentMonthRatio", selector: BOOL },
          { name: "showMonthRatio", selector: BOOL },
          { name: "showWeekRatio", selector: BOOL },
          { name: "showYesterdayRatio", selector: BOOL },
        ],
      },
    ],
  },
  {
    type: "expandable",
    title: "section.ecowatt_tempo",
    schema: [
      {
        type: "grid",
        schema: [
          { name: "showEcoWatt", selector: BOOL },
          { name: "showEcoWattJ12", selector: BOOL },
          { name: "showTempo", selector: BOOL },
          { name: "showTempoColor", selector: BOOL },
        ],
      },
    ],
  },
  {
    type: "expandable",
    title: "section.temporal",
    schema: [
      {
        type: "grid",
        schema: [
          { name: "showMonthlyView", selector: BOOL },
          { name: "showYearlyView", selector: BOOL },
          { name: "showDetailedComparison", selector: BOOL },
        ],
      },
      { name: "detailedComparisonEntity", selector: SENSOR },
    ],
  },
];

const DEFAULTS = {
  titleName: "LINKY",
  nbJoursAffichage: "7",
  showDayName: "long",
  detailedComparisonEntity: "sensor.linky_consumption_last5day",
};

export class ContentCardLinkyEditor extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config) {
    this._config = { ...config };
  }

  _computeLabel = (schema) => {
    if (schema.title) {
      return localize(this.hass, `editor.${schema.title}`);
    }
    if (schema.name) {
      return localize(this.hass, `editor.field.${schema.name}`);
    }
    return "";
  };

  _localizeSchema(schema) {
    return schema.map((field) => {
      if (field.type === "expandable") {
        return { ...field, schema: this._localizeSchema(field.schema) };
      }
      if (field.type === "grid") {
        return { ...field, schema: this._localizeSchema(field.schema) };
      }
      if (field.selector?.select?.options) {
        return {
          ...field,
          selector: {
            select: {
              ...field.selector.select,
              options: field.selector.select.options.map((opt) => ({
                value: opt.value,
                label:
                  typeof opt.label === "string" && opt.label.startsWith("__")
                    ? localize(this.hass, `editor.${opt.label.slice(2)}`)
                    : opt.label,
              })),
            },
          },
        };
      }
      return field;
    });
  }

  render() {
    if (!this.hass || !this._config) return html``;

    const data = { ...DEFAULTS, ...this._config };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${this._localizeSchema(SCHEMA)}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  _valueChanged(ev) {
    if (!this._config) return;
    const next = { ...ev.detail.value };

    // Strip values that match defaults to keep YAML clean
    for (const [key, def] of Object.entries(DEFAULTS)) {
      if (next[key] === def && this._config[key] === undefined) {
        delete next[key];
      }
    }

    // Drop empty strings (entity pickers cleared)
    for (const key of Object.keys(next)) {
      if (next[key] === "" || next[key] === null || next[key] === undefined) {
        delete next[key];
      }
    }

    fireEvent(this, "config-changed", { config: next });
  }

  static styles = css`
    ha-form {
      display: block;
    }
  `;
}

customElements.define("content-card-linky-editor", ContentCardLinkyEditor);
