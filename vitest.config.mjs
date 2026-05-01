import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.js"],
    coverage: {
      provider: "v8",
      include: ["src/lib/**/*.js"],
      reporter: ["text", "html"],
    },
  },
});
