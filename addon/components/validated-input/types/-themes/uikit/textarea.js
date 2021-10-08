import Component from "../../textarea";

export default class UikitTextareaComponent extends Component {
  get class() {
    const style = this.args.isValid
      ? "uk-form-success"
      : this.args.isInvalid
      ? "uk-form-danger"
      : "";

    return `uk-textarea ${style}`;
  }
}
