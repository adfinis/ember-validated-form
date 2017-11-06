import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/validated-input';

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

  required: false,

  type: 'text',

  classNameBindings: ['dirty', 'config.css.group', 'validationClass'],

  inputId: computed('elementId', 'name', function() {
    return `${this.get('elementId')}-input-${this.get('name')}`;
  }),

  validationClass: computed('showError', function() {
    const errorClass = this.get('config.css.error') || 'has-error';
    const validClass = this.get('config.css.valid') || 'valid';

    return this.get('showError') ? errorClass : validClass;
  }),

  error: computed('model.error', function() {
    const error = this.get('model.error');
    return error ? error[this.get('name')] : null;
  }),

  isValid: computed('error', function() {
    return !this.get('error');
  }),

  firstError: computed('error', function() {
    return this.get('error.validation')[0];
  }),

  showError: computed('isValid', 'dirty', 'submitted', function() {
    return !this.get('isValid') && (this.get('dirty') || this.get('submitted'));
  }),

  requiredLabel: computed('config', function() {
    return this.get('config.label.required') || '*';
  }),

  _val: computed('value', 'model', 'name', function() {
    return this.get('value') || this.get(`model.${this.get('name')}`);
  }),

  actions: {
    setDirty() {
      this.set('dirty', true);
    },

    update(value) {
      if (this.attrs['on-update']) {
        this.attrs['on-update'](value, this.get('model'));
      } else {
        this.set(`model.${this.get('name')}`, value);
      }
    }
  }
});
