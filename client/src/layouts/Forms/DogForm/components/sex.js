import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { Controller, useFormContext } from "react-hook-form";
import { selectedStyle } from "../../style";
import _ from "lodash";

const SexInput = () => {
  const { setValue, watch, errors } = useFormContext();
  const sex = watch("sex");
  const handleSex = (selected) => (sex === selected ? selectedStyle : null);
  const isError = !_.isEmpty(errors?.sex);

  return (
    <>
      <FormLabel component="legend" error={isError}>
        ¿Es macho o hembra?
      </FormLabel>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Controller as={Button} {...handleSex("male")} name="sex" onClick={() => setValue("sex", "male")} rules={{ required: true }}>
          Macho
        </Controller>
        <Controller as={Button} {...handleSex("female")} name="sex" onClick={() => setValue("sex", "female")} rules={{ required: true }}>
          Hembra
        </Controller>
      </ButtonGroup>
    </>
  );
};

export default SexInput;
