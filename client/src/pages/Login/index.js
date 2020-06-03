import React, { useEffect } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { postData, getData } from "../../redux/actions";
import Logo from "../../theme/logo";
import { LoginForm, LoginFormContainer } from "./style";
import FormLabel from "@material-ui/core/FormLabel";

const LoginPage = withRouter(({ history, login, getUser, user }) => {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    getUser();
  }, []);

  const onSubmit = (data) => {
    if (user?.me) history.push("/dogs");
    login(data).then((res) => history.push("/dogs"));
  };
  if (user && !user.loading) {
    if (user.me) return <Redirect to="/dogs" />;
    else {
      return (
        <LoginFormContainer>
          <Logo type="icon" size="200px" />
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <FormLabel>Email</FormLabel>
              <input type="email" name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={register} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Contraseña</label>
              <input type="password" name="password" className="form-control" id="exampleInputPassword1" ref={register} />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </LoginForm>
        </LoginFormContainer>
      );
    }
  } else return <div>Loading...</div>;
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (obj) => dispatch(postData("/auth/login", "user", obj, "me")),
    getUser: () => dispatch(getData("/auth/show/me", "user", "me")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
