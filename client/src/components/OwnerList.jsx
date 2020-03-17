import React, { useState } from "react";

const OwnerList = () => {
  const getOwners = [
    { firstName: "Román", lastName: "Méndez" },
    { firstName: "Alicia", lastName: "Doblas" }
  ];
  const [owners, setOwners] = useState(getOwners);
  console.log(owners);
  const addOwner = () => {
    setOwners([...owners, { firstName: "name", lastName: "lastname" }]);
  };

  return (
    <div className="owner-list">
      {owners.map((owner, i) => (
        <li key={i} className="list-group-item">
          {owner.lastName}, {owner.firstName}
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

export default OwnerList;
