import Component from "../../button";
import { computed } from "@ember/object";

export default Component.extend({
  classNames: ["btn"],
  classNameBindings: ["primary:btn-primary"],

  primary: computed("type", function() {
    return this.get("type") === "submit";
  })
});
