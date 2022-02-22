import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import {
  testDefault,
  testUikit,
  testBootstrap,
} from "dummy/tests/helpers/scenarios";

module("Integration | Component | validated-button/button", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.noop = () => {};
  });

  testDefault("it renders", async function (assert) {
    await render(hbs`<ValidatedButton::Button @onClick={{this.noop}} />`);

    assert.dom("button").exists();

    await render(hbs`
      <ValidatedButton::Button @onClick={{this.noop}}>
        Test
      </ValidatedButton::Button>
    `);

    assert.dom("button").hasText("Test");
  });

  testUikit("it renders", async function (assert) {
    await render(hbs`
        <ValidatedButton::Button @onClick={{this.noop}} @label="Test" />
      `);

    assert.dom("button").hasText("Test");
    assert.dom("button").hasClass("uk-button");
    assert.dom("button").hasClass("uk-button-default");
  });

  testUikit("it renders in block style", async function (assert) {
    await render(hbs`
        <ValidatedButton::Button @onClick={{this.noop}}>
          Test
        </ValidatedButton::Button>
      `);

    assert.dom("button").hasText("Test");
  });

  testUikit(
    "it renders a primary button for submit buttons",
    async function (assert) {
      await render(hbs`
        <ValidatedButton::Button @onClick={{this.noop}} @label="Test" @type="submit" />
      `);

      assert.dom("button").hasClass("uk-button-primary");
    }
  );

  testBootstrap("it renders", async function (assert) {
    await render(hbs`
        <ValidatedButton::Button @onClick={{this.noop}} @label="Test" />
      `);

    assert.dom("button").hasText("Test");
    assert.dom("button").hasClass("btn");
    assert.dom("button").hasClass("btn-default");
  });

  testBootstrap("it renders in block style", async function (assert) {
    await render(hbs`
        <ValidatedButton::Button @onClick={{this.noop}}>
          Test
        </ValidatedButton::Button>
      `);

    assert.dom("button").hasText("Test");
  });

  testBootstrap(
    "it renders a primary button for submit buttons",
    async function (assert) {
      await render(hbs`
        <ValidatedButton::Button @onClick={{this.noop}} @label="Test" @type="submit" />
      `);

      assert.dom("button").hasClass("btn-primary");
    }
  );
});
