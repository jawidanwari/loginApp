import React from "react";
import { Link, NavLink } from "react-router-dom";

const Nav = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="#">
        Anwari
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/home">
                Home
              </NavLink>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>

              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/">
                Login
              </NavLink>

              <NavLink className="nav-item nav-link" to="/signup">
                Signup
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
