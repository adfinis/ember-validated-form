import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, find } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import Component from "@ember/component";

module("Integration | Component | validated label", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders labels", async function(assert) {
    await render(
      hbs`{{validated-input label="Default name" name="default-name"}}`
    );
    assert.ok(find("label").textContent.includes("Default name"));
    assert.ok(
      find("label")
        .getAttribute("for")
        .includes("default-name")
    );
    assert.ok(find("label").id.includes("ember"));
    assert.equal(find("label").getAttribute("class"), "ember-view");
  });

  test("it renders labels with styles from config", async function(assert) {
    this.set("config", {
      css: {
        label: "control-label"
      }
    });
    await render(hbs`{{validated-input label="Default name" config=config}}`);
    assert.equal(
      find("label").getAttribute("class"),
      "control-label ember-view"
    );
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
    assert.equal(find("label").getAttribute("style"), "color: green;");
  });

  test("it passes original variables to custom component", async function(assert) {
    this.set("config", "this would be some config :)");
    this.owner.register("component:custom-label", Component.extend());
    this.owner.register(
      "template:components/custom-label",
      hbs`<label style="color: green;"><span id="orig-label">{{label}}</span>
      <span id="form-config">{{config}}</span>
      <span id="orig-input-id">{{inputId}}</span>
      <span id="orig-input-required">{{required}}</span></label>`
    );
    await render(hbs`{{validated-input label="Name custom" name="orig-name"
    required=true config=config labelComponent=(component "custom-label")}}`);
    assert.equal(find("label").getAttribute("style"), "color: green;");
    assert.equal(find("#orig-label").textContent, "Name custom");
    assert.equal(
      find("#form-config").textContent,
      "this would be some config :)"
    );
    assert.equal(find("#orig-input-required").textContent, "true");
    assert.ok(find("#orig-input-id").textContent.includes("input-orig-name"));
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
    assert.equal(find("label").getAttribute("style"), "color: green;");
    assert.equal(find("label").textContent, "Awesome!");
  });
});
