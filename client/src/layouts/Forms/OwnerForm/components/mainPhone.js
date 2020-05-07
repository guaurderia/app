import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../style";
import _ from "lodash";

const OwnerMainPhone = () => {
  const { watch, errors } = useFormContext();
  const mainPhone = watch("mainPhone");
  const isError = !_.isEmpty(errors?.mainPhone);

  return (
    <>
      <FormLabel component="legend">Teléfono de contacto</FormLabel>
      <Controller as={TextField} type="tel" name="mainPhone" defaultValue={mainPhone || ""} {...inputStyle} rules={{ required: true }} error={isError} />
    </>
  );
};

export default OwnerMainPhone;
