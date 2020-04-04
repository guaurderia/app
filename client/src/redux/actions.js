import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000", withCredentials: true });

export const getData = url => {
  return dispatch => {
    dispatch({ type: "REQUEST" });
    api
      .get(url)
      .then(res => {
        const data = res.data;
        dispatch({ type: "SUCCESS", list: data });
      })
      .catch(error => {
        dispatch({ type: "FAILURE", error: error.response.data });
      });
  };
};

export const postData = (url, name, obj) => {
  return dispatch => {
    dispatch({ type: "REQUEST" });
    api
      .post(url, obj)
      .then(res => {
        const data = res.data;
        dispatch({ type: "SUCCESS", [name]: data });
      })
      .catch(error => {
        dispatch({ type: "FAILURE", error: error.response.data });
      });
  };
};

export const selectDog = id => dispatch({ selected: id });
