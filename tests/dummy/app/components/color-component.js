import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  colorStyle: Ember.computed('color.color', function () {
    let color = this.get('color.color');
    return Ember.String.htmlSafe('background-color:' + color + ";");
  }),
  actions: {
    onclick() {
      this.get('colorSelected')(this.get('color'));
    }
  }
});
