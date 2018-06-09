import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import Changeset from "ember-changeset";

module("Integration | Component | validated input", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders simple text inputs with correct id, name and class", async function(assert) {
    this.set("config", {
      css: {
        control: "foobar"
      }
    });

    await render(hbs`{{validated-input id="foo" name="bar" config=config}}`);

    assert.dom("input").hasAttribute("type", "text");
    assert.dom("input#foo-input-bar").exists();
    assert.dom("input").hasAttribute("name", "bar");
    assert.dom("input").hasAttribute("class", "foobar ");
  });

  test("it renders email input", async function(assert) {
    await render(hbs`{{validated-input type="email"}}`);

    assert.dom("input").hasAttribute("type", "email");
  });

  test("it renders tel input", async function(assert) {
    await render(hbs`{{validated-input type="tel"}}`);

    assert.dom("input").hasAttribute("type", "tel");
  });

  test("it renders disabled inputs", async function(assert) {
    await render(hbs`{{validated-input disabled=true}}`);

    assert.dom("input").isDisabled();
  });

  test("it renders inputs with placeholder", async function(assert) {
    await render(hbs`{{validated-input placeholder="foo"}}`);

    assert.dom("input").hasAttribute("placeholder", "foo");
  });

  test("it renders inputs with value", async function(assert) {
    await render(hbs`{{validated-input value="foo"}}`);

    assert.dom("input").hasValue("foo");
  });

  test("it renders inputs with model", async function(assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(hbs`{{validated-input name="firstName" model=model}}`);

    assert.dom("input").hasValue("Max");
  });

  test("it renders inputs with value even if model is defined", async function(assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(
      hbs`{{validated-input name="firstName" model=model value="foobar"}}`
    );

    assert.dom("input").hasValue("foobar");
  });

  test("it renders textarea inputs with correct id, name and class", async function(assert) {
    this.set("config", {
      css: {
        control: "foobar"
      }
    });
    await render(
      hbs`{{validated-input type="textarea" id="foo" name="bar" config=config}}`
    );

    assert.dom("textarea#foo-input-bar").exists();
    assert.dom("textarea").hasAttribute("name", "bar");
    assert.dom("textarea").hasAttribute("class", "foobar ");
  });

  test("it renders disabled textareas", async function(assert) {
    await render(hbs`{{validated-input type="textarea" disabled=true}}`);

    assert.dom("textarea").isDisabled();
  });

  test("it renders textareas with placeholder", async function(assert) {
    await render(hbs`{{validated-input type="textarea" placeholder="foo"}}`);

    assert.dom("textarea").hasAttribute("placeholder", "foo");
  });

  test("it renders textareas with value", async function(assert) {
    await render(hbs`{{validated-input type="textarea" value="foo"}}`);

    assert.dom("textarea").hasValue("foo");
  });

  test("it renders textareas with model", async function(assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(
      hbs`{{validated-input type="textarea" name="firstName" model=model}}`
    );

    assert.dom("textarea").hasValue("Max");
  });

  test("it renders textareas autocomplete attribute", async function(assert) {
    await render(
      hbs`{{validated-input type="textarea" autocomplete="given-name" name="firstName"}}`
    );

    assert.dom("textarea").hasAttribute("autocomplete", "given-name");
  });

  test("it renders input autocomplete attribute", async function(assert) {
    await render(
      hbs`{{validated-input type="password" autocomplete="new-password" name="password"}}`
    );

    assert.dom("input").hasAttribute("autocomplete", "new-password");
  });

  test("it renders the block if provided", async function(assert) {
    await render(
      hbs`
        {{#validated-input as |fi|}}
          <div id="custom-input"></div>
        {{/validated-input}}
      `
    );

    assert.dom("#custom-input").exists();
  });

  test("it yields the value provided to the block", async function(assert) {
    await render(
      hbs`
        {{#validated-input value="my-value" as |fi|}}
          <input value={{fi.value}} />
        {{/validated-input}}
      `
    );

    assert.dom("input").hasValue("my-value");
  });

  test("it yields the name from the model as value", async function(assert) {
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

  test("it yields the value as value if both model and value is provided", async function(assert) {
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

  test("it yields the css control class as controlClass", async function(assert) {
    this.set("config", {
      css: {
        control: "foobar"
      }
    });

    await render(
      hbs`
        {{#validated-input config=config as |fi|}}
          <input class="{{fi.controlClass}}" />
        {{/validated-input}}
      `
    );

    assert.dom("input").hasClass("foobar");
  });

  test("it yields the provided name", async function(assert) {
    await render(
      hbs`
        {{#validated-input name="foobar" as |fi|}}
          <input name={{fi.name}} />
        {{/validated-input}}
      `
    );

    assert.dom("input").hasAttribute("name", "foobar");
  });

  test("it yields the validation class as class", async function(assert) {
    await render(
      hbs`
        {{#validated-input dirty=true as |fi|}}
          <input class={{fi.class}} />
        {{/validated-input}}
      `
    );

    assert.dom("input").hasClass("valid");
  });

  test("it yields the model", async function(assert) {
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

  test("it yields an action for updating the model", async function(assert) {
    let model = new Changeset({ firstName: "Max" });
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

  test("it yields an action marking the input as dirty", async function(assert) {
    await render(
      hbs`
        {{#validated-input as |fi|}}
          <button onclick={{action fi.setDirty}}></button>
        {{/validated-input}}
      `
    );

    assert.dom("div.dirty").doesNotExist();

    await click("button");

    assert.dom("div.dirty").exists();
  });
});
