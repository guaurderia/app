import React from "./node_modules/react";
import FormLabel from "./node_modules/@material-ui/core/FormLabel";
import Select from "./node_modules/@material-ui/core/Select";
import MenuItem from "./node_modules/@material-ui/core/MenuItem";
import { useFormContext, Controller } from "./node_modules/react-hook-form";
import _ from "./node_modules/lodash";
import { translate } from "../../../../services/Language";
import { inputStyle } from "../../style";

const CharacterInput = ({ language }) => {
  const { watch } = useFormContext();
  const sex = watch("sex");

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
        rules={{ required: true }}
        defaultValue=""
        {...inputStyle}
      />
    </>
  );
};

export default CharacterInput;
