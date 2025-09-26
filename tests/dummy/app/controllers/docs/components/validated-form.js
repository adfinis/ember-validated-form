import Controller from "@ember/controller";
import { action } from "@ember/object";
import { task } from "ember-concurrency";

export default class extends Controller {
  // BEGIN-SNIPPET validated-form-task-controller.js
  submitTask = task({ drop: true }, async (model) => {
    await model.save();
    // ... more code to show success messages etc.
  });
  // END-SNIPPET

  // BEGIN-SNIPPET validated-form-action-controller.js
  @action
  async submitAction(model) {
    await model.save();
    // ... more code to show success messages etc.
  }
  // END-SNIPPET
}
