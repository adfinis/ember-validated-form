import { visit } from "@ember/test-helpers";
import { module, test } from "qunit";

import { setupApplicationTest } from "dummy/tests/helpers";

module("Acceptance | documentation", function (hooks) {
  setupApplicationTest(hooks);

  test("demo is rendered", async function (assert) {
    await visit("/");

    assert.dom("h1").hasText("Ember ValidatedForm");

    assert.dom("form").exists();
    assert.dom("form input[name=title]").exists({ count: 5 });
    assert.dom("form input[name=firstName]").exists();
    assert.dom("form input[name=lastName]").exists();
    assert.dom("form textarea[name=aboutMe]").exists();
    assert.dom("form select[name=country]").exists();
    assert.dom("form input[name=birthday]").exists();
    assert.dom("form input[name=notifications]").exists({ count: 3 });
    assert.dom("form button[type=submit]").exists();
  });

  test("api docs are rendered", async function (assert) {
    await visit("/docs");

    assert.dom("nav.docs-absolute").exists();
    assert.dom("div.docs-container").exists();
    assert.dom("h1").hasText("Introduction");
  });
});
