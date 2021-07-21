import { setComponentTemplate } from "@ember/component";
import { action, set, get } from "@ember/object";
import { guidFor } from "@ember/object/internals";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

import themedComponent from "../-private/themed-component";
import template from "../templates/components/validated-input";

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
export class ValidatedInput extends Component {
  inputId = guidFor(this);

  @tracked dirty;
  @tracked required;
  @tracked type;
  @tracked validateBeforeSubmit;

  @themedComponent("validated-input/render") renderComponent;
  @themedComponent("validated-input/label") labelComponent;
  @themedComponent("validated-input/hint") hintComponent;
  @themedComponent("validated-input/error") errorComponent;

  constructor(...args) {
    super(...args);

    this.dirty = this.args.dirty ?? false;
    this.required = this.args.required ?? false;
    this.type = this.args.type ?? "text";
    this.validateBeforeSubmit = this.args.validateBeforeSubmit ?? true;

    this.renderComponent = this.args.renderComponent ?? this.renderComponent;
    this.labelComponent = this.args.labelComponent ?? this.labelComponent;
    this.hintComponent = this.args.hintComponent ?? this.hintComponent;
    this.errorComponent = this.args.errorComponent ?? this.errorComponent;
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

export default setComponentTemplate(template, ValidatedInput);
