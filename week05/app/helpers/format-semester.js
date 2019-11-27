import { helper } from '@ember/component/helper';

/**
 * Format the semester values for human reading.
 *
 * @param {array} params The semester values to format
 */
export default helper(function formatSemester(params/*, hash*/) {
  return params.map((semester) => {
    if(semester.indexOf('WS') === 0) {
      return 'Wintersemester 20' + semester.substring(2)
    } else {
      return 'Sommersemester 20' + semester.substring(2)
    }
  });
});
