import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">
          Guaurdería
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/dog/add">
              + Añadir <span className="sr-only">(current)</span>
            </Link>
            <Link className="nav-item nav-link" to="/dog/list">
              Perros
            </Link>
            <Link className="nav-item nav-link" to="/login">
              Entrar
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
