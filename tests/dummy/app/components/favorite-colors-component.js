// BEGIN-SNIPPET favorite-colors-component.js
import Component from "@ember/component";

export default Component.extend({
  isShowingColors: false,
  classNames: ["form-group"],

  actions: {
    onColorSelected(color) {
      this.toggleProperty("isShowingColors");
      this.get("setDirty")();
      this.get("update")(color);
    },

    toggle() {
      this.toggleProperty("isShowingColors");
    },

    clearSelection() {
      this.get("update")(null);
    }
  }
});
// END-SNIPPET
