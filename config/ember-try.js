"use strict";

const getChannelURL = require("ember-source-channel-url");

module.exports = async function () {
  return {
    useYarn: true,
    scenarios: [
      {
        name: "ember-lts-3.16",
        npm: {
          devDependencies: {
            "ember-source": "~3.16.0",
          },
        },
      },
      {
        name: "ember-lts-3.20",
        npm: {
          devDependencies: {
            "ember-source": "~3.20.5",
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
        name: "legacy-changeset",
        npm: {
          devDependencies: {
            "ember-changeset": "^2.2.5",
            "ember-changeset-validations": "^2.2.1",
          },
        },
      },
    ],
  };
};
