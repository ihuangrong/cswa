import { helper } from '@ember/component/helper';

/**
 * Format the email values for human reading.
 *
 * @param {array} params The email values to format
 */
export default helper(function formatEmail(params/*, hash*/) {
  return params.map((email) => {
    return email.toString().replace('@', '(at)')
  })
});
