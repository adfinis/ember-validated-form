import { render } from "@ember/test-helpers";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/types/-themes/uikit/radio-group",
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
        hbs`<ValidatedInput::types::-themes::uikit::RadioGroup
          @options={{this.options}}
          @update={{fn (mut this.value)}}
        />`
      );

      assert.dom("label > input").exists({ count: 2 });
      assert.dom("input").hasClass("uk-radio");
      assert.dom("label").hasClass("uk-form-label");
    });
  }
);
