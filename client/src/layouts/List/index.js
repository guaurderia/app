import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import { Link, useParams, useLocation } from "react-router-dom";
import { DogListContainer } from "./style";
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

  return <DogListContainer>{createList()}</DogListContainer>;
};
const mapStateToProps = (state) => {
  return {
    list: state.dog.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getActiveAttendance: () => dispatch(getData(`/attendance/show/?confirmed=false`, "attendance", "active")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogList);
