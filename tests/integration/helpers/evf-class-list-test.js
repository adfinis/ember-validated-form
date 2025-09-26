import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { module, test } from "qunit";

import { setupRenderingTest } from "dummy/tests/helpers";

module("Integration | Helper | evf-class-list", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    await render(hbs`{{evf-class-list "foo" null undefined "bar" ""}}`);

    assert.dom(this.element).hasText("foo bar");
  });
});
