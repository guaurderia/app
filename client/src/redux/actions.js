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
  api
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
