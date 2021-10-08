import { action } from "@ember/object";
import Component from "@glimmer/component";

export default class TextareaComponent extends Component {
  @action
  onUpdate(event) {
    event.preventDefault();

    this.args.update(event.target.value);
  }
}
