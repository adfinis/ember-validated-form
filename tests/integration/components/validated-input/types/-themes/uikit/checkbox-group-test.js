import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

import setupConfigTest from "dummy/tests/helpers/setup-config-test";

module(
  "Integration | Component | validated-input/types/-themes/uikit/checkbox-group",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "uikit" });

    test("it renders", async function (assert) {
      this.set("options", [
        {
          key: "opt1",
          label: "Option 1",
        },
        {
          key: "opt2",
          label: "Option 2",
        },
      ]);

      await render(
        hbs`<ValidatedInput::types::-themes::uikit::CheckboxGroup
          @options={{this.options}}
          @update={{fn (mut this.value)}}
        />`
      );

      assert.dom("label > input").exists();
      assert.dom("input").hasClass("uk-checkbox");
      assert.dom("label").hasClass("uk-form-label");
    });
  }
);
