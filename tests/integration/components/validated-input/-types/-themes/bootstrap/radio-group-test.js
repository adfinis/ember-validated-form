import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import setupThemeTest from "dummy/tests/helpers/setup-theme-test";

module(
  "Integration | Component | validated-input/-types/-themes/bootstrap/radio-group",
  function(hooks) {
    setupRenderingTest(hooks);
    setupThemeTest(hooks, "bootstrap");

    test("it renders", async function(assert) {
      this.set("options", [
        {
          key: "opt1",
          label: "Option 1"
        },
        {
          key: "opt2",
          label: "Option 2"
        }
      ]);

      await render(
        hbs`{{validated-input/-types/-themes/bootstrap/radio-group options=options update=(action (mut value))}}`
      );

      assert.dom("div.custom-control.custom-radio").exists({ count: 2 });
      assert.dom("input").hasClass("custom-control-input");
      assert.dom("label").hasClass("custom-control-label");
    });
  }
);
