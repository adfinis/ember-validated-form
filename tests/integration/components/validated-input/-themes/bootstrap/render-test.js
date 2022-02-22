import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

import setupConfigTest from "dummy/tests/helpers/setup-config-test";

module(
  "Integration | Component | validated-input/-themes/bootstrap/render",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "bootstrap" });

    test("it renders", async function (assert) {
      await render(hbs`
        <ValidatedInput::-Themes::Bootstrap::Render
          @type="text"
          @name="test"
          @labelComponent={{component "validated-input/-themes/bootstrap/label" label="Test"}}

          @update={{fn (mut this.value)}}
          @setDirty={{fn (mut this.dirty) true}}
        />
      `);

      assert.dom(".form-group").exists();

      assert.dom("input[type=text].form-control").exists();
      assert.dom("input[type=text].form-control").hasAttribute("name", "test");
      assert.dom("label").hasText("Test");
    });
  }
);
