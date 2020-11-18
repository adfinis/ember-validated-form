import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module("Integration | Component | validated button", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders a button with a label", async function (assert) {
    await render(hbs`{{validated-button label="Test"}}`);
    assert.dom("button").hasText("Test");
  });

  test("it renders a button with block style", async function (assert) {
    await render(hbs`{{#validated-button}}Test{{/validated-button}}`);
    assert.dom("button").hasText("Test");
  });
});
