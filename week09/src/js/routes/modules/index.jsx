import mithril from 'mithril';

import Athena from '../../athena.jsx';
import AriaMenu from '../../components/aria-menu.jsx';
import api from '../../api';

export default class ModulesIndex {

    modules = null;

    oninit(vnode) {
        mithril.request({
            method: 'GET',
            url: api.base + '/modules'
        }).then((data) => {
            this.modules = data;
        });
    }

    deleteModule(module) {
      mithril.request({
          method: 'DELETE',
          url: api.base + '/modules/' + module.id
      }).then(() => {
          mithril.request({
              method: 'GET',
              url: api.base + '/modules'
          }).then((data) => {
              this.modules = data;
          });
      })
    }

    view(vnode) {
        let modules = [];
        if(vnode.state.modules) {
            modules = vnode.state.modules.data.map((module) => {
                let key = 'module-' + module.id;
                let path = '/modules/' + module.id;
                return (
                    <tr key={key}>
                      <td><a href={path} oncreate={mithril.route.link}>{module.attributes.code}</a></td>
                      <td><a href={path} oncreate={mithril.route.link}>{module.attributes.name}</a></td>
                      <td>
                        <nav>
                          <ul role="menu" class="horizontal" aria-label="Sections">
                            <li><a href="" role="menuitem" aria-label="Dates" title="Dates" class="mdi mdi-calendar-clock" tabindex="0"></a></li>
                            <li><a href="" role="menuitem" aria-label="Documents" title="Documents" class="mdi mdi-file-document-box-multiple-outline" tabindex="-1"></a></li>
                            <li><a href="" role="menuitem" aria-label="Exercises" title="Exercises" class="mdi mdi-test-tube" tabindex="-1"></a></li>
                            <li><a href="" role="menuitem" aria-label="Teilnehmerinnen" title="Teilnehmer_innen" class="mdi mdi-account-multiple" tabindex="-1"></a></li>
                          </ul>
                        </nav>
                      </td>
                      <td>
                        <nav>
                          <ul role="menu" class="horizontal" aria-label="Actions">
                            <li><a role="menuitem" aria-label="Leave" title="Leave" class="mdi mdi-delete warning" tabindex="0" onclick={(ev) => {this.deleteModule(module)}}></a></li>
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
                <h1 class="cell">My Modules</h1>
              </div>
              <div class="grid-x grid-padding-x">
                <div class="cell small-12 medium-3 large-shrink">
                  <AriaMenu orientation="vertical">
                    <li><a role="menuitem">Current Seemster</a></li>
                    <li><a role="menuitem">Last Seemster</a></li>
                    <li role="separator"></li>
                    <li><a href="" tabindex="-1" role="menuitem">Enroll in Module</a></li>
                    <li><a href="/modules/new" role="menuitem" tabindex="-1" oncreate={mithril.route.link}>Create Module</a></li>
                  </AriaMenu>
                </div>
                <section class="cell small-12 medium-9 large-auto">
                  <table>
                   <thead>
                      <tr>
                       <th>Code</th>
                        <th>Name</th>
                        <th>Sections</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modules}
                    </tbody>
                  </table>
                </section>
              </div>
            </Athena>
        )
    }
}