import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Provider } from "react-redux";

import AriaMenu from './components/aria-menu.jsx';
import Login from './routes/login.jsx';
import Modules from './routes/modules.jsx';
import store from './store.jsx';

import '../styles/app.scss';

export class Athena extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginValid: true
    }
  }

  updateEmail = (ev) => {
    this.setState({
      email: ev.target.value
    });
  }

  updatePassword = (ev) => {
    this.setState({
      password: ev.target.value
    });
  }

  handleLogin = (ev) => {
    ev.preventDefault();
    if (this.state.email === 'test@example.com' && this.state.password === 'password') {
      this.setState({
        loginValid: true
      });
    } else {
      this.setState({
        loginValid: false
      });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <header className="top-bar">
              <div className="top-bar-left">
                <AriaMenu label="Main" class="horizontal">
                  <li className="menu-text">Athena - Study Portal</li>
                  <li><Link to="/modules" role="menuitem" tabIndex="0">My Modules</Link></li>
                  <li><a href="" role="menuitem" tabIndex="-1">My Exams</a></li>
                </AriaMenu>
              </div>
              <div className="top-bar-right">
                <AriaMenu label="User" class="horizontal">
                  <li><Link to="/login" role="menuitem" tabIndex="0">Login</Link></li>
                  <li><a href="login.html" role="menuitem" tabIndex="-1">Logout</a></li>
                </AriaMenu>
              </div>
            </header>
            <div className="grid-container">
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/modules" component={Modules} />
              </Switch>
            </div>
            <footer>
              &copy; 2018 - Mark Hall (<a href="mailto:mark.hall@informatik.uni-halle.de" tabIndex="0">mark.hall@informatik.uni-halle.de</a>)
            </footer>
          </div>
        </Router>
      </Provider>
    )
  }

}

export function install(attachmentPoint, options, callback) {
  ReactDOM.render(<Athena />, attachmentPoint);
}