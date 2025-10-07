import { getOwnConfig } from "@embroider/macros";
import { test as upstreamTest } from "qunit";

const testScenario = getOwnConfig()?.testScenario;

function buildScenarioTester(env) {
  return function (name, ...args) {
    if (testScenario === env) {
      return upstreamTest(`${name} [${env}]`, ...args);
    }
  };
}

export const testCustomComponents = buildScenarioTester("CUSTOM_COMPONENTS");
export const test = buildScenarioTester("DEFAULT");
