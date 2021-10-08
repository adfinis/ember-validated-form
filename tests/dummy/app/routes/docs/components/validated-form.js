import Route from "@ember/routing/route";
import { later } from "@ember/runloop";
import { Promise } from "rsvp";

export default class extends Route {
  // BEGIN-SNIPPET validated-form-route.js
  model() {
    return new (class {
      save() {
        return new Promise((resolve) => later(resolve, 1000));
      }
    })();
  }
  // END-SNIPPET
}
