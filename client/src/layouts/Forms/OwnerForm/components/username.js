import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext, ErrorMessage } from "react-hook-form";
import { inputStyle, Error } from "../../style";
import _ from "lodash";

const OwnerUsername = ({ userList }) => {
  const { watch, errors } = useFormContext();
  const username = watch("username");
  const requiredMessage = "Introduce un email";
  const existsMessage = "Este email ya está registrado a nombre de";

  const isAlreadyRegistered = (username) => {
    const [registeredUser] = userList.filter((user) => user.username === username);
    return !registeredUser || `${existsMessage} ${registeredUser.firstName} ${registeredUser.lastName}`;
  };
  const isError = !_.isEmpty(errors?.username);

  return (
    <>
      <FormLabel component="legend">Email</FormLabel>
      <Controller as={TextField} type="email" name="username" defaultValue={username || ""} {...inputStyle} rules={{ required: requiredMessage, validate: { exists: (username) => isAlreadyRegistered(username) } }} error={isError} />
      <ErrorMessage errors={errors} name="username">
        {({ messages }) => messages && Object.entries(messages).map(([type, message]) => <Error key={type}>{message}</Error>)}
      </ErrorMessage>
    </>
  );
};

export default OwnerUsername;
