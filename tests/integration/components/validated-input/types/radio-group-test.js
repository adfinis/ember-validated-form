import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/types/radio-group",
  function (hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function (assert) {
      this.set("options", [
        { key: 1, label: 1 },
        { key: 2, label: 2 },
      ]);

      await render(hbs`
      <ValidatedInput::Types::RadioGroup
        @options={{this.options}}
        @update={{fn (mut this.value)}}
      />
      `);

      assert.dom("input[type=radio]").exists({ count: 2 });
    });
  }
);
