import { combineReducers } from "redux";

const initialState = {
<<<<<<< HEAD
  loading: false,
  data: "",
=======
  loading: true,
>>>>>>> 3a38678c63fd2a514d6ad53182916cd79d259485
  error: "",
};

export const reducer = (state = initialState, action) => {
  const name = action.name ? action.name.toUpperCase() : "";
  switch (action.type) {
    case `REQUEST_${name}`:
      return {
        ...state,
      };
    case `SUCCESS_${name}`:
      return {
        ...state,
        loading: false,
        [action.key]: action.data,
      };
    case `FAILURE_${name}`:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const crudReducer = (reducer, reducerName) => {
  return (state, action) => {
    const { name } = action;
    const isInitializationCall = state === undefined;
    if (name !== reducerName && !isInitializationCall) return state;

    return reducer(state, action);
  };
};

export const rootReducer = combineReducers({
  dog: crudReducer(reducer, "dog"),
  user: crudReducer(reducer, "user"),
  attendance: crudReducer(reducer, "attendance"),
  pass: crudReducer(reducer, "pass"),
});
