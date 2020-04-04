import React, { useState } from "react";
import { DogForm } from "../components/DogForm";
import { createDog } from "../../lib/dogs.api";
import { withRouter } from "react-router-dom";
import DogList from "../components/DogList";

const DogListPage = withRouter(({ history }) => {
  const [error, setError] = useState();

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
});

export default DogListPage;
