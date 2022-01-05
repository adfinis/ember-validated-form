import { action } from "@ember/object";
import Component from "@glimmer/component";

export default class CheckboxGroupComponent extends Component {
  @action
  onUpdate(key, event) {
    event.preventDefault();

    const value = this.value || [];
    const index = value.indexOf(key);

    if (index > -1) {
      value.splice(index, 1);
    } else {
      value.push(key);
    }

    this.args.update(value);
    this.args.setDirty();
  }
}
