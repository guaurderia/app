import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import DogForm from "../../components/DogForm";
import DogList from "../../components/DogList";
import Grid from "../../layouts/Grid";
import DogContainer from "./style";
import DogCard from "../../components/DogCard";

const DogsPage = ({ user, loading, getUser }) => {
  const [selected, setSelected] = useState({});
  useEffect(() => {
    getUser();
  }, []);

  console.log("SELECTED", selected);

  if (!user) {
    if (loading) return <div>Loading...</div>;
    else return <div>This page is restricted</div>;
  } else {
    return (
      <DogContainer>
        <Grid>
          <DogList {...{ selected, setSelected }} />
          <Switch>
            <Route path="/dogs/show/:id" render={() => <DogCard {...{ selected }} />} />
            <Route path="/dogs/edit/:id" render={() => <DogForm {...{ selected }} />} />
            <Route path="/dogs/create" component={DogForm} />
          </Switch>
        </Grid>
      </DogContainer>
    );
  }
};

const mapStateToProps = (state) => {
  return { user: state.user.data, loading: state.user.loading };
};

const mapDispatchToProps = (dispatch) => {
  return { getUser: () => dispatch(getData("/user/show/me", "user")) };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogsPage);
