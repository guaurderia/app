import React from "react";
import { connect } from "react-redux";
import { Form } from "../style";
import { useForm } from "react-hook-form";
import TextField from "../../../components/Input/TextField";

const OwnerForm = ({ language }) => {
  const { register } = useForm();
  return (
    <Form>
      <TextField name="firstName" {...{ register }} language={language} />
      <TextField name="lastName" {...{ register }} language={language} />
      <TextField name="email" type="email" {...{ register }} language={language} />
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.language.set,
  };
};

export default connect(mapStateToProps)(OwnerForm);
