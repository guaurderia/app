import React, { Children, cloneElement } from "react";
import { setLabel } from "../../../services/Language";

export const RadioContainer = ({ name, language, register, children }) => {
  return (
    <fieldset className="form-group">
      <div className="row">
        <legend className="col-form-label col-sm-2 pt-0">{setLabel(name, language)}</legend>
        <div className="col-sm-10">{Children.map(children, (child) => cloneElement(child, { name, language, register }))}</div>
      </div>
    </fieldset>
  );
};

export const RadioField = ({ name, language, register, label, defaultValue = null }) => {
  console.log("LABEL", label);
  return (
    <div className="form-check">
      <input className="form-check-input" type="radio" value={label} name={name} ref={register} />
      <label className="form-check-label" htmlFor="male">
        {setLabel(label, language)}
      </label>
    </div>
  );
};
