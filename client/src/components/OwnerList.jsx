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
        <li key={i}>
          {owner.lastName}, {owner.firstName}
        </li>
      ))}
    </div>
  );
};

export default OwnerList;
