import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

import { testCustomComponents } from "dummy/tests/helpers/scenarios";

module("Integration | Component | validated form defaults", function (hooks) {
  setupRenderingTest(hooks);

  testCustomComponents("renders custom components", async function (assert) {
    assert.expect(4);

    this.set("model", { error: { test1: { validation: ["Error"] } } });

    await render(hbs`<ValidatedForm as |f|>
  <f.input
    @name="test1"
    @type="text"
    @label="Label!"
    @hint="Hint!"
    @submitted={{true}}
    @model={{this.model}}
  />
</ValidatedForm>`);

    assert.dom("custom-render").exists();
    assert.dom("custom-label").exists();
    assert.dom("custom-hint").exists();
    assert.dom("custom-error").exists();
  });

  testCustomComponents(
    "renders custom button components",
    async function (assert) {
      assert.expect(1);

      await render(hbs`<ValidatedForm as |f|>
  <f.submit @label="Submit!" />
</ValidatedForm>`);

      assert.dom("custom-button").exists();
    }
  );

  testCustomComponents(
    "renders custom type components",
    async function (assert) {
      assert.expect(7);

      await render(hbs`<ValidatedForm as |f|>
  <f.input @type="checkbox" />
  <f.input @type="checkbox-group" />
  <f.input @type="text" />
  <f.input @type="radio-group" />
  <f.input @type="select" />
  <f.input @type="textarea" />
  <f.input @type="date" />
</ValidatedForm>`);

      assert.dom("custom-checkbox").exists();
      assert.dom("custom-checkbox-group").exists();
      assert.dom("custom-input").exists();
      assert.dom("custom-radio-group").exists();
      assert.dom("custom-select").exists();
      assert.dom("custom-textarea").exists();
      assert.dom("custom-date").exists();
    }
  );
});
