import { computed, defineProperty } from "@ember/object";
import Component from "@ember/component";
import layout from "../templates/components/validated-input";
import { v4 } from "uuid";
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
 *
 * @class validated-input
 * @export default
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
      computed("value", `model.${this.name}`, "name", function () {
        return this.value || this.get(`model.${this.name}`);
      })
    );
  },

  inputId: computed(function () {
    return v4();
  }),

  errors: computed("model.error", "name", function () {
    return this.get(`model.error.${this.name}.validation`) === undefined
      ? []
      : this.get(`model.error.${this.name}.validation`);
  }),

  isValid: computed("showValidity", "errors.[]", function () {
    return this.showValidity && !this.errors.length;
  }),

  isInvalid: computed("showValidity", "errors.[]", function () {
    return this.showValidity && !!this.errors.length;
  }),

  renderComponent: themedComponent("validated-input/render"),
  labelComponent: themedComponent("validated-input/label"),
  hintComponent: themedComponent("validated-input/hint"),
  errorComponent: themedComponent("validated-input/error"),

  showValidity: computed(
    "validateBeforeSubmit",
    "dirty",
    "submitted",
    function () {
      return this.submitted || (this.validateBeforeSubmit && this.dirty);
    }
  ),

  actions: {
    setDirty() {
      this.set("dirty", true);
    },

    update(value) {
      if (this["on-update"]) {
        this["on-update"](value, this.model);
      } else {
        this.set(`model.${this.name}`, value);
      }
    },
  },
});
