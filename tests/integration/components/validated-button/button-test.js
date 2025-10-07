import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import {
  setupRenderingTest,
  setupUikit,
  setupBootstrap,
} from "dummy/tests/helpers";
import { test } from "dummy/tests/helpers/scenarios";

module("Integration | Component | validated-button/button", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.noop = () => {};
  });

  test("it renders", async function (assert) {
    await render(hbs`<ValidatedButton::Button @onClick={{this.noop}} />`);

    assert.dom("button").exists();

    await render(hbs`<ValidatedButton::Button @onClick={{this.noop}}>
  Test
</ValidatedButton::Button>`);

    assert.dom("button").hasText("Test");
  });

  module("uikit", function (hooks) {
    setupUikit(hooks);

    test("it renders", async function (assert) {
      await render(
        hbs`<ValidatedButton::Button @onClick={{this.noop}} @label="Test" />`,
      );

      assert.dom("button").hasText("Test");
      assert.dom("button").hasClass("uk-button");
      assert.dom("button").hasClass("uk-button-default");
    });

    test("it renders in block style", async function (assert) {
      await render(hbs`<ValidatedButton::Button @onClick={{this.noop}}>
  Test
</ValidatedButton::Button>`);

      assert.dom("button").hasText("Test");
    });

    test("it renders a primary button for submit buttons", async function (assert) {
      await render(
        hbs`<ValidatedButton::Button @onClick={{this.noop}} @label="Test" @type="submit" />`,
      );

      assert.dom("button").hasClass("uk-button-primary");
    });
  });

  module("bootstrap", function (hooks) {
    setupBootstrap(hooks);

    test("it renders", async function (assert) {
      await render(
        hbs`<ValidatedButton::Button @onClick={{this.noop}} @label="Test" />`,
      );

      assert.dom("button").hasText("Test");
      assert.dom("button").hasClass("btn");
      assert.dom("button").hasClass("btn-default");
    });

    test("it renders in block style", async function (assert) {
      await render(hbs`<ValidatedButton::Button @onClick={{this.noop}}>
  Test
</ValidatedButton::Button>`);

      assert.dom("button").hasText("Test");
    });

    test("it renders a primary button for submit buttons", async function (assert) {
      await render(
        hbs`<ValidatedButton::Button @onClick={{this.noop}} @label="Test" @type="submit" />`,
      );

      assert.dom("button").hasClass("btn-primary");
    });
  });
});
