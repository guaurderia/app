import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { DogListContainer, LinkStyle } from "./style";
import _ from "lodash";

const DogList = ({ list }) => {
  const id = _.last(useLocation().pathname.split("/"));
  console.log("PARAMS", location);

  const createList = () => {
    if (list) {
      const dogList = list.map((dog) => {
        const active = () => (id === dog._id ? "active" : "");
        return (
          <LinkStyle className={`list-group-item ${active()}`} key={dog._id} to={`/dogs/show/${dog._id}`}>
            {dog.name} {dog.bread} {dog.sex} {dog.character}
          </LinkStyle>
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
