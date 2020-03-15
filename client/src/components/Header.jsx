import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../lib/auth.api";

export const Header = () => {
  const user = useUser("get");
  const handleLogout = useUser("out");
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/register">Registrar</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <Link to="/private">Private Page</Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};
