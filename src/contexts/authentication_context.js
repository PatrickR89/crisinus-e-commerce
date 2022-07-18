import React, { useContext, useEffect, useReducer } from "react";

import axios from "axios";

import {
    SET_LOGIN_TRUE,
    SET_LOGIN_FALSE,
    UPDATE_USER
} from "../actions/authentication_actions";

import reducer from "../reducers/authentication_reducer";

const initialState = {
    username: "",
    password: "",
    loggedIn: false
};

const AuthenticationContext = React.createContext();

export const AuthenticationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    axios.defaults.withCredentials = true;

    const login = () => {
        axios
            .post("/login", {
                username: state.username,
                password: state.password
            })
            .then((response) => {
                if (!response.data.auth) {
                    dispatch({ type: SET_LOGIN_FALSE });
                } else {
                    localStorage.setItem("token", response.data.token);
                    dispatch({ type: SET_LOGIN_TRUE });
                }
            });
    };

    const logout = () => {
        localStorage.removeItem("token");
        axios.get("/logout");
        dispatch({ type: SET_LOGIN_FALSE });
    };

    const updateUser = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        dispatch({ type: UPDATE_USER, payload: { name, value } });
    };

    const header = () => {
        return { "x-access-token": localStorage.getItem("token") };
    };

    useEffect(() => {
        axios.get("/login").then((response) => {
            if (response.data.loggedIn === true) {
                dispatch({ type: SET_LOGIN_TRUE });
            }
        });
    }, []);

    return (
        <AuthenticationContext.Provider
            value={{ ...state, login, updateUser, header, logout }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuthenticationContext = () => {
    return useContext(AuthenticationContext);
};
