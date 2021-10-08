import { set } from "@ember/object";
import { render } from "@ember/test-helpers";
import Component from "@glimmer/component";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module("Integration | Component | validated form defaults", function (hooks) {
  setupRenderingTest(hooks);
  setupConfigTest(hooks, {});

  test("renders custom components", async function (assert) {
    assert.expect(4);

    set(
      this.owner.resolveRegistration("config:environment"),
      "ember-validated-form.defaults",
      {
        label: "x-custom-label",
        hint: "x-custom-hint",
        error: "x-custom-error",
        render: "x-custom-render",
      }
    );

    this.owner.register("component:x-custom-label", class extends Component {});
    this.owner.register("component:x-custom-hint", class extends Component {});
    this.owner.register("component:x-custom-error", class extends Component {});
    this.owner.register(
      "component:x-custom-render",
      class extends Component {}
    );

    this.owner.register(
      "template:components/x-custom-label",
      hbs`<custom-label />`
    );
    this.owner.register(
      "template:components/x-custom-hint",
      hbs`<custom-hint />`
    );
    this.owner.register(
      "template:components/x-custom-error",
      hbs`<custom-error />`
    );
    this.owner.register(
      "template:components/x-custom-render",
      hbs`
        <custom-render>
          {{component @labelComponent}}
          {{component @hintComponent}}
          {{component @errorComponent}}
        </custom-render>
      `
    );

    this.model = { error: { test1: { validation: ["Error"] } } };

    await render(hbs`
      <ValidatedForm as |f|>
        <f.input
          @name="test1"
          @type="text"
          @label="Label!"
          @hint="Hint!"
          @submitted={{true}}
          @model={{this.model}}
        />
      </ValidatedForm>
    `);

    assert.dom("custom-render").exists();
    assert.dom("custom-label").exists();
    assert.dom("custom-hint").exists();
    assert.dom("custom-error").exists();
  });

  test("renders custom button components", async function (assert) {
    assert.expect(1);

    set(
      this.owner.resolveRegistration("config:environment"),
      "ember-validated-form.defaults",
      {
        button: "x-custom-button",
      }
    );

    this.owner.register(
      "component:x-custom-button",
      class extends Component {}
    );
    this.owner.register(
      "template:components/x-custom-button",
      hbs`<custom-button />`
    );

    await render(hbs`
      <ValidatedForm as |f|>
        <f.submit @label="Submit!" />
      </ValidatedForm>
    `);

    assert.dom("custom-button").exists();
  });

  test("renders custom type components", async function (assert) {
    assert.expect(5);

    set(
      this.owner.resolveRegistration("config:environment"),
      "ember-validated-form.defaults",
      {
        "types/checkbox": "x-custom-checkbox",
        "types/input": "x-custom-input",
        "types/radio-group": "x-custom-radio-group",
        "types/select": "x-custom-select",
        "types/textarea": "x-custom-textarea",
      }
    );

    this.owner.register(
      "component:x-custom-checkbox",
      class extends Component {}
    );
    this.owner.register("component:x-custom-input", class extends Component {});
    this.owner.register(
      "component:x-custom-radio-group",
      class extends Component {}
    );
    this.owner.register(
      "component:x-custom-select",
      class extends Component {}
    );
    this.owner.register(
      "component:x-custom-textarea",
      class extends Component {}
    );

    this.owner.register(
      "template:components/x-custom-checkbox",
      hbs`<custom-checkbox />`
    );
    this.owner.register(
      "template:components/x-custom-input",
      hbs`<custom-input />`
    );
    this.owner.register(
      "template:components/x-custom-radio-group",
      hbs`<custom-radio-group />`
    );
    this.owner.register(
      "template:components/x-custom-select",
      hbs`<custom-select />`
    );
    this.owner.register(
      "template:components/x-custom-textarea",
      hbs`<custom-textarea />`
    );

    await render(hbs`
      <ValidatedForm as |f|>
        <f.input @type="checkbox" />
        <f.input @type="text" />
        <f.input @type="radio-group" />
        <f.input @type="select" />
        <f.input @type="textarea" />
      </ValidatedForm>
    `);

    assert.dom("custom-checkbox").exists();
    assert.dom("custom-input").exists();
    assert.dom("custom-radio-group").exists();
    assert.dom("custom-select").exists();
    assert.dom("custom-textarea").exists();
  });
});
