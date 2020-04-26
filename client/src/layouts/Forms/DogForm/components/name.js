import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../style";

const DogNameInput = () => {
  const { watch } = useFormContext();
  const sex = watch("sex");
  const perroa = sex === "male" ? "perro" : sex === "female" ? "perra" : "perr@";

  return (
    <>
      <FormLabel component="legend">¿Como se llama tu {perroa}?</FormLabel>
      <Controller as={TextField} name="name" defaultValue="" {...inputStyle} />
    </>
  );
};

export default DogNameInput;
