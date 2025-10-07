import { render, select } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import {
  setupRenderingTest,
  setupUikit,
  setupBootstrap,
} from "dummy/tests/helpers";
import { test } from "dummy/tests/helpers/scenarios";

module(
  "Integration | Component | validated-input/types/select",
  function (hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function (assert) {
      this.set("options", [
        { id: 1, label: 1 },
        { id: 2, label: 2 },
      ]);

      await render(
        hbs`<ValidatedInput::Types::Select @options={{this.options}} />`,
      );

      assert.dom("select").exists();
      assert.dom("option").exists({ count: 2 });
      assert.dom("option:first-child").hasProperty("selected", true);
    });

    test("it supports plain (non-object) options", async function (assert) {
      assert.expect(6);
      this.set("options", ["foo", "bar"]);

      this.set("update", (value) => {
        assert.strictEqual(value, "bar");
      });
      await render(
        hbs`<ValidatedInput::Types::Select
  @options={{this.options}}
  @update={{this.update}}
/>`,
      );

      assert.dom("select").exists();
      assert.dom("option").exists({ count: 2 });
      assert.dom("option:first-child").hasProperty("selected", true);
      await select("select", "bar");
      assert.dom("option:first-child").hasProperty("selected", false);
      assert.dom("option:last-child").hasProperty("selected", true);
    });

    test("it works with solitary optionTargetPath property", async function (assert) {
      assert.expect(2);
      this.set("options", [
        { key: 111, label: "firstOption" },
        { key: 222, label: "secondOption" },
      ]);

      this.set("update", (value) => {
        assert.strictEqual(value, 222);
      });

      await render(
        hbs`<ValidatedInput::Types::Select
  @options={{this.options}}
  @update={{this.update}}
  @optionTargetPath="key"
/>`,
      );

      assert.dom("option:first-child").hasText("firstOption");
      await select("select", "222");
    });

    test("it renders option groups via groupLabelPath", async function (assert) {
      this.set("options", [
        { key: 1, label: 1, group: "one" },
        { key: 2, label: 2, group: "two" },
      ]);

      await render(
        hbs`<ValidatedInput::Types::Select
  @options={{this.options}}
  @groupLabelPath="group"
  @optionValuePath="key"
  @optionLabelPath="label"
/>`,
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
        hbs`<ValidatedInput::Types::Select
  @options={{this.options}}
  @optionValuePath="id"
  @optionLabelPath="label"
/>`,
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
        hbs`<ValidatedInput::Types::Select
  @optionLabelPath="label"
  @optionValuePath="key"
  @value={{this.value}}
  @options={{this.options}}
/>`,
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
        hbs`<ValidatedInput::Types::Select
  @options={{this.options}}
  @prompt="Choose this"
/>`,
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
        hbs`<ValidatedInput::Types::Select
  @options={{this.options}}
  @prompt="Choose this"
  @promptIsSelectable={{true}}
/>`,
      );

      assert.dom("option:first-child").hasProperty("disabled", false);
    });

    test("multiselect is working", async function (assert) {
      assert.expect(4);
      this.set("options", [
        { id: 1, label: "label 1" },
        { id: 2, label: "label 2" },
        { id: 3, label: "label 3" },
      ]);
      this.set("update", (values) => {
        assert.deepEqual(values, [
          { id: 1, label: "label 1" },
          { id: 3, label: "label 3" },
        ]);
      });

      await render(
        hbs`<ValidatedInput::Types::Select
  @options={{this.options}}
  @multiple={{true}}
  @update={{this.update}}
/>`,
      );

      await select("select", ["1", "3"]);
      assert.dom("option:first-child").hasProperty("selected", true);
      assert.dom("option:nth-child(2)").hasProperty("selected", false);
      assert.dom("option:last-child").hasProperty("selected", true);
    });

    test("multiselect is working with plain options", async function (assert) {
      assert.expect(4);
      this.set("options", ["1", "2", "3"]);
      this.set("update", (values) => {
        assert.deepEqual(values, ["1", "3"]);
      });

      await render(
        hbs`<ValidatedInput::Types::Select
  @options={{this.options}}
  @multiple={{true}}
  @update={{this.update}}
/>`,
      );

      await select("select", ["1", "3"]);
      assert.dom("option:first-child").hasProperty("selected", true);
      assert.dom("option:nth-child(2)").hasProperty("selected", false);
      assert.dom("option:last-child").hasProperty("selected", true);
    });

    test("multiselect works with pre grouped options", async function (assert) {
      assert.expect(1);
      this.set("update", (values) => {
        assert.deepEqual(values, this.options[0].options);
      });
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
        hbs`<ValidatedInput::Types::Select
  @multiple={{true}}
  @options={{this.options}}
  @optionValuePath="id"
  @optionLabelPath="label"
  @update={{this.update}}
/>`,
      );

      await select("select", ["1", "2"]);
    });

    test("multiselect works with pre grouped options and optionsTargetPath", async function (assert) {
      assert.expect(1);
      this.set("update", (values) => {
        assert.deepEqual(
          values,
          this.options[0].options.map((val) => val.id),
        );
      });
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
        hbs`<ValidatedInput::Types::Select
  @multiple={{true}}
  @options={{this.options}}
  @optionValuePath="id"
  @optionTargetPath="id"
  @optionLabelPath="label"
  @update={{this.update}}
/>`,
      );

      await select("select", ["1", "2"]);
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

        await render(
          hbs`<ValidatedInput::Types::Select @options={{this.options}} />`,
        );

        assert.dom("select").hasClass("uk-select");
        assert.dom("option").exists({ count: 2 });
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

        await render(
          hbs`<ValidatedInput::Types::Select @options={{this.options}} />`,
        );

        assert.dom("select").hasClass("form-control");
        assert.dom("option").exists({ count: 2 });
      });
    });

    test("prompt is selectable in compination with optionTargetPath, optionValuePath and optionLabelPath", async function (assert) {
      assert.expect(3);
      const values = [2, undefined];
      this.set("options", [
        { value: 1, text: "one" },
        { value: 2, text: "two" },
      ]);
      this.set("update", (value) => {
        assert.strictEqual(value, values.shift());
      });

      await render(
        hbs`<ValidatedInput::Types::Select
  @update={{this.update}}
  @options={{this.options}}
  @prompt="Choose this"
  @promptIsSelectable={{true}}
  @optionLabelPath="text"
  @optionTargetPath="value"
  @optionValuePath="value"
/>`,
      );

      await select("select", "2");
      await select("select", "option:first-child");
      assert.dom("option:first-child").hasProperty("disabled", false);
    });
  },
);
