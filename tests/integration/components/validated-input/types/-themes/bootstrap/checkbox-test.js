import { render } from "@ember/test-helpers";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/types/-themes/bootstrap/checkbox",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "bootstrap" });

    test("it renders", async function (assert) {
      await render(hbs`
        {{validated-input/types/-themes/bootstrap/checkbox
          labelComponent=(component 'validated-input/-themes/bootstrap/label' label='Test')
          update=(action (mut value))
        }}
        `);

      assert.dom("div.custom-control.custom-checkbox").exists();
      assert.dom("input").hasClass("custom-control-input");
      assert.dom("label").hasClass("custom-control-label");
    });
  }
);
