import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../style";

const OwnerMainPhone = () => {
  const { watch } = useFormContext();
  const mainPhone = watch("mainPhone");

  return (
    <>
      <FormLabel component="legend">Teléfono de contacto</FormLabel>
      <Controller as={TextField} type="tel" name="mainPhone" defaultValue={mainPhone || ""} {...inputStyle} />
    </>
  );
};

export default OwnerMainPhone;
