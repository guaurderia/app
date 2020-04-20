import React, { Children, cloneElement } from "react";
import { setLabel } from "../../../services/Language";

export const RadioContainer = ({ name, language, children }) => {
  const radioFields = Children.map(children, (child) => {
    cloneElement(child, { name, language });
  });
  return (
    <fieldset className="form-group">
      <div className="row">
        <legend className="col-form-label col-sm-2 pt-0">{setLabel(name, language)}</legend>
        <div className="col-sm-10">{radioFields}</div>
      </div>
    </fieldset>
  );
};

export const RadioField = ({ name, language, label, register, defaultValue = null }) => {
  return (
    <div className="form-check">
      <input className="form-check-input" type="radio" name={name} ref={register} />
      <label className="form-check-label" htmlFor="male">
        {setLabel(label, language)}
      </label>
    </div>
  );
};
