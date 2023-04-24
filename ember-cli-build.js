"use strict";

const EmberAddon = require("ember-cli/lib/broccoli/ember-addon");

const TEST_SCENARIO = process.env.TEST_SCENARIO ?? "THEME_DEFAULT";

// Configuration for test scenarios
const SCENARIO_CONFIGS = {
  THEME_DEFAULT: { theme: null },
  THEME_UIKIT: { theme: "uikit" },
  THEME_BOOTSTRAP: { theme: "bootstrap" },
  CUSTOM_COMPONENTS: {
    defaults: {
      error: "dummy/components/x-custom-error",
      hint: "dummy/components/x-custom-hint",
      label: "dummy/components/x-custom-label",
      render: "dummy/components/x-custom-render",
      button: "dummy/components/x-custom-button",
      "types/checkbox": "dummy/components/x-custom-checkbox",
      "types/checkbox-group": "dummy/components/x-custom-checkbox-group",
      "types/input": "dummy/components/x-custom-input",
      "types/select": "dummy/components/x-custom-select",
      "types/radio-group": "dummy/components/x-custom-radio-group",
      "types/textarea": "dummy/components/x-custom-textarea",
      "types/date": "dummy/components/x-custom-date",
    },
  },
};

module.exports = function (defaults) {
  const app = new EmberAddon(defaults, {
    snippetPaths: ["tests/dummy/app/snippets"],
    "ember-validated-form": {
      theme: "bootstrap",
      features: {
        scrollErrorIntoView: false,
      },
      defaults: {
        hint: "dummy/components/permanent-custom-hint",
      },
      ...(SCENARIO_CONFIGS[TEST_SCENARIO] ?? {}),
    },
    "@embroider/macros": {
      setOwnConfig: { testScenario: TEST_SCENARIO },
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require("@embroider/test-setup");
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: "qunit",
      },
    ],
    // https://github.com/embroider-build/embroider/issues/1322#issuecomment-1386857904
    packageRules: [
      {
        package: "@ember-data/store",
        addonModules: {
          "-private.js": {
            dependsOnModules: [],
          },
          "-private/system/core-store.js": {
            dependsOnModules: [],
          },
          "-private/system/model/internal-model.js": {
            dependsOnModules: [],
          },
        },
      },
    ],
  });
};
