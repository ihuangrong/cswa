import mithril from 'mithril';

import Athena from '../../athena.jsx';
import api from '../../api.js';

export default class ModuleEdit {

    module = null;

    oninit(vnode) {
        mithril.request({
            method: 'GET',
            url: api.base + '/modules/' + vnode.attrs.mid
        }).then((data) => {
            this.module = data;

            mithril.request({
                method: 'GET',
                url: api.base + '/users/' + data.data.relationships.creator.data.id
            }).then((data) => {
                this.creator = data;
            })
        });
    }

    setCode(ev) {
        this.module.data.attributes.code = ev.target.value;
    }

    setName(ev) {
        this.module.data.attributes.name = ev.target.value;
    }

    setSemester(ev) {
        this.module.data.attributes.semester = ev.target.value;
    }

    updateModule(ev) {
        ev.preventDefault();
        mithril.request({
            method: 'PATCH',
            url: api.base + '/modules/' + this.module.data.id,
            data: this.module
        }).then((data) => {
            mithril.route.set('/modules/' + data.data.id);
        });
    }

    /**
     * Render the component
     */
    view(vnode) {
        if (vnode.state.module) {
            let abortPath = '/modules/' + vnode.state.module.data.id;
            return (
                <Athena>
                  <div class="grid-x grid-padding-x">
                    <h1 class="cell">Edit {vnode.state.module.data.attributes.name}</h1>
                  </div>
                  <form class="grid-x grid-padding-x" onsubmit={(ev) => {this.updateModule(ev)}}>
                    <div class="cell large-4">
                      <label>Code
                        <input type="text" value={vnode.state.module.data.attributes.code} onchange={(ev) => {this.setCode(ev)}}/>
                      </label>
                      <label>Name
                        <input type="text" value={vnode.state.module.data.attributes.name} onchange={(ev) => {this.setName(ev)}}/>
                      </label>
                      <label>Semester
                        <select onchange={(ev) => {this.setSemester(ev)}}>
                          <option value="WS18/19" selected={vnode.state.module.data.attributes.semester == 'WS18/19'}>Wintersemester 18/19</option>
                          <option value="SS18" selected={vnode.state.module.data.attributes.semester == 'SS18'}>Summersemester 18</option>
                        </select>
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