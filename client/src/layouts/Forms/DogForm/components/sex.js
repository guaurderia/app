import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { Controller, useFormContext } from "react-hook-form";
import { selectedStyle } from "../../style";

const SexInput = () => {
  const { setValue, watch } = useFormContext();
  const sex = watch("sex");
  const handleSex = (selected) => (sex === selected ? selectedStyle : null);

  return (
    <>
      <FormLabel component="legend">¿Es macho o hembra?</FormLabel>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Controller as={Button} {...handleSex("male")} name="sex" onClick={() => setValue("sex", "male")}>
          Macho
        </Controller>
        <Controller as={Button} {...handleSex("female")} name="sex" onClick={() => setValue("sex", "female")}>
          Hembra
        </Controller>
      </ButtonGroup>
    </>
  );
};

export default SexInput;
