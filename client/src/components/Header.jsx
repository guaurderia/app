import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../lib/auth.api";

export const Header = () => {
  const user = useUser("get");
  const handleLogout = useUser("out");
  return (
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" to="/">
          Guaurdería
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            {user && (
              <>
                <li class="nav-item">
                  <Link class="nav-link" to="/register">
                    + Cliente
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/" onClick={handleLogout}>
                    Salir
                  </Link>
                </li>
              </>
            )}
            {!user && (
              <>
                <li class="nav-item">
                  <Link class="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
