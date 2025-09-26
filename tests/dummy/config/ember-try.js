"use strict";

const { embroiderSafe, embroiderOptimized } = require("@embroider/test-setup");
const getChannelURL = require("ember-source-channel-url");

module.exports = async function () {
  return {
    packageManager: "pnpm",
    scenarios: [
      {
        name: "ember-lts-5.12",
        npm: {
          devDependencies: {
            "ember-source": "~5.12.0",
          },
        },
      },
      {
        name: "ember-lts-6.4",
        npm: {
          devDependencies: {
            "ember-source": "~6.4.0",
          },
        },
      },
      {
        name: "ember-release",
        npm: {
          devDependencies: {
            "ember-source": await getChannelURL("release"),
          },
        },
      },
      {
        name: "ember-beta",
        npm: {
          devDependencies: {
            "ember-source": await getChannelURL("beta"),
          },
        },
      },
      {
        name: "ember-canary",
        npm: {
          devDependencies: {
            "ember-source": await getChannelURL("canary"),
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
