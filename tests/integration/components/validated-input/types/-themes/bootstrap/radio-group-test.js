import { render } from "@ember/test-helpers";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/types/-themes/bootstrap/radio-group",
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
        hbs`{{validated-input/types/-themes/bootstrap/radio-group options=options update=(action (mut value))}}`
      );

      assert.dom("div.custom-control.custom-radio").exists({ count: 2 });
      assert.dom("input").hasClass("custom-control-input");
      assert.dom("label").hasClass("custom-control-label");
    });
  }
);
