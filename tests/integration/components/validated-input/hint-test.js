import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

import {
  setupRenderingTest,
  setupUikit,
  setupBootstrap,
} from "dummy/tests/helpers";
import HintComponent from "ember-validated-form/components/validated-input/hint";

module("Integration | Component | validated-input/hint", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    // We need to use the directly imported original component from
    // ember-validate-form for tests as the dummy app overrides this component
    // to demonstrate a global override of a component. In order to have
    // meaningful tests, we simply import the original component and use that
    // instead of `<ValidatedInput::Hint />`
    this.HintComponent = HintComponent;
  });

  test("it renders", async function (assert) {
    await render(hbs`<this.HintComponent @hint="Test" />`);

    assert.dom("small").hasText("Test");
  });

  module("uikit", function (hooks) {
    setupUikit(hooks);

    test("it renders", async function (assert) {
      await render(hbs`<this.HintComponent @hint="Test" />`);

      assert.dom("small").hasClass("uk-text-muted");
      assert.dom("small").hasText("Test");
    });
  });

  module("bootstrap", function (hooks) {
    setupBootstrap(hooks);

    test("it renders", async function (assert) {
      await render(hbs`<this.HintComponent @hint="Test" />`);

      assert.dom("small").hasClass("form-text");
      assert.dom("small").hasClass("text-muted");
      assert.dom("small").hasText("Test");
    });
  });
});
