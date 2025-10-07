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
  "Integration | Component | validated-input/types/textarea",
  function (hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function (assert) {
      await render(hbs`<ValidatedInput::Types::Textarea
  @update={{fn (mut this.value)}}
  @setDirty={{fn (mut this.dirty) true}}
/>`);

      assert.dom("textarea").exists();
    });

    module("uikit", function (hooks) {
      setupUikit(hooks);

      test("it renders", async function (assert) {
        await render(hbs`<ValidatedInput::Types::Textarea
  @update={{fn (mut this.value)}}
  @setDirty={{fn (mut this.dirty) true}}
/>`);

        assert.dom("textarea").hasClass("uk-textarea");
      });
    });

    module("bootstrap", function (hooks) {
      setupBootstrap(hooks);

      test("it renders", async function (assert) {
        await render(hbs`<ValidatedInput::Types::Textarea
  @update={{fn (mut this.value)}}
  @setDirty={{fn (mut this.dirty) true}}
/>`);

        assert.dom("textarea").hasClass("form-control");
      });
    });
  },
);
