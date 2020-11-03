import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | validated-input/render", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    await render(hbs`
      {{validated-input/render
        type='text'
        name='test'
        labelComponent=(component 'validated-input/label' label='Test')

        update=(action (mut value))
      }}
    `);

    assert.dom("input[type=text]").exists();
    assert.dom("input[type=text]").hasAttribute("name", "test");
    assert.dom("label").hasText("Test");
  });
});
