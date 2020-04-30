import React from "./node_modules/react";
import FormLabel from "./node_modules/@material-ui/core/FormLabel";
import TextField from "./node_modules/@material-ui/core/TextField";
import { Controller, useFormContext } from "./node_modules/react-hook-form";
import { inputStyle } from "../../style";

const ChipInput = () => {
  return (
    <>
      <FormLabel component="legend">¿Cual es el su numero de chip?</FormLabel>
      <Controller as={TextField} name="chip" defaultValue="" {...inputStyle} />
    </>
  );
};

export default ChipInput;
