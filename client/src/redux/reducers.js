import { combineReducers } from "redux";

const initialState = {
  loading: false,
  data: "",
  error: ""
};

export const reducer = (state = initialState, action) => {
  const name = action.name ? action.name.toUpperCase() : "";
  switch (action.type) {
    case `REQUEST_${name}`:
      return {
        ...state,
        loading: true
      };
    case `SUCCESS_${name}`:
      return {
        loading: false,
        data: action.data,
        error: ""
      };
    case `FAILURE_${name}`:
      return {
        ...state,
        loading: false,
        error: action.data
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
  attendance: crudReducer(reducer, "attendance")
});
