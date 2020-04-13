import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import DogsPage from "./pages/Dogs";
import LoginPage from "./pages/Login";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/dogs">
            <DogsPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
