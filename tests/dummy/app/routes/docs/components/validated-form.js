import Route from "@ember/routing/route";
import EmberObject from "@ember/object";
import { Promise } from "rsvp";
import { later } from "@ember/runloop";

export default Route.extend({
  // BEGIN-SNIPPET validated-form-route.js
  model() {
    return EmberObject.create({
      save() {
        return new Promise(resolve => later(resolve, 1000));
      }
    });
  }
  // END-SNIPPET
});
