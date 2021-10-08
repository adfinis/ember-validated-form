import Component from "../../input";

export default class UikitInputComponent extends Component {
  get class() {
    const style = this.args.isValid
      ? "uk-form-success"
      : this.args.isInvalid
      ? "uk-form-danger"
      : "";

    return `uk-input ${style}`;
  }
}
