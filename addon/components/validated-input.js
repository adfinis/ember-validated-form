import { action, set, get } from "@ember/object";
import { guidFor } from "@ember/object/internals";
import { isEmpty } from "@ember/utils";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

import passedOrDefault from "ember-validated-form/passed-or-default";

/**
 * This component wraps form inputs.
 *
 * It can be used in a two-way-binding style like
 * <ValidatedInput @model={{model}} @name='firstName'/> (model will be updated)
 *
 * or in a one-way-binding style
 * <ValidatedInput @model={{model}} @name='firstName' @on-update={{this.update}}
 * (update action is called, model is not updated)
 *
 * @class validated-input
 * @export default
 */
export default class ValidatedInputComponent extends Component {
  inputId = guidFor(this);

  get errorId() {
    return `${this.inputId}-error`;
  }

  get hintId() {
    return !isEmpty(this.args.hint) ? `${this.inputId}-hint` : null;
  }

  @tracked dirty;
  @tracked required;
  @tracked type;
  @tracked validateBeforeSubmit;

  @passedOrDefault("error") errorComponent;
  @passedOrDefault("hint") hintComponent;
  @passedOrDefault("label") labelComponent;
  @passedOrDefault("render") renderComponent;

  constructor(...args) {
    super(...args);

    this.dirty = this.args.dirty ?? false;
    this.required = this.args.required ?? false;
    this.type = this.args.type ?? "text";
    this.validateBeforeSubmit = this.args.validateBeforeSubmit ?? true;
  }

  get _val() {
    return (
      this.args.value ??
      (this.args.model &&
        this.args.name &&
        get(this.args.model, this.args.name))
    );
  }

  get errors() {
    const errors =
      (this.args.model &&
        get(this.args.model, `error.${this.args.name}.validation`)) ??
      [];

    if (!Array.isArray(errors)) {
      return [errors];
    }

    return errors;
  }

  get isValid() {
    return this.showValidity && !this.errors.length;
  }

  get isInvalid() {
    return this.showValidity && !!this.errors.length;
  }

  get showValidity() {
    return this.args.submitted || (this.validateBeforeSubmit && this.dirty);
  }

  @action
  setDirty() {
    this.dirty = true;
  }

  @action
  update(value) {
    if (this.args["on-update"]) {
      this.args["on-update"](value, this.args.model);
    } else {
      this.args.model.set
        ? this.args.model.set(this.args.name, value)
        : set(this.args.model, this.args.name, value);
    }
  }
}
