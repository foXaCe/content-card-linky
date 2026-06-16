import { html } from "lit";
import { localize } from "../lib/localize.js";

/**
 * Inline error banner shown when the entity reports a last-call error.
 * @param {object} config - card configuration
 * @param {string} errorMsg - the error message (empty string = no error)
 * @returns {import("lit").TemplateResult | undefined}
 */
export function renderError(config, errorMsg) {
  if (config.showError === true) {
    if (errorMsg !== "") {
      return html`
        <div class="error-msg" style="color: var(--error-color, red)">
          <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
          ${errorMsg}
        </div>
      `;
    }
  }
}

/**
 * Notice prompting the user to migrate to MyElectricalData.
 * @param {object} hass - Home Assistant object
 * @param {object} config - card configuration
 * @param {object} attributes - main entity attributes
 * @returns {import("lit").TemplateResult | undefined}
 */
export function renderInformation(hass, config, attributes) {
  if (config.showInformation === false) {
    return html``;
  }
  if (attributes.serviceEnedis === undefined) {
    return html``;
  }
  if (attributes.serviceEnedis !== "myElectricalData") {
    return html`
      <div class="information-msg" style="color: var(--error-color, red)">
        <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
        ${localize(hass, "card.migrate_med")}
      </div>
    `;
  }
}

/**
 * Notice shown when a newer card version is available.
 * @param {object} hass - Home Assistant object
 * @param {boolean} versionUpdateAvailable - whether an update exists
 * @param {string} versionGit - the available version string
 * @returns {import("lit").TemplateResult}
 */
export function renderVersion(hass, versionUpdateAvailable, versionGit) {
  if (versionUpdateAvailable === true) {
    return html`
      <div class="information-msg" style="color: var(--error-color, red)">
        <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
        ${localize(hass, "card.version_available", { version: versionGit })}
      </div>
    `;
  }
  return html``;
}
