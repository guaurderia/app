import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000", withCredentials: true });

export const getData = (url, name) => {
  return (dispatch) => {
    dispatch({ type: `REQUEST_${name.toUpperCase()}`, name });
    api
      .get(url)
      .then((res) => {
        const data = res.status === 202 ? "" : res.data;
        dispatch({ type: `SUCCESS_${name.toUpperCase()}`, data, name });
      })
      .catch((error) => {
        dispatch({ type: `FAILURE_${name.toUpperCase()}`, error: error.response.data, name });
      });
  };
};

export const postData = (url, name, obj) => {
  return (dispatch) => {
    dispatch({ type: `REQUEST_${name.toUpperCase()}`, name });
    api
      .post(url, obj)
      .then((res) => {
        const data = res.data;
        dispatch({ type: `SUCCESS_${name.toUpperCase()}`, data, name });
      })
      .catch((error) => {
        dispatch({ type: `FAILURE_${name.toUpperCase()}`, error: error.response.data, name });
      });
  };
};
