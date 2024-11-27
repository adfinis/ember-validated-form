import Application from "@ember/application";
import { importSync, isDevelopingApp, macroCondition } from "@embroider/macros";
import loadInitializers from "ember-load-initializers";
import Resolver from "ember-resolver";

import config from "dummy/config/environment";

import "flatpickr/dist/flatpickr.css";
import "bootstrap/dist/css/bootstrap.css";

if (macroCondition(isDevelopingApp())) {
  importSync("./deprecation-workflow");
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
