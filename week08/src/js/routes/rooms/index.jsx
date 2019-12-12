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
      this.props.dispatch(readEndpoint('rooms'));
    }

    deleteRoom(room, ev) {
      ev.preventDefault();
      this.props.dispatch(deleteResource(room));
    }

    /**
     * Render the component
     */
    render() {
        let rooms = [];
        if(this.props.rooms) {
            rooms = this.props.rooms.data.map((room) => {
                let key = 'room-' + room.id;
                let path = '/rooms/' + room.id;
                return (
                    <tr key={key}>
                      <td><Link to={path}>{room.attributes.name}</Link></td>
                      <td><Link to={path}>{room.attributes.address}</Link></td>
                      <td><Link to={path}>{room.attributes.capacity}</Link></td>
                      <td><Link to={path}>{room.attributes.features}</Link></td>
                      <td>
                        <nav>
                          <ul role="menu" className="horizontal" aria-label="Actions">
                          <li><a role="menuitem" aria-label="Leave" title="Leave" className="mdi mdi-delete warning" tabIndex="0" onClick={this.deleteRoom.bind(this, room)}></a></li>
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
                <h1 className="cell">My Rooms</h1>
              </div>
              <div className="grid-x grid-padding-x">
                <div className="cell small-12 medium-3 large-shrink">
                  <AriaMenu orientation="vertical">
                    <li><Link to="/rooms/new" role="menuitem" tabIndex="-1">Create Room</Link></li>
                  </AriaMenu>
                </div>
                <section className="cell small-12 medium-9 large-auto">
                  <table>
                   <thead>
                      <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Capacity</th>
                        <th>Features</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms}
                    </tbody>
                  </table>
                </section>
              </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    if (state.api && state.api.rooms) {
        return {
            rooms: state.api.rooms
        }
    } else {
        return {
            rooms: {
                data: []
            }
        };
    }
}

export default connect(mapStateToProps)(Index);