import mithril from 'mithril';

import Athena from '../../athena.jsx';
import AriaMenu from '../../components/aria-menu.jsx';
import api from '../../api';

export default class RoomsIndex {

    rooms = null;

    oninit(vnode) {
        mithril.request({
            method: 'GET',
            url: api.base + '/rooms'
        }).then((data) => {
            this.rooms = data;
        });
    }

    deleteRoom(room) {
      mithril.request({
          method: 'DELETE',
          url: api.base + '/rooms/' + room.id
      }).then(() => {
          mithril.request({
              method: 'GET',
              url: api.base + '/rooms'
          }).then((data) => {
              this.rooms = data;
          });
      })
    }

    view(vnode) {
        let rooms = [];
        if(vnode.state.rooms) {
            rooms = vnode.state.rooms.data.map((room) => {
                let key = 'room-' + room.id;
                let path = '/rooms/' + room.id;
                return (
                    <tr key={key}>
                      <td><a href={path} oncreate={mithril.route.link}>{room.attributes.name}</a></td>
                      <td><a href={path} oncreate={mithril.route.link}>{room.attributes.address}</a></td>
                      <td><a href={path} oncreate={mithril.route.link}>{room.attributes.capacity}</a></td>
                      <td><a href={path} oncreate={mithril.route.link}>{room.attributes.features}</a></td>
                      <td>
                        <nav>
                          <ul role="menu" class="horizontal" aria-label="Actions">
                            <li><a role="menuitem" aria-label="Leave" title="Leave" class="mdi mdi-delete warning" tabindex="0" onclick={(ev) => {this.deleteRoom(room)}}></a></li>
                          </ul>
                        </nav>
                      </td>
                    </tr>
                )
            });
        }
        return (
            <Athena>
              <div class="grid-x grid-padding-x">
                <h1 class="cell">My Rooms</h1>
              </div>
              <div class="grid-x grid-padding-x">
                <div class="cell small-12 medium-3 large-shrink">
                  <AriaMenu orientation="vertical">
                    <li><a href="/rooms/new" role="menuitem" tabindex="-1" oncreate={mithril.route.link}>Create Room</a></li>
                  </AriaMenu>
                </div>
                <section class="cell small-12 medium-9 large-auto">
                  <table>
                   <thead>
                      <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Capacity</th>
                        <th>Features</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms}
                    </tbody>
                  </table>
                </section>
              </div>
            </Athena>
        )
    }
}