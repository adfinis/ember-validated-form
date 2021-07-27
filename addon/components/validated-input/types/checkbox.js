import { action } from "@ember/object";
import Component from "@glimmer/component";

export default class CheckboxComponent extends Component {
  @action
  onUpdate(event) {
    event.preventDefault();

    this.args.update(event.target.checked);
    this.args.setDirty();
  }
}
