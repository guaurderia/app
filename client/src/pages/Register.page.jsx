import React from "react";
import { withRouter } from "react-router-dom";
import { useUser, doRegister } from "../../lib/auth.api";
import { Register } from "../components/Register";

export const RegisterPage = withRouter(({ history }) => {
  const setUser = useUser("set");

  const handleRegister = async (type, obj) => {
    const user = await doRegister(type, obj);
    setUser(user);
    history.push("/");
  };
  return (
    <div>
      <Register {...{ handleRegister }} />
    </div>
  );
});
