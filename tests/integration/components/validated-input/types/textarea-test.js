import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module("Integration | Component | validated-input/types/textarea", function (
  hooks
) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    await render(hbs`{{validated-input/types/textarea}}`);

    assert.dom("textarea").exists();
  });
});
