import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import Component from "@ember/component";

moduleForComponent(
  "validated-label",
  "Integration | Component | validated label",
  {
    integration: true
  }
);

test("it renders labels", function(assert) {
  this.render(
    hbs`{{validated-input label="Default name" name="default-name"}}`
  );
  assert.ok(
    this.$("label")
      .text()
      .includes("Default name")
  );
  assert.ok(
    this.$("label")
      .attr("for")
      .includes("default-name")
  );
  assert.ok(
    this.$("label")
      .attr("id")
      .includes("ember")
  );
  assert.equal(this.$("label").attr("class"), "ember-view");
});

test("it renders labels with styles from config", function(assert) {
  this.set("config", {
    css: {
      label: "control-label"
    }
  });
  this.render(hbs`{{validated-input label="Default name" config=config}}`);
  assert.equal(this.$("label").attr("class"), "control-label ember-view");
});

test("it renders custom label component", function(assert) {
  this.register("component:custom-label", Component.extend());
  this.register(
    "template:components/custom-label",
    hbs`<label style="color: green;"></label>`
  );
  this.render(
    hbs`{{validated-input labelComponent=(component "custom-label")}}`
  );
  assert.equal(this.$("label").attr("style"), "color: green;");
});

test("it passes original variables to custom component", function(assert) {
  this.set("config", "this would be some config :)");
  this.register("component:custom-label", Component.extend());
  this.register(
    "template:components/custom-label",
    hbs`<label style="color: green;"><span id="orig-label">{{label}}</span>
    <span id="form-config">{{config}}</span>
    <span id="orig-input-id">{{inputId}}</span>
    <span id="orig-input-required">{{required}}</span></label>`
  );
  this.render(
    hbs`{{validated-input label="Name custom" name="orig-name" 
    required=true config=config labelComponent=(component "custom-label")}}`
  );
  assert.equal(this.$("label").attr("style"), "color: green;");
  assert.equal(this.$("#orig-label").text(), "Name custom");
  assert.equal(this.$("#form-config").text(), "this would be some config :)");
  assert.equal(this.$("#orig-input-required").text(), "true");
  assert.ok(
    this.$("#orig-input-id")
      .text()
      .includes("input-orig-name")
  );
});

test("it passes custom variables to custom component", function(assert) {
  this.register("component:custom-label", Component.extend());
  this.register(
    "template:components/custom-label",
    hbs`<label style="color: green;">{{customVariable}}</label>`
  );
  this.render(
    hbs`{{validated-input labelComponent=(component "custom-label" customVariable="Awesome!")}}`
  );
  assert.equal(this.$("label").attr("style"), "color: green;");
  assert.equal(this.$("label").text(), "Awesome!");
});
