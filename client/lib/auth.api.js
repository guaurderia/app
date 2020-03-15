import React, { useContext } from "../node_modules/react";
import axios from "../node_modules/axios";

export const UserContext = React.createContext();
export const AdminContext = React.createContext();

export const useUser = action => {
  const userState = useContext(UserContext);
  switch (action) {
    case "get":
      return userState.user;
    case "set":
      return userState.setUser;
    case "out":
      return userState.setUser(null);
  }
};

export const useAdmin = action => {
  const adminState = useContext(AdminContext);
  switch (action) {
    case "get":
      return adminState.user;
    case "set":
      return adminState.setUser;
    case "out":
      return adminState.setUser(null);
  }
};

const api = axios.create({ baseURL: "http://localhost:3000" });

export const register = async (type, obj) => {
  // Axios post a ruta /auth/signup en servidor
  // para crear un usuario en mongodb
  console.log(`Registrando usuario...`);
  console.log(obj);
  const res = await api.post(`/register/${type}`, obj);
  console.log("Created User");
  console.log(res.data);
  return res.data;
};

export const login = async (type, obj) => {
  console.log("Do Login");
  const res = await api.post(`/login/${type}`, obj);
  console.log(res.data);
  return res.data;
};
