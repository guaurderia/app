import React, { useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dogBreads from "../../lib/dogBreads";

const Form = styled.form`
  margin: 30px 200px;
`;

const DogForm = ({ createDog }) => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const name = watch("name", "");
  const fixed = watch("fixed", false);
  const sex = watch("sex", null);
  const heat = watch("heat", { had: false, date: null });
  const vaccines = watch("vaccines", { rabies: false, parvovirus: false, hepatitis: false, distemper: false });

  console.log("HEAT", heat);
  console.log("FIXED", fixed);
  console.log("NAME", name);

  const onSubmit = obj => {
    e.preventDefault();
    createDog(obj);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group row">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Nombre
        </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" name="name" ref={register} />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="character" className="col-sm-2 col-form-label">
          Raza
        </label>
        <div className="col-sm-10">
          <select className="form-control" name="breed" ref={register}>
            <option>-- Select --</option>
            <option>*Cruze*</option>
            {dogBreads.map((dog, i) => (
              <option key={i}>{dog}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="bread" className="col-sm-2 col-form-label">
          Microchip
        </label>
        <div className="col-sm-10">
          <input type="number" className="form-control" name="chip" ref={register} />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-2">Castrado</div>
        <div className="col-sm-10">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="fixed" ref={register} />
            <label className="form-check-label" htmlFor="female"></label>
          </div>
        </div>
      </div>
      <fieldset className="form-group">
        <div className="row">
          <legend className="col-form-label col-sm-2 pt-0">Sexo</legend>
          <div className="col-sm-10">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="sex" value="male" ref={register} />
              <label className="form-check-label" htmlFor="male">
                Macho
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="sex" value="female" ref={register} />
              <label className="form-check-label" htmlFor="female">
                Hembra
              </label>
            </div>
          </div>
        </div>
      </fieldset>
      {sex === "female" && fixed === false && (
        <div className="form-group row">
          <div className="col-sm-2">Último Celo</div>
          <div className="col-sm-10">
            <div>
              <DatePicker showPopperArrow={false} selected={heat.had} onChange={date => setValue("heat", { had: date })} disabled={!heat.had} placeholderText="" name="heat.date" ref={register} />
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="heat.had" checked={!heat.had} onChange={e => setValue("heat", { had: !heat.had ? true : false, date: !heat.had ? null : new Date() })} ref={register} />
                <label className="form-check-label" htmlFor="heat">
                  Todavía no ha tenido su primer celo.
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="form-group row">
        <label htmlFor="character" className="col-sm-2 col-form-label">
          Carácter
        </label>
        <div className="col-sm-10">
          <select className="form-control" name="character" ref={register}>
            <option>-- Select --</option>
            <option>{sex === "female" ? "Tímida" : "Tímido"}</option>
            <option>Sociable</option>
            <option>{sex === "female" ? "Hiperactiva" : "Hiperactivo"}</option>
            <option>{sex === "female" ? "Tranquila" : "Tranquilo"}</option>
          </select>
        </div>
      </div>
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
      {/* <div className="form-group row">
        <label htmlFor="user" className="col-sm-2 col-form-label">
          user
        </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="user" value={user} onChange={e => setUser(e.target.value)} />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="pass" className="col-sm-2 col-form-label">
          Pass
        </label>
        <div className="col-sm-10">
          <input type="password" className="form-control" id="pass" value={pass} onChange={e => setPass(e.target.value)} />
        </div>
      </div> */}
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

const mapDispatchToProps = dispatch => ({ createDog: obj => dispatch(postData("/dog/create", "dog", obj)) });

export default connect(null, mapDispatchToProps)(DogForm);
