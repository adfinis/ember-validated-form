// BEGIN-SNIPPET favorite-colors.js
import { action } from "@ember/object";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class FavoriteColorsComponent extends Component {
  @tracked isShowingColors = false;

  @action
  onColorSelected(color) {
    this.isShowingColors = !this.isShowingColors;

    this.args.setDirty();
    this.args.update(color);
  }

  @action
  toggle() {
    this.isShowingColors = !this.isShowingColors;
  }

  @action
  clearSelection() {
    this.args.update(null);
  }
}
// END-SNIPPET
