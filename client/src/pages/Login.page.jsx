import React from "react";
import { withRouter } from "react-router-dom";
import { useUser, doLogin } from "../../lib/auth.api";
import { Login } from "../components/Login";

export const LoginPage = withRouter(({ history }) => {
  const setUser = useUser("set");

  const handleLogin = async (type, obj) => {
    const user = await doLogin(type, obj);
    setUser(user);
    history.push("/");
  };
  return (
    <div>
      {/* <LoginSignupForm
        handleSubmit={handleSubmit}
      /> */}
      <Login {...{ handleLogin }} />
    </div>
  );
});
