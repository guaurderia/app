import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { DateTime } from "luxon";
import LuxonUtils from "@date-io/luxon";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { useFormContext, Controller } from "react-hook-form";
import { selectedStyle } from "../../style";

const HeatInput = () => {
  const { watch, setValue } = useFormContext();
  const heat = watch("heat");
  const sex = watch("sex");
  const fixed = watch("fixed");
  const handleToggle = (state) => (state ? selectedStyle : null);

  return (
    <>
      <FormLabel component="legend">¿Ha tenido su primer celo?</FormLabel>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Controller as={Button} {...handleToggle(heat?.had)} name="heat" onClick={() => setValue("heat", { ...heat, had: true })} defaultValue={{ ...heat, had: false }}>
          Si
        </Controller>
        <Controller as={Button} {...handleToggle(!heat?.had)} name="heat" onClick={() => setValue("heat", { ...heat, had: false })} defaultValue={{ ...heat, had: false }}>
          No
        </Controller>
      </ButtonGroup>
      {heat?.had && (
        <>
          <FormLabel component="legend">¿Cuando fué su último celo?</FormLabel>
          <Controller
            as={
              <MuiPickersUtilsProvider utils={LuxonUtils}>
                <KeyboardDatePicker
                  autoOk
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  onChange={(date, string) => setValue("heat", { ...heat, date: string })}
                  value={heat?.date || DateTime.local()}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            }
            name="heat"
            defaultValue={{ ...heat, date: DateTime.local() }}
          />
        </>
      )}
    </>
  );
};

export default HeatInput;
