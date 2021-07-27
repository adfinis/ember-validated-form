"use strict";

const { embroiderSafe } = require("@embroider/test-setup");
const getChannelURL = require("ember-source-channel-url");

module.exports = async function () {
  return {
    useYarn: true,
    scenarios: [
      {
        name: "ember-lts-3.20",
        npm: {
          devDependencies: {
            "ember-source": "~3.20.5",
          },
        },
      },
      {
        name: "ember-lts-3.24",
        npm: {
          devDependencies: {
            "ember-source": "~3.24.3",
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
      embroiderSafe({ name: "embroider-safe", allowedToFail: true }),
    ],
  };
};
