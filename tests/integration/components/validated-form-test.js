import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { helper } from '@ember/component/helper';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import UserValidations from 'dummy/validations/user';

moduleForComponent('validated-form', 'Integration | Component | validated form', {
  integration: true
});

test('it renders simple inputs', function(assert) {
  this.render(hbs`
    {{#validated-form as |f|}}
      {{f.input label="First name"}}
    {{/validated-form}}
  `);

  assert.equal(this.$('form label').text().trim(), 'First name');
  assert.equal(this.$('form input').attr('type'), 'text');
});

test('it renders textareas', function(assert) {
  this.render(hbs`
    {{#validated-form as |f|}}
      {{f.input type="textarea" label="my label"}}
    {{/validated-form}}
  `);

  assert.equal(this.$('form label').text().trim(), 'my label');
  assert.equal(this.$('form textarea').length, 1);
});

test('it renders a radio group', function(assert) {
  this.set('buttonGroupData', {
    options: [
      { key: '1', label: 'Option 1'},
      { key: '2', label: 'Option 2'},
      { key: '3', label: 'Option 3'},
    ]
  });

  this.render(hbs`
    {{#validated-form as |f|}}
      {{f.input type='radioGroup' label='Options' name='testOptions' options=buttonGroupData.options}}
    {{/validated-form}}
  `);

  assert.equal(this.$('input[type="radio"]').length, 3);
  assert.equal(this.$('label').eq(0).text().trim(), 'Options');
  assert.equal(this.$('label').eq(1).text().trim(), 'Option 1');
  assert.equal(this.$('label').eq(2).text().trim(), 'Option 2');
  assert.equal(this.$('label').eq(3).text().trim(), 'Option 3');
});

test('it renders a radio group with block form', function(assert) {
  this.set('buttonGroupData', {
    options: [
      { key: '1', label: 'Option 1'},
      { key: '2', label: 'Option 2'},
      { key: '3', label: 'Option 3'},
    ]
  });

  this.render(hbs`
    {{#validated-form as |f|}}
      {{#f.input type='radioGroup' label='Options' name='testOptions' options=buttonGroupData.options as |option|}}
        {{option.label}} - block form
      {{/f.input}}
    {{/validated-form}}
  `);

  assert.equal(this.$('input[type="radio"]').length, 3);
  assert.equal(this.$('label').eq(0).text().trim(), 'Options');
  assert.equal(this.$('label').eq(1).text().trim(), 'Option 1 - block form');
  assert.equal(this.$('label').eq(2).text().trim(), 'Option 2 - block form');
  assert.equal(this.$('label').eq(3).text().trim(), 'Option 3 - block form');
});

test('it renders a radio group with block form and i18n support', function(assert) {
  this.container.registry.registrations['helper:t'] = helper(function(arg){
    const key = arg[0];
    switch(key) {
      case 'label.foo':
        return 'Option One';        
      case 'label.bar':
        return 'Option Two';
      case 'label.baz':
        return 'Option Three';  
      default:
        return false;   
    } 
  });

  this.set('buttonGroupData', {
    options: [
      { key: '1', label: 'label.foo'},
      { key: '2', label: 'label.bar'},
      { key: '3', label: 'label.baz'},
    ]
  });

  this.render(hbs`
    {{#validated-form as |f|}}
      {{#f.input type='radioGroup' label='Options' name='testOptions' options=buttonGroupData.options as |option|}}
        {{t option.label}} - block form
      {{/f.input}}
    {{/validated-form}}
  `);

  assert.equal(this.$('input[type="radio"]').length, 3);
  assert.equal(this.$('label').eq(0).text().trim(), 'Options');
  assert.equal(this.$('label').eq(1).text().trim(), 'Option One - block form');
  assert.equal(this.$('label').eq(2).text().trim(), 'Option Two - block form');
  assert.equal(this.$('label').eq(3).text().trim(), 'Option Three - block form');

  this.container.registry.registrations['helper:t'] = null;
});

test('it renders submit buttons', function(assert) {
  this.on('stub', function() {});

  this.render(hbs`
    {{#validated-form
      on-submit=(action "stub")
      as |f|}}
      {{f.input label="First name"}}
      {{f.submit label="Save!"}}
    {{/validated-form}}
  `);

  assert.equal(this.$('form button').attr('type'), 'submit');
  assert.equal(this.$('form button').text().trim(), 'Save!');
});

test('it renders an always-showing hint using a different class from the help block', function(assert){
  this.set('config', {
    css: {
      help: 'help',
      hint: 'hint'
    }
  });
  
  this.render(hbs`
    {{#validated-form config=config as |f|}}
      {{f.input label="First name" hint="Not your middle name!"}}
    {{/validated-form}}
  `);

  assert.equal(this.$('.help-block').length, 0);
  assert.equal(this.$('.hint').length, 1);
  assert.equal(this.$('.hint').text().trim(), 'Not your middle name!');
});

test('does not render a <p> tag for buttons if no callbacks were passed', function(assert) {
  this.render(hbs`
    {{#validated-form as |f|}}
      {{f.input label="First name"}}
    {{/validated-form}}
  `);

  assert.equal(this.$('form > p').length, 0);
});

test('it supports default button labels with i18n support', function(assert) {
  this.on('stub', function() {});

  this.registry.register('service:i18n', EmberObject.extend({
    t(key) {
      return key === 'label.save' ? 'Speichern' : '';
    }
  }));

  this.render(hbs`
    {{#validated-form
      on-submit=(action "stub")
      as |f|}}
      {{f.submit}}
    {{/validated-form}}
  `);

  assert.equal(this.$('form button').first().text().trim(), 'Speichern');
});

test('it supports default button labels without i18n support', function(assert) {
  this.on('stub', function() {});

  this.render(hbs`
    {{#validated-form
      on-submit=(action "stub")
      as |f|}}
      {{f.submit}}
    {{/validated-form}}
  `);

  assert.equal(this.$('form button').first().text().trim(), 'label.save');
});

test('it performs basic validations on submit', function(assert) {
  this.on('submit', function() {});
  this.set('UserValidations', UserValidations);

  const store = this.container.lookup('service:store');
  run(() => {
    this.set('model', store.createRecord('user', {
      firstName: 'x'
    }));
  });

  this.render(hbs`
    {{#validated-form
      model=(changeset model UserValidations)
      on-submit=(action "submit")
      as |f|}}
      {{f.input label="First name" name="firstName"}}
      {{f.submit}}
    {{/validated-form}}
  `);
  assert.equal(this.$('span.help-block').length, 0);
  this.$('button').click();
  assert.equal(this.$('input').val(), 'x');
  assert.equal(this.$('span.help-block').length, 1);
  assert.equal(this.$('span.help-block').text(),
    'First name must be between 3 and 40 characters');
});

test('it performs basic validations on focus out', function(assert) {
  this.on('submit', function() {});
  this.set('UserValidations', UserValidations);

  const store = this.container.lookup('service:store');
  run(() => {
    this.set('model', store.createRecord('user'));
  });

  this.render(hbs`
    {{#validated-form
      model=(changeset model UserValidations)
      on-submit=(action "submit")
      as |f|}}
      {{f.input label="First name" name="firstName"}}
    {{/validated-form}}
  `);
  assert.equal(this.$('span.help-block').length, 0);
  this.$('input').blur();

  assert.equal(this.$('span.help-block').length, 1);
  assert.equal(this.$('span.help-block').text(),
    'First name can\'t be blank');
});
