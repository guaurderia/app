import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider, connect } from "react-redux";
import store from "./redux/store";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import DogsPage from "./pages/Dogs";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import GlobalStyle from "./theme/globalStyle";
import { setData } from "./redux/actions";

const App = ({ user }) => {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/dogs">
          <DogsPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.me,
  };
};

export default connect(mapStateToProps)(App);
