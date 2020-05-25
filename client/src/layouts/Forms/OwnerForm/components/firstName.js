import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext, ErrorMessage } from "react-hook-form";
import { inputStyle, Error } from "../../style";
import _ from "lodash";

const OwnerFirstName = () => {
  const { watch, errors } = useFormContext();
  const firstName = watch("firstName");
  const isError = !_.isEmpty(errors?.firstName);
  const requiredMessage = "Introduce un nombre";

  return (
    <>
      <FormLabel component="legend">Nombre</FormLabel>
      <Controller as={TextField} name="firstName" defaultValue={firstName || ""} {...inputStyle} rules={{ required: requiredMessage }} error={isError} />
      <ErrorMessage {...{ errors }} name="firstName" as={Error} />
    </>
  );
};

export default OwnerFirstName;
