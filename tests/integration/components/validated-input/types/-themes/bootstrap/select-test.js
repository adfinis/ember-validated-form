import { render } from "@ember/test-helpers";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/types/-themes/bootstrap/select",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "bootstrap" });

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
        hbs`<ValidatedInput::types::-themes::bootstrap::Select @options={{this.options}} />`
      );

      assert.dom("select").hasClass("form-control");
      assert.dom("option").exists({ count: 2 });
    });
  }
);
