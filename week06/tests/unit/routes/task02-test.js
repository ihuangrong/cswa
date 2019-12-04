import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | task02', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:task02');
    assert.ok(route);
  });
});
