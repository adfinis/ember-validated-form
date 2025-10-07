/* eslint-disable ember/no-empty-glimmer-component-classes */

import { setComponentTemplate } from "@ember/component";
import { render } from "@ember/test-helpers";
import Component from "@glimmer/component";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import { setupRenderingTest } from "dummy/tests/helpers";
import { test } from "dummy/tests/helpers/scenarios";

module("Integration | Component | validated label", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders labels", async function (assert) {
    await render(
      hbs`<ValidatedInput @label="Default name" @name="default-name" />`,
    );

    assert.dom("label").hasText("Default name");
    const input = this.element.querySelector("input");
    assert.dom("label").hasAttribute("for", input.getAttribute("id"));
  });

  test("it renders custom label component", async function (assert) {
    class CustomLabel extends Component {}
    setComponentTemplate(
      hbs`<label style="color: green;"></label>`,
      CustomLabel,
    );
    this.CustomLabel = CustomLabel;

    await render(hbs`<ValidatedInput @labelComponent={{this.CustomLabel}} />`);

    assert.dom("label").hasAttribute("style", "color: green;");
  });

  test("it passes original variables to custom component", async function (assert) {
    class CustomLabel extends Component {}
    setComponentTemplate(
      hbs`<label style="color: green;">
  <span id="orig-label">{{@label}}</span>
  <span id="orig-input-id">{{@inputId}}</span>
  <span id="orig-input-required">{{@required}}</span>
</label>`,
      CustomLabel,
    );
    this.CustomLabel = CustomLabel;

    await render(hbs`<ValidatedInput
  @label="Name custom"
  @name="orig-name"
  @required={{true}}
  @labelComponent={{this.CustomLabel}}
/>`);

    assert.dom("label").hasAttribute("style", "color: green;");
    assert.dom("#orig-label").hasText("Name custom");
    assert.dom("#orig-input-required").hasText("true");

    const input = this.element.querySelector("input");
    assert.dom("#orig-input-id").hasText(input.getAttribute("id"));
  });

  test("it passes custom variables to custom component", async function (assert) {
    class CustomLabel extends Component {}
    setComponentTemplate(
      hbs`<label style="color: green;">{{@customVariable}}</label>`,
      CustomLabel,
    );
    this.CustomLabel = CustomLabel;

    await render(hbs`<ValidatedInput
  @labelComponent={{component
    (ensure-safe-component this.CustomLabel)
    customVariable="Awesome!"
  }}
/>`);

    assert.dom("label").hasAttribute("style", "color: green;");
    assert.dom("label").hasText("Awesome!");
  });
});
