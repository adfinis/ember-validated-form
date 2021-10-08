import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/types/textarea",
  function (hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function (assert) {
      await render(hbs`
      <ValidatedInput::Types::Textarea
        @update={{fn (mut this.value)}}
        @setDirty={{fn (mut this.dirty) true}}
      />
    `);

      assert.dom("textarea").exists();
    });
  }
);
