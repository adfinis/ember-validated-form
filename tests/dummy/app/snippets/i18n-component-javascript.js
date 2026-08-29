import { service } from "@ember/service";
import Component from "@glimmer/component";

export default class ErrorComponent extends Component {
  @service intl;

  get errorString() {
    return this.args.errors
      ?.map((error) =>
        this.intl.t(`validation-errors.${error.type}`, error.context),
      )
      .join(", ");
  }
}
