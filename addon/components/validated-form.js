import { action } from "@ember/object";
import { scheduleOnce } from "@ember/runloop";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { resolve } from "rsvp";

const PROP_ON_SUBMIT = "on-submit";
const PROP_ON_INVALID_SUBMIT = "on-invalid-submit";

export default class ValidatedFormComponent extends Component {
  @tracked loading = false;
  @tracked submitted = false;
  @tracked validateBeforeSubmit = true;

  constructor(...args) {
    super(...args);

    if (this.args.model && this.args.model.validate) {
      scheduleOnce("actions", this, "validateModel", this.args.model);
    }
  }

  validateModel(model) {
    model.validate();
  }

  @action
  async submit(event) {
    event.preventDefault();

    this.submitted = true;
    const model = this.args.model;

    if (!model || !model.validate) {
      this.runCallback(PROP_ON_SUBMIT);
      return false;
    }

    await model.validate();

    if (model.get("isInvalid")) {
      this.runCallback(PROP_ON_INVALID_SUBMIT);
    } else {
      this.runCallback(PROP_ON_SUBMIT);
    }

    return false;
  }

  runCallback(callbackProp) {
    const callback = this.args[callbackProp];
    if (typeof callback !== "function") {
      return;
    }

    this.loading = true;
    resolve(callback(this.args.model)).finally(() => {
      this.loading = false;
    });
  }
}
