import React from 'react';
import { connect } from 'react-redux';
import { createResource } from 'redux-json-api';
import { Link, Redirect } from "react-router-dom";

class New extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            capacity: '',
            features: ''
        }
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

    createRoom = (ev) => {
        ev.preventDefault();
        let component = this;
        this.props.dispatch(createResource({
            type: 'rooms',
            attributes: {
                name: this.state.name,
                address: this.state.address,
                capacity: this.state.capacity,
                features: this.state.features
            }
        })).then((data) => {
            component.setState({
                created: true
            });
        });
    }

    /**
     * Render the component
     */
    render() {
        if(this.state.created) {
            return (
                <Redirect to="/rooms"/>
            )
        } else {
            return (
                <div>
                <div className="grid-x grid-padding-x">
                  <h1 className="cell">Create new Room</h1>
                </div>
                  <form className="grid-x grid-padding-x" onSubmit={this.createRoom}>
                    <div className="cell large-4">
                      <label>Name
                        <input type="text" onChange={this.setName}/>
                      </label>
                      <label>Address
                        <input type="text" onChange={this.setAddress}/>
                      </label>
                      <label>Capacity
                        <input type="text" onChange={this.setCapacity}/>
                      </label>
                      <label>Features
                        <input type="text" onChange={this.setFeatures}/>
                      </label>
                      <div className="text-right">
                        <Link to="/rooms" className="secondary button">Don't Create</Link>
                        <button className="button">Create</button>
                      </div>
                    </div>
                  </form>
                </div>
            )
        }
    }
}

export default connect()(New);