import { render } from "@ember/test-helpers";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/-themes/uikit/error",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "uikit" });

    test("it renders", async function (assert) {
      this.set("errors", ["foo", "bar", "baz"]);

      await render(
        hbs`<ValidatedInput::-themes::uikit::Error @errors={{this.errors}} />`
      );

      assert.dom("small").hasClass("uk-text-danger");
      assert.dom("small").hasText("foo, bar, baz");
    });
  }
);
