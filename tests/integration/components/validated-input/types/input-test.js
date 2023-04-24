import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import {
  testDefault,
  testUikit,
  testBootstrap,
} from "dummy/tests/helpers/scenarios";

module(
  "Integration | Component | validated-input/types/input",
  function (hooks) {
    setupRenderingTest(hooks);

    testDefault("it renders", async function (assert) {
      await render(hbs`<ValidatedInput::Types::Input
  @update={{fn (mut this.value)}}
  @setDirty={{fn (mut this.dirty) true}}
/>`);

      assert.dom("input").exists();
    });

    testUikit("it renders", async function (assert) {
      await render(hbs`<ValidatedInput::Types::Input
  @update={{fn (mut this.value)}}
  @setDirty={{fn (mut this.dirty) true}}
/>`);

      assert.dom("input").hasClass("uk-input");
    });

    testBootstrap("it renders", async function (assert) {
      await render(hbs`<ValidatedInput::Types::Input
  @update={{fn (mut this.value)}}
  @setDirty={{fn (mut this.dirty) true}}
/>`);

      assert.dom("input").hasClass("form-control");
    });
  }
);
