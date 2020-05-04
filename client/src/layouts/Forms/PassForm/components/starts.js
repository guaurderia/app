import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { DateTime } from "luxon";
import LuxonUtils from "@date-io/luxon";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import FormLabel from "@material-ui/core/FormLabel";
import { formatDate } from "../../../../services/Format/Time";

const StartsInput = () => {
  const { watch, setValue, reset } = useFormContext();
  const form = watch();
  const starts = watch("starts") || DateTime.local();
  const expires = watch("expires") || starts.plus({ months: 1 });

  useEffect(() => {
    reset({ ...form, expires, starts });
  }, []);

  const handleDates = (date) => {
    const expires = date.plus({ months: 1 });
    reset({ ...form, starts: date, expires });
  };

  return (
    <>
      <FormLabel component="legend">¿Cuando quiere que empiece su bono?</FormLabel>
      <Controller
        as={
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <KeyboardDatePicker
              autoOk
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              onChange={handleDates}
              value={starts || DateTime.local()}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        }
        name="starts"
        defaultValue={starts || DateTime.local()}
      />
    </>
  );
};

export default StartsInput;
