import React from "react";
import DogForm from "./DogForm";
import OwnerForm from "./OwnerForm";

const FormLayout = () => {
  console.log("FORM LAYOUT COMPONENT");
  return (
    <>
      <DogForm />
      <OwnerForm />
    </>
  );
};

export default FormLayout;
