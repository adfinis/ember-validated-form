import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import {
  testDefault,
  testUikit,
  testBootstrap,
} from "dummy/tests/helpers/scenarios";

module("Integration | Component | validated-input/hint", function (hooks) {
  setupRenderingTest(hooks);

  testDefault("it renders", async function (assert) {
    await render(hbs`<ValidatedInput::Hint @hint="Test" />`);

    assert.dom("small").hasText("Test");
  });

  testUikit("it renders", async function (assert) {
    await render(hbs`<ValidatedInput::Hint @hint="Test" />`);

    assert.dom("small").hasClass("uk-text-muted");
    assert.dom("small").hasText("Test");
  });

  testBootstrap("it renders", async function (assert) {
    await render(hbs`<ValidatedInput::Hint @hint="Test" />`);

    assert.dom("small").hasClass("form-text");
    assert.dom("small").hasClass("text-muted");
    assert.dom("small").hasText("Test");
  });
});
