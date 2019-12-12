import React from 'react';
import { connect } from 'react-redux';
import { readEndpoint, updateResource } from 'redux-json-api';
import { Link, Redirect } from "react-router-dom";

import AriaMenu from '../../components/aria-menu.jsx';

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            address: null,
            capacity: null,
            features: null
        }
    }

    componentWillMount() {
        this.props.dispatch(readEndpoint('rooms/' + this.props.match.params.rid)).then(function(state) {
        });
    }

    setName = (ev) => {
        this.setState({
            name: ev.target.value
        });
    }

    setAddress = (ev) => {
        this.setState({
            address: ev.target.value
        });
    }

    setCapacity = (ev) => {
        this.setState({
            capacity: ev.target.value
        });
    }

    setFeatures = (ev) => {
        this.setState({
            features: ev.target.value
        });
    }

    updateRoom = (ev) => {
        ev.preventDefault();
        let component = this;
        let room = this.props.rooms[this.props.match.params.rid];
        let name = this.state.name || room.attributes.name;
        let address = this.state.address || room.attributes.address;
        let capacity = this.state.capacity || room.attributes.capacity;
        let features = this.state.features || room.attributes.features;
        this.props.dispatch(updateResource({
            type: 'rooms',
            id: room.id,
            attributes: {
                name: name,
                address: address,
                capacity: capacity,
                features: features
            }
        })).then((data) => {
            component.setState({
                updated: true
            });
        });
    }

    /**
     * Render the component
     */
    render() {
        if(this.state.updated) {
            let path = '/rooms/' + this.props.match.params.rid;
            return (
                <Redirect to={path}/>
            )
        } else {
            if (this.props.rooms && this.props.rooms[this.props.match.params.rid]) {
                let room = this.props.rooms[this.props.match.params.rid];
                let name = this.state.name || room.attributes.name;
                let address = this.state.address || room.attributes.address;
                let capacity = this.state.capacity || room.attributes.capacity;
                let features = this.state.features || room.attributes.features;
                let abortPath = '/rooms/' + room.id;
                return (
                    <div>
                      <div className="grid-x grid-padding-x">
                        <h1 className="cell">Edit {room.attributes.name}</h1>
                      </div>
                      <form className="grid-x grid-padding-x" onSubmit={this.updateRoom}>
                        <div className="cell large-4">
                            <label>Name
                                <input type="text" value={name} onChange={this.setName}/>
                            </label>
                            <label>Address
                                <input type="text" value={address} onChange={this.setAddress}/>
                            </label>
                            <label>Capacity
                                <input type="text" value={capacity} onChange={this.setCapacity}/>
                            </label>
                            <label>Features
                                <input type="text" value={features} onChange={this.setFeatures}/>
                            </label>
                          <div className="text-right">
                            <Link to={abortPath} className="secondary button">Don't Update</Link>
                            <button className="button">Update</button>
                          </div>
                        </div>
                      </form>
                    </div>
                )
            } else {
                return (
                    <div>Loading...</div>
                )
            }
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

export default connect(mapStateToProps)(Edit);