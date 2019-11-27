import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-email', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('formats email to easily understandable by the user', async function(assert) {
    this.set('inputValue', '1234@123.com');

    await render(hbs`{{format-email inputValue}}`);

    assert.equal(this.element.textContent.trim(), '1234(at)123.com');
  });
});
