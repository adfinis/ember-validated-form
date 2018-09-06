import { assert } from "@ember/debug";

export default function setupThemeTest(hooks, theme) {
  assert("You must pass a `theme`", theme);

  hooks.beforeEach(function() {
    this.config = this.owner.resolveRegistration("config:environment");

    this.theme = theme;
    this._theme = this.get("config.ember-validated-form.theme");

    this.set("config.ember-validated-form.theme", this.theme);
  });

  hooks.afterEach(function() {
    this.set("config.ember-validated-form.theme", this._theme);
  });

  return;
}
