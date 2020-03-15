import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/Home.page";
import { RegisterPage } from "./pages/Register.page";
import { UserContext } from "../lib/auth.api";
import { Layout } from "./layouts/Main.layout";
import { LoginPage } from "./pages/Login.page";

export const App = () => {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/registrar" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Layout>
      </Router>
    </UserContext.Provider>
  );
};
