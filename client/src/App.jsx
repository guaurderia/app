import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import OwnerListPage from "./pages/OwnerList.page";
import NewDogPage from "./pages/NewDog.page";

export const App = () => (
  <div>
    <Router>
      <Header />
      <Main>
        <Switch>
          <Route path="/dog/list" component={OwnerListPage} />
          <Route path="/dog/add" component={NewDogPage} />
        </Switch>
      </Main>
      <Footer />
    </Router>
  </div>
);
