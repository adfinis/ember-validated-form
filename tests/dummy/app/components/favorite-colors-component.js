import Ember from 'ember';

export default Ember.Component.extend({
  hasSelected: Ember.computed.notEmpty('selected'),
  isShowingColors: false,

  actions: {
    onColorSelected(color) {
      this.toggleProperty('isShowingColors');
      this.get('onupdate')(color);
    },

    toggle() {
      this.toggleProperty('isShowingColors');
    },

    onhover() {
      this.get('onhover')();
    },

    clearSelection() {
      this.set('selected', null);
      this.get('onupdate')(null);
    }
  }
});
