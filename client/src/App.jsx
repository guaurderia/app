import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import DogListPage from "./pages/DogList.page";

export const App = () => (
  <div>
    <Router>
      <Header />
      <Main>
        <Switch>
          <Route path="/dog/list" component={DogListPage} />
          <Route path="/dog/create" component={DogListPage} />
        </Switch>
      </Main>
      <Footer />
    </Router>
  </div>
);
