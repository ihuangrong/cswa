import React from 'react';
import { connect } from 'react-redux';
import { readEndpoint } from 'redux-json-api';
import { Link } from "react-router-dom";

class View extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(readEndpoint('rooms/' + this.props.match.params.rid)).then(function(state) {
        });
    }

    /**
     * Render the component
     */
    render() {
        if (this.props.rooms && this.props.rooms[this.props.match.params.rid]) {
            let room = this.props.rooms[this.props.match.params.rid];
            let editPath = '/rooms/' + room.id + '/edit';
            return (
                <div>
                  <main className="grid-container">
                    <div className="grid-x grid-padding-x">
                      <div className="cell">
                        <h1>{room.attributes.name}</h1>
                        <dl>
                          <dt>Address</dt>
                          <dd>{room.attributes.address}</dd>
                          <dt>Capacity</dt>
                          <dd>{room.attributes.capacity}</dd>
                          <dt>Features</dt>
                          <dd>{room.attributes.features}</dd>
                        </dl>
                        <div>
                          <Link to="/rooms" className="secondary button">Return</Link>
                          <Link to={editPath} className="button">Edit</Link>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

function mapStateToProps(state) {
    let props = {
        rooms: null
    }
    if (state.api && state.api.rooms) {
        props.rooms = {};
        state.api.rooms.data.forEach((room) => {
            props.rooms[room.id] = room;
        });
    }
    return props;
}

export default connect(mapStateToProps)(View);