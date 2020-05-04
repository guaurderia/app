import React, { createRef } from "react";
import { useStyles } from "./style";
import { getData } from "../../redux/actions";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import PetsIcon from "@material-ui/icons/Pets";
import MoreIcon from "@material-ui/icons/MoreVert";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FormLayout from "../Forms";
import logo from "../../../public/img/logo-full.jpg";
import { Grid } from "@material-ui/core";
import { useFormDisplaySetter, useFormAnchorSetter } from "../Forms/context";
import { connect } from "react-redux";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Navbar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const setIsOpen = useFormDisplaySetter();
  const setFormAnchor = useFormAnchorSetter();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleFormOpen = (event) => {
    setFormAnchor(event.currentTarget);
    setIsOpen(true);
  };

  const handleLogout = () => {
    props.logout();
    window.location.reload(true);
  };

  const formPopover = <FormLayout {...{ anchorEl }} isOpen={isMenuOpen} />;
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: "top", horizontal: "right" }} id={menuId} keepMounted transformOrigin={{ vertical: "top", horizontal: "right" }} open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem onClick={handleLogout}>Salir</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: "top", horizontal: "right" }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: "top", horizontal: "right" }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem onClick={handleLogout}>
        <IconButton aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Salir</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <Grid container>
        <ElevationScroll {...props}>
          <AppBar position="fixed" color="inherit">
            <Toolbar className={classes.toolbar}>
              <Grid item xs={3}>
                <Typography className={classes.title} variant="h6" noWrap>
                  <img src={logo} style={{ width: "120px", marginBottom: "16px" }} />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Grid>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      </Grid>
      {renderMobileMenu}
      {renderMenu}
      {formPopover}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(getData("/auth/logout", "logout", "me")),
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
