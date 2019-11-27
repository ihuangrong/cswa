import Component from '@ember/component';

/**
 * A component that generates an ARIA compliant menu.
 *
 * @param {string} label The label used to describe this menu
 * @param {string} direction Whether the menu is to be displayed "horizontal" or "vertical" (default)
 */
export default Component.extend({
    tagName: 'nav',
    attributeBindings: ['label:aria-label'],

    direction: 'vertical',

    keyDown(ev) {
        // Left-arrow key
        if(ev.keyCode === 37) {
            // Get the previous sibling li wrapper
            var sibling = ev.target.parentElement.previousElementSibling;
            if(sibling !== null) {
                // If it is a separator, then jump over it
                if(sibling.getAttribute('role') === 'separator') {
                    sibling = sibling.previousElementSibling;
                }
                // Get the menuitem in the sibling and focus it
                var nextItem = sibling.querySelector('*[role=menuitem]');
                if(nextItem !== null) {
                    nextItem.focus();
                }
            }
        // Right-arrow key
        } else if(ev.keyCode === 39) {
            // Get the next sibling li wrapper
            // eslint-disable-next-line no-redeclare
            var sibling = ev.target.parentElement.nextElementSibling;
            if(sibling !== null) {
                // If it is a separator, then jump over it
                if(sibling.getAttribute('role') === 'separator') {
                    sibling = sibling.nextElementSibling;
                }
                // Get the menuitem in the sibling and focus it
                // eslint-disable-next-line no-redeclare
                var nextItem = sibling.querySelector('*[role=menuitem]');
                if(nextItem !== null) {
                    nextItem.focus();
                }
            }
        }
    }
});
