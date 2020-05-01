import React, { useEffect } from "react";
import Form, { FormTheme } from "../style";
import { ThemeProvider } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import PassTypeInput from "./components/passType";

const PassForm = ({ formContent }) => {
  const methods = useFormContext();
  const { watch, reset } = methods;
  const form = watch();

  useEffect(() => {
    reset(formContent.pass || {});
  });

  return (
    <Form>
      <ThemeProvider theme={FormTheme}>
        <PassTypeInput />
      </ThemeProvider>
    </Form>
  );
};

export default PassForm;
