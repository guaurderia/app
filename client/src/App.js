import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import DogsPage from "./pages/Dogs";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <DogsPage />
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
