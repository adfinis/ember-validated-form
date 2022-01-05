import { action } from "@ember/object";
import Component from "@glimmer/component";

export default class SelectComponent extends Component {
  @action
  onUpdate(event) {
    if (this.args.update) {
      event.preventDefault();
      this.args.update(event.target.value);
    }
  }

  @action
  onDirty(event) {
    if (this.args.setDirty) {
      this.args.setDirty(event.target.value);
    }
  }

  get nothingIsSelected() {
    return !this.args.value;
  }
}
