import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  submitted: false,

  layout,

  i18n: Ember.inject.service(),

  init() {
    this._super(...arguments);
    if (this.get('model') && this.get('model').validate) {
      this.get('model').validate();
    }
  },

  _submitLabel: Ember.computed('config', 'submit-label', function() {
    return this._getLabel('submit-label');
  }),

  _cancelLabel: Ember.computed('config', function() {
    return this._getLabel('cancel-label');
  }),

  _getLabel(key) {
    const i18n = this.get('i18n');
    const customLabel = this.get(key);
    if (customLabel) {
      return customLabel;
    }
    const defaultLabel = this._config(Ember.String.camelize(key));
    return i18n ? i18n.t(defaultLabel) : defaultLabel;
  },

  _config(property) {
    return this.get(`config.${property}`);
  },

  actions: {
    submit() {
      this.set('submitted', true);
      const model = this.get('model');
      model.validate().then(() => {
        if (model.get('isInvalid')) {
          return;
        }
        this.attrs['on-submit'](model);
      });
    }
  }
});
