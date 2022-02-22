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
  "Integration | Component | validated-input/types/textarea",
  function (hooks) {
    setupRenderingTest(hooks);

    testDefault("it renders", async function (assert) {
      await render(hbs`
        <ValidatedInput::Types::Textarea
          @update={{fn (mut this.value)}}
          @setDirty={{fn (mut this.dirty) true}}
        />
      `);

      assert.dom("textarea").exists();
    });

    testUikit("it renders", async function (assert) {
      await render(hbs`
        <ValidatedInput::Types::Textarea
          @update={{fn (mut this.value)}}
          @setDirty={{fn (mut this.dirty) true}}
        />
      `);

      assert.dom("textarea").hasClass("uk-textarea");
    });

    testBootstrap("it renders", async function (assert) {
      await render(hbs`
        <ValidatedInput::Types::Textarea
          @update={{fn (mut this.value)}}
          @setDirty={{fn (mut this.dirty) true}}
        />
      `);

      assert.dom("textarea").hasClass("form-control");
    });
  }
);
