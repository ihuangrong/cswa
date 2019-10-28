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

function menuComponent(tablist) {
    tablist.querySelectorAll('*[role=tab]').forEach(function(item) {
        item.addEventListener('keydown', function(ev) {
            // Left-arrow key
            if(ev.keyCode === 37) {
                // Get the previous sibling li wrapper
                var sibling = ev.target.parentElement.previousElementSibling;
                if(sibling !== null) {
                    // Get the tab in the sibling and focus it
                    var nextItem = sibling.querySelector('*[role=tab]');
                    if(nextItem !== null) {
                        nextItem.focus();
                    }
                }
                // Right-arrow key
            } else if(ev.keyCode === 39) {
                // Get the next sibling li wrapper
                var sibling = ev.target.parentElement.nextElementSibling;
                if(sibling !== null) {
                    // Get the tab in the sibling and focus it
                    var nextItem = sibling.querySelector('*[role=tab]');
                    if(nextItem !== null) {
                        nextItem.focus();
                    }
                }
            }
        });
    });
}
document.querySelectorAll('*[role="tablist"]').forEach(menuComponent);