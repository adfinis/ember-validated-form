import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module("Integration | Component | validated-input/error", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    this.set("errors", ["foo", "bar", "baz"]);

    await render(hbs`{{validated-input/error errors=errors}}`);

    assert.dom("span").hasText("foo, bar, baz");
  });
});
