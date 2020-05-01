import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../style";

const OwnerLastName = () => {
  const { watch } = useFormContext();
  const lastName = watch("lastName");

  return (
    <>
      <FormLabel component="legend">Apellidos</FormLabel>
      <Controller as={TextField} name="lastName" defaultValue={lastName || ""} {...inputStyle} />
    </>
  );
};

export default OwnerLastName;
