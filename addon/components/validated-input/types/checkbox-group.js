import { action } from "@ember/object";
import Component from "@glimmer/component";

export default class CheckboxGroupComponent extends Component {
  @action
  onUpdate(key, event) {
    event.preventDefault();

    const value = new Set(this.args.value || []);

    value.delete(key) || value.add(key);

    this.args.update([...value]);
    this.args.setDirty();
  }
}
