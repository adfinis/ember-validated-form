"use strict";

const embroiderTestSetup = require("@embroider/test-setup");
const getChannelURL = require("ember-source-channel-url");

const config = {
  usePnpm: true,
  scenarios: [
    {
      name: "theme-default",
      env: { TEST_SCENARIO: "THEME_DEFAULT" },
    },
    {
      name: "theme-uikit",
      env: { TEST_SCENARIO: "THEME_UIKIT" },
    },
    {
      name: "theme-bootstrap",
      env: { TEST_SCENARIO: "THEME_BOOTSTRAP" },
    },
    {
      name: "custom-components",
      env: { TEST_SCENARIO: "CUSTOM_COMPONENTS" },
    },
  ],
};

function buildLTSScenario(version) {
  return {
    ...config,
    scenarios: config.scenarios.map((scenario) => ({
      ...scenario,
      name: `ember-lts-${version} (${scenario.name})`,
      npm: {
        devDependencies: { "ember-source": `~${version}.0` },
      },
    })),
  };
}

async function buildURLScenario(release) {
  const emberSourceURL = await getChannelURL(release);

  return {
    ...config,
    scenarios: config.scenarios.map((scenario) => ({
      ...scenario,
      name: `ember-${release} (${scenario.name})`,
      npm: {
        devDependencies: { "ember-source": emberSourceURL },
      },
    })),
  };
}

function buildEmbroiderScenario(type) {
  const embroiderScenario = embroiderTestSetup[type]();

  return {
    ...config,
    scenarios: config.scenarios.map((scenario) => ({
      ...scenario,
      ...embroiderScenario,
      env: { ...embroiderScenario.env, ...scenario.env },
      name: `${embroiderScenario.name} (${scenario.name})`,
    })),
  };
}

module.exports = function () {
  const scenario = process.env.EMBER_SCENARIO;

  if (/^ember-lts-\d+\.\d+/.test(scenario)) {
    return buildLTSScenario(scenario.replace(/^ember-lts-/, ""));
  } else if (/^ember-(release|beta|canary)$/.test(scenario)) {
    return buildURLScenario(scenario.replace(/^ember-/, ""));
  } else if (/^embroider-(safe|optimized)$/.test(scenario)) {
    // convert embroider-xy to embroiderXy
    const embroiderScenario = scenario
      .split("-")
      .map((part, i) =>
        i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1),
      )
      .join("");

    return buildEmbroiderScenario(embroiderScenario);
  }

  return config;
};
