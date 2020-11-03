import Controller from "@ember/controller";
import { task } from "ember-concurrency";

export default Controller.extend({
  // BEGIN-SNIPPET validated-form-task-controller.js
  submit: task(function* (model) {
    yield model.save();
    // ... more code to show success messages etc.
  }).drop(), // Use the .drop() modifier to prevent the task from running twice
  // END-SNIPPET

  // BEGIN-SNIPPET validated-form-action-controller.js
  actions: {
    submit(model) {
      return model.save().then(() => {
        // ... more code to show success messages etc.
      });
    },
  },
  // END-SNIPPET
});
