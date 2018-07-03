import { computed, defineProperty } from "@ember/object";
import Component from "@ember/component";
import layout from "../templates/components/validated-input";

/**
 * This component wraps form inputs.
 *
 * It can be used in a two-way-binding style like
 * {{validated-input model=model name='firstName'}} (model will be updated)
 *
 * or in a one-way-binding style
 * {{validated-input model=model name='firstName' on-update=(action "update"}}
 * (update action is called, model is not updated)
 */
export default Component.extend({
  layout,

  dirty: false,

  labelComponent: "validated-label",

  required: false,

  type: "text",

  validateBeforeSubmit: true,

  classNameBindings: ["dirty", "config.css.group", "validationClass"],

  init() {
    this._super(...arguments);

    defineProperty(
      this,
      "_val",
      computed("value", `model.${this.get("name")}`, "name", function() {
        return this.get("value") || this.get(`model.${this.get("name")}`);
      })
    );
  },

  inputId: computed("elementId", "name", function() {
    return `${this.get("elementId")}-input-${this.get("name")}`;
  }),

  validationClass: computed("showError", function() {
    const errorClass = this.get("config.css.error") || "has-error";
    const validClass = this.get("config.css.valid") || "valid";
    const isDirty = this.get("dirty");

    return this.get("showError") ? errorClass : isDirty ? validClass : "";
  }),

  error: computed("model.error", function() {
    const error = this.get("model.error");
    return error ? error[this.get("name")] : null;
  }),

  isValid: computed("error", function() {
    return !this.get("error");
  }),

  firstError: computed("error", function() {
    return this.get("error.validation")[0];
  }),

  showError: computed(
    "isValid",
    "validateBeforeSubmit",
    "dirty",
    "submitted",
    function() {
      if (!this.get("isValid")) {
        if (this.get("validateBeforeSubmit") && this.get("dirty")) {
          return true;
        }
        if (this.get("submitted")) {
          return true;
        }
      }
      return false;
    }
  ),

  actions: {
    setDirty() {
      this.set("dirty", true);
    },

    update(value) {
      if (this.get("on-update")) {
        this.get("on-update")(value, this.get("model"));
      } else {
        this.set(`model.${this.get("name")}`, value);
      }
    }
  }
});
