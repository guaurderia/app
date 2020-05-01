import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../style";

const OwnerDni = () => {
  const { watch } = useFormContext();
  const dni = watch("dni");

  return (
    <>
      <FormLabel component="legend">DNI</FormLabel>
      <Controller as={TextField} type="text" name="dni" defaultValue={dni || ""} {...inputStyle} />
    </>
  );
};

export default OwnerDni;
