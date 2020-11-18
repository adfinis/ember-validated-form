import { render } from "@ember/test-helpers";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-button/-themes/bootstrap/button",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "bootstrap" });

    test("it renders", async function (assert) {
      await render(
        hbs`{{validated-button/-themes/bootstrap/button label='Test'}}`
      );

      assert.dom("button").hasText("Test");
      assert.dom("button").hasClass("btn");
      assert.dom("button").hasClass("btn-default");
    });

    test("it renders in block style", async function (assert) {
      await render(hbs`
        {{#validated-button/-themes/bootstrap/button}}Test{{/validated-button/-themes/bootstrap/button}}
      `);

      assert.dom("button").hasText("Test");
    });

    test("it renders a primary button for submit buttons", async function (assert) {
      await render(
        hbs`{{validated-button/-themes/bootstrap/button label='Test' type='submit'}}`
      );

      assert.dom("button").hasClass("btn-primary");
    });
  }
);
