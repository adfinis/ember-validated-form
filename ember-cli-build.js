"use strict";

const { maybeEmbroider } = require("@embroider/test-setup");
const EmberAddon = require("ember-cli/lib/broccoli/ember-addon");

module.exports = function (defaults) {
  const app = new EmberAddon(defaults, {
    snippetPaths: ["tests/dummy/app/snippets"],
    "ember-cli-babel": {
      includePolyfill: process.env.EMBER_ENV === "production",
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return maybeEmbroider(app);
};
