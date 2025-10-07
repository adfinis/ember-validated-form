import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import {
  setupRenderingTest,
  setupUikit,
  setupBootstrap,
} from "dummy/tests/helpers";
import { test } from "dummy/tests/helpers/scenarios";

module("Integration | Component | validated-input/hint", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    await render(hbs`<ValidatedInput::Hint @hint="Test" />`);

    assert.dom("small").hasText("Test");
  });

  module("uikit", function (hooks) {
    setupUikit(hooks);

    test("it renders", async function (assert) {
      await render(hbs`<ValidatedInput::Hint @hint="Test" />`);

      assert.dom("small").hasClass("uk-text-muted");
      assert.dom("small").hasText("Test");
    });
  });

  module("bootstrap", function (hooks) {
    setupBootstrap(hooks);

    test("it renders", async function (assert) {
      await render(hbs`<ValidatedInput::Hint @hint="Test" />`);

      assert.dom("small").hasClass("form-text");
      assert.dom("small").hasClass("text-muted");
      assert.dom("small").hasText("Test");
    });
  });
});
