import { getOwnConfig } from "@embroider/macros";
import { test } from "qunit";

const testScenario = getOwnConfig()?.testScenario;

function buildScenarioTester(env) {
  return function (name, ...args) {
    if (testScenario === env) {
      return test(`${name} [${env}]`, ...args);
    }
  };
}

export const testUikit = buildScenarioTester("THEME_UIKIT");
export const testBootstrap = buildScenarioTester("THEME_BOOTSTRAP");
export const testDefault = buildScenarioTester("THEME_DEFAULT");
export const testCustomComponents = buildScenarioTester("CUSTOM_COMPONENTS");
