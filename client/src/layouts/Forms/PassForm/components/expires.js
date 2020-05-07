import React, { useEffect } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import { useFormContext } from "react-hook-form";
import { formatDate } from "../../../../services/Format/Time";
import { DateTime } from "luxon";

const ExpiresDisplay = () => {
  const { getValues, reset } = useFormContext();
  const { expires } = getValues();
  const expiresFormat = formatDate(expires, "es");

  return (
    <FormLabel component="legend">
      Caducará el <b>{expiresFormat}</b>
    </FormLabel>
  );
};

export default ExpiresDisplay;
