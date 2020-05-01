import React, { useEffect } from "react";
import Form, { FormTheme } from "../style";
import { ThemeProvider } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import OwnerFirstName from "./components/firstName";
import OwnerLastName from "./components/lastName";
import OwnerUsername from "./components/username";
import OwnerMainPhone from "./components/mainPhone";
import OwnerDni from "./components/dni";

const OwnerForm = ({ formContent }) => {
  const methods = useFormContext();
  const { watch, reset } = methods;
  const form = watch();

  useEffect(() => {
    reset(formContent.owner || {});
  }, []);

  return (
    <Form>
      <ThemeProvider theme={FormTheme}>
        <OwnerFirstName />
        <OwnerLastName />
        <OwnerUsername />
        <OwnerMainPhone />
        <OwnerDni />
      </ThemeProvider>
    </Form>
  );
};

export default OwnerForm;
