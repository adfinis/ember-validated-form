"use strict";

module.exports = {
  extends: ["@adfinis/eslint-config/ember-addon"],
  settings: {
    "import/internal-regex": "^(ember-validated-form|dummy)/",
  },
};
