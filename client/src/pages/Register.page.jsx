import React from "react";
import { withRouter } from "react-router-dom";
import { useUser, doRegister } from "../../lib/auth.api";
import { RegisterOwner } from "../components/RegisterOwner";

export const RegisterPage = withRouter(({ history }) => {
  const setUser = useUser("set");

  const handleRegister = async (type, obj) => {
    const user = await doRegister(type, obj);
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
      {/* <LoginSignupForm
        handleSubmit={handleSubmit}
      /> */}
      <RegisterOwner {...{ handleRegister }} />
    </div>
  );
});
