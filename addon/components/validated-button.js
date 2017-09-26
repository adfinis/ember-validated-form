import Component from '@ember/component';
import layout from '../templates/components/validated-button';

export default Component.extend({
  layout,
  type: 'button',
  action: null,

  tagName: 'button',

  classNameBindings: ['class'],

  attributeBindings: ['disabled', 'type', 'action:onclick']
});
