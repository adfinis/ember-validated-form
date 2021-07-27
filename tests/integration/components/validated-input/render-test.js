import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module("Integration | Component | validated-input/render", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    await render(hbs`
      <ValidatedInput::Render
        @type="text"
        @name="test"
        @labelComponent={{component "validated-input/label" label="Test"}}

        @update={{fn (mut this.value)}}
        @setDirty={{fn (mut this.dirty) true}}
      />
    `);

    assert.dom("input[type=text]").exists();
    assert.dom("input[type=text]").hasAttribute("name", "test");
    assert.dom("label").hasText("Test");
  });
});
