import mithril from 'mithril';

import AriaMenu from './components/aria-menu.jsx';
import '../styles/app.scss';

export default class Athena {
    view(vnode) {
        return (
            <div>
              <header class="top-bar">
                <div class="top-bar-left">
                  <AriaMenu label="Main" class="horizontal">
                    <li class="menu-text">Athena - Study Portal</li>
                    <li><a href="/modules" role="menuitem" tabindex="0" oncreate={mithril.route.link}>My Modules</a></li>
                    <li><a href="" role="menuitem" tabindex="-1">My Exams</a></li>
                  </AriaMenu>
                </div>
                <div class="top-bar-right">
                  <AriaMenu label="User" class="horizontal">
                    <li><a role="menuitem" tabindex="0">Login</a></li>
                    <li><a href="login.html" role="menuitem" tabindex="-1">Logout</a></li>
                  </AriaMenu>
                </div>
              </header>
              <div class="grid-container">
                {vnode.children}
              </div>
              <footer>
                &copy; 2018 - Mark Hall (<a href="mailto:mark.hall@informatik.uni-halle.de" tabindex="0">mark.hall@informatik.uni-halle.de</a>)
              </footer>
            </div>
        );
    }
}
