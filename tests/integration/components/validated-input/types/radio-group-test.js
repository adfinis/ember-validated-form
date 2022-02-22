import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import {
  testDefault,
  testUikit,
  testBootstrap,
} from "dummy/tests/helpers/scenarios";

module(
  "Integration | Component | validated-input/types/radio-group",
  function (hooks) {
    setupRenderingTest(hooks);

    testDefault("it renders", async function (assert) {
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

    testUikit("it renders", async function (assert) {
      this.set("options", [
        {
          key: "opt1",
          label: "Option 1",
        },
        {
          key: "opt2",
          label: "Option 2",
        },
      ]);

      await render(hbs`
        <ValidatedInput::Types::RadioGroup
          @options={{this.options}}
          @update={{fn (mut this.value)}}
        />
      `);

      assert.dom("label > input").exists({ count: 2 });
      assert.dom("input").hasClass("uk-radio");
      assert.dom("label").hasClass("uk-form-label");
    });

    testBootstrap("it renders", async function (assert) {
      this.set("options", [
        {
          key: "opt1",
          label: "Option 1",
        },
        {
          key: "opt2",
          label: "Option 2",
        },
      ]);

      await render(hbs`
        <ValidatedInput::Types::RadioGroup
          @options={{this.options}}
          @update={{fn (mut this.value)}}
        />
      `);

      assert.dom("div.custom-control.custom-radio").exists({ count: 2 });
      assert.dom("input").hasClass("custom-control-input");
      assert.dom("label").hasClass("custom-control-label");
    });
  }
);
