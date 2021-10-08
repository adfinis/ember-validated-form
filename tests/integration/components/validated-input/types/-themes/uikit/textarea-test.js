import { render } from "@ember/test-helpers";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/types/-themes/uikit/textarea",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "uikit" });

    test("it renders", async function (assert) {
      await render(hbs`
        <ValidatedInput::Types::-Themes::Uikit::Textarea
          @update={{fn (mut this.value)}}
          @setDirty={{fn (mut this.dirty) true}}
        />
      `);

      assert.dom("textarea").hasClass("uk-textarea");
    });
  }
);
