import React from "react";
import { connect } from "react-redux";
import { Form } from "../style";
import { useForm, FormContext } from "react-hook-form";
import OwnerFirstName from "./components/firstName";

const OwnerForm = () => {
  return <Form></Form>;
};

const mapStateToProps = (state) => {
  return {
    language: state.language.set,
  };
};

export default connect(mapStateToProps)(OwnerForm);
