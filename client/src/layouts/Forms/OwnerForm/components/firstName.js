import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../style";

const OwnerFirstName = () => {
  const { watch } = useFormContext();

  return (
    <>
      <FormLabel component="legend">Nombre del propietario</FormLabel>
      <Controller as={TextField} name="firstName" defaultValue="" {...inputStyle} />
    </>
  );
};

export default OwnerFirstName;
