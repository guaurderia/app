import React, { useState } from "react";
import { connect } from "react-redux";
import { postData } from "../redux/actions";
import { withRouter } from "react-router-dom";

const Login = withRouter(({ history, login }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        console.log(form);
        login(form);
        history.push("/dog/list");
      }}
    >
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: obj => dispatch(postData("/auth/login", "user", obj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
