import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { DogListContainer, LinkStyle } from "./style";
import _ from "lodash";
import DogItem from "../../components/Item";

const DogList = ({ list }) => {
  const urlParams = _.last(useLocation().pathname.split("/"));

  const createList = () => {
    if (list) {
      const dogList = list.map((dog) => <DogItem key={dog._id} {...{ dog, urlParams }} />);
      return dogList;
    } else {
      return "List could not be loaded";
    }
  };

  return (
    <DogListContainer className="list-group list-group-flush">
      <DogItem dog={list[0]} {...{ urlParams }} />
    </DogListContainer>
  );
};
const mapStateToProps = (state) => {
  return {
    list: state.dog.list,
  };
};

export default connect(mapStateToProps)(DogList);
