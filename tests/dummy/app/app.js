import Application from "@ember/application";
import config from "dummy/config/environment";
import loadInitializers from "ember-load-initializers";
import Resolver from "ember-resolver";

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
});

loadInitializers(App, config.modulePrefix);

export default App;
