import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/types/select",
  function (hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function (assert) {
      this.set("options", [
        { key: 1, label: 1 },
        { key: 2, label: 2 },
      ]);

      await render(
        hbs`<ValidatedInput::Types::Select @options={{this.options}} />`
      );

      assert.dom("select").exists();
      assert.dom("option").exists({ count: 2 });
      assert.dom("option:first-child").hasProperty("selected", true);
    });

    test("it selects the pre-defined value", async function (assert) {
      this.set("value", "2");
      this.set("options", [
        { key: "123", label: 1 },
        { key: "2", label: 2 },
      ]);

      await render(
        hbs`<ValidatedInput::Types::Select @optionLabelPath="label" @optionValuePath="key" @value={{this.value}} @options={{this.options}} />`
      );

      assert.dom("select").hasValue(this.options[1].key);
      assert.dom("option:first-child").hasProperty("selected", false);
      assert.dom("option:last-child").hasProperty("selected", true);
    });

    test("prompt is present and disabled", async function(assert) {
      this.set("options", [
        { key: 1, label: 1 },
        { key: 2, label: 2 },
      ]);

      await render(
        hbs`<ValidatedInput::Types::Select @options={{this.options}} @prompt="Choose this" />`
      );

      assert.dom("option:first-child").hasText("Choose this");
      assert.dom("option:first-child").hasProperty("disabled", true);
    });

      test("prompt is selectable", async function(assert) {
      this.set("options", [
        { key: 1, label: 1 },
        { key: 2, label: 2 },
      ]);

      await render(
        hbs`<ValidatedInput::Types::Select @options={{this.options}} @prompt="Choose this" @promptIsSelectable={{true}} />`
      );

      assert.dom("option:first-child").hasProperty("disabled", false);
    });
  }
);
