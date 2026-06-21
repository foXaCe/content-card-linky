// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { makeHass } from "./setup";
import { ContentCardLinkyEditor } from "../../src/content-card-linky-editor";

beforeEach(() => {
  document.body.innerHTML = "";
});

async function mountEditor(config = { entity: "sensor.x" }, hass = makeHass()) {
  const el = new ContentCardLinkyEditor();
  el.setConfig(config);
  el.hass = hass;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe("ContentCardLinkyEditor", () => {
  it("registers as a custom element", () => {
    expect(customElements.get("content-card-linky-editor")).toBeDefined();
  });

  it("renders an ha-form once configured", async () => {
    const el = await mountEditor();
    expect(el.shadowRoot.querySelector("ha-form")).toBeTruthy();
  });

  it("renders nothing without hass or config", async () => {
    const el = new ContentCardLinkyEditor();
    el.hass = undefined;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("ha-form")).toBeFalsy();
  });

  it("computes localized labels for sections and fields", async () => {
    const el = await mountEditor();
    expect(el._computeLabel({ title: "section.general" })).toBe("Configuration générale");
    expect(el._computeLabel({ name: "entity" })).toBe("Entité Linky (requis)");
    expect(el._computeLabel({})).toBe("");
  });

  it("localizes select options that use the __ prefix", async () => {
    const el = await mountEditor();
    const localized = el._localizeSchema([
      {
        name: "showDayName",
        selector: {
          select: { options: [{ value: "long", label: "__day_name.long" }] },
        },
      },
    ]);
    expect(localized[0].selector.select.options[0].label).toBe("Complet (Lundi)");
  });

  it("emits config-changed, stripping defaults and empty values", async () => {
    const el = await mountEditor({ entity: "sensor.x" });
    let received;
    el.addEventListener("config-changed", (e) => {
      received = e.detail.config;
    });
    el._valueChanged({
      detail: { value: { entity: "sensor.x", titleName: "LINKY", ewEntity: "" } },
    });
    expect(received).toEqual({ entity: "sensor.x" });
  });

  it("keeps a non-default title", async () => {
    const el = await mountEditor({ entity: "sensor.x" });
    let received;
    el.addEventListener("config-changed", (e) => {
      received = e.detail.config;
    });
    el._valueChanged({ detail: { value: { entity: "sensor.x", titleName: "HOME" } } });
    expect(received.titleName).toBe("HOME");
  });
});
