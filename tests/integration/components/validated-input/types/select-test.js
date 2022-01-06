import { render, select } from "@ember/test-helpers";
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

    test("it renders option groups via groupLabelPath", async function (assert) {
      this.set("options", [
        { key: 1, label: 1, group: "one" },
        { key: 2, label: 2, group: "two" },
      ]);

      await render(
        hbs`<ValidatedInput::Types::Select @options={{this.options}} @groupLabelPath="group" @optionValuePath="key" @optionLabelPath="label"/>`
      );

      assert.dom("select").exists();
      assert.dom("optgroup[label='one']").exists({ count: 1 });
      assert.dom("optgroup[label='two']").exists({ count: 1 });
      assert.dom("optgroup:first-child option:first-child").hasText("1");
      assert.dom("optgroup:last-child option:first-child").hasValue("2");
    });

    test("it renders option groups pre grouped options", async function (assert) {
      this.set("options", [
        {
          groupName: "one",
          options: [
            { id: 1, label: "First", type: "group1" },
            { id: 2, label: "Second", type: "group1" },
          ],
        },
        {
          groupName: "two",
          options: [{ id: 3, label: "Third", type: "group2" }],
        },
      ]);

      await render(
        hbs`<ValidatedInput::Types::Select @options={{this.options}} @optionValuePath="id" @optionLabelPath="label" />`
      );

      assert.dom("select").exists();
      assert.dom("optgroup[label='one']").exists({ count: 1 });
      assert.dom("optgroup:first-child option:first-child").hasText("First");
      assert.dom("optgroup[label='two']").exists({ count: 1 });
      assert.dom("optgroup:last-child option:first-child").hasText("Third");
      assert.dom("optgroup:last-child option:first-child").hasValue("3");
    });

    test("it selects the pre-defined value", async function (assert) {
      this.set("value", "2");
      this.set("options", [
        { key: "1", label: 1 },
        { key: "2", label: 2 },
      ]);

      await render(
        hbs`<ValidatedInput::Types::Select @optionLabelPath="label" @optionValuePath="key" @value={{this.value}} @options={{this.options}} />`
      );

      assert.dom("select").hasValue(this.options[1].key);
      assert.dom("option:first-child").hasProperty("selected", false);
      assert.dom("option:last-child").hasProperty("selected", true);
    });

    test("prompt is present and disabled", async function (assert) {
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

    test("prompt is selectable", async function (assert) {
      this.set("options", [
        { key: 1, label: 1 },
        { key: 2, label: 2 },
      ]);

      await render(
        hbs`<ValidatedInput::Types::Select @options={{this.options}} @prompt="Choose this" @promptIsSelectable={{true}} />`
      );

      assert.dom("option:first-child").hasProperty("disabled", false);
    });

    test("multiselect is working", async function (assert) {
      this.set("options", ["1", "2"]);

      await render(
        hbs`<ValidatedInput::Types::Select @options={{this.options}} @multiple={{true}} />`
      );

      await select("select", this.options);
      assert.dom("option:first-child").hasProperty("selected", true);
      assert.dom("option:last-child").hasProperty("selected", true);
    });
  }
);
