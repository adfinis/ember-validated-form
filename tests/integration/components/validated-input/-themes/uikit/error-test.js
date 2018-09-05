import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import setupThemeTest from "dummy/tests/helpers/setup-theme-test";

module(
  "Integration | Component | validated-input/-themes/uikit/error",
  function(hooks) {
    setupRenderingTest(hooks);
    setupThemeTest(hooks, "uikit");

    test("it renders", async function(assert) {
      this.set("errors", ["foo", "bar", "baz"]);

      await render(hbs`{{validated-input/-themes/uikit/error errors=errors}}`);

      assert.dom("small").hasClass("uk-text-danger");
      assert.dom("small").hasText("foo, bar, baz");
    });
  }
);
