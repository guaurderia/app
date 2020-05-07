import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../style";
import _ from "lodash";

const OwnerDni = () => {
  const { watch, errors } = useFormContext();
  const dni = watch("dni");
  const isError = !_.isEmpty(errors?.dni);

  return (
    <>
      <FormLabel component="legend">DNI</FormLabel>
      <Controller as={TextField} type="text" name="dni" defaultValue={dni || ""} {...inputStyle} rules={{ required: true }} error={isError} />
    </>
  );
};

export default OwnerDni;
