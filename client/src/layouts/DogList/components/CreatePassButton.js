import React from "react";
import { createDayPass } from "../../../services/Logic/Pass";

const CreatePassButton = ({ dog, attendance }) => {
  const handlePassCreation = () => {
    createDayPass(dog, attendance);
  };

  return <button onClick={handlePassCreation}>+ DIA</button>;
};

export default CreatePassButton;
