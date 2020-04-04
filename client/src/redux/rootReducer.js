import { combineReducers } from "redux";
import { dogReducer, userReducer } from "./reducers";

const rootReducer = combineReducers({
  dog: dogReducer,
  user: userReducer
});

export default rootReducer;
