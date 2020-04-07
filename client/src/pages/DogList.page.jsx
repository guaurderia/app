import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getData } from "../redux/actions";
import DogForm from "../components/DogForm";
import { createDog } from "../../lib/user.api";
import { withRouter } from "react-router-dom";
import DogList from "../components/DogList";

const DogListPage = withRouter(({ history, user, loading, getUser }) => {
  const [error, setError] = useState();
  useEffect(() => {
    getUser();
  }, []);

  const handleNewDog = async (name, bread, sex, vaccines, fixed, heat, chip, character, user, pass) => {
    // Handle errors
    try {
      // CLIENT VALIDATION LOGIC
      if (name == "" || chip == "") {
        throw new Error("Opps! Por lo menos necesitamos nombre y chip.");
      }
      const dog = await createDog(name, bread, sex, vaccines, fixed, heat, chip, character, user, pass);
      //history.push("/dog/list");
      history.push("/dog/create");
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };
  if (!user) {
    if (loading) return <div>Loading...</div>;
    else return <div>This page is restricted</div>;
  } else {
    return (
      <div>
        <DogList />
        <h2 align="center">Create new dog</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <DogForm {...{ handleNewDog }} />
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return { user: state.user.data, loading: state.user.loading };
};

const mapDispatchToProps = (dispatch) => {
  return { getUser: () => dispatch(getData("/user/show/me", "user")) };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogListPage);
