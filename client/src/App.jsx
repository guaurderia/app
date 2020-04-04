import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./layouts/Main";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import DogListPage from "./pages/DogList.page";
import Login from "./pages/Login.page";

export const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Main>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/dog/list" component={DogListPage} />
        </Switch>
      </Main>
      <Footer />
    </Router>
  </Provider>
);
