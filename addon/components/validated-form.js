import Ember from 'ember';
import layout from '../templates/components/validated-form';

function runTaskOrAction(taskOrAction, model) {
  return taskOrAction.perform ?
    taskOrAction.perform(model) :
    taskOrAction(model);
}

export default Ember.Component.extend({
  submitted: false,

  layout,

  init() {
    this._super(...arguments);
    if (this.get('model') && this.get('model').validate) {
      this.get('model').validate();
    }

    let owner = Ember.getOwner(this);
    let factory = owner.factoryFor ? owner.factoryFor('service:i18n') : owner._lookupFactory('service:i18n');
    this.set('i18n', factory ? factory.create() : null);
  },

  _submitLabel: Ember.computed('config', 'submit-label', function() {
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

  submitClass: Ember.computed('config', function() {
    return this.get(`config.css.submit`) || this.get('config.css.button');
  }),

  actions: {
    submit() {
      this.set('submitted', true);
      const model = this.get('model');

      if (!model || !model.validate) {
        const task = this.get('on-submit');
        runTaskOrAction(task, model);
        return;
      }

      model.validate().then(() => {
        if (model.get('isInvalid')) {
          return;
        }
        const task = this.get('on-submit');
        runTaskOrAction(task, model);
        this.set('submitTask', task);
      });
    }
  }
});
