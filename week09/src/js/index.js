import mithril from 'mithril';

import Athena from './athena.jsx';
import ModulesIndex from './routes/modules/index.jsx';
import ModulesNew from './routes/modules/new.jsx';
import ModuleView from './routes/modules/view.jsx';
import ModuleEdit from './routes/modules/edit.jsx';

export function install(attachmentPoint) {
    mithril.route(attachmentPoint, '/', {
        '/': Athena,
        '/modules': ModulesIndex,
        '/modules/new': ModulesNew,
        '/modules/:mid': ModuleView,
        '/modules/:mid/edit': ModuleEdit
    });
}
