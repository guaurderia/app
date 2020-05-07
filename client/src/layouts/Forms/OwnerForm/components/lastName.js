import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../style";
import _ from "lodash";

const OwnerLastName = () => {
  const { watch, errors } = useFormContext();
  const lastName = watch("lastName");
  const isError = !_.isEmpty(errors?.lastName);

  return (
    <>
      <FormLabel component="legend">Apellidos</FormLabel>
      <Controller as={TextField} name="lastName" defaultValue={lastName || ""} {...inputStyle} rules={{ required: true }} error={isError} />
    </>
  );
};

export default OwnerLastName;
