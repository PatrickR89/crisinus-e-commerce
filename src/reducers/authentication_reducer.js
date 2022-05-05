import {
  SET_LOGIN_TRUE,
  SET_LOGIN_FALSE,
  UPDATE_USER
} from "../actions/authentication_actions";

const authentication_reducer = (state, action) => {
  if (action.type === SET_LOGIN_TRUE) {
    return { ...state, loggedIn: true };
  }
  if (action.type === SET_LOGIN_FALSE) {
    return { ...state, loggedIn: false };
  }
  if (action.type === UPDATE_USER) {
    const { name, value } = action.payload;
    console.log(name, value);
    return { ...state, [name]: value };
  }
  throw new Error(`No matching ${action.type} action`);
};

export default authentication_reducer;
