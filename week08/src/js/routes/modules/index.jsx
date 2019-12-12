import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { readEndpoint, deleteResource } from 'redux-json-api';

import AriaMenu from '../../components/aria-menu.jsx';

class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
      this.props.dispatch(readEndpoint('modules'));
    }

    deleteModule(module, ev) {
      ev.preventDefault();
      this.props.dispatch(deleteResource(module));
    }

    /**
     * Render the component
     */
    render() {
        let modules = [];
        if(this.props.modules) {
            modules = this.props.modules.data.map((module) => {
                let key = 'module-' + module.id;
                let path = '/modules/' + module.id;
                return (
                    <tr key={key}>
                      <td><Link to={path}>{module.attributes.code}</Link></td>
                      <td><Link to={path}>{module.attributes.name}</Link></td>
                      <td>
                        <nav>
                          <ul role="menu" className="horizontal" aria-label="Sections">
                            <li><a href="" role="menuitem" aria-label="Dates" title="Dates" className="mdi mdi-calendar-clock" tabIndex="0"></a></li>
                            <li><a href="" role="menuitem" aria-label="Documents" title="Documents" className="mdi mdi-file-document-box-multiple-outline" tabIndex="-1"></a></li>
                            <li><a href="" role="menuitem" aria-label="Exercises" title="Exercises" className="mdi mdi-test-tube" tabIndex="-1"></a></li>
                            <li><a href="" role="menuitem" aria-label="Teilnehmerinnen" title="Teilnehmer_innen" className="mdi mdi-account-multiple" tabIndex="-1"></a></li>
                          </ul>
                        </nav>
                      </td>
                      <td>
                        <nav>
                          <ul role="menu" className="horizontal" aria-label="Actions">
                          <li><a role="menuitem" aria-label="Leave" title="Leave" className="mdi mdi-delete warning" tabIndex="0" onClick={this.deleteModule.bind(this, module)}></a></li>
                          </ul>
                        </nav>
                      </td>
                    </tr>
                )
            });
        }
        return (
            <div>
              <div className="grid-x grid-padding-x">
                <h1 className="cell">My Modules</h1>
              </div>
              <div className="grid-x grid-padding-x">
                <div className="cell small-12 medium-3 large-shrink">
                  <AriaMenu orientation="vertical">
                    <li><a role="menuitem">Current Seemster</a></li>
                    <li><a role="menuitem">Last Seemster</a></li>
                    <li role="separator"></li>
                    <li><a href="" tabIndex="-1" role="menuitem">Enroll in Module</a></li>
                    <li><Link to="/modules/new" role="menuitem" tabIndex="-1">Create Module</Link></li>
                  </AriaMenu>
                </div>
                <section className="cell small-12 medium-9 large-auto">
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    if (state.api && state.api.modules) {
        return {
            modules: state.api.modules
        }
    } else {
        return {
            modules: {
                data: []
            }
        };
    }
}

export default connect(mapStateToProps)(Index);