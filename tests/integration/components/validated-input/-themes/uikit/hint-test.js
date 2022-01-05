import { render } from "@ember/test-helpers";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module(
  "Integration | Component | validated-input/-themes/uikit/hint",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "uikit" });

    test("it renders", async function (assert) {
      await render(hbs`<ValidatedInput::-themes::uikit::Hint @hint="Test" />`);

      assert.dom("small").hasClass("uk-text-muted");
      assert.dom("small").hasText("Test");
    });
  }
);
