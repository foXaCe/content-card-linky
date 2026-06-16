import { defineConfig } from "vitest/config";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf-8"));

export default defineConfig({
  define: {
    __CARD_VERSION__: JSON.stringify(pkg.version),
  },
  test: {
    include: ["test/**/*.test.js"],
    environmentMatchGlobs: [["test/render/**", "happy-dom"]],
    coverage: {
      provider: "v8",
      include: ["src/**/*.js"],
      // styles.js is a single CSS template literal (no logic to exercise).
      exclude: ["src/styles.js"],
      reporter: ["text", "text-summary", "html", "json-summary", "lcov"],
      // Actuals: ~98% stmts / ~94% branch / ~99% func / ~99% lines.
      // Date-dependent renderers (week-summary, history tempo) accept an
      // injectable `now`, so coverage is deterministic day-to-day. Thresholds
      // keep a small margin below the actuals.
      thresholds: {
        statements: 95,
        branches: 90,
        functions: 95,
        lines: 95,
      },
    },
  },
});
