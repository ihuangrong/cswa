import Controller from '@ember/controller';
import { computed } from '@ember/object';

/**
 * Returns an Ember ``computed()`` function that checks the ``testProperty`` property and if it is ``true`` returns the
 * ``trueValue`` otherwise the ``falseValue``
 *
 * @param {string} testProperty - The property that determines ``true`` or ``false``
 * @param {object} trueValue  - The value to return if ``testProperty`` is ``true``
 * @param {object} falseValue  - The value to return if ``testProperty`` is ``false``
 * @returns {object} An Ember ``computed()`` function
 */
function computedBoolean(testProperty, trueValue, falseValue) {
    return computed('loginInvalid', function(){
        if(this.get(testProperty)) {
            return trueValue;
        } else {
            return falseValue;
        }
    })
}

/**
 * Provides the backend functionality for the login route.
 */
export default Controller.extend({
    email: '',
    password: '',
    loginInvalid: false, // login invalid error 
    classLabel: computedBoolean('loginInvalid', 'is-invalid-label', ''),
    classInput: computedBoolean('loginInvalid', 'is-invalid-input', ''),
 
    actions: {
        /**
         * Handle the user submitting the login form. Tests the email/password and updates the UI.
         */
        login() {
            let email = this.get('email')
            let password = this.get('password')

            if(email === 'test@example.com' && password === 'password') {
                this.set('loginInvalid', false)
            } else {
                this.set('loginInvalid', true)
            }
        },
        /**
         * Handle the user typing into the email/password input fields. Resets the ``loginInvalid`` property to
         * improve the usability.
         */
        typing() {
            this.set('loginInvalid', false)
        }
    }
});
