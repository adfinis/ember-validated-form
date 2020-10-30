// BEGIN-SNIPPET favorite-colors-component.js
import Component from "@ember/component";

export default Component.extend({
  isShowingColors: false,
  classNames: ["form-group"],

  actions: {
    onColorSelected(color) {
      this.toggleProperty("isShowingColors");
      this.setDirty();
      this.update(color);
    },

    toggle() {
      this.toggleProperty("isShowingColors");
    },

    clearSelection() {
      this.update(null);
    },
  },
});
// END-SNIPPET
