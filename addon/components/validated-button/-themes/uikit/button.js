import { computed } from "@ember/object";

import Component from "../../button";

export default Component.extend({
  classNames: ["uk-button"],
  classNameBindings: ["style"],

  style: computed("type", function () {
    return this.type === "submit" ? "uk-button-primary" : "uk-button-default";
  }),
});
