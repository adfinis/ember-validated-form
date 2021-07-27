import Component from "../../button";

export default class UikitButton extends Component {
  get class() {
    const style =
      this.args.type === "submit" ? "uk-button-primary" : "uk-button-default";

    return `uk-button ${style}`;
  }
}
