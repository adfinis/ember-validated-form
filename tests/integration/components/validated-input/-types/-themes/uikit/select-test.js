import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import setupThemeTest from "dummy/tests/helpers/setup-theme-test";

module(
  "Integration | Component | validated-input/-types/-themes/uikit/select",
  function(hooks) {
    setupRenderingTest(hooks);
    setupThemeTest(hooks, "uikit");

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
        hbs`{{validated-input/-types/-themes/uikit/select options=options}}`
      );

      assert.dom("select").hasClass("uk-select");
      assert.dom("option").exists({ count: 2 });
    });
  }
);
