import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

import {
  setupRenderingTest,
  setupUikit,
  setupBootstrap,
} from "dummy/tests/helpers";

module("Integration | Component | validated-input/error", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    this.set("errors", ["foo", "bar", "baz"]);

    await render(hbs`<ValidatedInput::Error @errors={{this.errors}} />`);

    assert.dom("span").hasText("foo, bar, baz");
  });

  module("uikit", function (hooks) {
    setupUikit(hooks);

    test("it renders", async function (assert) {
      this.set("errors", ["foo", "bar", "baz"]);

      await render(hbs`<ValidatedInput::Error @errors={{this.errors}} />`);

      assert.dom("small").hasClass("uk-text-danger");
      assert.dom("small").hasText("foo, bar, baz");
    });
  });

  module("bootstrap", function (hooks) {
    setupBootstrap(hooks);

    test("it renders", async function (assert) {
      this.set("errors", ["foo", "bar", "baz"]);

      await render(hbs`<ValidatedInput::Error @errors={{this.errors}} />`);

      assert.dom("span").hasClass("invalid-feedback");
      assert.dom("span").hasClass("d-block");
      assert.dom("span").hasText("foo, bar, baz");
    });
  });
});
