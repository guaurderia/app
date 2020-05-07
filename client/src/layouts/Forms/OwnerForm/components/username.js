import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext, ErrorMessage } from "react-hook-form";
import { inputStyle, ErrorContainer } from "../../style";

const OwnerUsername = ({ userList }) => {
  const { watch, errors } = useFormContext();
  const username = watch("username");
  const existingUsernames = userList.map((user) => user.username);

  return (
    <>
      <FormLabel component="legend">Email</FormLabel>
      <ErrorContainer>
        <ErrorMessage {...{ errors }} name="username" />
      </ErrorContainer>
      <Controller as={TextField} type="email" name="username" defaultValue={username || ""} {...inputStyle} rules={{ required: "El email del dueño es obligatorio", validate: { exists: (value) => existingUsernames.indexOf(value) === -1 || "Este email ya está registrado" } }} />
    </>
  );
};

export default OwnerUsername;
