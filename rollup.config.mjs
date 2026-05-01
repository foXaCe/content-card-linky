import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf-8"));
const dev = process.env.ROLLUP_WATCH === "true";

const plugins = [
  resolve({ browser: true }),
  json(),
  replace({
    preventAssignment: true,
    values: {
      __CARD_VERSION__: JSON.stringify(pkg.version),
    },
  }),
  !dev && terser({ format: { comments: false } }),
].filter(Boolean);

export default [
  {
    input: "src/content-card-linky.js",
    output: {
      file: "dist/content-card-linky.js",
      format: "es",
      sourcemap: dev,
    },
    // Editor is loaded lazily and built as its own bundle
    external: [/content-card-linky-editor\.js$/],
    plugins,
  },
  {
    input: "src/content-card-linky-editor.js",
    output: {
      file: "dist/content-card-linky-editor.js",
      format: "es",
      sourcemap: dev,
    },
    plugins,
  },
];
