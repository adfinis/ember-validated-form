import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import {
  setupRenderingTest,
  setupUikit,
  setupBootstrap,
} from "dummy/tests/helpers";
import { test } from "dummy/tests/helpers/scenarios";

module("Integration | Component | validated-input/render", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    await render(hbs`<ValidatedInput::Render
  @type="text"
  @name="test"
  @labelComponent={{component "validated-input/label" label="Test"}}
  @update={{fn (mut this.value)}}
  @setDirty={{fn (mut this.dirty) true}}
/>`);

    assert.dom("input[type=text]").exists();
    assert.dom("input[type=text]").hasAttribute("name", "test");
    assert.dom("label").hasText("Test");
  });

  module("uikit", function (hooks) {
    setupUikit(hooks);

    test("it renders", async function (assert) {
      await render(hbs`<ValidatedInput::Render
  @type="text"
  @name="test"
  @labelComponent={{component "validated-input/label" label="Test"}}
  @update={{fn (mut this.value)}}
  @setDirty={{fn (mut this.dirty) true}}
/>`);

      assert.dom(".uk-margin").exists();
      assert.dom(".uk-margin > .uk-form-label").exists();
      assert.dom(".uk-margin > .uk-form-controls").exists();

      assert.dom("input[type=text].uk-input").exists();
      assert.dom("input[type=text].uk-input").hasAttribute("name", "test");
      assert.dom("label").hasText("Test");
    });
  });

  module("bootstrap", function (hooks) {
    setupBootstrap(hooks);

    test("it renders", async function (assert) {
      await render(hbs`<ValidatedInput::Render
  @type="text"
  @name="test"
  @labelComponent={{component "validated-input/label" label="Test"}}
  @update={{fn (mut this.value)}}
  @setDirty={{fn (mut this.dirty) true}}
/>`);

      assert.dom(".form-group").exists();

      assert.dom("input[type=text].form-control").exists();
      assert.dom("input[type=text].form-control").hasAttribute("name", "test");
      assert.dom("label").hasText("Test");
    });
  });
});
