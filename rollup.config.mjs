import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf-8"));
const dev = process.env.ROLLUP_WATCH === "true";

const plugins = [
  resolve({ browser: true, extensions: [".ts", ".mjs", ".js", ".json"] }),
  json(),
  replace({
    preventAssignment: true,
    values: {
      __CARD_VERSION__: JSON.stringify(pkg.version),
    },
  }),
  typescript({ tsconfig: "./tsconfig.json", noEmitOnError: !dev }),
  !dev && terser({ format: { comments: false } }),
].filter(Boolean);

export default [
  {
    input: "src/content-card-linky.ts",
    output: {
      file: "dist/content-card-linky.js",
      format: "es",
      sourcemap: dev,
    },
    // Editor is loaded lazily and built as its own bundle. The lazy import in
    // the source keeps a literal ".js" extension so the emitted runtime
    // specifier points at the sibling bundle in dist/.
    external: [/content-card-linky-editor\.js$/],
    plugins,
  },
  {
    input: "src/content-card-linky-editor.ts",
    output: {
      file: "dist/content-card-linky-editor.js",
      format: "es",
      sourcemap: dev,
    },
    plugins,
  },
];
