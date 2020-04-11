import React, { useState, useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import DogForm from "../../layouts/Form";
import DogList from "../../layouts/List";
import { GridContainer, DogsContainer } from "./style";
import DogCard from "../../components/Card";
import _ from "lodash";

const DogsPage = ({ user, loading, getUser, getList }) => {
  const [selected, setSelected] = useState({});

  useEffect(() => {
    getUser();
    getList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
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
                <DogCard />
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
  return { getUser: () => dispatch(getData("/user/show/me", "user")), getList: () => dispatch(getData("/dog/show/all", "dog")) };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogsPage);
