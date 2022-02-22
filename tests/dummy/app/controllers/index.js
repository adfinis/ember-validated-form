// BEGIN-SNIPPET quickstart-controller.js
import Controller from "@ember/controller";
import { task, timeout } from "ember-concurrency";

import UserValidations from "dummy/validations/user";

export default class IndexController extends Controller {
  UserValidations = UserValidations;

  get colors() {
    return [
      { name: "Red", color: "red" },
      { name: "Green", color: "green" },
      { name: "Blue", color: "blue" },
    ];
  }

  get countries() {
    return ["United States", "United Kingdom", "Switzerland", "Other"];
  }

  get genders() {
    return [
      {
        key: "m",
        label: "Male",
      },
      {
        key: "f",
        label: "Female",
      },
    ];
  }

  @task
  *submit(model) {
    yield timeout(1000);
    model.save();
  }
}
// END-SNIPPET
