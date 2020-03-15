import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  margin: 30px 200px;
`;

export const RegisterUser = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        handleLogin("user", { username, password });
      }}
    >
      <div className="form-group">
        <label htmlFor="username">Email {username}</label>
        <input type="text" className="form-control" id="username" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña {password}</label>
        <input type="password" className="form-control" id="password" value={mainPhone} onChange={e => setPassword(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-primary">
        Entrar
      </button>
    </Form>
  );
};
