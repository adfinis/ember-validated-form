import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";

module(
  "Integration | Component | validated-button/-themes/uikit/button",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "uikit" });

    test("it renders", async function (assert) {
      await render(hbs`{{validated-button/-themes/uikit/button label='Test'}}`);

      assert.dom("button").hasText("Test");
      assert.dom("button").hasClass("uk-button");
      assert.dom("button").hasClass("uk-button-default");
    });

    test("it renders in block style", async function (assert) {
      await render(hbs`
        {{#validated-button/-themes/uikit/button}}Test{{/validated-button/-themes/uikit/button}}
      `);

      assert.dom("button").hasText("Test");
    });

    test("it renders a primary button for submit buttons", async function (assert) {
      await render(
        hbs`{{validated-button/-themes/uikit/button label='Test' type='submit'}}`
      );

      assert.dom("button").hasClass("uk-button-primary");
    });
  }
);
