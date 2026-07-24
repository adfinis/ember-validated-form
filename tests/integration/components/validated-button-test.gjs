import { on } from "@ember/modifier";
import { render, click } from "@ember/test-helpers";
import { module, test } from "qunit";

import { setupRenderingTest } from "dummy/tests/helpers";
import ValidatedButton from "ember-validated-form/components/validated-button";

module("Integration | Component | validated button", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders a button with a label", async function (assert) {
    await render(<template><ValidatedButton @label="Test" /></template>);
    assert.dom("button").hasText("Test");
  });

  test("it renders a button with block style", async function (assert) {
    await render(
      <template>
        <ValidatedButton>Test</ValidatedButton>
      </template>,
    );
    assert.dom("button").hasText("Test");
  });

  test("custom buttons work", async function (assert) {
    // the `@onClick` would be `f.submitAction` when used via `f.submit`
    const CustomButton = <template>
      <div
        role="button"
        data-test-fake-btn
        {{on "click" @onClick}}
      >{{yield}}</div>
    </template>;

    const submit = (ident) => (e) => {
      assert.step(ident);
      e.preventDefault();
    };

    await render(
      <template>
        <ValidatedButton
          @type="submit"
          @buttonComponent={{CustomButton}}
          @action={{submit "fake-btn"}}
        >Test</ValidatedButton>

        {{! a valid submitter will not invoke `@action`, but submit the form }}
        <form {{on "submit" (submit "form")}}>
          <ValidatedButton
            data-test-btn
            @type="submit"
            @action={{submit "form-btn-action"}}
          />
        </form>
      </template>,
    );

    assert.verifySteps([]);
    await click("[data-test-fake-btn]");
    await click("[data-test-btn]");
    assert.verifySteps(["fake-btn", "form"]);
  });
});
