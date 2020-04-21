import React from "react";

const CheckBox = ({ name, register, language, defaultValue = null }) => {
  return (
    <div className="form-group row">
      <div className="col-sm-2">{setLabel(name, language)}</div>
      <div className="col-sm-10">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name={name} ref={register} />
          <label className="form-check-label" htmlFor="female"></label>
        </div>
      </div>
    </div>
  );
};

export default CheckBox;
