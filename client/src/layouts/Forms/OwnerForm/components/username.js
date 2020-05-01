import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../style";

const OwnerUsername = () => {
  const { watch } = useFormContext();
  const username = watch("username");

  return (
    <>
      <FormLabel component="legend">Email</FormLabel>
      <Controller as={TextField} type="email" name="username" defaultValue={username || ""} {...inputStyle} />
    </>
  );
};

export default OwnerUsername;
