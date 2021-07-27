import { render } from "@ember/test-helpers";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/-themes/uikit/render",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "uikit" });

    test("it renders", async function (assert) {
      await render(hbs`
        <ValidatedInput::-Themes::Uikit::Render
          @type="text"
          @name="test"
          @labelComponent={{component "validated-input/-themes/uikit/label" label="Test"}}

          @update={{fn (mut this.value)}}
          @setDirty={{fn (mut this.dirty) true}}
        />
      `);

      assert.dom(".uk-margin").exists();
      assert.dom(".uk-margin > .uk-form-label").exists();
      assert.dom(".uk-margin > .uk-form-controls").exists();

      assert.dom("input[type=text].uk-input").exists();
      assert.dom("input[type=text].uk-input").hasAttribute("name", "test");
      assert.dom("label").hasText("Test");
    });
  }
);
