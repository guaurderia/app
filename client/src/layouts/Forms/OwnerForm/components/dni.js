import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext, ErrorMessage } from "react-hook-form";
import { inputStyle, Error } from "../../style";
import _ from "lodash";

const OwnerDni = () => {
  const { watch, errors } = useFormContext();
  const dni = watch("dni");
  const isError = !_.isEmpty(errors?.dni);
  const requiredMessage = "Introduce un numero de DNI";

  return (
    <>
      <FormLabel component="legend">DNI</FormLabel>
      <Controller as={TextField} type="text" name="dni" defaultValue={dni || ""} {...inputStyle} rules={{ required: requiredMessage }} error={isError} />
      <ErrorMessage {...{ errors }} name="dni" as={Error} />
    </>
  );
};

export default OwnerDni;
