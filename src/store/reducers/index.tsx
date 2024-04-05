import { combineReducers } from "redux";
import contact from "../slices/contact";

const appReducer = combineReducers({
  contactReducer: contact,
});

export default appReducer;
