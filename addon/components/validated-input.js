import { computed, defineProperty } from "@ember/object";
import Component from "@ember/component";
import layout from "../templates/components/validated-input";
import v4 from "uuid/v4";
import themedComponent from "../-private/themed-component";

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
  tagName: "",
  dirty: false,
  required: false,
  type: "text",
  validateBeforeSubmit: true,

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

  inputId: computed(() => v4()),

  errors: computed("model.error", function() {
    return this.getWithDefault(
      `model.error.${this.get("name")}.validation`,
      []
    );
  }),

  isValid: computed("showValidity", "errors.[]", function() {
    return this.get("showValidity") && !this.get("errors.length");
  }),

  isInvalid: computed("showValidity", "errors.[]", function() {
    return this.get("showValidity") && !!this.get("errors.length");
  }),

  renderComponent: themedComponent("validated-input/render"),
  labelComponent: themedComponent("validated-input/label"),
  hintComponent: themedComponent("validated-input/hint"),
  errorComponent: themedComponent("validated-input/error"),

  showValidity: computed(
    "validateBeforeSubmit",
    "dirty",
    "submitted",
    function() {
      return (
        this.get("submitted") ||
        (this.get("validateBeforeSubmit") && this.get("dirty"))
      );
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
