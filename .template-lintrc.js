"use strict";

module.exports = {
  extends: ["recommended"],
  overrides: [
    {
      files: ["tests/**/*"],
      rules: { "require-input-label": false, "no-inline-styles": false },
    },
  ],
};
