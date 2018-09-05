import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module(
  "Integration | Component | validated-input/-themes/bootstrap/render",
  function(hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function(assert) {
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
