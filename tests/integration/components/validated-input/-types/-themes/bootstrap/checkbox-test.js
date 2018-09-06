import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import setupThemeTest from "dummy/tests/helpers/setup-theme-test";

module(
  "Integration | Component | validated-input/-types/-themes/bootstrap/checkbox",
  function(hooks) {
    setupRenderingTest(hooks);
    setupThemeTest(hooks, "bootstrap");

    test("it renders", async function(assert) {
      await render(hbs`
        {{validated-input/-types/-themes/bootstrap/checkbox
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
