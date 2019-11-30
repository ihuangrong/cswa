import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | aria/dialog', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:aria/dialog');
    assert.ok(route);
  });
});
