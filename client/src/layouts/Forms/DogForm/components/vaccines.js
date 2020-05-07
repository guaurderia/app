import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { useFormContext, Controller } from "react-hook-form";
import _ from "lodash";
import { translate } from "../../../../services/Language";
import { inputStyle, selectedStyle } from "../../style";

const VaccineInput = ({ language }) => {
  const { watch, setValue } = useFormContext();
  const vaccines = watch("vaccines");
  const sex = watch("sex");
  const allVaccines = ["rabies", "parvovirus", "hepatitis", "distemper"];
  const handleToggle = (state) => (state ? selectedStyle : null);
  const vacunadoa = sex === "male" ? "vacunado" : sex === "female" ? "vacunada" : "vacunad@";

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
      },
    },
  };

  return (
    <>
      <FormLabel component="legend">¿Está {vacunadoa}?</FormLabel>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Controller as={Button} {...handleToggle(vaccines?.vaccinated)} name="vaccines" onClick={() => setValue("vaccines", { ...vaccines, vaccinated: true })} defaultValue={{ ...vaccines, vaccinated: false }}>
          Si
        </Controller>
        <Controller as={Button} {...handleToggle(!vaccines?.vaccinated)} name="vaccines" onClick={() => setValue("vaccines", { ...vaccines, vaccinated: false })} defaultValue={{ ...vaccines, vaccinated: false }}>
          No
        </Controller>
      </ButtonGroup>
      {vaccines?.vaccinated && (
        <Controller
          as={
            <FormControl>
              <FormLabel component="legend">¿Que vacunas tiene?</FormLabel>
              <Select
                multiple
                value={vaccines.list || []}
                onChange={(e, child) => {
                  const selected = child.props.value;
                  const checked = vaccines.list?.indexOf(selected) > -1;
                  if (checked) {
                    const newList = _.pull(vaccines.list, selected);
                    setValue("vaccines", { ...vaccines, list: newList });
                  } else {
                    setValue("vaccines", { ...vaccines, list: vaccines.list?.length ? [...vaccines.list, selected] : [selected] });
                  }
                }}
                renderValue={(selected) => {
                  const translatedSelection = selected.map((s) => _.capitalize(translate(s, language)));
                  return translatedSelection.join(", ");
                }}
                MenuProps={MenuProps}
              >
                {allVaccines.map((vaccine, i) => (
                  <MenuItem key={i} value={vaccine}>
                    <Checkbox checked={vaccines.list?.indexOf(vaccine) > -1} />
                    <ListItemText primary={_.capitalize(translate(vaccine, language))} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }
          name="vaccines"
          defaultValue={{ ...vaccines, list: [] }}
          variant="outlined"
          {...inputStyle}
        />
      )}
    </>
  );
};

export default VaccineInput;
