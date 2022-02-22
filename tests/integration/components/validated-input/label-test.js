import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import {
  testDefault,
  testUikit,
  testBootstrap,
} from "dummy/tests/helpers/scenarios";

module("Integration | Component | validated-input/label", function (hooks) {
  setupRenderingTest(hooks);

  testDefault("it renders", async function (assert) {
    await render(hbs`<ValidatedInput::Label @label="Test" />`);

    assert.dom("label").hasText("Test");
  });

  testUikit("it renders", async function (assert) {
    await render(hbs`<ValidatedInput::Label @label="Test" />`);

    assert.dom("label").hasClass("uk-form-label");
    assert.dom("label").hasText("Test");
  });

  testBootstrap("it renders", async function (assert) {
    await render(hbs`<ValidatedInput::Label @label="Test" />`);

    assert.dom("label").hasText("Test");
  });
});
