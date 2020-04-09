import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./layouts/Main";
import Header from "./components/Header";
import Footer from "./layouts/Footer";
import DogsPage from "./pages/Dogs";
import Login from "./pages/Login.page";

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Main>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/dogs" component={DogsPage} />
        </Switch>
      </Main>
      <Footer />
    </Router>
  </Provider>
);

export default App;
