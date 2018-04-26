import EmberRouter from "@ember/routing/router";
import RouterScroll from "ember-router-scroll";
import config from "./config/environment";

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("docs", function() {
    this.route("usage");
    this.route("quickstart");
    this.route("configuration");
    this.route("components", function() {
      this.route("validated-form");
      this.route("validated-input");
      this.route("validated-button");
    });
    this.route("api", function() {
      this.route("item", { path: "/*path" });
    });
  });
  this.route("not-found", { path: "/*path" });
});

export default Router;
