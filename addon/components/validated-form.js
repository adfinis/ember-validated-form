import { resolve } from 'rsvp';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import Component from '@ember/component';
import layout from '../templates/components/validated-form';

export default Component.extend({
  tagName: 'form',

  classNameBindings: ['_cssClass', 'submitted'],
  attributeBindings: ['autocomplete'],

  loading: false,

  submitted: false,

  layout,

  validateBeforeSubmit: true,

  init() {
    this._super(...arguments);
    if (this.get('model') && this.get('model').validate) {
      this.get('model').validate();
    }

    let owner = getOwner(this);
    let factory = owner.factoryFor
      ? owner.factoryFor('service:i18n')
      : owner._lookupFactory('service:i18n');
    this.set('i18n', factory ? factory.create() : null);
  },

  _cssClass: computed('config', function() {
    return this.get('config.css.form');
  }),

  _submitLabel: computed('config', 'submit-label', function() {
    return this._getLabel('submit') || 'Save';
  }),

  _getLabel(type) {
    const i18n = this.get('i18n');
    const label = this._config(type);
    return i18n ? i18n.t(label) : label;
  },

  _config(type) {
    return this.get(`config.label.${type}`);
  },

  submitClass: computed('config', function() {
    return this.get(`config.css.submit`) || this.get('config.css.button');
  }),

  submit() {
    this.set('submitted', true);
    const model = this.get('model');

    if (!model || !model.validate) {
      this.runOnSubmit();
      return false;
    }

    model.validate().then(() => {
      if (!this.element) {
        // We were removed from the DOM while validating
        return;
      }

      if (model.get('isInvalid')) {
        return false;
      }
      this.runOnSubmit();
    });
    return false;
  },

  runOnSubmit() {
    const onSubmit = this.get('on-submit');
    const model = this.get('model');

    this.set('loading', true);
    resolve(onSubmit(model)).finally(() => {
      if (!this.element) {
        // We were removed from the DOM while running on-submit()
        return;
      }
      this.set('loading', false);
    });
  }
});
