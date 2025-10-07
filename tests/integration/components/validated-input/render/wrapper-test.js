import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { module } from "qunit";

import {
  setupRenderingTest,
  setupUikit,
  setupBootstrap,
} from "dummy/tests/helpers";
import { test } from "dummy/tests/helpers/scenarios";

module(
  "Integration | Component | validated-input/render/wrapper",
  function (hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function (assert) {
      await render(
        hbs`<ValidatedInput::Render::Wrapper>Test</ValidatedInput::Render::Wrapper>`,
      );

      assert.dom(this.element).hasText("Test");
    });

    module("bootstrap", function (hooks) {
      setupBootstrap(hooks);

      test("it renders", async function (assert) {
        await render(
          hbs`<ValidatedInput::Render::Wrapper>Test</ValidatedInput::Render::Wrapper>`,
        );

        assert.dom(this.element).hasText("Test");
      });
    });

    module("uikit", function (hooks) {
      setupUikit(hooks);

      test("it renders", async function (assert) {
        await render(
          hbs`<ValidatedInput::Render::Wrapper>Test</ValidatedInput::Render::Wrapper>`,
        );

        assert.dom("div.uk-form-controls").hasText("Test");
      });
    });
  },
);
