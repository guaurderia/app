import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { postData, setUser } from "../../redux/actions";

const LoginPage = withRouter(({ history, login, setUser, user }) => {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (user) history.push("/dogs");
  }, [user]);

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={register} />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" name="password" className="form-control" id="exampleInputPassword1" ref={register} />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
});

const mapStateToProps = (state) => {
  return {
    user: state.user.me,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (obj) => dispatch(postData("/auth/login", "user", obj, "me")),
    getUser: () => dispatch(getData("/auth/show/me", "user", "me")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
