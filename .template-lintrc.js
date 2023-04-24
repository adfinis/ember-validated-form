"use strict";

module.exports = {
  plugins: ["ember-template-lint-plugin-prettier"],
  extends: ["recommended", "ember-template-lint-plugin-prettier:recommended"],
  overrides: [
    {
      files: ["tests/**/*"],
      rules: { "require-input-label": false, "no-inline-styles": false },
    },
  ],
};
