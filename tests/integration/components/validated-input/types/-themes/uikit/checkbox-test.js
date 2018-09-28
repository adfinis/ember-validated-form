import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";

module(
  "Integration | Component | validated-input/types/-themes/uikit/checkbox",
  function(hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "uikit" });

    test("it renders", async function(assert) {
      await render(hbs`
        {{validated-input/types/-themes/uikit/checkbox
          labelComponent=(component 'validated-input/-themes/uikit/label' label='Test')
          update=(action (mut value))
        }}
        `);

      assert.dom("label > input").exists();
      assert.dom("input").hasClass("uk-checkbox");
      assert.dom("label").hasClass("uk-form-label");
    });
  }
);
