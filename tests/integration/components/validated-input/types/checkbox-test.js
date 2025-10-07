import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import {
  setupRenderingTest,
  setupUikit,
  setupBootstrap,
} from "dummy/tests/helpers";
import { test } from "dummy/tests/helpers/scenarios";

module(
  "Integration | Component | validated-input/types/checkbox",
  function (hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function (assert) {
      await render(hbs`<ValidatedInput::Types::Checkbox
  @labelComponent={{component "validated-input/label" label="Test"}}
  @update={{fn (mut this.value)}}
/>`);

      assert.dom("input[type=checkbox]").exists();
    });

    module("uikit", function (hooks) {
      setupUikit(hooks);

      test("it renders", async function (assert) {
        await render(hbs`<ValidatedInput::Types::Checkbox
  @labelComponent={{component "validated-input/label" label="Test"}}
  @update={{fn (mut this.value)}}
/>`);

        assert.dom("label > input").exists();
        assert.dom("input").hasClass("uk-checkbox");
        assert.dom("label").hasClass("uk-form-label");
      });
    });

    module("bootstrap", function (hooks) {
      setupBootstrap(hooks);

      test("it renders", async function (assert) {
        await render(hbs`<ValidatedInput::Types::Checkbox
  @labelComponent={{component "validated-input/label" label="Test"}}
  @update={{fn (mut this.value)}}
/>`);

        assert.dom("div.custom-control.custom-checkbox").exists();
        assert.dom("input").hasClass("custom-control-input");
        assert.dom("label").hasClass("custom-control-label");
      });
    });
  },
);
