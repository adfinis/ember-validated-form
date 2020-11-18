import Component from "@ember/component";
import { computed } from "@ember/object";
import { htmlSafe } from "@ember/string";

export default Component.extend({
  classNames: ["badge", "badge-primary"],

  attributeBindings: ["style"],

  style: computed("color.color", function () {
    return htmlSafe(
      `background-color: ${this.color.color}; font-size: 1rem; cursor: pointer;`
    );
  }),

  click() {
    this.colorSelected(this.color);
  },
});
