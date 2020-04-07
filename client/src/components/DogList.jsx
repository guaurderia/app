import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getData } from "../redux/actions";

const DogList = ({ getList, list, user }) => {
  useEffect(() => {
    getList();
    console.log("USER", user);
  }, []);
  return (
    <div className="owner-list">
      {list &&
        list.map((dog, i) => (
          <li key={i} className="list-group-item">
            {dog.name} {dog.bread} {dog.sex} {dog.character}
          </li>
        ))}
      <div className="container">
        <div className="row justify-content-md-center">
          <button className="btn btn-primary col col-lg-2" style={{ margin: "20px 0" }}>
            Añadir Dueño
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.dog.data,
    user: state.user.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getList: () => dispatch(getData("/dog/show/all", "dog")),
    getUser: () => dispatch(getData("/auth/login", "user")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogList);
