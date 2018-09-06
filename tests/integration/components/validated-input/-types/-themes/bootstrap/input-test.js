import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import setupThemeTest from "dummy/tests/helpers/setup-theme-test";

module(
  "Integration | Component | validated-input/-types/-themes/bootstrap/input",
  function(hooks) {
    setupRenderingTest(hooks);
    setupThemeTest(hooks, "bootstrap");

    test("it renders", async function(assert) {
      await render(hbs`{{validated-input/-types/-themes/bootstrap/input}}`);

      assert.dom("input").hasClass("form-control");
    });
  }
);
