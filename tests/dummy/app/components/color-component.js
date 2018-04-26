import { htmlSafe } from "@ember/string";
import { computed } from "@ember/object";
import Component from "@ember/component";

export default Component.extend({
  classNames: ["badge", "badge-primary"],

  attributeBindings: ["style"],

  style: computed("color.color", function() {
    return htmlSafe(
      `background-color: ${this.get(
        "color.color"
      )}; font-size: 1rem; cursor: pointer;`
    );
  }),

  click() {
    this.get("colorSelected")(this.get("color"));
  }
});
