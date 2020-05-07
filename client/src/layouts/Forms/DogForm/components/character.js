import React, { useEffect } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { useFormContext, Controller } from "react-hook-form";
import _ from "lodash";
import { translate } from "../../../../services/Language";
import { inputStyle } from "../../style";

const CharacterInput = ({ language }) => {
  const { getValues, setValue } = useFormContext();
  const { sex, character } = getValues();

  const options = ["shy", "sociable", "hiperactive", "agressive", "calm"];

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
      },
    },
  };

  return (
    <>
      <Controller
        as={
          <FormControl>
            <FormLabel component="legend">¿Como describirías su caráter?</FormLabel>
            <Select
              multiple
              value={character || []}
              onChange={(e, child) => {
                const selected = child.props.value;
                const checked = character?.indexOf(selected) > -1;
                if (checked) {
                  const newList = _.pull(character, selected);
                  setValue("character", newList);
                } else {
                  setValue("character", character?.length ? [...character, selected] : [selected]);
                }
              }}
              renderValue={(selected) => {
                const translatedSelection = selected.map((s) => _.capitalize(translate(s, language, sex)));
                return translatedSelection.join(", ");
              }}
              MenuProps={MenuProps}
            >
              {options.map((trait, i) => (
                <MenuItem key={i} value={trait}>
                  <Checkbox checked={character?.indexOf(trait) > -1} />
                  <ListItemText primary={_.capitalize(translate(trait, language, sex))} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
        name="character"
        defaultValue={[]}
        variant="outlined"
        {...inputStyle}
      />
    </>
  );
};

export default CharacterInput;
