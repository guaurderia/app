import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
import { TextField, Checkbox, RadioGroup, FormControlLabel, Radio, FormLabel } from "@material-ui/core";
import Select from "react-select";
import { postData } from "../../redux/actions";
import Form from "./style";
import { character, breed, vaccines } from "./data";

const DogForm = ({ createDog, selected }) => {
  const { register, handleSubmit, watch, control, reset } = useForm({ defaultValues: selected });
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
      <Controller as={TextField} control={control} name="name" label="Nombre" variant="outlined" />
      <Controller as={Select} value={form.breed} options={breed} control={control} rules={{ required: true }} name="breed" label="Raza" />
      <Controller as={TextField} control={control} name="chip" label="Microchip" variant="outlined" />
      <FormLabel component="legend">Castrado</FormLabel>
      <Controller as={Checkbox} control={control} name="fixed" label="Castrado" defaultValue={false} />
      <FormLabel component="legend">Sexo</FormLabel>
      <Controller
        as={
          <RadioGroup>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        }
        control={control}
        name="sex"
        label="Sexo"
      />
      {form.sex === "female" && form.fixed === false && (
        <>
          <Controller as={<DatePicker />} showPopperArrow={true} selected={_.get(form, "heat.date") || new Date()} control={control} defaultValue={null} name="heat.date" disabled={_.get(form, "heat.had") ? true : false} />
          <Controller as={Checkbox} control={control} name="heat.had" defaultValue={false} />
          <label className="form-check-label" htmlFor="heat">
            Todavía no ha tenido su primer celo.
          </label>
        </>
      )}
      <Controller as={Select} options={character} control={control} name="character" label="Carácter" />
      <Controller as={Select} control={control} name="vaccines" closeMenuOnSelect={false} isMulti options={vaccines} />
      <div className="form-group row">
        <div className="col-sm-10">
          <button type="submit" className="btn btn-primary">
            + Añadir
          </button>
        </div>
      </div>
    </Form>
  );
};

const mapDispatchToProps = (dispatch) => ({ createDog: (obj) => dispatch(postData("/dog/create", "dog", obj)) });

export default connect(null, mapDispatchToProps)(DogForm);
