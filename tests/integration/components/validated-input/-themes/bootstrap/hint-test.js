import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";

module(
  "Integration | Component | validated-input/-themes/bootstrap/hint",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "bootstrap" });

    test("it renders", async function (assert) {
      await render(hbs`{{validated-input/-themes/bootstrap/hint hint='Test'}}`);

      assert.dom("small").hasClass("form-text");
      assert.dom("small").hasClass("text-muted");
      assert.dom("small").hasText("Test");
    });
  }
);
