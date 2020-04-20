import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, withRouter, history } from "react-router-dom";
import { connect } from "react-redux";
import { getData, setUser } from "../../redux/actions";
import DogForm from "../../layouts/Form";
import DogList from "../../layouts/List";
import { GridContainer, DogsContainer } from "./style";
import _ from "lodash";
import Sidebar from "../../layouts/Sidebar";

const DogsPage = withRouter(({ getUser, getDogs, getAttendances, getActiveAttendances, getPasses, dogList, user, passList, attendanceList, activeAttendanceList }) => {
  const [selected, setSelected] = useState({});
  const contentLoaded = dogList && attendanceList && passList && activeAttendanceList;

  useEffect(() => {
    getUser();
    getDogs();
    getPasses();
    getAttendances();
    getActiveAttendances();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAttendances();
      getActiveAttendances();
    }, 60000);
    return () => clearInterval(interval);
  }, [user]);

  if (!user.loading) {
    if (user?.me?.roll === "admin" || user?.me?.roll === "staff") {
      if (contentLoaded) {
        return (
          <DogsContainer>
            <Switch>
              <Route path="/dogs/form/:type">
                <DogForm />
              </Route>
              <Route path="/dogs">
                <GridContainer>
                  <Route path="/dogs/show/:id">
                    <Sidebar />
                  </Route>
                  <DogList {...{ selected, setSelected }} />
                </GridContainer>
              </Route>
            </Switch>
          </DogsContainer>
        );
      } else return <div>Loading data...</div>;
    } else return <Redirect to="/home" />;
  } else return <div>Checking credentials...</div>;
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    dogList: state.dog.list,
    attendanceList: state.attendance.list,
    activeAttendanceList: state.attendance.active,
    passList: state.pass.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
<<<<<<< HEAD
    getUser: () => dispatch(getData("/user/show/me", "user")),
    getDogs: () => dispatch(getData("/dog/show/all", "dog")),
    getAttendances: () => dispatch(getData("/attendance/show/all", "attendance")),
=======
    getUser: () => dispatch(getData("/auth/show/me", "user", "me")),
    getDogs: () => dispatch(getData("/dog/show/all", "dog", "list")),
    getAttendances: () => dispatch(getData("/attendance/show/all", "attendance", "list")),
    getActiveAttendances: () => dispatch(getData(`/attendance/show/?confirmed=false`, "attendance", "active")),
    getPasses: () => dispatch(getData("pass/show/all", "pass", "list")),
>>>>>>> 3a38678c63fd2a514d6ad53182916cd79d259485
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogsPage);
