import Component from "../../button";
import { computed } from "@ember/object";

export default Component.extend({
  classNames: ["btn"],
  classNameBindings: ["style"],

  style: computed("type", function () {
    return this.type === "submit" ? "btn-primary" : "btn-default";
  }),
});
