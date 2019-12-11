import React from 'react';
import ReactDOM from 'react-dom';

import AriaMenu from './components/aria-menu.jsx';
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
    let errorTag = null;
    let errorLabel = null;
    let errorInput = null;
    if (!this.state.loginValid) {
      errorTag = (
        <span className="form-error is-visible">No user exists with the e-mail address {this.state.email} or the password is incorrect.</span>
      );
      errorLabel = 'is-invalid-label';
      errorInput = 'is-invalid-input';
    }
    return (
      <div>
        <header class="top-bar">
          <div class="top-bar-left">
            <AriaMenu label="Main" class="horizontal">
              <li className="menu-text">Athena - Study Portal</li>
              <li><a href="" role="menuitem" tabIndex="0" className="active">My Modules</a></li>
              <li><a href="" role="menuitem" tabIndex="-1">My Exams</a></li>
            </AriaMenu>
          </div>
          <div class="top-bar-right">
            <AriaMenu label="User" class="horizontal">
              <li><a href="profile.html" role="menuitem" tabIndex="0">Profile</a></li>
              <li><a href="login.html" role="menuitem" tabIndex="-1">Logout</a></li>
            </AriaMenu>
          </div>
        </header>

        <main className="grid-container-x small callout">
          <h1>Login</h1>
          <form action="index.html" onSubmit={this.handleLogin}>
            <div>
              <label className={errorLabel}>E-Mail Address
                <input type="email" name="email" placeholder="Your e-mail address" tabIndex="1" required="required" value={this.state.email} onChange={this.updateEmail} />
                {errorTag}
              </label>
            </div>
            <div>
              <label className={errorLabel}>Password
                <input type="password" name="password" placeholder="Your password" tabIndex="2" required="required" value={this.state.password} onChange={this.updatePassword} />
                {errorTag}
              </label>
            </div>
            <div className="text-right">
              <button tabIndex="3" class="button">Login</button>
            </div>
          </form>
        </main>
        <footer>
          &copy; 2018 - Mark Hall (<a href="mailto:mark.hall@informatik.uni-halle.de" tabIndex="0">mark.hall@informatik.uni-halle.de</a>)
            </footer>
      </div>
    )
  }

}

export function install(attachmentPoint, options, callback) {
  ReactDOM.render(<Athena />, attachmentPoint);
}