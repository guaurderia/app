import React from "react";
import { connect } from "react-redux";
import { useForm, FormContext } from "react-hook-form";
import { ThemeProvider } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import { postData } from "../../../redux/actions";
import Form, { FormTheme } from "../style";
import { withRouter } from "react-router-dom";
import SexInput from "./components/sex";
import DogNameInput from "./components/name";
import BreedInput from "./components/breed";
import ChipInput from "./components/chip";
import FixedInput from "./components/fixed";
import HeatInput from "./components/heat";
import CharacterInput from "./components/character";
import VaccineInput from "./components/vaccines";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const DogForm = withRouter(({ history, postDogCreate, breedList, language }) => {
  const methods = useForm();
  const form = methods.watch();

  console.log("FORM", form);

  const handleNext = (e) => {
    history.push("dogs/create/owner");
  };

  const onSubmit = (obj, e) => {
    console.log("OBJECT IN SUBMIT", e);
    postDogCreate(obj).then((res) => history.push("/dogs"));
  };
  return (
    <FormContext {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <ThemeProvider theme={FormTheme}>
          <SexInput />
          <DogNameInput />
          <BreedInput {...{ breedList }} />
          <ChipInput />
          <FixedInput />
          <HeatInput />
          <CharacterInput {...{ language }} />
          <VaccineInput {...{ language }} />
          <Button variant="contained" color="primary" size="large" endIcon={<ArrowForwardIosIcon />} onClick={handleNext}>
            Siguiente
          </Button>
        </ThemeProvider>
      </Form>
    </FormContext>
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
