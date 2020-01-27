import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { set } from "@ember/object";
import hbs from "htmlbars-inline-precompile";
import Component from "@ember/component";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";

const CustomLabelComponent = Component.extend({
  tagName: "custom-label"
});

const CustomHintComponent = Component.extend({
  tagName: "custom-hint"
});

const CustomErrorComponent = Component.extend({
  tagName: "custom-error"
});

const CustomRenderComponent = Component.extend({
  layout: hbs`
    {{component labelComponent}}
    {{component hintComponent}}
    {{component errorComponent}}
  `,
  tagName: "custom-render"
});

const CustomButtonComponent = Component.extend({
  tagName: "custom-button"
});

const CustomCheckboxComponent = Component.extend({
  tagName: "custom-checkbox"
});

const CustomInputComponent = Component.extend({
  tagName: "custom-input"
});

const CustomRadioGroupComponent = Component.extend({
  tagName: "custom-radio-group"
});

const CustomSelectComponent = Component.extend({
  tagName: "custom-select"
});

const CustomTextareaComponent = Component.extend({
  tagName: "custom-textarea"
});

module("Integration | Component | validated form defaults", function(hooks) {
  setupRenderingTest(hooks);
  setupConfigTest(hooks, {});

  test("renders custom components", async function(assert) {
    assert.expect(4);

    set(
      this.owner.resolveRegistration("config:environment"),
      "ember-validated-form.defaults",
      {
        label: "x-custom-label",
        hint: "x-custom-hint",
        error: "x-custom-error",
        render: "x-custom-render"
      }
    );

    this.owner.register("component:x-custom-label", CustomLabelComponent);
    this.owner.register("component:x-custom-hint", CustomHintComponent);
    this.owner.register("component:x-custom-error", CustomErrorComponent);
    this.owner.register("component:x-custom-render", CustomRenderComponent);

    this.set("model", { error: { test1: { validation: ["Error"] } } });

    await render(hbs`
      {{#validated-form as |f|}}
        {{f.input
          name='test1'
          type='text'
          label='Label!'
          hint='Hint!'
          submitted=true
          model=model
        }}
      {{/validated-form}}
    `);

    assert.dom("custom-render").exists();
    assert.dom("custom-label").exists();
    assert.dom("custom-hint").exists();
    assert.dom("custom-error").exists();
  });

  test("renders custom button components", async function(assert) {
    assert.expect(1);

    set(
      this.owner.resolveRegistration("config:environment"),
      "ember-validated-form.defaults",
      {
        button: "x-custom-button"
      }
    );

    this.owner.register("component:x-custom-button", CustomButtonComponent);

    await render(hbs`
      {{#validated-form as |f|}}
        {{f.submit label='Submit!'}}
      {{/validated-form}}
    `);

    assert.dom("custom-button").exists();
  });

  test("renders custom type components", async function(assert) {
    assert.expect(5);

    set(
      this.owner.resolveRegistration("config:environment"),
      "ember-validated-form.defaults",
      {
        "types/checkbox": "x-custom-checkbox",
        "types/input": "x-custom-input",
        "types/radio-group": "x-custom-radio-group",
        "types/select": "x-custom-select",
        "types/textarea": "x-custom-textarea"
      }
    );

    this.owner.register("component:x-custom-checkbox", CustomCheckboxComponent);
    this.owner.register("component:x-custom-input", CustomInputComponent);
    this.owner.register(
      "component:x-custom-radio-group",
      CustomRadioGroupComponent
    );
    this.owner.register("component:x-custom-select", CustomSelectComponent);
    this.owner.register("component:x-custom-textarea", CustomTextareaComponent);

    await render(hbs`
      {{#validated-form as |f|}}
        {{f.input type='checkbox'}}
        {{f.input type='text'}}
        {{f.input type='radio-group'}}
        {{f.input type='select'}}
        {{f.input type='textarea'}}
      {{/validated-form}}
    `);

    assert.dom("custom-checkbox").exists();
    assert.dom("custom-input").exists();
    assert.dom("custom-radio-group").exists();
    assert.dom("custom-select").exists();
    assert.dom("custom-textarea").exists();
  });
});
