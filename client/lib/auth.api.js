import React, { useContext, useState } from "react";
import axios from "axios";

export const UseContext = React.createContext();

export const user = action => {
  const userState = useContext(UseContext);
  switch (action) {
    case "use":
      return userState.user;
    case "set":
      return userState.setUser;
    case "logout":
      return userState.setUser(null);
  }
};

const api = axios.create({ baseURL: "http://localhost:3000" });

export const registerUser = async (firstName, lastName, username, password, mainPhone, emergencyPhone, adress) => {
  // Axios post a ruta /auth/signup en servidor
  // para crear un usuario en mongodb
  console.log(`Registrando usuario...`);
  console.log(firstName, lastName, username, password, mainPhone, emergencyPhone, adress);
  const res = await api.post("/register/user", {
    firstName,
    lastName,
    username,
    password,
    mainPhone,
    emergencyPhone,
    adress
  });
  console.log("Created User");
  console.log(res.data);
  return res.data;
};

export const registerDog = async (name, bread, age, user) => {
  // Axios post a ruta /auth/signup en servidor
  // para crear un usuario en mongodb
  console.log(`Registrando usuario...`);
  console.log(name, bread, age, user);
  const res = await api.post("/register/dog", {
    name,
    bread,
    age,
    user
  });
  console.log("Created User");
  console.log(res.data);
  return res.data;
};

export const registerAdmin = async (firstName, lastName, roll, username, password) => {
  console.log(`Registrando adminitrador...`);
  console.log(firstName, lastName, username, password);
  const res = await api.post("/register/admin", {
    firstName,
    lastName,
    roll,
    username,
    password
  });
  console.log("Created User");
  console.log(res.data);
  return res.data;
};

export const loginUser = async (username, password) => {
  console.log("Do Login");
  const res = await api.post("/login/user", {
    username,
    password
  });
  console.log(res.data);
  return res.data;
};
