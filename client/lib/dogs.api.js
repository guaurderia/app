import axios from "axios";
import _ from "lodash";

//TODO: change this URL to get if from env
const instance = axios.create({ baseURL: "http://localhost:3000", withCredentials: false });

export const createDog = async (name, bread, sex, vaccines, fixed, heat, chip, character, user, pass) => {
  console.log(`Creating dog...`);
  const res = await instance.post("/dog/create", {
    name,
    bread,
    sex,
    vaccines,
    fixed,
    heat,
    chip,
    character,
    user,
    pass
  });
  console.log("Dog created");
  console.log(res.data);
  return res.data;
};

export const listAllDogs = async () => {
  const res = await instance.get(`/dog/list`);
  console.log(res.data);
  return res.data;
};

export const deleteDog = async dogId => {
  const res = await instance.get(`/dog/delete/${dogId}`);
  console.log(res.data);
  return res.data;
};

export const getDogInfo = async dogId => {
  const res = await instance.get(`/dog/info/${dogId}`);
  // Filter for specific ta
  const all = _.filter(res.data, { dogId: { _id: dogId } });

  console.log(all);
  return all;
};
