import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "blueprints/*/files/",
      "declarations/",
      "dist/",
      "coverage/",
      "!**/.*",
      "**/.*/",
      ".node_modules.ember-try/",
      "tests/dummy/app/snippets/*.js",
    ],
  },
  ...compat.extends("@adfinis/eslint-config/ember-addon"),
  {
    settings: {
      "import/internal-regex": "^(ember-validated-form|dummy)/",
    },

    rules: {
      "ember/no-runloop": "warn",
    },
  },
];
