import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import setupConfigTest from "dummy/tests/helpers/setup-config-test";

module(
  "Integration | Component | validated-input/types/-themes/bootstrap/textarea",
  function(hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "bootstrap" });

    test("it renders", async function(assert) {
      await render(hbs`{{validated-input/types/-themes/bootstrap/textarea}}`);

      assert.dom("textarea").hasClass("form-control");
    });
  }
);
