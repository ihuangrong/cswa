/**
 * Function that focuses the first element with either a tabindex of 1 or 0.
 */
function focusFirst() {
    var first = document.querySelector('*[tabindex="1"]');
    if(first === null) {
        first = document.querySelector('*[tabindex="0"]');
    }
    if(first !== null) {
        first.focus();
    }
}
// Make sure we focus the first focusable element
focusFirst();


/**
 * Function that implements a menu component
 */
function menuComponent(menu) {
    menu.querySelectorAll('*[role=menuitem]').forEach(function(item) {
        item.addEventListener('keydown', function(ev) {
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
                var sibling = ev.target.parentElement.nextElementSibling;
                if(sibling !== null) {
                    // If it is a separator, then jump over it
                    if(sibling.getAttribute('role') === 'separator') {
                        sibling = sibling.nextElementSibling;
                    }
                    // Get the menuitem in the sibling and focus it
                    var nextItem = sibling.querySelector('*[role=menuitem]');
                    if(nextItem !== null) {
                        nextItem.focus();
                    }
                }
            }
        });
    });
}
document.querySelectorAll('*[role="menu"]').forEach(menuComponent);