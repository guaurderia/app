import React from "react";
import { setLabel } from "../../../services/Language";

const TextField = ({ name, register, language, defaultValue = null, type = "text" }) => {
  return <input type={type} className="form-control" name={name} ref={register} />;
};

export default TextField;
