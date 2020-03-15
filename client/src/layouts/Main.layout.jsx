import React from "react";
import { Header } from "../components/Header";
import { useUser } from "../../lib/auth.api";

export const Layout = ({ children }) => {
  const user = useUser("get");
  return (
    <>
      {user && <h1>Welcome {user.username}</h1>}
      <Header />
      <section>{children}</section>
      <footer className="container" style={{ marginTop: 20, textAlign: "center" }}>
        &copy; 2020 Guaurdería Madrid
      </footer>
    </>
  );
};
