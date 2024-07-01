import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import Home from "./component/home";
import "./App.css";
import Signup from "./component/signup";
import jwtDecode from "jwt-decode";
import Nav from "./component/nav";
import Logout from "./component/logout";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (error) {}
  }

  render() {
    return (
      <div className="App">
        <>
          <Nav user={this.state.user} />
          <Routes>
            <Route className="nav-item" path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </>
      </div>
    );
  }
}

export default App;
