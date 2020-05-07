import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext, ErrorMessage } from "react-hook-form";
import { inputStyle, ErrorContainer } from "../../style";
import _ from "lodash";

const OwnerUsername = ({ userList }) => {
  const { watch, errors } = useFormContext();
  const username = watch("username");
  const isAlreadyRegistered = (username) => {
    const [registeredUser] = userList.filter((user) => user.username === username);
    return !registeredUser || `Este email ya está registado a ${registeredUser.firstName} ${registeredUser.lastName}`;
  };
  const isError = !_.isEmpty(errors?.username);

  return (
    <>
      <FormLabel component="legend">Email</FormLabel>
      <ErrorContainer>
        <ErrorMessage {...{ errors }} name="username" />
      </ErrorContainer>
      <Controller as={TextField} type="email" name="username" defaultValue={username || ""} {...inputStyle} rules={{ required: true, validate: { exists: (username) => isAlreadyRegistered(username) } }} error={isError} />
    </>
  );
};

export default OwnerUsername;
