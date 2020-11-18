import EmberObject from "@ember/object";
import Route from "@ember/routing/route";
import { later } from "@ember/runloop";
import { Promise } from "rsvp";

export default Route.extend({
  // BEGIN-SNIPPET validated-form-route.js
  model() {
    return EmberObject.create({
      save() {
        return new Promise((resolve) => later(resolve, 1000));
      },
    });
  },
  // END-SNIPPET
});
