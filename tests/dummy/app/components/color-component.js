import { htmlSafe } from "@ember/string";
import Component from "@glimmer/component";

export default class ColorComponent extends Component {
  get style() {
    return htmlSafe(
      `background-color: ${this.args.color.color}; font-size: 1rem; cursor: pointer;`
    );
  }
}
