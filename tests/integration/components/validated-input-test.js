import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Changeset from 'ember-changeset';

moduleForComponent('validated-input', 'Integration | Component | validated input', {
  integration: true
});

test('it renders simple text inputs with correct id, name and class', function(assert) {
  this.set('config', {
    css: {
      control: 'foobar'
    }
  });
  this.render(hbs`{{validated-input id="foo" name="bar" config=config}}`);
  assert.equal(this.$('input').attr('type'), 'text');
  assert.equal(this.$('input').attr('id'), 'foo-input-bar');
  assert.equal(this.$('input').attr('name'), 'bar');
  assert.equal(this.$('input').attr('class'), 'foobar');
});

test('it renders email input', function(assert) {
  this.render(hbs`{{validated-input type="email"}}`);
  assert.equal(this.$('input').attr('type'), 'email');
});

test('it renders tel input', function(assert) {
  this.render(hbs`{{validated-input type="tel"}}`);
  assert.equal(this.$('input').attr('type'), 'tel');
});

test('it renders disabled inputs', function(assert) {
  this.render(hbs`{{validated-input disabled=true}}`);
  assert.equal(this.$('input').attr('disabled'), 'disabled');
});

test('it renders inputs with placeholder', function(assert) {
  this.render(hbs`{{validated-input placeholder="foo"}}`);
  assert.equal(this.$('input').attr('placeholder'), 'foo');
});

test('it renders inputs with value', function(assert) {
  this.render(hbs`{{validated-input value="foo"}}`);
  assert.equal(this.$('input').val(), 'foo');
});

test('it renders inputs with model', function(assert) {
  this.set('model', new Changeset({ firstName: 'Max' }));
  this.render(hbs`{{validated-input name="firstName" model=model}}`);
  assert.equal(this.$('input').val(), 'Max');
});

test('it renders inputs with value even if model is defined', function(assert) {
  this.set('model', new Changeset({ firstName: 'Max' }));
  this.render(hbs`{{validated-input name="firstName" model=model value="foobar"}}`);
  assert.equal(this.$('input').val(), 'foobar');
});

test('it renders textarea inputs with correct id, name and class', function(assert) {
  this.set('config', {
    css: {
      control: 'foobar'
    }
  });
  this.render(hbs`{{validated-input type="textarea" id="foo" name="bar" config=config}}`);
  assert.equal(this.$('textarea').attr('id'), 'foo-input-bar');
  assert.equal(this.$('textarea').attr('name'), 'bar');
  assert.equal(this.$('textarea').attr('class'), 'foobar');
});

test('it renders disabled textareas', function(assert) {
  this.render(hbs`{{validated-input type="textarea" disabled=true}}`);
  assert.equal(this.$('textarea').attr('disabled'), 'disabled');
});

test('it renders textareas with placeholder', function(assert) {
  this.render(hbs`{{validated-input type="textarea" placeholder="foo"}}`);
  assert.equal(this.$('textarea').attr('placeholder'), 'foo');
});

test('it renders textareas with value', function(assert) {
  this.render(hbs`{{validated-input type="textarea" value="foo"}}`);
  assert.equal(this.$('textarea').val(), 'foo');
});

test('it renders textareas with model', function(assert) {
  this.set('model', new Changeset({ firstName: 'Max' }));
  this.render(hbs`{{validated-input type="textarea" name="firstName" model=model}}`);
  assert.equal(this.$('textarea').val(), 'Max');
});
