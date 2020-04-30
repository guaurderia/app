import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./layouts/Navbar";
import DogsPage from "./pages/Dogs";
import LoginPage from "./pages/Login";
import GlobalStyle from "./theme/globalStyle";

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="/dogs">
            <Navbar />
            <DogsPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
