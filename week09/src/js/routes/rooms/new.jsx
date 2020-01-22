import mithril from 'mithril';

import Athena from '../../athena.jsx';
import api from '../../api.js';

// resubmit Gitlab
export default class RoomsNew {

    name = '';
    address = '';
    capacity = '';
    features = '';

    setName(ev) {
        this.name = ev.target.value;
    }

    setAddress(ev) {
        this.address = ev.target.value;
    }

    setCapacity(ev) {
        this.capacity = ev.target.value;
    }

    setFeatures(ev) {
        this.features = ev.target.value;
    }

    createRoom(ev) {
        ev.preventDefault();
        mithril.request({
            method: 'POST',
            url: api.base + '/rooms',
            data: {
                data: {
                    type: 'rooms',
                    attributes: {
                        name: this.name,
                        address: this.address,
                        capacity: this.capacity,
                        features: this.features
                    }
                }
            }
        }).then((data) => {
            mithril.route.set('/rooms')
        });
    }

    /**
     * Render the component
     */
    view(vnode) {
        return (
            <Athena>
              <div className="grid-x grid-padding-x">
                <h1 className="cell">Create new Room</h1>
              </div>
              <form className="grid-x grid-padding-x" onsubmit={(ev) => {this.createRoom(ev)}}>
                <div className="cell large-4">
                  <label>Name
                    <input type="text" onchange={(ev) => {this.setName(ev)}}/>
                  </label>
                  <label>Address
                    <input type="text" onchange={(ev) => {this.setAddress(ev)}}/>
                  </label>
                  <label>Capacity
                    <input type="text" onchange={(ev) => {this.setCapacity(ev)}}/>
                  </label>
                  <label>Features
                    <input type="text" onchange={(ev) => {this.setFeatures(ev)}}/>
                  </label>
                  <div className="text-right">
                    <a href="/rooms" className="secondary button" oncreate={mithril.route.link}>Don't Create</a>
                    <button className="button">Create</button>
                  </div>
                </div>
              </form>
            </Athena>
        )
    }
}