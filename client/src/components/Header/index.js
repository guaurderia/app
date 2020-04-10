import React from "react";
import { useRoutes, A } from "hookrouter";
import { routes } from "../../utils/routes";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getData } from "../../redux/actions";

const Header = ({ user, logout }) => {
  const routeResult = useRoutes(routes);
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <A className="navbar-brand" href="/">
          Guaurdería
        </A>
        <div className="navbar-nav">
          <A className="nav-item nav-link" href="/dogs">
            Perros
          </A>
        </div>
        <div className="navbar-nav">
          {!user && (
            <A className="nav-item nav-link" href="/login">
              Login
            </A>
          )}
        </div>
        <div className="navbar-nav">
          {user && (
            <A className="nav-item nav-link" href="/" onClick={logout}>
              Logout
            </A>
          )}
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({ user: state.user.data });
const mapDispatchToProps = (dispatch) => ({ logout: () => dispatch(getData("/auth/logout", "user")) });

export default connect(mapStateToProps, mapDispatchToProps)(Header);
