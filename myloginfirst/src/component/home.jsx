import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { NavLink } from "react-router-dom";

class Home extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      const name = user.name;
      this.setState({ name });
    } catch (error) {}
  }

  render() {
    return <h1>Welcome Home {this.state.name}</h1>;
  }
}

export default Home;
