import mithril from 'mithril';

import Athena from '../../athena.jsx';
import api from '../../api.js';

export default class View {

    module = null;
    teacher = null;

    oninit(vnode) {
        mithril.request({
            method: 'GET',
            url: api.base + '/modules/' + vnode.attrs.mid
        }).then((data) => {
            this.module = data;
            mithril.request({
                method: 'GET',
                url: api.base + '/users/' + data.data.relationships.teacher.data.id
            }).then((data) => {
                this.teacher = data;
            })
        });
    }

    /**
     * Render the component
     */
    view(vnode) {
        if (vnode.state.module && vnode.state.teacher) {
            let editPath = '/modules/' + vnode.state.module.data.id + '/edit';
            return (
                <Athena>
                  <main class="grid-container">
                    <div class="grid-x grid-padding-x">
                      <div class="cell">
                        <h1>{vnode.state.module.data.attributes.code} {vnode.state.module.data.attributes.name}</h1>
                        <dl>
                          <dt>Semester</dt>
                          <dd>{vnode.state.module.data.attributes.semester}</dd>
                          <dt>Contact</dt>
                          <dd>{vnode.state.teacher.data.attributes.email}</dd>
                        </dl>
                        <div>
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