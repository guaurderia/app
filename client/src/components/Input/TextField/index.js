import React from "react";
import InputStyle from "./style";

const TextField = ({ name, register, language, defaultValue = null, type = "text" }) => {
  return <InputStyle type={type} name={name} ref={register} />;
};

export default TextField;
