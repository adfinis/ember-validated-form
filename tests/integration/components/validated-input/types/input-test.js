import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

import {
  setupRenderingTest,
  setupUikit,
  setupBootstrap,
} from "dummy/tests/helpers";

module(
  "Integration | Component | validated-input/types/input",
  function (hooks) {
    setupRenderingTest(hooks);

    test("it renders", async function (assert) {
      await render(hbs`<ValidatedInput::Types::Input
  @update={{fn (mut this.value)}}
  @setDirty={{fn (mut this.dirty) true}}
/>`);

      assert.dom("input").exists();
    });

    module("uikit", function (hooks) {
      setupUikit(hooks);

      test("it renders", async function (assert) {
        await render(hbs`<ValidatedInput::Types::Input
  @update={{fn (mut this.value)}}
  @setDirty={{fn (mut this.dirty) true}}
/>`);

        assert.dom("input").hasClass("uk-input");
      });
    });

    module("bootstrap", function (hooks) {
      setupBootstrap(hooks);

      test("it renders", async function (assert) {
        await render(hbs`<ValidatedInput::Types::Input
  @update={{fn (mut this.value)}}
  @setDirty={{fn (mut this.dirty) true}}
/>`);

        assert.dom("input").hasClass("form-control");
      });
    });
  },
);
