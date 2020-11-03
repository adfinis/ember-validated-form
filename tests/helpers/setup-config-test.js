import { assert } from "@ember/debug";

export default function setupConfigTest(hooks, config) {
  assert("You must pass a `confi`", config);

  hooks.beforeEach(function () {
    this.config = this.owner.resolveRegistration("config:environment");

    this._backup = this.config["ember-validated-form"];

    this.set("config.ember-validated-form", config);
  });

  hooks.afterEach(function () {
    this.set("config.ember-validated-form", this._backup);
  });

  return;
}
