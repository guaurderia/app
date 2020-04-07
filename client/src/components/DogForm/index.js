import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dogBreeds from "../../../lib/dogBreeds";
import _ from "lodash";
import { TextField, Checkbox, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import Select from "react-select";

const Form = styled.form`
  margin: 30px 200px;
`;

const DogForm = ({ createDog }) => {
  const { register, handleSubmit, watch, control, setValue } = useForm();
  const [breed, setBreed] = useState();

  const handleBreed = (value) => {
    console.log(value);
    setBreed(value);
    setValue("breed", "fuck");
  };
  const form = watch();

  console.log("form", form);

  const breeds = dogBreeds.map((breed) => ({ value: breed, label: breed }));
  const character = [
    { value: "shy", label: form.sex === "female" ? "Tímida" : "Tímido" },
    { value: "sociable", label: "Sociable" },
    { value: "hiperactive", label: form.sex === "female" ? "Hiperactiva" : "Hiperactivo" },
    { value: "calm", label: form.sex === "female" ? "Tranquila" : "Tranquilo" },
  ];

  const onSubmit = (obj) => {
    e.preventDefault();
    createDog(obj);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller as={TextField} control={control} name="name" label="Nombre" defaultValue="" />
      <Controller as={Select} value={breed} options={breeds} control={control} rules={{ required: true }} name="breed" label="Raza" onChange={(value) => handleBreed(value)} defaultValue="" />
      <Controller as={TextField} id="outlined-basic" control={control} name="chip" label="Microchip" defaultValue="" />
      <Controller as={Checkbox} control={control} name="fixed" label="Castrado" defaultValue={false} />
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
        defaultValue=""
      />
      {form.sex === "female" && form.fixed === false && (
        <div className="form-group row">
          <div className="col-sm-2">Último Celo</div>
          <div className="col-sm-10">
            <div>
              <Controller as={<DatePicker />} showPopperArrow={true} selected={_.get(form, "heat.date") || new Date()} control={control} defaultValue={null} name="heat.date" disabled={_.get(form, "heat.had") ? true : false} />
              <div className="form-check">
                <Controller as={Checkbox} control={control} name="heat.had" defaultValue={false} onClick={(e) => console.log(register)} />
                <label className="form-check-label" htmlFor="heat">
                  Todavía no ha tenido su primer celo.
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      <Controller as={Select} options={character} control={control} name="character" label="Carácter" onChange={([{ value }]) => value} defaultValue="" />
      <div className="form-group row">
        <div className="col-sm-2">Vacunas</div>
        <div className="col-sm-10">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="vaccines.rabies" ref={register} />
            <label className="form-check-label" htmlFor="female">
              Antirábica
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="vaccines.parvovirus" ref={register} />
            <label className="form-check-label" htmlFor="female">
              Parvovirus
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="vaccines.hepatitis" ref={register} />
            <label className="form-check-label" htmlFor="female">
              Hepatitis
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="vaccines.distemper" ref={register} />
            <label className="form-check-label" htmlFor="female">
              Moquillo
            </label>
          </div>
        </div>
      </div>
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
