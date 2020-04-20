import React from "react";
import { setLabel } from "../../../services/Language";

const TextField = ({ name, register, language, defaultValue = null }) => {
  return (
    <div className="form-group row">
      <label htmlFor="name" className="col-sm-2 col-form-label">
        {setLabel(name, language)}
      </label>
      <div className="col-sm-10">
        <input type="text" className="form-control" name={name} ref={register} />
      </div>
    </div>
  );
};

export default TextField;
