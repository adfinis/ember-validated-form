import adfinisEmberAddonConfig from "@adfinis/eslint-config/ember-addon";
import ember from "eslint-plugin-ember";

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
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
    },
  },
];
