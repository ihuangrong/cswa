import mithril from 'mithril';

export default class AriaMenu {
    keyDown(ev) {
        if (ev.keyCode === 39) {
            let nextElement = ev.target.parentElement.nextElementSibling;
            while (nextElement && (nextElement.getAttribute('role') === 'separator' ||
                   nextElement.querySelector('*[role="menuitem"]').getAttribute('aria-disabled') === 'true')) {
                nextElement = nextElement.nextElementSibling;
            }
            if (nextElement) {
                nextElement.querySelector('*[role="menuitem"]').focus();
            }
        } else if (ev.keyCode === 37) {
            let previousElement = ev.target.parentElement.previousElementSibling;
            while (previousElement && (previousElement.getAttribute('role') === 'separator' ||
                   previousElement.querySelector('*[role="menuitem"]').getAttribute('aria-disabled') === 'true')) {
                previousElement = previousElement.previousElementSibling;
            }
            if (previousElement) {
                previousElement.querySelector('*[role="menuitem"]').focus();
            }
        }
    }

    view(vnode) {
        return (
            <nav>
              <ul class={vnode.attrs.class} role="menu" onkeydown={this.keyDown} aria-label={vnode.attrs.label}>
                {vnode.children}
              </ul>
            </nav>
        );
    }
}
