import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { getData } from "../../redux/actions";
import Logo from "../../theme/logo";
import { NavbarContainer } from "./style";

const Navbar = ({ user, logout }) => {
  return (
    <header>
      <NavbarContainer>
        <Link to="/">
          <Logo type="full" size="150px" />
        </Link>
        <div className="navbar-nav">
          {user && (
            <NavLink className="nav-item nav-link" to="/" onClick={logout}>
              Logout
            </NavLink>
          )}
        </div>
      </NavbarContainer>
    </header>
  );
};

const mapStateToProps = (state) => ({ user: state.user.me });
const mapDispatchToProps = (dispatch) => ({ logout: () => dispatch(getData("/auth/logout", "user", "me")) });

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
