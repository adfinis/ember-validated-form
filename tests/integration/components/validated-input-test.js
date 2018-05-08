import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
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
});
