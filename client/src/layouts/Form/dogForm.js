import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { breed } from "./data";
import TextField from "../../components/Input/TextField";
import { connect } from "react-redux";
import { setLabel } from "../../services/Language";
import { RadioField } from "../../components/Input/RadioSelect";

const Form = styled.form`
  margin: 30px 200px;
`;

export const DogForm = ({ handleNewDog, language }) => {
  const { register, handleSubmit, watch, control, reset } = useForm();
  const form = watch();

  console.log("FORM", form);

  const onSubmit = (obj) => {
    console.log(obj);
    obj.breed = obj.breed.value;
    obj.character = obj.character.value;
    createDog(obj);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField name="name" {...{ register }} language={language} />
      <Controller as={Select} options={breed} control={control} rules={{ required: true }} name="breed" label={setLabel("breed", language)} />
      <TextField name="chip" {...{ register }} language={language} />
      <RadioContainer name="sex" language={language}>
        <RadioField label="male" {...{ register }} />
      </RadioContainer>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.language.set,
  };
};

export default connect(mapStateToProps)(DogForm);
