import { defer } from "rsvp";
import { run } from "@ember/runloop";
import EmberObject from "@ember/object";
import Service from "@ember/service";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click, blur, focus } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import UserValidations from "dummy/validations/user";
import tHelper from "ember-i18n/helper";

module("Integration | Component | validated form", function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  test("it renders simple inputs", async function(assert) {
    await render(hbs`
      {{#validated-form as |f|}}
        {{f.input label="First name"}}
      {{/validated-form}}
    `);

    assert.dom("form label").hasText("First name");
    assert.dom("form input").hasAttribute("type", "text");
  });

  test("it renders textareas", async function(assert) {
    await render(hbs`
      {{#validated-form as |f|}}
        {{f.input type="textarea" label="my label"}}
      {{/validated-form}}
    `);

    assert.dom("form label").hasText("my label");
    assert.dom("form textarea").exists({ count: 1 });
  });

  test("it renders a radio group", async function(assert) {
    this.set("buttonGroupData", {
      options: [
        { key: "1", label: "Option 1" },
        { key: "2", label: "Option 2" },
        { key: "3", label: "Option 3" }
      ]
    });

    await render(hbs`
      {{#validated-form as |f|}}
        {{f.input type='radioGroup' label='Options' name='testOptions' options=buttonGroupData.options}}
      {{/validated-form}}
    `);

    assert.dom('input[type="radio"]').exists({ count: 3 });
    assert.dom("label:nth-of-type(1)").hasText("Options");
    assert.dom(".radio:nth-of-type(1) label").hasText("Option 1");
    assert.dom(".radio:nth-of-type(2) label").hasText("Option 2");
    assert.dom(".radio:nth-of-type(3) label").hasText("Option 3");
    assert.dom("label > span").exists({ count: 3 });
    assert.dom('input[type="radio"][value="1"]').exists();
    assert.dom('input[type="radio"][value="2"]').exists();
    assert.dom('input[type="radio"][value="3"]').exists();
  });

  test("it renders a radio group with block form", async function(assert) {
    this.set("buttonGroupData", {
      options: [
        { key: "1", label: "Option 1" },
        { key: "2", label: "Option 2" },
        { key: "3", label: "Option 3" }
      ]
    });

    await render(hbs`
      {{#validated-form as |f|}}
        {{#f.input type='radioGroup' label='Options' name='testOptions' options=buttonGroupData.options as |option|}}
          {{option.label}} - block form
        {{/f.input}}
      {{/validated-form}}
    `);

    assert.dom('input[type="radio"]').exists({ count: 3 });
    assert.dom("label:nth-of-type(1)").hasText("Options");
    assert.dom(".radio:nth-of-type(1) label").hasText("Option 1 - block form");
    assert.dom(".radio:nth-of-type(2) label").hasText("Option 2 - block form");
    assert.dom(".radio:nth-of-type(3) label").hasText("Option 3 - block form");
    assert.dom('input[type="radio"][value="1"]').exists();
    assert.dom('input[type="radio"][value="2"]').exists();
    assert.dom('input[type="radio"][value="3"]').exists();
  });

  test("it renders a radio group with block form and i18n support", async function(assert) {
    let i18n = this.owner.lookup("service:i18n");

    i18n.set("locale", "en");
    i18n.addTranslations("en", {
      "label.foo": "Option One",
      "label.bar": "Option Two",
      "label.baz": "Option Three"
    });

    this.owner.register("helper:t", tHelper);

    this.set("buttonGroupData", {
      options: [
        { key: "1", label: "label.foo" },
        { key: "2", label: "label.bar" },
        { key: "3", label: "label.baz" }
      ]
    });

    await render(hbs`
      {{#validated-form as |f|}}
        {{#f.input type='radioGroup' label='Options' name='testOptions' options=buttonGroupData.options as |option|}}
          {{t option.label}} - block form
        {{/f.input}}
      {{/validated-form}}
    `);

    assert.dom('input[type="radio"]').exists({ count: 3 });
    assert.dom("label:nth-of-type(1)").hasText("Options");
    assert
      .dom(".radio:nth-of-type(1) label")
      .hasText("Option One - block form");
    assert
      .dom(".radio:nth-of-type(2) label")
      .hasText("Option Two - block form");
    assert
      .dom(".radio:nth-of-type(3) label")
      .hasText("Option Three - block form");
    assert.dom('input[type="radio"][value="1"]').exists();
    assert.dom('input[type="radio"][value="2"]').exists();
    assert.dom('input[type="radio"][value="3"]').exists();

    this.owner.unregister("helper:t");
  });

  test("it renders submit buttons", async function(assert) {
    this.actions.stub = function() {};

    await render(hbs`
      {{#validated-form
        on-submit=(action "stub")
        as |f|}}
        {{f.input label="First name"}}
        {{f.submit label="Save!"}}
      {{/validated-form}}
    `);

    assert.dom("form button").hasAttribute("type", "submit");
    assert.dom("form button").hasText("Save!");
  });

  test("it renders an always-showing hint using a different class from the help block", async function(assert) {
    this.set("config", {
      css: {
        help: "help",
        hint: "hint"
      }
    });

    await render(hbs`
      {{#validated-form config=config as |f|}}
        {{f.input label="First name" hint="Not your middle name!"}}
      {{/validated-form}}
    `);

    assert.dom(".help-block").doesNotExist();
    assert.dom(".hint").exists({ count: 1 });
    assert.dom(".hint").hasText("Not your middle name!");
  });

  test("does not render a <p> tag for buttons if no callbacks were passed", async function(assert) {
    await render(hbs`
      {{#validated-form as |f|}}
        {{f.input label="First name"}}
      {{/validated-form}}
    `);

    assert.dom("form > p").doesNotExist();
  });

  test("it supports default button labels with i18n support", async function(assert) {
    this.actions.stub = function() {};

    this.owner.register(
      "service:i18n",
      EmberObject.extend({
        t(key) {
          return key === "label.save" ? "Speichern" : "";
        }
      })
    );

    await render(hbs`
      {{#validated-form
        on-submit=(action "stub")
        as |f|}}
        {{f.submit}}
      {{/validated-form}}
    `);

    assert.dom("form button:first-of-type").hasText("Speichern");
  });

  test("it supports default button labels without i18n support", async function(assert) {
    this.owner.register("service:i18n", Service.extend({ t: k => k }));

    this.actions.stub = function() {};

    await render(hbs`
      {{#validated-form
        on-submit=(action "stub")
        as |f|}}
        {{f.submit}}
      {{/validated-form}}
    `);

    assert.dom("form button:first-of-type").hasText("label.save");
  });

  test("it performs basic validations on submit", async function(assert) {
    this.actions.submit = function() {};
    this.set("UserValidations", UserValidations);

    run(() => {
      this.set(
        "model",
        EmberObject.create({
          firstName: "x"
        })
      );
    });

    await render(hbs`
      {{#validated-form
        model=(changeset model UserValidations)
        on-submit=(action "submit")
        as |f|}}
        {{f.input label="First name" name="firstName"}}
        {{f.submit}}
      {{/validated-form}}
    `);

    assert.dom("span.form-text.text-danger").doesNotExist();

    await click("button");

    assert.dom("input").hasValue("x");
    assert.dom("span.form-text.text-danger").exists({ count: 1 });
    assert
      .dom("span.form-text.text-danger")
      .hasText("First name must be between 3 and 40 characters");
  });

  test("it calls on-invalid-submit after submit if changeset is invalid", async function(assert) {
    let invalidSubmitCalled;
    this.actions.invalidSubmit = function() {
      invalidSubmitCalled = true;
    };
    this.set("UserValidations", UserValidations);

    run(() => {
      this.set(
        "model",
        EmberObject.create({
          firstName: "x"
        })
      );
    });

    await render(hbs`
      {{#validated-form
        model=(changeset model UserValidations)
        on-invalid-submit=(action "invalidSubmit")
        as |f|}}
        {{f.input label="First name" name="firstName"}}
        {{f.submit}}
      {{/validated-form}}
    `);

    await click("button");

    assert.equal(invalidSubmitCalled, true);
  });

  test("it does not call on-invalid-submit after submit if changeset is valid", async function(assert) {
    let invalidSubmitCalled, submitCalled;
    this.actions.submit = function() {
      submitCalled = true;
    };
    this.actions.invalidSubmit = function() {
      invalidSubmitCalled = true;
    };

    run(() => {
      this.set("model", EmberObject.create({}));
    });

    await render(hbs`
      {{#validated-form
        model=model
        on-submit=(action "submit")
        on-invalid-submit=(action "invalidSubmit")
        as |f|}}
        {{f.input label="First name" name="firstName"}}
        {{f.submit}}
      {{/validated-form}}
    `);

    await click("button");

    assert.notOk(invalidSubmitCalled);
    assert.equal(submitCalled, true);
  });

  test("it performs basic validations on focus out", async function(assert) {
    this.actions.submit = function() {};
    this.set("UserValidations", UserValidations);

    run(() => {
      this.set("model", EmberObject.create({}));
    });

    await render(hbs`
      {{#validated-form
        model=(changeset model UserValidations)
        on-submit=(action "submit")
        as |f|}}
        {{f.input label="First name" name="firstName"}}
      {{/validated-form}}
    `);

    assert.dom("span.help-block").doesNotExist();

    await focus("input");
    await blur("input");

    assert.dom("span.form-text.text-danger").exists({ count: 1 });
    assert
      .dom("span.form-text.text-danger")
      .hasText("First name can't be blank");
  });

  test("it skips basic validations on focus out with validateBeforeSubmit=false set on the form", async function(assert) {
    this.actions.submit = function() {};
    this.set("UserValidations", UserValidations);

    run(() => {
      this.set("model", EmberObject.create({}));
    });

    await render(hbs`
      {{#validated-form
        model=(changeset model UserValidations)
        on-submit=(action "submit")
        validateBeforeSubmit=false
        as |f|}}
        {{f.input label="First name" name="firstName"}}
        {{f.submit}}
      {{/validated-form}}
    `);

    assert.dom("span.form-text.text-danger").doesNotExist();

    await focus("input");
    await blur("input");

    assert.dom("span.form-text.text-danger").doesNotExist();

    await click("button");

    assert.dom("span.form-text.text-danger").exists({ count: 1 });
  });

  test("it skips basic validations on focus out with validateBeforeSubmit=false set on the input", async function(assert) {
    this.actions.submit = function() {};
    this.set("UserValidations", UserValidations);

    run(() => {
      this.set("model", EmberObject.create({}));
    });

    await render(hbs`
      {{#validated-form
        model=(changeset model UserValidations)
        on-submit=(action "submit")
        as |f|}}
        {{f.input label="First name" name="firstName" validateBeforeSubmit=false}}
      {{/validated-form}}
    `);

    assert.dom("span.help-block").doesNotExist();

    await focus("input");
    await blur("input");

    assert.dom("span.help-block").doesNotExist();
  });

  test("on-submit can be an action returning a promise", async function(assert) {
    let deferred = defer();

    this.actions.submit = () => deferred.promise;

    run(() => {
      this.set("model", EmberObject.create({}));
    });

    await render(hbs`
      {{#validated-form
        model=(changeset model)
        on-submit=(action "submit")
        as |f|}}
        {{f.submit}}
      {{/validated-form}}
    `);

    assert.dom("button").doesNotHaveClass("loading");

    await click("button");

    assert.dom("button").hasClass("loading");

    run(() => deferred.resolve());

    assert.dom("button").doesNotHaveClass("loading");
  });

  test("on-submit can be an action returning a non-promise", async function(assert) {
    this.actions.submit = () => undefined;

    run(() => {
      this.set("model", EmberObject.create({}));
    });

    await render(hbs`
      {{#validated-form
        model=(changeset model)
        on-submit=(action "submit")
        as |f|}}
        {{f.submit}}
      {{/validated-form}}
    `);

    assert.dom("button").doesNotHaveClass("loading");

    await click("button");

    assert.dom("button").doesNotHaveClass("loading");
  });

  test("it yields the loading state", async function(assert) {
    let deferred = defer();

    this.actions.submit = () => deferred.promise;

    run(() => {
      this.set("model", EmberObject.create({}));
    });

    await render(hbs`
      {{#validated-form
        model=(changeset model)
        on-submit=(action "submit")
        as |f|}}
        {{#if f.loading}}
          <span class="loading">loading...</span>
        {{/if}}
        {{f.submit}}
      {{/validated-form}}
    `);
    assert.dom("span.loading").doesNotExist();

    await click("button");

    assert.dom("span.loading").exists();

    run(() => deferred.resolve());

    assert.dom("span.loading").doesNotExist();
  });

  test("it handles being removed from the DOM during sync submit", async function(assert) {
    this.set("show", true);

    this.actions.submit = () => {
      this.set("show", false);
    };

    run(() => {
      this.set("model", EmberObject.create({}));
    });

    await render(hbs`
      {{#if show}}
        {{#validated-form
          model=(changeset model)
          on-submit=(action "submit")
          as |f|}}
          {{#if f.loading}}
            <span class="loading">loading...</span>
          {{/if}}
          {{f.submit}}
        {{/validated-form}}
      {{/if}}
    `);

    await click("button");
    assert.ok(true);
  });

  test("it handles being removed from the DOM during async submit", async function(assert) {
    this.set("show", true);
    let deferred = defer();

    this.actions.submit = () => {
      return deferred.promise.then(() => {
        this.set("show", false);
      });
    };

    run(() => {
      this.set("model", EmberObject.create({}));
    });

    await render(hbs`
      {{#if show}}
        {{#validated-form
          model=(changeset model)
          on-submit=(action "submit")
          as |f|}}
          {{#if f.loading}}
            <span class="loading">loading...</span>
          {{/if}}
          {{f.submit}}
        {{/validated-form}}
      {{/if}}
    `);

    await click("button");
    run(() => deferred.resolve());
    assert.ok(true);
  });

  test("it binds the autocomplete attribute", async function(assert) {
    await render(hbs`
      {{#validated-form autocomplete="off"}}
      {{/validated-form}}
    `);

    assert.dom("form").hasAttribute("autocomplete", "off");
  });
});
