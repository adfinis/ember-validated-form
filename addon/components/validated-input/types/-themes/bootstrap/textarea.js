import Component from "../../textarea";

export default class BootstrapTextareaComponent extends Component {
  get class() {
    const style = this.args.isValid
      ? "is-valid"
      : this.args.isInvalid
      ? "is-invalid"
      : "";

    return `form-control ${style}`;
  }
}
