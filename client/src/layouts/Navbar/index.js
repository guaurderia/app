import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { getData } from "../../redux/actions";

const Navbar = ({ user, logout }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <NavLink className="navbar-brand" to="/">
          Guaurdería
        </NavLink>
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/dogs">
            Perros
          </NavLink>
        </div>
        <div className="navbar-nav">
          {!user && (
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
          )}
        </div>
        <div className="navbar-nav">
          {user && (
            <NavLink className="nav-item nav-link" to="/" onClick={logout}>
              Logout
            </NavLink>
          )}
        </div>
        <button variant="contained">
          <Link to="/dogs/form/create">Nuevo</Link>
        </button>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({ user: state.user.me });
const mapDispatchToProps = (dispatch) => ({ logout: () => dispatch(getData("/auth/logout", "user")) });

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
