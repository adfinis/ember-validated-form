import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/validated-button';

export default Component.extend({
  layout,
  type: 'button',
  action: null,

  tagName: 'button',

  classNameBindings: ['loadingClass'],

  attributeBindings: ['disabled', 'type', 'action:onclick'],

  loadingClass: computed('loading', function() {
    return this.get('loading') ? this.get('config.css.loading') : null;
  })
});
