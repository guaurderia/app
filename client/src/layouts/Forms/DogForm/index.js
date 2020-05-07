import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useFormContext } from "react-hook-form";
import { ThemeProvider } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
import { postData } from "../../../redux/actions";
import Form, { FormTheme } from "../style";
import SexInput from "./components/sex";
import DogNameInput from "./components/name";
import BreedInput from "./components/breed";
import ChipInput from "./components/chip";
import FixedInput from "./components/fixed";
import HeatInput from "./components/heat";
import CharacterInput from "./components/character";
import VaccineInput from "./components/vaccines";

const DogForm = ({ breedList, language, formContent, dogList }) => {
  const { reset, getValues, errors } = useFormContext();
  const { sex, fixed } = getValues();

  console.log("DOG FORM", errors);

  useEffect(() => {
    reset({ ...formContent.dog });
  }, []);

  return (
    <Form>
      <ThemeProvider theme={FormTheme}>
        <SexInput />
        <DogNameInput />
        <BreedInput {...{ breedList }} />
        <ChipInput {...{ dogList }} />
        <FixedInput />
        {!fixed && sex === "female" && <HeatInput />}
        {sex && <CharacterInput {...{ language }} />}
        <VaccineInput {...{ language }} />
      </ThemeProvider>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.language.set,
    breedList: state.breed.list,
    dogList: state.dog.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postDogCreate: (dog) => dispatch(postData("/dog/create", "dog", dog, "list")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DogForm);
