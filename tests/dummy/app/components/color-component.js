import { htmlSafe } from "@ember/string";
import { computed } from "@ember/object";
import Component from "@ember/component";

export default Component.extend({
  tagName: "",

  colorStyle: computed("color.color", function() {
    let color = this.get("color.color");
    return htmlSafe("background-color:" + color + ";");
  }),

  actions: {
    onclick() {
      this.get("colorSelected")(this.get("color"));
    }
  }
});
