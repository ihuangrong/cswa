import mithril from 'mithril';

import Athena from '../../athena.jsx';
import api from '../../api.js';

export default class New {

    code = '';
    name = '';
    semester = 'WS18/19';

    setCode(ev) {
        this.code = ev.target.value;
    }

    setName(ev) {
        this.name = ev.target.value;
    }

    setSemester(ev) {
        this.semester = ev.target.value;
    }

    createModule(ev) {
        ev.preventDefault();
        mithril.request({
            method: 'POST',
            url: api.base + '/modules',
            data: {
                data: {
                    type: 'modules',
                    attributes: {
                        code: this.code,
                        name: this.name,
                        semester: this.semester
                    },
                    relationships: {
                      teacher: {
                        data: {
                          type: 'users',
                            id: 1
                          }
                      }
                    }
                }
            }
        }).then((data) => {
            mithril.route.set('/modules')
        });
    }

    /**
     * Render the component
     */
    view(vnode) {
        return (
            <Athena>
              <div className="grid-x grid-padding-x">
                <h1 className="cell">Create new Module</h1>
              </div>
              <form className="grid-x grid-padding-x" onsubmit={(ev) => {this.createModule(ev)}}>
                <div className="cell large-4">
                  <label>Code
                    <input type="text" onchange={(ev) => {this.setCode(ev)}}/>
                  </label>
                  <label>Name
                    <input type="text" onchange={(ev) => {this.setName(ev)}}/>
                  </label>
                  <label>Semester
                    <select onchange={(ev) => {this.setSemester(ev)}}>
                      <option value="WS18/19">Wintersemester 18/19</option>
                      <option value="SS18">Summersemester 18</option>
                    </select>
                  </label>
                  <div className="text-right">
                    <a href="/modules" className="secondary button" oncreate={mithril.route.link}>Don't Create</a>
                    <button className="button">Create</button>
                  </div>
                </div>
              </form>
            </Athena>
        )
    }
}