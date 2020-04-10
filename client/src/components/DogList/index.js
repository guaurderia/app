import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { DogListContainer } from "./style";
import _ from "lodash";

const DogList = ({ list, selected, setSelected }) => {
  const id = _.last(useLocation().pathname.split("/"));
  console.log("PARAMS", location);

  const handleListItemClick = (dog) => {
    setSelected(dog);
  };
  const createList = () => {
    if (list) {
      const dogList = list.map((dog) => {
        const active = () => (id === dog._id ? "active" : "");
        return (
          <Link className={`list-group-item ${active()}`} key={dog._id} onClick={(e) => handleListItemClick(dog)} to={`/dogs/show/${dog._id}`}>
            {dog.name} {dog.bread} {dog.sex} {dog.character}
          </Link>
        );
      });
      return dogList;
    } else {
      return "List could not be loaded";
    }
  };

  return <DogListContainer className="list-group list-group-flush">{createList()}</DogListContainer>;
};
const mapStateToProps = (state) => {
  return {
    list: state.dog.data,
  };
};

export default connect(mapStateToProps)(DogList);
