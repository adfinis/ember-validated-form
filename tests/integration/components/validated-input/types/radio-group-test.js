import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

import {
  setupRenderingTest,
  setupUikit,
  setupBootstrap,
} from "dummy/tests/helpers";

module(
  "Integration | Component | validated-input/types/radio-group",
  function (hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function (assert) {
      this.set("options", [
        { key: 1, label: 1 },
        { key: 2, label: 2 },
      ]);

      await render(hbs`<ValidatedInput::Types::RadioGroup
  @options={{this.options}}
  @update={{fn (mut this.value)}}
/>`);

      assert.dom("input[type=radio]").exists({ count: 2 });
    });

    module("uikit", function (hooks) {
      setupUikit(hooks);

      test("it renders", async function (assert) {
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

        await render(hbs`<ValidatedInput::Types::RadioGroup
  @options={{this.options}}
  @update={{fn (mut this.value)}}
/>`);

        assert.dom("label > input").exists({ count: 2 });
        assert.dom("input").hasClass("uk-radio");
        assert.dom("label").hasClass("uk-form-label");
      });
    });

    module("bootstrap", function (hooks) {
      setupBootstrap(hooks);

      test("it renders", async function (assert) {
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

        await render(hbs`<ValidatedInput::Types::RadioGroup
  @options={{this.options}}
  @update={{fn (mut this.value)}}
/>`);

        assert.dom("div.custom-control.custom-radio").exists({ count: 2 });
        assert.dom("input").hasClass("custom-control-input");
        assert.dom("label").hasClass("custom-control-label");
      });
    });
  },
);
