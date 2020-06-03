import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useFormContext } from "react-hook-form";
import { ThemeProvider } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
import { postData } from "../../../redux/actions";
import Form, { FormTheme } from "../style";
import SexInput from "./components/SexInput";
import DogNameInput from "./components/DogNameInput";
import BreedInput from "./components/BreedInput";
import ChipInput from "./components/ChipInput";
import FixedInput from "./components/FixedInput";
import HeatInput from "./components/HeatInput";
import CharacterInput from "./components/CharacterInput";
import VaccineInput from "./components/VaccineInput";

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
