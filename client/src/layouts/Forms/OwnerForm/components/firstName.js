import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../style";
import _ from "lodash";

const OwnerFirstName = () => {
  const { watch, errors } = useFormContext();
  const firstName = watch("firstName");
  const isError = !_.isEmpty(errors?.firstName);

  return (
    <>
      <FormLabel component="legend">Nombre</FormLabel>
      <Controller as={TextField} name="firstName" defaultValue={firstName || ""} {...inputStyle} rules={{ required: true }} error={isError} />
    </>
  );
};

export default OwnerFirstName;
