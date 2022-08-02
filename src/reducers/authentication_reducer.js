import {
    SET_LOGIN_TRUE,
    SET_LOGIN_FALSE,
    UPDATE_USER,
    REMOVE_COOKIE_MODAL
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
    throw new Error(`No matching ${action.type} action`);
};

export default authentication_reducer;
