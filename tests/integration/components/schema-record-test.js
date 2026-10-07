import { render, click, blur, focus } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

import { setupRenderingTest } from "dummy/tests/helpers";
import strictRecord from "dummy/tests/helpers/strict-record";

module("Integration | schema record as model", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.record = strictRecord({ title: "Hello" });
  });

  test("a form submits it", async function (assert) {
    this.submit = (model) => assert.step(model === this.record ? "same" : "x");

    await render(hbs`<ValidatedForm @model={{this.record}} @on-submit={{this.submit}} as |f|>
  <f.submit />
</ValidatedForm>`);
    await click("button");

    assert.verifySteps(["same"]);
  });

  test("an input shows it as valid once dirty", async function (assert) {
    this.setTheme("bootstrap");

    await render(hbs`<ValidatedForm @model={{this.record}} as |f|>
  <f.input @name="title" />
</ValidatedForm>`);
    await focus("input");
    await blur("input");

    assert.dom("input").hasValue("Hello");
    assert.dom("input").hasClass("is-valid");
  });

  test("a button of type button clicks with it", async function (assert) {
    this.click = (model) => assert.step(model === this.record ? "same" : "x");

    await render(
      hbs`<ValidatedButton @type="button" @model={{this.record}} @on-click={{this.click}} />`,
    );
    await click("button");

    assert.verifySteps(["same"]);
  });
});
