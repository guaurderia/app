import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dogBreads from "../../lib/dogBreads";

const Form = styled.form`
  margin: 30px 200px;
`;

export const DogForm = ({ handleNewDog }) => {
  const [name, setName] = useState("");
  const [bread, setBread] = useState(dogBreads[0]);
  const [sex, setSex] = useState("male");
  const [vaccines, setVaccines] = useState({ rabies: false, parvovirus: false, hepatitis: false, distemper: false });
  const [fixed, setFixed] = useState(false);
  const [heat, setHeat] = useState({ had: true, date: new Date() });
  const [chip, setChip] = useState("");
  const [character, setCharacter] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  console.log(sex);

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        console.log("About to create dog with: " + "\nname:" + name + "\nbread:" + bread + "\nsex:" + sex + "\nvaccines:" + vaccines + "\nfixed:" + fixed + "\nheat:" + heat + "\nchip:" + chip + "\ncharacter:" + character + "\nuser:" + user + "\npass:" + pass);
        //handleNewDog(name, bread, sex, vaccines, fixed, heat, chip, character, user, pass);
        handleNewDog(name, bread, sex, vaccines, fixed, heat, chip, character, user, pass);
      }}
    >
      <div className="form-group row">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Nombre
        </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="character" className="col-sm-2 col-form-label">
          Raza
        </label>
        <div className="col-sm-10">
          <select className="form-control" id="bread" value={bread} onChange={e => setBread(e.target.value)}>
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
          <input type="number" className="form-control" id="chip" value={chip} onChange={e => setChip(e.target.value)} />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-2">Castrado</div>
        <div className="col-sm-10">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="fixed" checked={fixed} onChange={e => setFixed(!fixed)} />
            <label className="form-check-label" htmlFor="female">
              <div>
                <span className={fixed ? "glyphicon glyphicon-ok" : "glyphicon glyphicon-remove"} aria-hidden="true"></span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <fieldset className="form-group">
        <div className="row">
          <legend className="col-form-label col-sm-2 pt-0">Sexo</legend>
          <div className="col-sm-10">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="sex" id="male" value={sex} onChange={e => setSex(e.target.id)} />
              <label className="form-check-label" htmlFor="male">
                Macho
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="sex" id="female" value={sex} onChange={e => setSex(e.target.id)} />
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
              <DatePicker showPopperArrow={false} selected={heat.date} onChange={date => setHeat({ ...heat, date })} disabled={!heat.had} placeholderText="" />
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="heat" checked={!heat.had} onChange={e => setHeat(!heat.had ? { ...heat, had: true, date: new Date() } : { ...heat, had: false, date: null })} />
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
          <select className="form-control" id="character" value={character} onChange={e => setCharacter(e.target.value)}>
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
            <input className="form-check-input" type="checkbox" id="vaccines" checked={vaccines.rabies} onChange={e => setVaccines({ ...vaccines, rabies: e.target.checked })} />
            <label className="form-check-label" htmlFor="female">
              Antirábica
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="vaccines" checked={vaccines.parvovirus} onChange={e => setVaccines({ ...vaccines, parvovirus: e.target.checked })} />
            <label className="form-check-label" htmlFor="female">
              Parvovirus
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="vaccines" checked={vaccines.hepatitis} onChange={e => setVaccines({ ...vaccines, hepatitis: e.target.checked })} />
            <label className="form-check-label" htmlFor="female">
              Hepatitis
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="vaccines" checked={vaccines.distemper} onChange={e => setVaccines({ ...vaccines, distemper: e.target.checked })} />
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
