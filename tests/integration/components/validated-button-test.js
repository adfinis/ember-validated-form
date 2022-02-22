import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import { testDefault } from "dummy/tests/helpers/scenarios";

module("Integration | Component | validated button", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.noop = () => {};
  });

  testDefault("it renders a button with a label", async function (assert) {
    await render(hbs`<ValidatedButton @action={{this.noop}} @label="Test" />`);
    assert.dom("button").hasText("Test");
  });

  testDefault("it renders a button with block style", async function (assert) {
    await render(
      hbs`<ValidatedButton @action={{this.noop}}>Test</ValidatedButton>`
    );
    assert.dom("button").hasText("Test");
  });
});
