import { notEmpty } from "@ember/object/computed";
import Component from "@ember/component";

export default Component.extend({
  hasSelected: notEmpty("selected"),
  isShowingColors: false,

  actions: {
    onColorSelected(color) {
      this.toggleProperty("isShowingColors");
      this.get("onupdate")(color);
    },

    toggle() {
      this.toggleProperty("isShowingColors");
    },

    onhover() {
      this.get("onhover")();
    },

    clearSelection() {
      this.set("selected", null);
      this.get("onupdate")(null);
    }
  }
});
