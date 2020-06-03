import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { Controller, useFormContext, ErrorMessage } from "react-hook-form";
import { selectedStyle, Error } from "../../style";
import _ from "lodash";

const SexInput = () => {
  const { setValue, getValues, errors, reset } = useFormContext();
  const { sex } = getValues();
  const handleSex = (selected) => (sex === selected ? selectedStyle : null);
  const isError = !_.isEmpty(errors?.sex);
  console.log("ERRORS IN SEX", errors.sex, getValues());

  const handleClick = (value) => {
    setValue("sex", value, true);
  };

  return (
    <>
      <FormLabel component="legend" error={isError}>
        ¿Es macho o hembra?
      </FormLabel>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Controller as={Button} {...handleSex("male")} name="sex" onClick={() => handleClick("male")} rules={{ required: "Indica el sexo" }}>
          Macho
        </Controller>
        <Controller as={Button} {...handleSex("female")} name="sex" onClick={() => handleClick("female")} rules={{ required: "Indica el sexo" }}>
          Hembra
        </Controller>
      </ButtonGroup>
      <ErrorMessage errors={errors} name="sex" as={Error} />
    </>
  );
};

export default SexInput;
