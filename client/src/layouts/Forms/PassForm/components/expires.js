import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import { useFormContext } from "react-hook-form";
import { formatDate } from "../../../../services/Format/Time";

const ExpiresDisplay = ({ expires }) => {
  const expiresFormat = formatDate(expires, "es");

  return (
    <FormLabel component="legend">
      Caducará el <b>{expiresFormat}</b>
    </FormLabel>
  );
};

export default ExpiresDisplay;
