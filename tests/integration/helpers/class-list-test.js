import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module } from "qunit";

import { testDefault } from "dummy/tests/helpers/scenarios";

module("Integration | Helper | class-list", function (hooks) {
  setupRenderingTest(hooks);

  testDefault("it renders", async function (assert) {
    await render(hbs`{{class-list "foo" null undefined "bar" ""}}`);

    assert.dom(this.element).hasText("foo bar");
  });
});
