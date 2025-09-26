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

  get titles() {
    return [
      { key: "mr", label: "Mr." },
      { key: "mrs", label: "Mrs." },
      { key: "ms", label: "Ms." },
      { key: "prof", label: "Prof." },
      { key: "dr", label: "Dr." },
    ];
  }

  get notifications() {
    return [
      { key: "offers", label: "Offers" },
      { key: "news", label: "News" },
      { key: "features", label: "Features" },
    ];
  }

  submit = task(async (model) => {
    await timeout(1000);
    await model.save();
  });
}
// END-SNIPPET
