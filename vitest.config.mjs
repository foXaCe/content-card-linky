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
      include: ["src/lib/**/*.js"],
      reporter: ["text", "html"],
    },
  },
});
