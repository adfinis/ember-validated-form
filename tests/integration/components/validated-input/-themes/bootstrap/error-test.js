import { render } from "@ember/test-helpers";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/-themes/bootstrap/error",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "bootstrap" });

    test("it renders", async function (assert) {
      this.set("errors", ["foo", "bar", "baz"]);

      await render(
        hbs`<ValidatedInput::-themes::bootstrap::error @errors={{this.errors}} />`
      );

      assert.dom("span").hasClass("invalid-feedback");
      assert.dom("span").hasText("foo, bar, baz");
    });
  }
);
