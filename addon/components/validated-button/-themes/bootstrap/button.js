import Component from "../../button";

export default class BootstrapButton extends Component {
  get class() {
    const style = this.args.type === "submit" ? "btn-primary" : "btn-default";
    const loading = this.args.loading ? "loading" : "";

    return `btn ${style} ${loading}`;
  }
}
