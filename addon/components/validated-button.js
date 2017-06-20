import Ember from 'ember';
import layout from '../templates/components/validated-button';

export default Ember.Component.extend({
  layout,
  type: 'button',
  action: null,

  tagName: 'button',

  classNameBindings: ['class'],

  attributeBindings: ['disabled', 'type', 'action:onclick']
});
