import { html } from "lit";
import { localize } from "../lib/localize";
import type { HomeAssistant, ContentCardLinkyConfig, LinkyAttributes, TemplateResult } from "../types";

/**
 * Inline error banner shown when the entity reports a last-call error.
 * @param errorMsg - the error message (empty string = no error)
 */
export function renderError(config: ContentCardLinkyConfig, errorMsg: string | undefined): TemplateResult | undefined {
  if (config.showError === true) {
    if (errorMsg) {
      return html`
        <div class="error-msg" style="color: var(--error-color, red)">
          <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
          ${errorMsg}
        </div>
      `;
    }
  }
  return undefined;
}

/**
 * Notice prompting the user to migrate to MyElectricalData.
 */
export function renderInformation(
  hass: HomeAssistant,
  config: ContentCardLinkyConfig,
  attributes: LinkyAttributes,
): TemplateResult | undefined {
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
  return undefined;
}

/**
 * Notice shown when a newer card version is available.
 * @param versionUpdateAvailable - whether an update exists
 * @param versionGit - the available version string
 */
export function renderVersion(
  hass: HomeAssistant,
  versionUpdateAvailable: boolean,
  versionGit: string,
): TemplateResult {
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
