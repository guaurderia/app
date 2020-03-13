import React from "react";
import { RegisterOwner } from "./components/RegisterOwner";
import styled from "styled-components";

const Body = styled.div`
  margin: 50px 100px;
`;

export const App = () => (
  <Body>
    <h1>🐶</h1>
    <RegisterOwner />
  </Body>
);
