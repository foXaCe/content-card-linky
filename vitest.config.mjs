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
      // Actuals are ~96% stmts / ~90% branch / ~99% func / ~96% lines.
      // Branch threshold sits a touch lower: a handful of remaining branches
      // are date-dependent (week-summary cost, tempo today/tomorrow run against
      // the real clock) or defensive template fallbacks, so we keep a small
      // margin to avoid day-to-day flakiness while still guarding ~90%.
      thresholds: {
        statements: 93,
        branches: 88,
        functions: 95,
        lines: 93,
      },
    },
  },
});
