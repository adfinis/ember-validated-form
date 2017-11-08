import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('validated-button', 'Integration | Component | validated button', {
  integration: true
});

test('it renders a button with a label', function(assert) {
  this.render(hbs`{{validated-button label="Test"}}`);
  assert.equal(this.$('button').text().trim(), 'Test');
});

test('it renders a button with block style', function(assert) {
  this.render(hbs`{{#validated-button}}Test{{/validated-button}}`);
  assert.equal(this.$('button').text().trim(), 'Test');
});