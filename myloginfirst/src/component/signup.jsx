import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../component/common/form";
import { Link } from "react-router-dom";
import * as userService from "../services/userServices";
import auth from "../services/authService";

class Signup extends Form {
  state = {
    data: { username: "", password: "", repassword: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    repassword: Joi.string().required().min(5).label("Re-Enter-Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;

      if (data.password !== data.repassword) {
        return alert("password is not matching.");
      }

      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
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
        <div className="form-group">
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("repassword", "Re- Enter-Password", "password")}
            {this.renderButton("Register")}
            <Link to="/">
              <button className="btn btn-primary">Login</button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
