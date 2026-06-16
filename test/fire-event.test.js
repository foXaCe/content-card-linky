// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { fireEvent } from "../src/lib/fire-event.js";

describe("fireEvent", () => {
  it("dispatches a bubbling, composed event carrying the detail by default", () => {
    const node = document.createElement("div");
    let received;
    node.addEventListener("my-event", (e) => {
      received = e;
    });

    const ev = fireEvent(node, "my-event", { foo: 42 });

    expect(received).toBe(ev);
    expect(ev.type).toBe("my-event");
    expect(ev.bubbles).toBe(true);
    expect(ev.composed).toBe(true);
    expect(ev.cancelable).toBe(false);
    expect(ev.detail).toEqual({ foo: 42 });
  });

  it("defaults the detail to an empty object", () => {
    const node = document.createElement("div");
    const ev = fireEvent(node, "ping");
    expect(ev.detail).toEqual({});
  });

  it("honours explicit bubbles/cancelable/composed options", () => {
    const node = document.createElement("div");
    const ev = fireEvent(node, "config-changed", {}, { bubbles: false, cancelable: true, composed: false });

    expect(ev.bubbles).toBe(false);
    expect(ev.cancelable).toBe(true);
    expect(ev.composed).toBe(false);
  });
});
