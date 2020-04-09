import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDog } from "../../pages/Dogs/context";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import { Link } from "react-router-dom";
import { DogListContainer } from "./style";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const DogList = ({ getList, list, selected, setSelected }) => {
  const classes = useStyles();

  useEffect(() => {
    getList();
  }, []);

  const handleListItemClick = (dog) => {
    setSelected(dog);
  };
  const createList = () => {
    if (list) {
      const dogList = list.map((dog) => {
        const active = () => (selected === dog ? "active" : "");
        return (
          <Link className={`list-group-item ${active()}`} key={dog._id} onClick={(e) => handleListItemClick(dog)} to={`/dogs/show/${dog._id}`}>
            {dog.name} {dog.bread} {dog.sex} {dog.character}
          </Link>
        );
      });
      console.log("LIST", dogList);
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

const mapDispatchToProps = (dispatch) => {
  return {
    getList: () => dispatch(getData("/dog/show/all", "dog")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogList);
