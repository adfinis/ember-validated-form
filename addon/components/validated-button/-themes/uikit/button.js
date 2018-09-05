import Component from "../../button";
import { computed } from "@ember/object";

export default Component.extend({
  classNames: ["uk-button"],
  classNameBindings: ["style"],

  style: computed("type", function() {
    return this.get("type") === "submit"
      ? "uk-button-primary"
      : "uk-button-default";
  })
});
