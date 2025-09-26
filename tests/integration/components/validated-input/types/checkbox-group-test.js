import { click, render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

import {
  setupRenderingTest,
  setupUikit,
  setupBootstrap,
} from "dummy/tests/helpers";

module(
  "Integration | Component | validated-input/types/checkbox-group",
  function (hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function (assert) {
      this.set("options", [
        { key: 1, label: 1 },
        { key: 2, label: 2 },
      ]);

      await render(hbs`<ValidatedInput::Types::CheckboxGroup
  @options={{this.options}}
  @update={{fn (mut this.value)}}
/>`);

      assert.dom("input[type=checkbox]").exists({ count: 2 });
    });

    test("it can select multiple values", async function (assert) {
      this.options = [
        { key: 1, label: 1 },
        { key: 2, label: 2 },
      ];
      this.value = [];

      await render(hbs`<ValidatedInput::Types::CheckboxGroup
  @options={{this.options}}
  @value={{this.value}}
  @update={{fn (mut this.value)}}
  @setDirty={{fn (mut this.dirty) true}}
/>`);

      await click('input[value="1"]');
      await click('input[value="2"]');

      assert.deepEqual(this.value, [1, 2]);
      assert.true(this.dirty);
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

        await render(hbs`<ValidatedInput::Types::CheckboxGroup
  @options={{this.options}}
  @update={{fn (mut this.value)}}
/>`);

        assert.dom("label > input").exists();
        assert.dom("input").hasClass("uk-checkbox");
        assert.dom("label").hasClass("uk-form-label");
      });
    });

    module("bootstrap", function (hooks) {
      setupBootstrap(hooks);

      test("it renders", async function (assert) {
        await render(hbs`<ValidatedInput::Types::CheckboxGroup
  @options={{array
    (hash key="t" label="Triangle")
    (hash key="s" label="Square")
  }}
  @update={{fn (mut this.value)}}
/>`);

        assert.dom("div.custom-control.custom-checkbox").exists();
        assert.dom("input").hasClass("custom-control-input");
        assert.dom("label").hasClass("custom-control-label");
      });
    });
  },
);
