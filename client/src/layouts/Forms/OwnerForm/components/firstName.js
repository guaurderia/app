import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../style";

const OwnerFirstName = () => {
  const { watch } = useFormContext();
  const firstName = watch("firstName");

  return (
    <>
      <FormLabel component="legend">Nombre</FormLabel>
      <Controller as={TextField} name="firstName" defaultValue={firstName || ""} {...inputStyle} />
    </>
  );
};

export default OwnerFirstName;
