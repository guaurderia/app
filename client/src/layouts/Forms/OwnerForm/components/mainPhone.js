import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext, ErrorMessage } from "react-hook-form";
import { inputStyle, Error } from "../../style";
import _ from "lodash";

const OwnerMainPhone = () => {
  const { watch, errors } = useFormContext();
  const mainPhone = watch("mainPhone");
  const isError = !_.isEmpty(errors?.mainPhone);
  const requiredMessage = "Introduce un teléfono de contacto";

  return (
    <>
      <FormLabel component="legend">Teléfono de contacto</FormLabel>
      <Controller as={TextField} type="tel" name="mainPhone" defaultValue={mainPhone || ""} {...inputStyle} rules={{ required: requiredMessage }} error={isError} />
      <ErrorMessage {...{ errors }} name="mainPhone" as={Error} />
    </>
  );
};

export default OwnerMainPhone;
