import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import { setupRenderingTest } from "dummy/tests/helpers";
import { test } from "dummy/tests/helpers/scenarios";

module("Integration | Component | validated button", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.noop = () => {};
  });

  test("it renders a button with a label", async function (assert) {
    await render(hbs`<ValidatedButton @action={{this.noop}} @label="Test" />`);
    assert.dom("button").hasText("Test");
  });

  test("it renders a button with block style", async function (assert) {
    await render(
      hbs`<ValidatedButton @action={{this.noop}}>Test</ValidatedButton>`,
    );
    assert.dom("button").hasText("Test");
  });
});
