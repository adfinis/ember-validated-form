import { render } from "@ember/test-helpers";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/-themes/bootstrap/render",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "bootstrap" });

    test("it renders", async function (assert) {
      await render(hbs`
      {{validated-input/-themes/bootstrap/render
        type='text'
        name='test'
        labelComponent=(component 'validated-input/-themes/bootstrap/label' label='Test')

        update=(action (mut value))
      }}
    `);

      assert.dom(".form-group").exists();

      assert.dom("input[type=text].form-control").exists();
      assert.dom("input[type=text].form-control").hasAttribute("name", "test");
      assert.dom("label").hasText("Test");
    });
  }
);
