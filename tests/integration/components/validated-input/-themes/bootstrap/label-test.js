import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module(
  "Integration | Component | validated-input/-themes/bootstrap/label",
  function(hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function(assert) {
      await render(
        hbs`{{validated-input/-themes/bootstrap/label label='Test'}}`
      );

      assert.dom("label").hasText("Test");
    });
  }
);
