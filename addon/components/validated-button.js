import { action } from "@ember/object";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { resolve } from "rsvp";

import passedOrDefault from "ember-validated-form/passed-or-default";

const ON_CLICK = "on-click";
const ON_INVALID_CLICK = "on-invalid-click";
export default class ValidatedButtonComponent extends Component {
  @tracked _loading;

  @passedOrDefault("button") buttonComponent;

  get loading() {
    return this.args.loading || this._loading;
  }

  @action
  async click(event) {
    // handle only clicks for custom buttons
    // everything else is handled by the validated form itself
    if (this.args.type !== "button") {
      return this.args.action(event);
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

    // Simplified version without macros - scroll to error if present
    if (model.get("isInvalid") && model.errors[0]?.key) {
      const errorElement = document.querySelector(`[name=${model.errors[0].key.replaceAll(".", "\\.")}]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth" });
      }
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
