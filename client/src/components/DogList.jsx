import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const DogList = () => {
  const getDogs = [
    {
      name: "Leo",
      bread: "Cruze",
      sex: "female",
      vaccines: { rabies: true, parvovirus: true, hepatitis: true, distemper: true },
      fixed: true,
      chip: "KJHSDUNAw193487299",
      character: "Tímida",
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      pass: [{ type: Schema.Types.ObjectId, ref: "Pass" }]
    },
    {
      name: "Pepa",
      bread: "Galgo",
      sex: "female",
      vaccines: { rabies: true, parvovirus: true, hepatitis: true, distemper: true },
      fixed: true,
      chip: "KJHSDUNAw193487299",
      character: "Tímida",
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      pass: [{ type: Schema.Types.ObjectId, ref: "Pass" }]
    }
  ];
  const [dogList, setDogList] = useState(getDogs);
  const addDog = dog => {
    setDogList([...dogList, dog]);
  };

  return (
    <div className="owner-list">
      {dogList.map((dog, i) => (
        <li key={i} className="list-group-item">
          {dog.name} {dog.bread} {dog.sex} {dog.character}
        </li>
      ))}
      <div className="container">
        <div className="row justify-content-md-center">
          <button className="btn btn-primary col col-lg-2" style={{ margin: "20px 0" }} onClick={addOwner}>
            Añadir Dueño
          </button>
        </div>
      </div>
    </div>
  );
};

export default DogList;
