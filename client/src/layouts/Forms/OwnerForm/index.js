import React, { useEffect } from "react";
import Form, { FormTheme } from "../style";
import { ThemeProvider } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import OwnerFirstName from "./components/firstName";
import OwnerLastName from "./components/lastName";
import OwnerUsername from "./components/username";
import OwnerMainPhone from "./components/mainPhone";
import OwnerDni from "./components/dni";
import { connect } from "react-redux";

const OwnerForm = ({ formContent, userList }) => {
  const methods = useFormContext();
  const { reset, errors } = methods;

  console.log("OWNER FORM", errors);

  useEffect(() => {
    reset({ ...formContent.owner }, { errors: true });
  }, []);

  return (
    <Form>
      <ThemeProvider theme={FormTheme}>
        <OwnerFirstName />
        <OwnerLastName />
        <OwnerUsername {...{ userList }} />
        <OwnerMainPhone />
        <OwnerDni />
      </ThemeProvider>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.user.list,
  };
};

export default connect(mapStateToProps)(OwnerForm);
