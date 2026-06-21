import { describe, it, expect } from "vitest";
import { onActivate } from "../src/lib/a11y";

describe("onActivate", () => {
  it("invokes the handler on Enter and Space", () => {
    let count = 0;
    const handler = onActivate(() => count++);
    handler({ key: "Enter" });
    handler({ key: " " });
    expect(count).toBe(2);
  });

  it("ignores any other key", () => {
    let count = 0;
    const handler = onActivate(() => count++);
    handler({ key: "a" });
    handler({ key: "Tab" });
    handler({ key: "ArrowDown" });
    expect(count).toBe(0);
  });

  it("forwards the event to the handler", () => {
    let seen;
    const handler = onActivate((e) => (seen = e));
    const evt = { key: "Enter", marker: 1 };
    handler(evt);
    expect(seen).toBe(evt);
  });
});
