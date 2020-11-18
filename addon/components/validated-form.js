import Component from "@ember/component";
import { resolve } from "rsvp";

import layout from "../templates/components/validated-form";

const PROP_ON_SUBMIT = "on-submit";
const PROP_ON_INVALID_SUBMIT = "on-invalid-submit";

export default Component.extend({
  tagName: "form",

  classNameBindings: ["submitted"],
  attributeBindings: ["autocomplete"],

  loading: false,

  submitted: false,

  layout,

  validateBeforeSubmit: true,

  init(...args) {
    this._super(...args);
    if (this.model && this.model.validate) {
      this.model.validate();
    }
  },

  submit() {
    this.set("submitted", true);
    const model = this.model;

    if (!model || !model.validate) {
      this.runCallback(PROP_ON_SUBMIT);
      return false;
    }

    model.validate().then(() => {
      if (!this.element) {
        // We were removed from the DOM while validating
        return;
      }

      if (model.get("isInvalid")) {
        this.runCallback(PROP_ON_INVALID_SUBMIT);
      } else {
        this.runCallback(PROP_ON_SUBMIT);
      }
    });
    return false;
  },

  runCallback(callbackProp) {
    const callback = this.get(callbackProp);
    if (typeof callback !== "function") {
      return;
    }
    const model = this.model;

    this.set("loading", true);
    resolve(callback(model)).finally(() => {
      if (!this.element) {
        // We were removed from the DOM while running on-submit()
        return;
      }
      this.set("loading", false);
    });
  },
});
