import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../style";
import _ from "lodash";

const DogNameInput = () => {
  const { getValues, errors } = useFormContext();
  const { sex, name } = getValues();
  const isError = !_.isEmpty(errors?.name);
  const perroa = sex === "male" ? "perro" : sex === "female" ? "perra" : "perr@";

  return (
    <>
      <FormLabel component="legend">¿Como se llama tu {perroa}?</FormLabel>
      <Controller as={TextField} name="name" defaultValue={name || ""} {...inputStyle} rules={{ required: true }} error={isError} />
    </>
  );
};

export default DogNameInput;
