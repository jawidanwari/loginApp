import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "./services/httpServices";
import config from "./config.json";

class App1 extends Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    const { data: users } = await http.get(config.apiEndpoint);
    this.setState({ users });
  }

  handleAdd = async () => {
    const newUser = {
      name: "sharif",
      email: "sharifi1998@gmail.com",
      category: "male",
      tags: ["one", "two"],
    };
    const { data: user } = await http.post(config.apiEndpoint, newUser);

    const users = [user, ...this.state.users];
    this.setState({ users });
  };

  handleUpdate = async (user) => {
    user.name = "UPDATED";
    user.email = "new Email";
    await http.put(config.apiEndpoint + "/" + user._id, user);

    const users = [...this.state.users];
    const index = users.indexOf(user);
    users[index] = { ...user };

    this.setState({ users });
  };

  handleDelete = async (user) => {
    const originalUser = this.state.users;

    const users = this.state.users.filter((p) => p._id !== user._id);
    this.setState({ users });

    try {
      await http.delete(config.apiEndpoint + "/" + user._id);
    } catch (ex) {
      if (ex.response && ex.response === 404) {
        alert("this user no longer exist.");
      }
      this.setState({ originalUser });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <td>title</td>
              <td>Update</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handleUpdate(user)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App1;
