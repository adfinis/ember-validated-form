import Component from "../../select";

export default class UikitSelectComponent extends Component {
  get class() {
    const style = this.args.isValid
      ? "uk-form-success"
      : this.args.isInvalid
      ? "uk-form-danger"
      : "";

    return `uk-select ${style}`;
  }
}
