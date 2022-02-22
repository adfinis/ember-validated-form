import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

import setupConfigTest from "dummy/tests/helpers/setup-config-test";

module(
  "Integration | Component | validated-input/types/-themes/bootstrap/checkbox-group",
  function (hooks) {
    setupRenderingTest(hooks);
    setupConfigTest(hooks, { theme: "bootstrap" });

    test("it renders", async function (assert) {
      await render(hbs`
        <ValidatedInput::types::-themes::bootstrap::CheckboxGroup
          @options={{array (hash key='t' label='Triangle') (hash key='s' label='Square')}}
          @update={{fn (mut this.value)}}
        />
        `);

      assert.dom("div.custom-control.custom-checkbox").exists();
      assert.dom("input").hasClass("custom-control-input");
      assert.dom("label").hasClass("custom-control-label");
    });
  }
);
