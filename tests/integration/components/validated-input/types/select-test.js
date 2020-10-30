import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | validated-input/types/select", function (
  hooks
) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    this.set("options", [
      { key: 1, label: 1 },
      { key: 2, label: 2 },
    ]);

    await render(hbs`{{validated-input/types/select options=options}}`);

    assert.dom("select").exists();
    assert.dom("option").exists({ count: 2 });
  });
});
