import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useFormContext, Controller } from "react-hook-form";
import _ from "lodash";
import { translate } from "../../../../services/Language";
import { inputStyle } from "../../style";

const CharacterInput = ({ language }) => {
  const { watch } = useFormContext();
  const sex = watch("sex");
  const character = watch("character");

  const characterList = ["shy", "sociable", "hiperactive", "agressive", "calm"];

  return (
    <>
      <FormLabel component="legend">¿Como describirías su caráter?</FormLabel>
      <Controller
        as={
          <Select>
            {characterList.map((character, i) => {
              return (
                <MenuItem key={i} value={character}>
                  {_.capitalize(translate(character, language, sex))}
                </MenuItem>
              );
            })}
          </Select>
        }
        name="character"
        defaultValue={character || ""}
        {...inputStyle}
      />
    </>
  );
};

export default CharacterInput;
