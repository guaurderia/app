import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext, ErrorMessage } from "react-hook-form";
import { inputStyle, Error } from "../../style";
import _ from "lodash";

const ChipInput = ({ dogList }) => {
  const { watch, errors } = useFormContext();
  const chip = watch("chip");
  const isAlreadyRegistered = (chip) => {
    const [registeredChip] = dogList.filter((dog) => dog.chip === chip);
    return !registeredChip || `Este chip ya está registado a nombre de ${registeredChip.name}`;
  };
  const isError = !_.isEmpty(errors?.chip);

  return (
    <>
      <FormLabel component="legend">¿Cual es el su numero de chip?</FormLabel>
      <Controller as={TextField} name="chip" defaultValue={chip || ""} {...inputStyle} rules={{ required: "Introduce un numbero de chip", validate: { exists: (value) => isAlreadyRegistered(value) } }} error={isError} />
      <ErrorMessage errors={errors} name="chip">
        {({ messages }) => messages && Object.entries(messages).map(([type, message]) => <Error key={type}>{message}</Error>)}
      </ErrorMessage>
    </>
  );
};

export default ChipInput;
