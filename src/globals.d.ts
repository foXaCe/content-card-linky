// Ambient declarations: build-time constants and `window` augmentations.

import type { CustomCardEntry } from "./types";

declare global {
  /** Injected at build time by @rollup/plugin-replace (and Vitest `define`). */
  const __CARD_VERSION__: string;

  interface Window {
    customCards?: CustomCardEntry[];
  }
}

export {};
