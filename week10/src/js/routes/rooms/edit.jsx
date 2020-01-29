import mithril from 'mithril';

import Athena from '../../athena.jsx';
import api from '../../api.js';

export default class RoomEdit {

    room = null;

    oninit(vnode) {
        mithril.request({
            method: 'GET',
            url: api.base + '/rooms/' + vnode.attrs.rid
        }).then((data) => {
            this.room = data;
        });
    }

    setName(ev) {
        this.room.data.attributes.name = ev.target.value;
    }

    setAddress(ev) {
        this.room.data.attributes.address = ev.target.value;
    }

    setCapacity(ev) {
        this.room.data.attributes.capacity = ev.target.value;
    }

    setFeatures(ev) {
        this.room.data.attributes.features = ev.target.value;
    }

    updateRoom(ev) {
        ev.preventDefault();
        mithril.request({
            method: 'PATCH',
            url: api.base + '/rooms/' + this.room.data.id,
            data: this.room
        }).then((data) => {
            mithril.route.set('/rooms/' + data.data.id);
        });
    }

    /**
     * Render the component
     */
    view(vnode) {
        if (vnode.state.room) {
            let abortPath = '/rooms/' + vnode.state.room.data.id;
            return (
                <Athena>
                  <div class="grid-x grid-padding-x">
                    <h1 class="cell">Edit {vnode.state.room.data.attributes.name}</h1>
                  </div>
                  <form class="grid-x grid-padding-x" onsubmit={(ev) => {this.updateRoom(ev)}}>
                    <div class="cell large-4">
                      <label>Name
                        <input type="text" value={vnode.state.room.data.attributes.name} onchange={(ev) => {this.setName(ev)}}/>
                      </label>
                      <label>Address
                        <input type="text" value={vnode.state.room.data.attributes.address} onchange={(ev) => {this.setAddress(ev)}}/>
                      </label>
                      <label>Capacity
                        <input type="text" value={vnode.state.room.data.attributes.capacity} onchange={(ev) => {this.setCapacity(ev)}}/>
                      </label>
                      <label>Features
                        <input type="text" value={vnode.state.room.data.attributes.features} onchange={(ev) => {this.setFeatures(ev)}}/>
                      </label>
                      <div class="text-right">
                        <a href={abortPath} class="secondary button" oncreate={mithril.route.link}>Don't Update</a>
                        <button class="button">Update</button>
                      </div>
                    </div>
                  </form>
                </Athena>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}