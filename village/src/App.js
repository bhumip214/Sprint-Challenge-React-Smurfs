import React, { Component } from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      smurf: {
        name: "",
        age: "",
        height: ""
      }
    };
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteSmurf = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(resp => {
        this.setState({ smurfs: resp.data });
      })
      .catch(err => console.log(err));
  };

  handleAddSmurf = smurfs => {
    this.setState({ smurfs: smurfs });
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Smurf Village</h1>
          <div className="nav-links">
            <NavLink
              exact
              to="/"
              activeClassName="active-link"
              className="link-home"
            >
              Smurf
            </NavLink>
            <NavLink
              to="/smurf-form"
              activeClassName="active-link"
              className="link-smurfForm"
            >
              Add Smurf
            </NavLink>
          </div>
        </div>

        <Route
          exact
          path="/smurf-form"
          render={props => (
            <SmurfForm {...props} handleAddSmurf={this.handleAddSmurf} />
          )}
        />
        <Route
          exact
          path="/"
          render={props => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
