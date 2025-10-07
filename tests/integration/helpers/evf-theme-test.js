import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { module } from "qunit";

import { setupRenderingTest } from "dummy/tests/helpers";
import { test } from "dummy/tests/helpers/scenarios";

module("Integration | Helper | evf-theme", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    await render(
      hbs`{{evf-theme "default"}};{{evf-theme "bootstrap"}};{{evf-theme "uikit"}}`,
    );
    assert.dom(this.element).hasText("true;false;false");

    this.setTheme("bootstrap");
    await render(
      hbs`{{evf-theme "default"}};{{evf-theme "bootstrap"}};{{evf-theme "uikit"}}`,
    );
    assert.dom(this.element).hasText("false;true;false");

    this.setTheme("uikit");
    await render(
      hbs`{{evf-theme "default"}};{{evf-theme "bootstrap"}};{{evf-theme "uikit"}}`,
    );
    assert.dom(this.element).hasText("false;false;true");
  });
});
