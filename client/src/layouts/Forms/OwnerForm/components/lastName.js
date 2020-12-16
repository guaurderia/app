import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext, ErrorMessage } from "react-hook-form";
import { inputStyle, Error } from "../../style";
import _ from "lodash";

const OwnerLastName = () => {
  const { watch, errors } = useFormContext();
  const lastName = watch("lastName");
  const isError = !_.isEmpty(errors?.lastName);
  const requiredMessage = "Introduce los apellidos";

  return (
    <>
      <FormLabel component="legend">Apellidos</FormLabel>
      <Controller as={TextField} name="lastName" defaultValue={lastName || ""} {...inputStyle} rules={{ required: requiredMessage }} error={isError} />
      <ErrorMessage {...{ errors }} name="lastName" as={Error} />
    </>
  );
};

export default OwnerLastName;
