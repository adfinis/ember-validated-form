import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import Component from "@ember/component";

module("Integration | Component | validated label", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders labels", async function(assert) {
    await render(
      hbs`{{validated-input inputId='input-id' label="Default name" name="default-name"}}`
    );

    assert.dom("label").hasText("Default name");
    assert.dom("label").hasAttribute("for", "input-id");
  });

  test("it renders custom label component", async function(assert) {
    this.owner.register("component:custom-label", Component.extend());
    this.owner.register(
      "template:components/custom-label",
      hbs`<label style="color: green;"></label>`
    );

    await render(
      hbs`{{validated-input labelComponent=(component "custom-label")}}`
    );

    assert.dom("label").hasAttribute("style", "color: green;");
  });

  test("it passes original variables to custom component", async function(assert) {
    this.owner.register("component:custom-label", Component.extend());
    this.owner.register(
      "template:components/custom-label",
      hbs`
        <label style="color: green;">
          <span id="orig-label">{{label}}</span>
          <span id="orig-input-id">{{inputId}}</span>
          <span id="orig-input-required">{{required}}</span>
        </label>
      `
    );

    await render(hbs`
      {{validated-input
        label="Name custom"
        name="orig-name"
        inputId="input-id"
        required=true
        labelComponent=(component "custom-label")
      }}
      `);

    assert.dom("label").hasAttribute("style", "color: green;");
    assert.dom("#orig-label").hasText("Name custom");
    assert.dom("#orig-input-required").hasText("true");
    assert.dom("#orig-input-id").hasText("input-id");
  });

  test("it passes custom variables to custom component", async function(assert) {
    this.owner.register("component:custom-label", Component.extend());
    this.owner.register(
      "template:components/custom-label",
      hbs`<label style="color: green;">{{customVariable}}</label>`
    );

    await render(
      hbs`{{validated-input labelComponent=(component "custom-label" customVariable="Awesome!")}}`
    );

    assert.dom("label").hasAttribute("style", "color: green;");
    assert.dom("label").hasText("Awesome!");
  });
});
