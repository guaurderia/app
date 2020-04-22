import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postData } from "../../../redux/actions";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { character, vaccines } from "../data";
import TextField from "../../../components/Input/TextField";
import CheckBox from "../../../components/Input/CheckBox";
import { setLabel } from "../../../services/Language";
import { breedSelector } from "../../../services/Format/Dog";
import { RadioField, RadioContainer } from "../../../components/Input/RadioSelect";
import _ from "lodash";
import { FormLabel } from "../../../components/Label/FormLabel/style";

const Form = styled.form`
  margin: 30px 200px;
`;

const DogForm = withRouter(({ history, postDogCreate, breedList, language }) => {
  const { register, handleSubmit, watch, control, reset } = useForm();
  const form = watch();

  console.log("FORM", form);

  const onSubmit = async (obj) => {
    console.log(obj);
    obj.breed = obj.breed.value;
    obj.character = obj.character.value;
    console.log("CREATED DOG", obj);
    await postDogCreate(obj);
    history.push("/dog");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>¿Como se llama tu perr@?</FormLabel>
        <TextField name="name" {...{ register }} language={language} />
        <FormLabel>¿Que raza es?</FormLabel>
        <Controller as={Select} options={breedSelector(breedList)} control={control} rules={{ required: true }} name="breed" label={setLabel("breed", language)} />
        <TextField name="chip" {...{ register }} language={language} />
        <CheckBox name="fixed" {...{ register }} language={language} />
        <RadioContainer name="gender" language={language} {...{ register }}>
          <RadioField label="male" />
          <RadioField label="female" />
        </RadioContainer>
        {form.gender === "female" && form.fixed === false && (
          <>
            <Controller as={<DatePicker />} showPopperArrow={true} selected={_.get(form, "heat.date") || new Date()} control={control} defaultValue={null} name="heat.date" disabled={_.get(form, "heat.had") ? true : false} />
            <CheckBox name="heat" {...{ register }} language={language} />
            <label className="form-check-label" htmlFor="heat">
              Todavía no ha tenido su primer celo.
            </label>
          </>
        )}
        <Controller as={Select} options={character(form.gender)} control={control} name="character" label={setLabel("character", language)} />
        <Controller as={Select} control={control} name="vaccines" closeMenuOnSelect={false} isMulti options={vaccines} />
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              + Añadir
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    language: state.language.set,
    breedList: state.breed.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postDogCreate: (dog) => dispatch(postData("/dog/create", "dog", dog, "list")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogForm);
