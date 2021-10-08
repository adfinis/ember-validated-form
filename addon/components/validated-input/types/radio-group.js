import { action } from "@ember/object";
import Component from "@glimmer/component";

export default class RadioGroupComponent extends Component {
  @action
  onUpdate(value, event) {
    event.preventDefault();

    this.args.update(value);
    this.args.setDirty();
  }
}
