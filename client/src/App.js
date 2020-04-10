import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./layouts/Main";
import Header from "./components/Header";
import Footer from "./layouts/Footer";
import DogsPage from "./pages/Dogs";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Main>
          <DogsPage />
        </Main>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
