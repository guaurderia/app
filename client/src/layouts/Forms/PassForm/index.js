import React, { useEffect } from "react";
import Form, { FormTheme } from "../style";
import { ThemeProvider } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import PassTypeInput from "./components/passType";
import StartsInput from "./components/starts";
import CountDisplay from "./components/count";
import ExpiresDisplay from "./components/expires";

const PassForm = ({ formContent }) => {
  const methods = useFormContext();
  const { watch, reset } = methods;
  const form = watch();
  const type = form.passType?.type;

  useEffect(() => {
    reset(formContent.pass || {});
  }, []);

  return (
    <Form>
      <ThemeProvider theme={FormTheme}>
        <PassTypeInput />
        {type === "month" && <StartsInput />}
        {type === "month" && <ExpiresDisplay />}
        {type === "day" && <CountDisplay />}
      </ThemeProvider>
    </Form>
  );
};

export default PassForm;
