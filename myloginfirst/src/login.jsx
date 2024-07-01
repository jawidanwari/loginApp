import React, { Component } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Form from "./component/common/form";
import { login } from "./services/authService";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  // handleAdd = async () => {
  //   const newUser = {
  //     email: this.state.account.email,
  //     password: this.state.account.password,
  //   };
  //   const { data: user } = await http.post(config.apiEndpoint, newUser);

  //   const users = [user, ...this.state.users];
  //   this.setState({ users });
  // };

  doSubmit = async () => {
    const { data } = this.state;
    try {
      await login(data.username, data.password);
      window.location = "/home";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1 className="header">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
          <Link to="/signup">
            <button className="btn btn-primary">Signup</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
