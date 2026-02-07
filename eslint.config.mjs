import globals from "globals";

export default [
  {
    files: ["dist/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        customElements: "readonly",
        customCards: "writable",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
      "no-console": "warn",
      "no-debugger": "error",
      "no-duplicate-case": "error",
      "no-empty": "warn",
      "no-extra-semi": "error",
      "no-unreachable": "error",
      "eqeqeq": ["warn", "smart"],
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-self-compare": "error",
      "no-throw-literal": "error",
      "prefer-const": "warn",
    },
  },
];
