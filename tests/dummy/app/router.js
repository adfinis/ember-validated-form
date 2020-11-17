import AddonDocsRouter, { docsRoute } from "ember-cli-addon-docs/router";
import config from "./config/environment";

export default class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  docsRoute(this, function () {
    this.route("usage");
    this.route("quickstart");
    this.route("configuration");
    this.route("configuration");
    this.route("customization");

    this.route("components", function () {
      this.route("validated-form");
      this.route("validated-input");
      this.route("validated-button");
    });
  });
  this.route("not-found", { path: "/*path" });
});
