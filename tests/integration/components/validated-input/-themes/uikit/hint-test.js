import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import setupThemeTest from "dummy/tests/helpers/setup-theme-test";

module("Integration | Component | validated-input/-themes/uikit/hint", function(
  hooks
) {
  setupRenderingTest(hooks);
  setupThemeTest(hooks, "uikit");

  test("it renders", async function(assert) {
    await render(hbs`{{validated-input/-themes/uikit/hint hint='Test'}}`);

    assert.dom("small").hasClass("uk-text-muted");
    assert.dom("small").hasText("Test");
  });
});
