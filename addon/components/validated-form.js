import { resolve } from 'rsvp';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import Component from '@ember/component';
import { deprecate } from '@ember/application/deprecations';
import layout from '../templates/components/validated-form';

function runTaskOrAction(taskOrAction, model) {
  deprecate("DEPRECATED passing a task to `on-submit` is deprecated. Please replace it with `on-submit=(perform myTask)`",
    !taskOrAction.perform,
    { until: '1.0.0', id: 'ember-validated-form-pass-task-to-on-submit' }
  );

  return taskOrAction.perform
    ? taskOrAction.perform(model)
    : resolve(taskOrAction(model));
}

export default Component.extend({
  tagName: 'form',

  classNameBindings: ['_cssClass', 'submitted'],

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
      if (model.get('isInvalid')) {
        return false;
      }
      this.runOnSubmit();
    });
    return false;
  },

  runOnSubmit() {
    const task = this.get('on-submit');
    const model = this.get('model');

    this.set('loading', true);
    runTaskOrAction(task, model).finally(() => {
      this.set('loading', false);
    });
  }
});
