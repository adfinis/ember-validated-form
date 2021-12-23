import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/types/checkbox",
  function (hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function (assert) {
      await render(hbs`
      <ValidatedInput::types::Checkbox
        @labelComponent={{component "validated-input/label" label="Test"}}
        @update={{fn (mut this.value)}}
      />
      `);

      assert.dom("input[type=checkbox]").exists();
    });
  }
);
