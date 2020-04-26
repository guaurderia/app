import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
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
