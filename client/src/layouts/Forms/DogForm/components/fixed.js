import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { Controller, useFormContext } from "react-hook-form";
import { selectedStyle } from "../../style";

const FixedInput = () => {
  const { setValue, watch } = useFormContext();
  const sex = watch("sex");
  const fixed = watch("fixed");
  const handleToggle = (state) => (state ? selectedStyle : null);
  const castradoa = sex === "male" ? "castrado" : sex === "female" ? "castrada" : "castrad@";
  return (
    <>
      <FormLabel component="legend">¿Está {castradoa}?</FormLabel>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Controller as={Button} {...handleToggle(fixed)} name="fixed" onClick={() => setValue("fixed", true)} defaultValue={false}>
          Si
        </Controller>
        <Controller as={Button} {...handleToggle(!fixed)} name="fixed" onClick={() => setValue("fixed", false)} defaultValue={false}>
          No
        </Controller>
      </ButtonGroup>
    </>
  );
};

export default FixedInput;
