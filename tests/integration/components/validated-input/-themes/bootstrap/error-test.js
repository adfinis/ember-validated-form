import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module(
  "Integration | Component | validated-input/-themes/bootstrap/error",
  function(hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function(assert) {
      this.set("errors", ["foo", "bar", "baz"]);

      await render(
        hbs`{{validated-input/-themes/bootstrap/error errors=errors}}`
      );

      assert.dom("span").hasClass("invalid-feedback");
      assert.dom("span").hasText("foo, bar, baz");
    });
  }
);
