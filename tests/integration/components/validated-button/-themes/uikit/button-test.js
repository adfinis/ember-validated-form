import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

import setupConfigTest from "dummy/tests/helpers/setup-config-test";

module(
  "Integration | Component | validated-button/-themes/uikit/button",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "uikit" });

    hooks.beforeEach(function () {
      this.noop = () => {};
    });

    test("it renders", async function (assert) {
      await render(hbs`
        <ValidatedButton::-Themes::Uikit::Button @onClick={{this.noop}} @label="Test" />
      `);

      assert.dom("button").hasText("Test");
      assert.dom("button").hasClass("uk-button");
      assert.dom("button").hasClass("uk-button-default");
    });

    test("it renders in block style", async function (assert) {
      await render(hbs`
        <ValidatedButton::-Themes::Uikit::Button @onClick={{this.noop}}>
          Test
        </ValidatedButton::-Themes::Uikit::Button>
      `);

      assert.dom("button").hasText("Test");
    });

    test("it renders a primary button for submit buttons", async function (assert) {
      await render(hbs`
        <ValidatedButton::-Themes::Uikit::Button @onClick={{this.noop}} @label="Test" @type="submit" />
      `);

      assert.dom("button").hasClass("uk-button-primary");
    });
  }
);
