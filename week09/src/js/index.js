import mithril from 'mithril';

import Athena from './athena.jsx';
import ModulesIndex from './routes/modules/index.jsx';
import ModulesNew from './routes/modules/new.jsx';
import ModuleView from './routes/modules/view.jsx';
import ModuleEdit from './routes/modules/edit.jsx';
import RoomsIndex from './routes/rooms/index.jsx';
import RoomsNew from './routes/rooms/new.jsx';
import RoomView from './routes/rooms/view.jsx';
import RoomEdit from './routes/rooms/edit.jsx';

export function install(attachmentPoint) {
    mithril.route(attachmentPoint, '/', {
        '/': Athena,
        '/modules': ModulesIndex,
        '/modules/new': ModulesNew,
        '/modules/:mid': ModuleView,
        '/modules/:mid/edit': ModuleEdit,

        '/rooms': RoomsIndex,
        '/rooms/new': RoomsNew,
        '/rooms/:rid': RoomView,
        '/rooms/:rid/edit': RoomEdit,
    });
}
