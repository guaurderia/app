import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext, ErrorMessage } from "react-hook-form";
import { inputStyle, ErrorContainer } from "../../style";

const ChipInput = ({ dogList }) => {
  const { watch, errors } = useFormContext();
  const chip = watch("chip");
  const existingChips = dogList.map((dog) => dog.chip);

  return (
    <>
      <FormLabel component="legend">¿Cual es el su numero de chip?</FormLabel>
      <ErrorContainer>
        <ErrorMessage {...{ errors }} name="chip" />
      </ErrorContainer>
      <Controller as={TextField} name="chip" defaultValue={chip || ""} {...inputStyle} rules={{ required: "Indica el número de chip", validate: { exists: (value) => existingChips.indexOf(value) === -1 || "Chip ya existe" } }} />
    </>
  );
};

export default ChipInput;
