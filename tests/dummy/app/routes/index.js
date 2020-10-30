import Route from "@ember/routing/route";
import EmberObject from "@ember/object";

export default Route.extend({
  // BEGIN-SNIPPET quickstart-route.js
  model() {
    return EmberObject.create({
      saved: false,
      save() {
        this.set("saved", true);
      },
    });
  },
  // END-SNIPPET
});
