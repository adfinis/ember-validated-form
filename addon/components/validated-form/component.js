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

  'submit-label': Ember.computed('config', function() {
    const i18n = this.get('i18n');
    const submitLabel = this._config('submitLabel');
    return i18n ? i18n.t(submitLabel) : submitLabel;
  }),

  'cancel-label': Ember.computed('config', function() {
    const i18n = this.get('i18n');
    const cancelLabel = this._config('cancelLabel');
    return i18n ? i18n.t(cancelLabel) : cancelLabel;
  }),

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
