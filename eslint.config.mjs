import adfinisEmberAddonConfig from "@adfinis/eslint-config/ember-addon";
import ember from "eslint-plugin-ember";
import globals from "globals";

export default [
  ...adfinisEmberAddonConfig,
  {
    plugins: { ember },
    settings: {
      "import/internal-regex": "^(ember-validated-form|dummy)/",
    },
    rules: {
      "ember/no-runloop": "warn",
    },
  },
  {
    files: ["tests/dummy/app/snippets/*.js"],
    rules: { "no-undef": "off", "no-unused-vars": "off" },
  },
  {
    files: ["node-tests/**/*.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
  },
];
