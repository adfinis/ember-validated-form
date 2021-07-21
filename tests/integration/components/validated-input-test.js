import { render, click, fillIn, settled } from "@ember/test-helpers";
import Changeset from "ember-changeset";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Component | validated input", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders simple text inputs with correct name", async function (assert) {
    await render(hbs`{{validated-input name="bar"}}`);

    assert.dom("input").hasAttribute("type", "text");
    assert.dom("input").hasAttribute("name", "bar");
  });

  test("it renders email input", async function (assert) {
    await render(hbs`{{validated-input type="email"}}`);

    assert.dom("input").hasAttribute("type", "email");
  });

  test("it renders tel input", async function (assert) {
    await render(hbs`{{validated-input type="tel"}}`);

    assert.dom("input").hasAttribute("type", "tel");
  });

  test("it renders disabled inputs", async function (assert) {
    await render(hbs`{{validated-input disabled=true}}`);

    assert.dom("input").isDisabled();
  });

  test("it renders inputs with placeholder", async function (assert) {
    await render(hbs`{{validated-input placeholder="foo"}}`);

    assert.dom("input").hasAttribute("placeholder", "foo");
  });

  test("it renders inputs with value", async function (assert) {
    await render(hbs`{{validated-input value="foo"}}`);

    assert.dom("input").hasValue("foo");
  });

  test("it renders inputs with model", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(hbs`{{validated-input name="firstName" model=model}}`);

    assert.dom("input").hasValue("Max");
  });

  test("it calls on-update if given", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));
    this.set("update", (value, changeset) => {
      changeset.set("firstName", value.toUpperCase());
    });
    await render(
      hbs`{{validated-input name="firstName" model=model on-update=update}}`
    );

    await fillIn("input", "foo");

    assert.dom("input").hasValue("FOO");
  });

  test("it renders inputs with value even if model is defined", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(
      hbs`{{validated-input name="firstName" model=model value="foobar"}}`
    );

    assert.dom("input").hasValue("foobar");
  });

  test("it renders textarea inputs with correct name", async function (assert) {
    await render(hbs`{{validated-input type="textarea" name="bar"}}`);

    assert.dom("textarea").hasAttribute("name", "bar");
  });

  test("it renders disabled textareas", async function (assert) {
    await render(hbs`{{validated-input type="textarea" disabled=true}}`);

    assert.dom("textarea").isDisabled();
  });

  test("it renders textareas with placeholder", async function (assert) {
    await render(hbs`{{validated-input type="textarea" placeholder="foo"}}`);

    assert.dom("textarea").hasAttribute("placeholder", "foo");
  });

  test("it renders textareas with value", async function (assert) {
    await render(hbs`{{validated-input type="textarea" value="foo"}}`);

    assert.dom("textarea").hasValue("foo");
  });

  test("it renders textareas with model", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(
      hbs`{{validated-input type="textarea" name="firstName" model=model}}`
    );

    assert.dom("textarea").hasValue("Max");
  });

  test("it renders textareas autocomplete attribute", async function (assert) {
    await render(
      hbs`{{validated-input type="textarea" autocomplete="given-name" name="firstName"}}`
    );

    assert.dom("textarea").hasAttribute("autocomplete", "given-name");
  });

  test("it renders input autocomplete attribute", async function (assert) {
    await render(
      hbs`{{validated-input type="password" autocomplete="new-password" name="password"}}`
    );

    assert.dom("input").hasAttribute("autocomplete", "new-password");
  });

  test("it renders the block if provided", async function (assert) {
    await render(
      hbs`
        {{#validated-input as |fi|}}
          <div id="custom-input"></div>
        {{/validated-input}}
      `
    );

    assert.dom("#custom-input").exists();
  });

  test("it yields the value provided to the block", async function (assert) {
    await render(
      hbs`
        {{#validated-input value="my-value" as |fi|}}
          <input value={{fi.value}} />
        {{/validated-input}}
      `
    );

    assert.dom("input").hasValue("my-value");
  });

  test("it yields the name from the model as value", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(
      hbs`
        {{#validated-input model=model name="firstName" as |fi|}}
          <input value={{fi.value}} />
        {{/validated-input}}
      `
    );

    assert.dom("input").hasValue("Max");
  });

  test("it yields the value as value if both model and value is provided", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(
      hbs`
        {{#validated-input model=model name="firstName" value="Other Value" as |fi|}}
          <input value={{fi.value}} />
        {{/validated-input}}
      `
    );

    assert.dom("input").hasValue("Other Value");
  });

  test("it yields the provided name", async function (assert) {
    await render(
      hbs`
        {{#validated-input name="foobar" as |fi|}}
          <input name={{fi.name}} />
        {{/validated-input}}
      `
    );

    assert.dom("input").hasAttribute("name", "foobar");
  });

  test("it yields the model", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(
      hbs`
        {{#validated-input model=model as |fi|}}
          <input value={{fi.model.firstName}} />
        {{/validated-input}}
      `
    );

    assert.dom("input").hasValue("Max");
  });

  test("it yields an action for updating the model", async function (assert) {
    const model = new Changeset({ firstName: "Max" });
    this.set("model", model);

    await render(
      hbs`
        {{#validated-input model=model name="firstName" as |fi|}}
          <button onclick={{action fi.update "Merlin"}}></button>
        {{/validated-input}}
      `
    );

    await click("button");

    assert.equal("Merlin", model.get("firstName"));
  });

  test("it yields an action marking the input as dirty", async function (assert) {
    this.set("model", { error: { test: { validation: ["Error"] } } });

    await render(
      hbs`
        {{#validated-input name='test' model=model as |fi|}}
          <button onclick={{action fi.setDirty}}></button>
        {{/validated-input}}
      `
    );

    assert.dom("span.invalid-feedback").doesNotExist();

    await click("button");

    assert.dom("span.invalid-feedback").exists();
  });

  test("it yields the input id to the block", async function (assert) {
    await render(
      hbs`
        {{#validated-input label="Name" as |fi|}}
          <input id={{fi.inputId}} />
        {{/validated-input}}
      `
    );

    const label = this.element.querySelector("label");
    const input = this.element.querySelector("input");
    assert.equal(label.getAttribute("for"), input.getAttribute("id"));
  });

  test("it can change the value from outside the input", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(hbs`{{validated-input name="firstName" model=model}}`);

    assert.dom("input").hasValue("Max");

    this.set("model.firstName", "Hans");

    assert.dom("input").hasValue("Hans");
  });

  test("it can overwrite the input name", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(
      hbs`{{validated-input name="firstName" inputName="testFirstName" model=model}}`
    );

    assert.dom("input").hasValue("Max");
    assert.dom("input").hasAttribute("name", "testFirstName");
  });

  test("it updates _val on nested fields", async function (assert) {
    this.set("model", new Changeset({ nested: { name: "Max" } }));

    await render(
      hbs`
        <span id="raw">{{this.model.nested.name}}</span>
        <ValidatedInput @name="nested.name" @model={{this.model}} as |Input|>
          <span id="_val">{{Input.value}}</span>
        </ValidatedInput>
      `
    );

    assert.dom("#raw").hasText("Max");
    assert.dom("#_val").hasText("Max");

    this.model.set("nested.name", "Tom");
    await settled();

    assert.dom("#raw").hasText("Tom");
    assert.dom("#_val").hasText("Tom");
  });
});
