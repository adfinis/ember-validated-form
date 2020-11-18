// BEGIN-SNIPPET quickstart-controller.js
import Controller from "@ember/controller";
import UserValidations from "dummy/validations/user";
import { task, timeout } from "ember-concurrency";

export default Controller.extend({
  UserValidations,

  init(...args) {
    this._super(...args);

    this.colors = [
      { name: "Red", color: "red" },
      { name: "Green", color: "green" },
      { name: "Blue", color: "blue" },
    ];

    this.countries = [
      "United States",
      "United Kingdom",
      "Switzerland",
      "Other",
    ];

    this.genders = [
      {
        key: "m",
        label: "Male",
      },
      {
        key: "f",
        label: "Female",
      },
    ];
  },

  submit: task(function* (model) {
    yield timeout(1000);
    model.save();
  }),
});
// END-SNIPPET
