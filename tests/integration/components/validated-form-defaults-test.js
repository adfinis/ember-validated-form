import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

import { setupRenderingTest } from "dummy/tests/helpers";

module("Integration | Component | validated form defaults", function (hooks) {
  setupRenderingTest(hooks);

  test("renders custom hint component", async function (assert) {
    assert.expect(2);

    await render(hbs`<ValidatedForm as |f|>
  <f.input
    @name="test1"
    @type="text"
    @label="Label!"
    @hint="Hint!"
  />
</ValidatedForm>`);

    assert.dom("small > svg.fa-circle-question").exists();
    assert.dom("small").hasText("Hint!");
  });
});
