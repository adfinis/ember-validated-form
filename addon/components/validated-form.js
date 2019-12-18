import { resolve } from "rsvp";
import { computed } from "@ember/object";
import { getOwner } from "@ember/application";
import Component from "@ember/component";
import layout from "../templates/components/validated-form";
import { inject as service } from "@ember/service";

const PROP_ON_SUBMIT = "on-submit";
const PROP_ON_INVALID_SUBMIT = "on-invalid-submit";

export default Component.extend({
  tagName: "form",
  intl: service(),

  classNameBindings: ["_cssClass", "submitted"],
  attributeBindings: ["autocomplete"],

  loading: false,

  submitted: false,

  layout,

  validateBeforeSubmit: true,

  init() {
    this._super(...arguments);
    if (this.get("model") && this.get("model").validate) {
      this.get("model").validate();
    }
  },

  _cssClass: computed("config", function() {
    return this.get("config.css.form");
  }),

  _submitLabel: computed("config", "submit-label", function() {
    return this._getLabel("submit") || "Save";
  }),

  _getLabel(type) {
    const label = this._config(type);
    return this.intl ? this.intl.t(label) : label;
  },

  _config(type) {
    return this.get(`config.label.${type}`);
  },

  submitClass: computed("config", function() {
    return this.get(`config.css.submit`) || this.get("config.css.button");
  }),

  submit() {
    this.set("submitted", true);
    const model = this.get("model");

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
    const model = this.get("model");

    this.set("loading", true);
    resolve(callback(model)).finally(() => {
      if (!this.element) {
        // We were removed from the DOM while running on-submit()
        return;
      }
      this.set("loading", false);
    });
  }
});
