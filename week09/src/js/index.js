import mithril from 'mithril';

import Athena from './athena.jsx';

export function install(attachmentPoint) {
    mithril.route(attachmentPoint, '/', {
        '/': Athena
    });
}
