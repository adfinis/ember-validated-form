import Component from "@glimmer/component";

export default class ErrorComponent extends Component {
  get errorString() {
    return this.args.errors?.join(", ");
  }
}
