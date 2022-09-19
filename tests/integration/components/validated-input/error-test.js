import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import {
  testDefault,
  testUikit,
  testBootstrap,
} from "dummy/tests/helpers/scenarios";

module("Integration | Component | validated-input/error", function (hooks) {
  setupRenderingTest(hooks);

  testDefault("it renders", async function (assert) {
    this.set("errors", ["foo", "bar", "baz"]);

    await render(hbs`<ValidatedInput::Error @errors={{this.errors}} />`);

    assert.dom("span").hasText("foo, bar, baz");
  });

  testUikit("it renders", async function (assert) {
    this.set("errors", ["foo", "bar", "baz"]);

    await render(hbs`<ValidatedInput::Error @errors={{this.errors}} />`);

    assert.dom("small").hasClass("uk-text-danger");
    assert.dom("small").hasText("foo, bar, baz");
  });

  testBootstrap("it renders", async function (assert) {
    this.set("errors", ["foo", "bar", "baz"]);

    await render(hbs`<ValidatedInput::Error @errors={{this.errors}} />`);

    assert.dom("span").hasClass("invalid-feedback");
    assert.dom("span").hasClass("d-block");
    assert.dom("span").hasText("foo, bar, baz");
  });
});
