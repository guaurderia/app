import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext, ErrorMessage } from "react-hook-form";
import { inputStyle, ErrorContainer } from "../../style";
import _ from "lodash";

const ChipInput = ({ dogList }) => {
  const { watch, errors } = useFormContext();
  const chip = watch("chip");
  const isAlreadyRegistered = (chip) => {
    const [registeredChip] = dogList.filter((dog) => dog.chip === chip);
    return !registeredChip || `Este chip ya está registado a ${registeredChip.name}`;
  };
  const isError = !_.isEmpty(errors?.chip);

  return (
    <>
      <FormLabel component="legend">¿Cual es el su numero de chip?</FormLabel>
      <ErrorContainer>
        <ErrorMessage {...{ errors }} name="chip" />
      </ErrorContainer>
      <Controller as={TextField} name="chip" defaultValue={chip || ""} {...inputStyle} rules={{ required: true, validate: { exists: (value) => isAlreadyRegistered(value) } }} error={isError} />
    </>
  );
};

export default ChipInput;
