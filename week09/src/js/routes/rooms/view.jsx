import mithril from 'mithril';

import Athena from '../../athena.jsx';
import api from '../../api.js';

export default class RoomView {

    room = null;

    oninit(vnode) {
        mithril.request({
            method: 'GET',
            url: api.base + '/rooms/' + vnode.attrs.rid
        }).then((data) => {
            this.room = data;
        });
    }

    /**
     * Render the component
     */
    view(vnode) {
        if (vnode.state.room) {
            let editPath = '/rooms/' + vnode.state.room.data.id + '/edit';
            return (
                <Athena>
                  <main class="grid-container">
                    <div class="grid-x grid-padding-x">
                      <div class="cell">
                        <h1>{vnode.state.room.data.attributes.name}</h1>
                        <dl>
                          <dt>Address</dt>
                          <dd>{vnode.state.room.data.attributes.address}</dd>
                          <dt>Capacity</dt>
                          <dd>{vnode.state.room.data.attributes.capacity}</dd>
                          <dt>Features</dt>
                          <dd>{vnode.state.room.data.attributes.features}</dd>
                        </dl>
                        <div>
                          <a href="/rooms" className="secondary button" oncreate={mithril.route.link}>Return</a>
                          <a href={editPath} class="button" oncreate={mithril.route.link}>Edit</a>
                        </div>
                      </div>
                    </div>
                  </main>
                </Athena>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}