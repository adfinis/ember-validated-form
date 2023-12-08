import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { module } from "qunit";

import { setupRenderingTest } from "dummy/tests/helpers";
import {
  testDefault,
  testUikit,
  testBootstrap,
} from "dummy/tests/helpers/scenarios";

module(
  "Integration | Component | validated-input/render/wrapper",
  function (hooks) {
    setupRenderingTest(hooks);

    testDefault("it renders", async function (assert) {
      await render(
        hbs`<ValidatedInput::Render::Wrapper>Test</ValidatedInput::Render::Wrapper>`,
      );

      assert.dom(this.element).hasText("Test");
    });

    testBootstrap("it renders", async function (assert) {
      await render(
        hbs`<ValidatedInput::Render::Wrapper>Test</ValidatedInput::Render::Wrapper>`,
      );

      assert.dom(this.element).hasText("Test");
    });

    testUikit("it renders", async function (assert) {
      await render(
        hbs`<ValidatedInput::Render::Wrapper>Test</ValidatedInput::Render::Wrapper>`,
      );

      assert.dom("div.uk-form-controls").hasText("Test");
    });
  },
);
