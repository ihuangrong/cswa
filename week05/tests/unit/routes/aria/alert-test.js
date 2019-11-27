import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | aria/alert', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:aria/alert');
    assert.ok(route);
  });
});
