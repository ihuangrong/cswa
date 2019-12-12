import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import AriaMenu from './components/aria-menu.jsx';
import Calculator from './routes/calculator.jsx';

import '../styles/app.scss';

export class Athena extends React.Component {

  constructor(props) {
      super(props);
  }

  /**
   * Render the component
   */
  render() {
      return (
        <Router>
          <div>
            <header className="top-bar">
              <div className="top-bar-left">
                <AriaMenu label="Main" class="horizontal">
                  <li className="menu-text">Athena - Study Portal</li>
                  <li><a role="menuitem" tabIndex="0">My Modules</a></li>
                  <li><a href="" role="menuitem" tabIndex="-1">My Exams</a></li>
                  <li><Link to="/calculator" role="menuitem" tabIndex="0">Calculator</Link></li>
                </AriaMenu>
              </div>
              <div className="top-bar-right">
                <AriaMenu label="User" class="horizontal">
                  <li><a role="menuitem" tabIndex="0">Login</a></li>
                  <li><a href="login.html" role="menuitem" tabIndex="-1">Logout</a></li>
                </AriaMenu>
              </div>
            </header>
            <div className="grid-container">
              <Switch>
                <Route path="/calculator" component={Calculator} />
              </Switch>
            </div>
            <footer>
              &copy; 2018 - Mark Hall (<a href="mailto:mark.hall@informatik.uni-halle.de" tabIndex="0">mark.hall@informatik.uni-halle.de</a>)
            </footer>
          </div>
        </Router>
      )
  }
}

export function install(attachmentPoint, options, callback) {
  ReactDOM.render(<Athena/>, attachmentPoint);
}