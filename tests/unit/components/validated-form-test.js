import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { task } from 'ember-concurrency';

moduleForComponent('validated-form', 'Unit | Component | validated form', {
  // Specify the other units that are required for this test
  needs: ['component:validated-input'],
  unit: true
});

test('it handles ember-concurrency tasks', function(assert) {
  assert.expect(1);
  const component = this.subject();

  component.set('on-submit', task(function * () {
    yield 'something';
    assert.ok(true, 'task is called');
  }));

  Ember.run(() => component.actions.submit.call(component));
});
