import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import {
  setupRenderingTest,
  setupUikit,
  setupBootstrap,
} from "dummy/tests/helpers";
import { test } from "dummy/tests/helpers/scenarios";

module("Integration | Component | validated-input/label", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    await render(hbs`<ValidatedInput::Label @label="Test" />`);

    assert.dom("label").hasText("Test");
  });

  module("uikit", function (hooks) {
    setupUikit(hooks);

    test("it renders", async function (assert) {
      await render(hbs`<ValidatedInput::Label @label="Test" />`);

      assert.dom("label").hasClass("uk-form-label");
      assert.dom("label").hasText("Test");
    });
  });

  module("bootstrap", function (hooks) {
    setupBootstrap(hooks);

    test("it renders", async function (assert) {
      await render(hbs`<ValidatedInput::Label @label="Test" />`);

      assert.dom("label").hasText("Test");
    });
  });
});
