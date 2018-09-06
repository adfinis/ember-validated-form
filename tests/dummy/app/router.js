import AddonDocsRouter, { docsRoute } from "ember-cli-addon-docs/router";
import RouterScroll from "ember-router-scroll";
import config from "./config/environment";

const Router = AddonDocsRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  docsRoute(this, function() {
    this.route("usage");
    this.route("quickstart");
    this.route("configuration");
    this.route("configuration");
    this.route("customization");

    this.route("components", function() {
      this.route("validated-form");
      this.route("validated-input");
      this.route("validated-button");
    });
  });
  this.route("not-found", { path: "/*path" });
});

export default Router;
