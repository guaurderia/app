import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import FormLabel from "@material-ui/core/FormLabel";

const CountDisplay = () => {
  const { watch, reset } = useFormContext();
  const passType = watch("passType");
  const form = watch();
  const days = passType.duration;

  useEffect(() => {
    reset({ ...form, count: days });
  }, []);

  return (
    <>
      <FormLabel component="legend">{days} Días</FormLabel>
    </>
  );
};

export default CountDisplay;
