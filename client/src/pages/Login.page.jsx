import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { postData } from "../redux/actions";
import { withRouter } from "react-router-dom";

const Login = withRouter(({ history, login, user }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    login(data);
    console.log("USER AFTER LOGIN", user);
    history.push("/dogs");
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

const mapStateToProps = (state) => ({ user: state.user.data });

const mapDispatchToProps = (dispatch) => {
  return {
    login: (obj) => dispatch(postData("/auth/login", "user", obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
