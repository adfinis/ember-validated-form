import { render } from "@ember/test-helpers";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/types/-themes/uikit/checkbox",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "uikit" });

    test("it renders", async function (assert) {
      await render(hbs`
        <ValidatedInput::types::-themes::uikit::Checkbox
          @labelComponent={{component "validated-input/-themes/uikit/label" label="Test"}}
          @update={{fn (mut this.value)}}
        />
        `);

      assert.dom("label > input").exists();
      assert.dom("input").hasClass("uk-checkbox");
      assert.dom("label").hasClass("uk-form-label");
    });
  }
);
