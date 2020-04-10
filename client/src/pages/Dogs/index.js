import React, { useState, useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import DogForm from "../../components/DogForm";
import DogList from "../../components/DogList";
import Grid from "../../layouts/Grid";
import DogContainer from "./style";
import DogCard from "../../components/DogCard";
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
      <DogContainer>
        <Grid>
          <DogList {...{ selected, setSelected }} />
          <Switch>
            <Route path="/dogs/show/:id" render={() => <DogCard />} />
            <Route path="/dogs/edit/:id" render={() => <DogForm {...{ selected }} />} />
          </Switch>
        </Grid>
      </DogContainer>
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
