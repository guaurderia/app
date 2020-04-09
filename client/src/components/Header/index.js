import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getData } from "../../redux/actions";

const Header = ({ user, logout }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">
          Guaurdería
        </Link>
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to="/dogs">
            Perros
          </Link>
        </div>
        <div className="navbar-nav">
          {!user && (
            <Link className="nav-item nav-link" to="/login">
              Login
            </Link>
          )}
        </div>
        <div className="navbar-nav">
          {user && (
            <Link className="nav-item nav-link" to="/" onClick={logout}>
              Logout
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({ user: state.user.data });
const mapDispatchToProps = (dispatch) => ({ logout: () => dispatch(getData("/auth/logout", "user")) });

export default connect(mapStateToProps, mapDispatchToProps)(Header);
