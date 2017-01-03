import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  submitted: false,

  layout,

  init() {
    this._super(...arguments);
    if (this.get('model') && this.get('model').validate) {
      this.get('model').validate();
    }
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
