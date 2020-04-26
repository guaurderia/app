import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Controller } from "react-hook-form";
import { breedSelector } from "../../../../services/Format/Dog";
import { inputStyle } from "../../style";

const BreedInput = ({ breedList }) => {
  return (
    <>
      <FormLabel component="legend" color="secondary">
        ¿Que raza es?
      </FormLabel>
      <Controller
        as={
          <Select>
            {breedSelector(breedList).map((breed) => {
              return (
                <MenuItem key={breed.value[1]} value={breed.value[0]}>
                  {breed.label}
                </MenuItem>
              );
            })}
          </Select>
        }
        name="breed"
        rules={{ required: true }}
        defaultValue=""
        {...inputStyle}
      />
    </>
  );
};

export default BreedInput;
