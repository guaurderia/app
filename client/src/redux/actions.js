import axios from "axios";

export const api = axios.create({ baseURL: process.env.SERVER_URL, withCredentials: true });

export const getData = (url, name, key) => (dispatch) => {
  dispatch({ type: `REQUEST_${name.toUpperCase()}`, name });
  api
    .get(url)
    .then((res) => {
      const data = res.status === 202 ? "" : res.data;
      dispatch({ type: `SUCCESS_${name.toUpperCase()}`, key, data, name });
    })
    .catch((error) => {
      dispatch({ type: `FAILURE_${name.toUpperCase()}`, error: error.response.data, name });
    });
};

export const postData = (url, name, obj, key = "selected") => (dispatch) => {
  dispatch({ type: `REQUEST_${name.toUpperCase()}`, name });
  return api
    .post(url, obj)
    .then((res) => {
      const data = res.data;
      dispatch({ type: `SUCCESS_${name.toUpperCase()}`, key, data, name });
      return data;
    })
    .catch((error) => {
      dispatch({ type: `FAILURE_${name.toUpperCase()}`, error: error.response.data, name });
    });
};

export const setData = (name, obj, key) => (dispatch) => {
  dispatch({ type: `SUCCESS_${name.toUpperCase()}`, name, data: obj, key });
};

export const getBreed = () => (dispatch) => {
  const name = "breed";
  const key = "list";
  dispatch({ type: `REQUEST_BREED`, name });
  // get information from the temples API
  axios
    .get("https://api.thedogapi.com/v1/breeds")
    .then((res) => {
      const data = res.data.map((breed) => ({
        name: breed.name,
        temperament: breed.temperament && breed.temperament.split(", "),
        "bred-for": breed["bred_for"] && breed["bred_for"].split(", "),
        "height-cm": breed.height.metric.split(/\D+/),
        "weight-kg": breed.weight.metric.split(/\D+/),
        "life-expentancy": breed["life_span"].split(/\D+/).slice(0, 2),
        wikipedia: breed["wikipedia_url"],
        origin: breed.origin,
      }));
      dispatch({ type: `SUCCESS_BREED`, key, data, name });
    })
    .catch((error) => {
      dispatch({ type: `FAILURE_BREED`, error: error.response.data, name });
    });
};
