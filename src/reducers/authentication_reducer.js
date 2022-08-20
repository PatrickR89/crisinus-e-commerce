import {
    SET_LOGIN_TRUE,
    SET_LOGIN_FALSE,
    UPDATE_USER,
    REMOVE_COOKIE_MODAL,
    SET_CLIENT_ENGAGED,
    RESET_USER
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
        return { ...state, [name]: value };
    }
    if (action.type === REMOVE_COOKIE_MODAL) {
        return { ...state, cookiesModal: action.payload };
    }
    if (action.type === SET_CLIENT_ENGAGED) {
        return { ...state, clientEngaged: action.payload };
    }
    if (action.type === RESET_USER) {
        return { ...state, username: "", password: "" };
    }
    throw new Error(`No matching ${action.type} action`);
};

export default authentication_reducer;
