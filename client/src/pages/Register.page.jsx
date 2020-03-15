import React from "react";
import { withRouter } from "react-router-dom";
import { useUser, register } from "../../lib/auth.api";
import { RegisterUser } from "../components/RegisterUser";

export const RegisterPage = withRouter(({ history }) => {
  const setUser = useUser("set");

  const handleRegister = async (type, obj) => {
    const user = await register(type, obj);
    setUser(user);
    switch (type) {
      case "user":
        history.push("/register/dog");
        break;
      case "dog":
        history.push("/register/human");
        break;
      case "human":
        history.push("/");
        break;
      default:
        history.push("/");
    }
  };
  return (
    <div>
      <h2>Registrar</h2>
      {/* <LoginSignupForm
        handleSubmit={handleSubmit}
      /> */}
      <RegisterUser {...{ handleRegister }} />
    </div>
  );
});
