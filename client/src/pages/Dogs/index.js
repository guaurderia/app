import React, { useState, useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import DogForm from "../../layouts/Form";
import DogList from "../../layouts/List";
import { GridContainer, DogsContainer } from "./style";
import _ from "lodash";
import Sidebar from "../../layouts/Sidebar";

const DogsPage = ({ user, loading, getUser, getDogs, getAttendances, list }) => {
  const [selected, setSelected] = useState({});

  useEffect(() => {
    getUser();
    getDogs();
    getAttendances();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (user && list) {
    return (
      <DogsContainer>
        <Switch>
          <Route path="/dogs/form/:type">
            <DogForm />
          </Route>
          <Route path="/dogs">
            <GridContainer>
              <DogList {...{ selected, setSelected }} />
              <Route path="/dogs/show/:id">
                <Sidebar />
              </Route>
            </GridContainer>
          </Route>
        </Switch>
      </DogsContainer>
    );
  } else return <div>This page is restricted</div>;
};

const mapStateToProps = (state) => {
  return { user: state.user.data, loading: state.user.loading, list: state.dog.data };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getData("/user/show/me", "user")),
    getDogs: () => dispatch(getData("/dog/show/all", "dog")),
    getAttendances: () => dispatch(getData("/attendance/show/all", "attendance")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogsPage);
