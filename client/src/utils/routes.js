import React from "react";
import Login from "../pages/Login.page";
import DogsPage from "../pages/Dogs";
import DogCard from "../components/DogCard";

export const routes = {
  "/login": () => <Login />,
  "/dogs": () => <DogsPage />,
  "/dogs/show/:id": () => <DogCard />,
};
