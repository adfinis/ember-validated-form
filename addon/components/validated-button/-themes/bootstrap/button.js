import { computed } from "@ember/object";

import Component from "../../button";

export default Component.extend({
  classNames: ["btn"],
  classNameBindings: ["style"],

  style: computed("type", function () {
    return this.type === "submit" ? "btn-primary" : "btn-default";
  }),
});
