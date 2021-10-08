import Component from "../../input";

export default class BootstrapInputComponent extends Component {
  get class() {
    const style = this.args.isValid
      ? "is-valid"
      : this.args.isInvalid
      ? "is-invalid"
      : "";

    return `form-control ${style}`;
  }
}
