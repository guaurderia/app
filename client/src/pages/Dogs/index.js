import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getData, setData, getBreed } from "../../redux/actions";
import Navbar from "../../layouts/Navbar";
import DogList from "../../layouts/List";
import { GridContainer, DogsContainer } from "./style";
import _ from "lodash";
import Sidebar from "../../layouts/Sidebar";
import FormDisplayContext from "../../layouts/Forms/context";
import Button from "@material-ui/core/Button";
import { Link, Backdrop } from "@material-ui/core";

const DogsPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const user = props.user;

  useEffect(() => {
    props.getUser();
    props.getUserList();
    props.getDogs();
    props.getPasses();
    props.getPassTypes();
    props.getBreeds();
    props.getAttendances();
    props.getActiveAttendances();
    props.setLanguage("es");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      props.getAttendances();
      props.getActiveAttendances();
      props.getPasses();
      props.getDogs();
    }, 60000);
    return () => clearInterval(interval);
  }, [user, isOpen, props.passList, props.attendanceList, props.dogList]);

  const handleFormOpen = (event) => {
    setAnchor(event.currentTarget);
    setIsOpen(true);
  };

  if (!user.loading) {
    if (user?.me?.roll === "admin" || user?.me?.roll === "staff") {
      return (
        <DogsContainer>
          <FormDisplayContext.Provider value={{ isOpen, setIsOpen, anchor, setAnchor }}>
            <Route path="/dogs">
              <Navbar />
              <GridContainer>
                <Link to="/dog/create">
                  <Button color="primary" link="/dogs/create" variant="contained" onClick={handleFormOpen}>
                    + Nuevo Cliente
                  </Button>
                </Link>
                <Route path="/dogs/show/:id">
                  <Sidebar />
                </Route>
                <DogList />
              </GridContainer>
            </Route>
          </FormDisplayContext.Provider>
        </DogsContainer>
      );
    } else return <Redirect to="/" />;
  } else return <div>Checking credentials...</div>;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    dogList: state.dog.list,
    attendanceList: state.attendance.list,
    activeAttendanceList: state.attendance.active,
    passList: state.pass.list,
    passTypeList: state.passType.list,
    breedList: state.breed.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getData("/auth/show/me", "user", "me")),
    getUserList: () => dispatch(getData("/user/show/all", "user", "list")),
    getDogs: () => dispatch(getData("/dog/show/all", "dog", "list")),
    getBreeds: () => dispatch(getBreed()),
    getAttendances: () => dispatch(getData("/attendance/show/all", "attendance", "list")),
    getActiveAttendances: () => dispatch(getData(`/attendance/show/active`, "attendance", "active")),
    getPasses: () => dispatch(getData("/pass/show/all", "pass", "list")),
    getPassTypes: () => dispatch(getData("/passtype/show/all", "passType", "list")),
    setLanguage: (language) => dispatch(setData("language", language, "set")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogsPage);
