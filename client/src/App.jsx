import React from "react";
import styled from "styled-components";
import { RegisterPage } from "./pages/Register.page";

const Body = styled.div`
  margin: 50px 100px;
`;

export const App = () => (
  <Body>
    <h1>🐶</h1>
    <RegisterPage />
  </Body>
);
