import { action } from "@ember/object";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { resolve } from "rsvp";

import { scrollErrorIntoViewEnabled } from "ember-validated-form/-private/features";

const ON_CLICK = "on-click";
const ON_INVALID_CLICK = "on-invalid-click";
export default class ValidatedButtonComponent extends Component {
  @tracked _loading;

  get loading() {
    return this.args.loading || this._loading;
  }

  @action
  async click(event) {
    if (this.args.type !== "button") {
      const target = event.currentTarget;
      if (target.type === "submit") {
        // click -> (native) submission event -> the `validated-form`'s `{{on "submit"}}` handler
        return;
      }
      // backwards compatibility for custom buttons
      return this.args.action?.(event);
    }

    event.preventDefault();

    if (this.args.triggerValidations) {
      this.args.markAsDirty();
    }

    const model = this.args.model;

    if (!model || !model.validate) {
      this.runCallback(ON_CLICK);
      return;
    }

    await model.validate();

    if (scrollErrorIntoViewEnabled(this) && model.errors[0]?.key) {
      document
        .querySelector(`[name=${model.errors[0].key.replaceAll(".", "\\.")}]`)
        ?.scrollIntoView({ behavior: "smooth" });
    }

    if (model.get("isInvalid")) {
      this.runCallback(ON_INVALID_CLICK);
    } else {
      this.runCallback(ON_CLICK);
    }
  }

  runCallback(callbackProp) {
    const callback = this.args[callbackProp];
    if (typeof callback !== "function") {
      return;
    }

    this._loading = true;
    resolve(callback(this.args.model)).finally(() => {
      this._loading = false;
    });
  }
}
