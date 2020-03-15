import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/Home.page";
import { RegisterPage } from "./pages/Register.page";
import styled from "styled-components";
import { UserContext } from "../lib/auth.api";
import { Layout } from "./layouts/Main.layout";

const Body = styled.div`
  margin: 50px 100px;
`;

export const App = () => {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
        </Layout>
      </Router>
    </UserContext.Provider>
  );
};
