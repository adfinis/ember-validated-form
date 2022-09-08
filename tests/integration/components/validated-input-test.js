import { render, click, fillIn, settled } from "@ember/test-helpers";
import Changeset from "ember-changeset";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module } from "qunit";

import { testDefault, testBootstrap } from "dummy/tests/helpers/scenarios";

module("Integration | Component | validated input", function (hooks) {
  setupRenderingTest(hooks);

  testDefault(
    "it renders simple text inputs with correct name",
    async function (assert) {
      await render(hbs`<ValidatedInput @name="bar"/>`);

      assert.dom("input").hasAttribute("type", "text");
      assert.dom("input").hasAttribute("name", "bar");
    }
  );

  testDefault("it renders email input", async function (assert) {
    await render(hbs`<ValidatedInput @type="email"/>`);

    assert.dom("input").hasAttribute("type", "email");
  });

  testDefault("it renders tel input", async function (assert) {
    await render(hbs`<ValidatedInput @type="tel"/>`);

    assert.dom("input").hasAttribute("type", "tel");
  });

  testDefault("it renders disabled inputs", async function (assert) {
    await render(hbs`<ValidatedInput @disabled={{true}}/>`);

    assert.dom("input").isDisabled();
  });

  testDefault("it renders inputs with placeholder", async function (assert) {
    await render(hbs`<ValidatedInput @placeholder="foo"/>`);

    assert.dom("input").hasAttribute("placeholder", "foo");
  });

  testDefault("it renders inputs with value", async function (assert) {
    await render(hbs`<ValidatedInput @value="foo"/>`);

    assert.dom("input").hasValue("foo");
  });

  testDefault("it renders inputs with model", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(
      hbs`<ValidatedInput @name="firstName" @model={{this.model}}/>`
    );

    assert.dom("input").hasValue("Max");
  });

  testDefault("it calls on-update if given", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));
    this.set("update", (value, changeset) => {
      changeset.set("firstName", value.toUpperCase());
    });
    await render(
      hbs`<ValidatedInput @name="firstName" @model={{this.model}} @on-update={{this.update}}/>`
    );

    await fillIn("input", "foo");

    assert.dom("input").hasValue("FOO");
  });

  testDefault(
    "it renders inputs with value even if model is defined",
    async function (assert) {
      this.set("model", new Changeset({ firstName: "Max" }));

      await render(
        hbs`<ValidatedInput @name="firstName" @model={{this.model}} @value="foobar"/>`
      );

      assert.dom("input").hasValue("foobar");
    }
  );

  testDefault(
    "it renders textarea inputs with correct name",
    async function (assert) {
      await render(hbs`<ValidatedInput @type="textarea" @name="bar"/>`);

      assert.dom("textarea").hasAttribute("name", "bar");
    }
  );

  testDefault("it renders disabled textareas", async function (assert) {
    await render(hbs`<ValidatedInput @type="textarea" @disabled={{true}}/>`);

    assert.dom("textarea").isDisabled();
  });

  testDefault("it renders textareas with placeholder", async function (assert) {
    await render(hbs`<ValidatedInput @type="textarea" @placeholder="foo"/>`);

    assert.dom("textarea").hasAttribute("placeholder", "foo");
  });

  testDefault("it renders textareas with value", async function (assert) {
    await render(hbs`<ValidatedInput @type="textarea" @value="foo"/>`);

    assert.dom("textarea").hasValue("foo");
  });

  testDefault("it renders textareas with model", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(
      hbs`<ValidatedInput @type="textarea" @name="firstName" @model={{this.model}}/>`
    );

    assert.dom("textarea").hasValue("Max");
  });

  testDefault(
    "it renders textareas autocomplete attribute",
    async function (assert) {
      await render(
        hbs`<ValidatedInput @type="textarea" @autocomplete="given-name" @name="firstName"/>`
      );

      assert.dom("textarea").hasAttribute("autocomplete", "given-name");
    }
  );

  testDefault(
    "it renders input autocomplete attribute",
    async function (assert) {
      await render(
        hbs`<ValidatedInput @type="password" @autocomplete="new-password" @name="password"/>`
      );

      assert.dom("input").hasAttribute("autocomplete", "new-password");
    }
  );

  testDefault("it renders the block if provided", async function (assert) {
    await render(
      hbs`
        <ValidatedInput as |fi|>
          <div id="custom-input"></div>
        </ValidatedInput>
      `
    );

    assert.dom("#custom-input").exists();
  });

  testDefault(
    "it yields the value provided to the block",
    async function (assert) {
      await render(
        hbs`
        <ValidatedInput @value="my-value" as |fi|>
          <input value={{fi.value}} />
        </ValidatedInput>
      `
      );

      assert.dom("input").hasValue("my-value");
    }
  );

  testDefault(
    "it yields the name from the model as value",
    async function (assert) {
      this.set("model", new Changeset({ firstName: "Max" }));

      await render(
        hbs`
        <ValidatedInput @model={{this.model}} @name="firstName" as |fi|>
          <input value={{fi.value}} />
        </ValidatedInput>
      `
      );

      assert.dom("input").hasValue("Max");
    }
  );

  testDefault(
    "it yields the value as value if both model and value is provided",
    async function (assert) {
      this.set("model", new Changeset({ firstName: "Max" }));

      await render(
        hbs`
        <ValidatedInput @model={{this.model}} @name="firstName" @value="Other Value" as |fi|>
          <input value={{fi.value}} />
        </ValidatedInput>
      `
      );

      assert.dom("input").hasValue("Other Value");
    }
  );

  testDefault("it yields the provided name", async function (assert) {
    await render(
      hbs`
        <ValidatedInput @name="foobar" as |fi|>
          <input name={{fi.name}} />
        </ValidatedInput>
      `
    );

    assert.dom("input").hasAttribute("name", "foobar");
  });

  testDefault("it yields the model", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(
      hbs`
        <ValidatedInput @model={{this.model}} as |fi|>
          <input value={{fi.model.firstName}} />
        </ValidatedInput>
      `
    );

    assert.dom("input").hasValue("Max");
  });

  testDefault(
    "it yields an action for updating the model",
    async function (assert) {
      const model = new Changeset({ firstName: "Max" });
      this.set("model", model);

      await render(
        hbs`
        <ValidatedInput @model={{this.model}} @name="firstName" as |fi|>
          <button {{on "click" (fn fi.update "Merlin")}}></button>
        </ValidatedInput>
      `
      );

      await click("button");

      assert.strictEqual(model.get("firstName"), "Merlin");
    }
  );

  testBootstrap(
    "it yields an action marking the input as dirty",
    async function (assert) {
      this.set("model", { error: { test: { validation: ["Error"] } } });

      await render(
        hbs`
        <ValidatedInput @name='test' @model={{this.model}} as |fi|>
          <button {{on "click" fi.setDirty}}></button>
        </ValidatedInput>
      `
      );

      assert.dom("span.invalid-feedback").doesNotExist();

      await click("button");

      assert.dom("span.invalid-feedback").exists();
    }
  );

  testDefault("it yields the input id to the block", async function (assert) {
    await render(
      hbs`
        <ValidatedInput @label="Name" as |fi|>
          <input id={{fi.inputId}} />
        </ValidatedInput>
      `
    );

    const label = this.element.querySelector("label");
    const input = this.element.querySelector("input");
    assert.strictEqual(label.getAttribute("for"), input.getAttribute("id"));
  });

  testDefault(
    "it can change the value from outside the input",
    async function (assert) {
      this.set("model", new Changeset({ firstName: "Max" }));

      await render(
        hbs`<ValidatedInput @name="firstName" @model={{this.model}}/>`
      );

      assert.dom("input").hasValue("Max");

      this.set("model.firstName", "Hans");

      assert.dom("input").hasValue("Hans");
    }
  );

  testDefault("it can overwrite the input name", async function (assert) {
    this.set("model", new Changeset({ firstName: "Max" }));

    await render(
      hbs`<ValidatedInput @name="firstName" @inputName="testFirstName" @model={{this.model}}/>`
    );

    assert.dom("input").hasValue("Max");
    assert.dom("input").hasAttribute("name", "testFirstName");
  });

  testDefault("it updates _val on nested fields", async function (assert) {
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
