import { htmlSafe } from "@ember/string";
import { computed } from "@ember/object";
import Component from "@ember/component";

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
