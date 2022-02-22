import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

import setupConfigTest from "dummy/tests/helpers/setup-config-test";

module(
  "Integration | Component | validated-input/-themes/uikit/label",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "uikit" });

    test("it renders", async function (assert) {
      await render(
        hbs`<ValidatedInput::-themes::uikit::Label @label="Test" />`
      );

      assert.dom("label").hasClass("uk-form-label");
      assert.dom("label").hasText("Test");
    });
  }
);
