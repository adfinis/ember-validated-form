import Component from "../../select";

export default class BootstrapSelectComponent extends Component {
  get class() {
    const style = this.args.isValid
      ? "is-valid"
      : this.args.isInvalid
      ? "is-invalid"
      : "";

    return `form-control ${style}`;
  }
}
